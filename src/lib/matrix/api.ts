import type {
  MatrixSession,
  MatrixEvent,
  SyncResponse,
  MessagesResponse,
  RelationsResponse,
  RegisterResponse,
  MatrixErrorResponse,
} from './types';

export class MatrixError extends Error {
  constructor(
    public readonly errcode: string,
    message: string,
    public readonly httpStatus: number,
  ) {
    super(message);
    this.name = 'MatrixError';
  }
}

async function matrixFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    const err = data as MatrixErrorResponse;
    throw new MatrixError(
      err.errcode || 'M_UNKNOWN',
      err.error || `HTTP ${res.status}`,
      res.status,
    );
  }

  return data as T;
}

/** Strip trailing slashes so URL concatenation doesn't produce `//`. */
function baseUrl(session: MatrixSession): string {
  return session.homeserverUrl.replace(/\/+$/, '');
}

function authHeaders(session: MatrixSession): HeadersInit {
  return {
    Authorization: `Bearer ${session.accessToken}`,
    'Content-Type': 'application/json',
  };
}

// ---------------------------------------------------------------------------
// Registration (via our proxy — the proxy holds the secret token)
// ---------------------------------------------------------------------------

export async function registerGuest(
  proxyUrl: string,
  signal?: AbortSignal,
): Promise<RegisterResponse> {
  return matrixFetch<RegisterResponse>(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
    signal,
  });
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export async function setDisplayName(
  session: MatrixSession,
  displayName: string,
): Promise<void> {
  const url = `${baseUrl(session)}/_matrix/client/v3/profile/${encodeURIComponent(session.userId)}/displayname`;
  await matrixFetch<Record<string, never>>(url, {
    method: 'PUT',
    headers: authHeaders(session),
    body: JSON.stringify({ displayname: displayName }),
  });
}

export async function getDisplayName(
  session: MatrixSession,
  userId: string,
): Promise<string | null> {
  try {
    const url = `${baseUrl(session)}/_matrix/client/v3/profile/${encodeURIComponent(userId)}/displayname`;
    const data = await matrixFetch<{ displayname?: string }>(url, {
      headers: authHeaders(session),
    });
    return data.displayname ?? null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

export async function joinRoom(
  session: MatrixSession,
  roomIdOrAlias: string,
  serverName?: string,
): Promise<{ room_id: string }> {
  const params = serverName
    ? `?server_name=${encodeURIComponent(serverName)}`
    : '';
  const url = `${baseUrl(session)}/_matrix/client/v3/join/${encodeURIComponent(roomIdOrAlias)}${params}`;
  return matrixFetch<{ room_id: string }>(url, {
    method: 'POST',
    headers: authHeaders(session),
    body: '{}',
  });
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

let txnCounter = 0;

function generateTxnId(): string {
  return `oc_${Date.now()}_${++txnCounter}`;
}

export async function sendMessage(
  session: MatrixSession,
  roomId: string,
  body: string,
): Promise<{ event_id: string; txnId: string }> {
  const txnId = generateTxnId();
  const url = `${baseUrl(session)}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/send/m.room.message/${encodeURIComponent(txnId)}`;
  const data = await matrixFetch<{ event_id: string }>(url, {
    method: 'PUT',
    headers: authHeaders(session),
    body: JSON.stringify({ msgtype: 'm.text', body }),
  });
  return { event_id: data.event_id, txnId };
}

export async function sendReply(
  session: MatrixSession,
  roomId: string,
  body: string,
  inReplyToEventId: string,
): Promise<{ event_id: string; txnId: string }> {
  const txnId = generateTxnId();
  const url = `${baseUrl(session)}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/send/m.room.message/${encodeURIComponent(txnId)}`;
  const data = await matrixFetch<{ event_id: string }>(url, {
    method: 'PUT',
    headers: authHeaders(session),
    body: JSON.stringify({
      msgtype: 'm.text',
      body,
      'm.relates_to': {
        'm.in_reply_to': { event_id: inReplyToEventId },
      },
    }),
  });
  return { event_id: data.event_id, txnId };
}

export async function sendThreadReply(
  session: MatrixSession,
  roomId: string,
  body: string,
  threadRootEventId: string,
  latestThreadEventId: string,
): Promise<{ event_id: string; txnId: string }> {
  const txnId = generateTxnId();
  const url = `${baseUrl(session)}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/send/m.room.message/${encodeURIComponent(txnId)}`;
  const data = await matrixFetch<{ event_id: string }>(url, {
    method: 'PUT',
    headers: authHeaders(session),
    body: JSON.stringify({
      msgtype: 'm.text',
      body,
      'm.relates_to': {
        rel_type: 'm.thread',
        event_id: threadRootEventId,
        is_falling_back: true,
        'm.in_reply_to': { event_id: latestThreadEventId },
      },
    }),
  });
  return { event_id: data.event_id, txnId };
}

export async function getThreadMessages(
  session: MatrixSession,
  roomId: string,
  threadRootEventId: string,
  from?: string,
  limit = 50,
): Promise<RelationsResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    dir: 'f',
  });
  if (from) params.set('from', from);
  const url = `${baseUrl(session)}/_matrix/client/v1/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(threadRootEventId)}/m.thread?${params}`;
  return matrixFetch<RelationsResponse>(url, {
    headers: authHeaders(session),
  });
}

export async function getEvent(
  session: MatrixSession,
  roomId: string,
  eventId: string,
): Promise<MatrixEvent> {
  const url = `${baseUrl(session)}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/event/${encodeURIComponent(eventId)}`;
  return matrixFetch<MatrixEvent>(url, {
    headers: authHeaders(session),
  });
}

export async function sendReaction(
  session: MatrixSession,
  roomId: string,
  eventId: string,
  emoji: string,
): Promise<{ event_id: string }> {
  const txnId = generateTxnId();
  const url = `${baseUrl(session)}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/send/m.reaction/${encodeURIComponent(txnId)}`;
  return matrixFetch<{ event_id: string }>(url, {
    method: 'PUT',
    headers: authHeaders(session),
    body: JSON.stringify({
      'm.relates_to': {
        rel_type: 'm.annotation',
        event_id: eventId,
        key: emoji,
      },
    }),
  });
}

export async function getMessages(
  session: MatrixSession,
  roomId: string,
  from: string,
  limit = 50,
): Promise<MessagesResponse> {
  const params = new URLSearchParams({
    dir: 'b',
    from,
    limit: String(limit),
    filter: JSON.stringify({ types: ['m.room.message'] }),
  });
  const url = `${baseUrl(session)}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/messages?${params}`;
  return matrixFetch<MessagesResponse>(url, {
    headers: authHeaders(session),
  });
}

// ---------------------------------------------------------------------------
// Sync
// ---------------------------------------------------------------------------

const SYNC_FILTER = JSON.stringify({
  room: {
    timeline: { limit: 25, types: ['m.room.message', 'm.reaction'] },
    ephemeral: { types: ['m.typing'] },
    state: { types: ['m.room.member'] },
  },
});

export async function sync(
  session: MatrixSession,
  since?: string,
  timeout = 30000,
  signal?: AbortSignal,
): Promise<SyncResponse> {
  const params = new URLSearchParams({
    timeout: String(timeout),
    filter: SYNC_FILTER,
  });
  if (since) params.set('since', since);

  const url = `${baseUrl(session)}/_matrix/client/v3/sync?${params}`;
  return matrixFetch<SyncResponse>(url, {
    headers: authHeaders(session),
    signal,
  });
}

// ---------------------------------------------------------------------------
// Typing
// ---------------------------------------------------------------------------

export async function sendTyping(
  session: MatrixSession,
  roomId: string,
  typing: boolean,
  timeout = 30000,
): Promise<void> {
  const url = `${baseUrl(session)}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/typing/${encodeURIComponent(session.userId)}`;
  const body = typing
    ? JSON.stringify({ typing: true, timeout })
    : JSON.stringify({ typing: false });
  await matrixFetch<Record<string, never>>(url, {
    method: 'PUT',
    headers: authHeaders(session),
    body,
  });
}
