'use client';

import * as React from 'react';
import type {
  MatrixSession,
  ChatConfig,
  SyncResponse,
  MatrixEvent,
  ChatMessage,
  RoomMessageContent,
  ThreadState,
  ReplyContext,
} from '@/lib/matrix/types';
import { classifyEvent } from '@/lib/matrix/types';
import {
  registerGuest,
  setDisplayName as apiSetDisplayName,
  joinRoom,
  sendMessage as apiSendMessage,
  sendReply as apiSendReply,
  sendThreadReply as apiSendThreadReply,
  sendReaction as apiSendReaction,
  getThreadMessages as apiGetThreadMessages,
  getEvent as apiGetEvent,
  sendTyping as apiSendTyping,
  sync as apiSync,
  MatrixError,
} from '@/lib/matrix/api';
import { SyncLoop } from '@/lib/matrix/sync';
import { saveSession, loadSession, clearSession } from '@/lib/matrix/session';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type ClientStatus =
  | 'idle'
  | 'registering'
  | 'naming'
  | 'joining'
  | 'ready'
  | 'error';

export interface RoomState {
  messages: ChatMessage[];
  threads: Map<string, ThreadState>;
  typingUsers: string[];
  prevBatch: string | null;
  isLoadingHistory: boolean;
  hasMoreHistory: boolean;
  unreadCount: number;
}

export interface MatrixClientContextValue {
  session: MatrixSession | null;
  status: ClientStatus;
  error: string | null;
  rooms: Map<string, RoomState>;
  displayNames: Map<string, string>;
  avatarUrls: Map<string, string>;
  activeRoomId: string | null;
  openThread: { roomId: string; rootEventId: string } | null;
  /** Resolves a config room ID (which may be an alias) to the real room ID. */
  resolveRoomId: (configId: string) => string;
  setActiveRoomId: (roomId: string) => void;
  submitDisplayName: (name: string) => Promise<void>;
  skipDisplayName: () => Promise<void>;
  sendMessage: (roomId: string, body: string) => Promise<void>;
  sendReply: (roomId: string, body: string, inReplyToEventId: string) => Promise<void>;
  sendThreadReply: (roomId: string, body: string, threadRootEventId: string) => Promise<void>;
  openThreadPanel: (roomId: string, rootEventId: string) => Promise<void>;
  closeThread: () => void;
  toggleReaction: (roomId: string, eventId: string, emoji: string) => void;
  sendTyping: (roomId: string, typing: boolean) => void;
  loadMoreHistory: (roomId: string) => Promise<void>;
  retry: () => void;
}

const MatrixClientContext = React.createContext<MatrixClientContextValue | null>(
  null,
);

export function useMatrixClient(): MatrixClientContextValue {
  const ctx = React.useContext(MatrixClientContext);
  if (!ctx)
    throw new Error('useMatrixClient must be used within MatrixClientProvider');
  return ctx;
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

interface State {
  status: ClientStatus;
  error: string | null;
  session: MatrixSession | null;
  rooms: Map<string, RoomState>;
  displayNames: Map<string, string>;
  avatarUrls: Map<string, string>;
  activeRoomId: string | null;
  sentTxnIds: Set<string>;
  /** Maps config room IDs (which may be aliases) to real room IDs (starting with !). */
  resolvedRoomIds: Map<string, string>;
  openThread: { roomId: string; rootEventId: string } | null;
}

/** Convert a mxc:// URL to an authenticated HTTP thumbnail URL. */
function mxcToHttp(mxcUrl: string, homeserverUrl: string, size = 80): string {
  if (!mxcUrl.startsWith('mxc://')) return mxcUrl;
  const parts = mxcUrl.slice(6); // remove "mxc://"
  const base = homeserverUrl.replace(/\/+$/, '');
  // Use the authenticated client media endpoint (Matrix v1.11+)
  return `${base}/_matrix/client/v1/media/thumbnail/${parts}?width=${size}&height=${size}&method=crop`;
}

/** Fetch an avatar image via the authenticated media API and return a blob URL. */
async function fetchAvatarBlob(
  url: string,
  accessToken: string,
): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return undefined;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return undefined;
  }
}

type Action =
  | { type: 'SET_STATUS'; status: ClientStatus; error?: string }
  | { type: 'SET_SESSION'; session: MatrixSession }
  | { type: 'SET_ACTIVE_ROOM'; roomId: string }
  | { type: 'CLEAR_UNREAD'; roomId: string }
  | { type: 'SET_RESOLVED_ROOM_IDS'; mapping: Map<string, string> }
  | {
      type: 'SYNC_ROOM';
      roomId: string;
      events: MatrixEvent[];
      prevBatch: string;
      limited: boolean;
      userId: string;
    }
  | {
      type: 'SYNC_TYPING';
      roomId: string;
      userIds: string[];
      selfUserId: string;
    }
  | {
      type: 'SYNC_MEMBERS';
      members: Array<{ userId: string; displayName: string; avatarUrl?: string }>;
    }
  | {
      type: 'OPTIMISTIC_SEND';
      roomId: string;
      message: ChatMessage;
      txnId: string;
    }
  | { type: 'CONFIRM_SEND'; txnId: string; eventId: string; roomId: string }
  | {
      type: 'PREPEND_HISTORY';
      roomId: string;
      events: MatrixEvent[];
      end: string | null;
      userId: string;
    }
  | { type: 'SET_LOADING_HISTORY'; roomId: string; loading: boolean }
  | { type: 'UPDATE_DISPLAY_NAME'; userId: string; displayName: string }
  | { type: 'OPEN_THREAD'; roomId: string; rootEventId: string; rootMessage: ChatMessage; messages: ChatMessage[]; nextBatch?: string }
  | { type: 'CLOSE_THREAD' }
  | { type: 'APPEND_THREAD_MESSAGE'; roomId: string; rootEventId: string; message: ChatMessage }
  | { type: 'UPDATE_THREAD_SUMMARY'; roomId: string; rootEventId: string; incrementBy: number }
  | { type: 'ADD_REACTION'; roomId: string; targetEventId: string; emoji: string; userId: string };

function makeEmptyRoomState(): RoomState {
  return {
    messages: [],
    threads: new Map(),
    typingUsers: [],
    prevBatch: null,
    isLoadingHistory: false,
    hasMoreHistory: true,
    unreadCount: 0,
  };
}

function eventToMessage(
  event: MatrixEvent,
  userId: string,
  displayNames: Map<string, string>,
  avatarUrls: Map<string, string>,
  existingMessages?: ChatMessage[],
): ChatMessage | null {
  if (event.type !== 'm.room.message') return null;
  const content = event.content as unknown as RoomMessageContent;
  if (!content?.body) return null;

  const rel = event.content?.['m.relates_to'];
  const threadRelation = rel?.rel_type === 'm.thread' ? rel : undefined;
  const replyToId = threadRelation
    ? undefined // Thread replies use fallback m.in_reply_to — ignore it
    : rel?.['m.in_reply_to']?.event_id;

  // Look up the parent message for reply preview
  let replyTo: ChatMessage['replyTo'];
  if (replyToId && existingMessages) {
    const parent = existingMessages.find((m) => m.id === replyToId);
    if (parent) {
      replyTo = {
        eventId: parent.id,
        sender: parent.sender,
        displayName: parent.displayName,
        body: parent.body,
      };
    } else {
      replyTo = {
        eventId: replyToId,
        sender: '',
        displayName: 'Unknown',
        body: '',
      };
    }
  }

  // Thread summary from server-bundled aggregation
  const threadAgg = event.unsigned?.['m.relations']?.['m.thread'];
  const threadSummary = threadAgg
    ? { replyCount: threadAgg.count }
    : undefined;

  return {
    id: event.event_id,
    sender: event.sender,
    displayName:
      displayNames.get(event.sender) ?? event.sender.replace(/:.*$/, '').slice(1),
    body: content.body,
    formattedBody:
      content.format === 'org.matrix.custom.html'
        ? content.formatted_body
        : undefined,
    timestamp: event.origin_server_ts,
    isMine: event.sender === userId,
    avatarUrl: avatarUrls.get(event.sender),
    threadSummary,
    replyTo,
    threadRootId: threadRelation?.event_id,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
        error: action.error ?? null,
      };

    case 'SET_SESSION':
      return { ...state, session: action.session };

    case 'SET_ACTIVE_ROOM':
      return { ...state, activeRoomId: action.roomId };

    case 'CLEAR_UNREAD': {
      const room = state.rooms.get(action.roomId);
      if (!room || room.unreadCount === 0) return state;
      const next = new Map(state.rooms);
      next.set(action.roomId, { ...room, unreadCount: 0 });
      return { ...state, rooms: next };
    }

    case 'SYNC_ROOM': {
      const existing = state.rooms.get(action.roomId) ?? makeEmptyRoomState();
      const timelineMessages: ChatMessage[] = [];
      const threadReplies: ChatMessage[] = [];

      for (const event of action.events) {
        if (
          event.unsigned?.transaction_id &&
          state.sentTxnIds.has(event.unsigned.transaction_id)
        ) {
          continue;
        }
        const cls = classifyEvent(event);

        // Handle reactions separately — they don't create messages
        if (cls === 'reaction') {
          const rel = event.content?.['m.relates_to'];
          if (rel?.event_id && rel?.key) {
            // Apply reaction to existing messages in the current state
            const targetId = rel.event_id as string;
            const emoji = rel.key as string;
            const targetMsg = existing.messages.find((m) => m.id === targetId) ??
              timelineMessages.find((m) => m.id === targetId);
            if (targetMsg) {
              const reactions = new Map(targetMsg.reactions ?? new Map());
              const users = new Set(reactions.get(emoji) ?? new Set());
              users.add(event.sender);
              reactions.set(emoji, users);
              targetMsg.reactions = reactions;
            }
          }
          continue;
        }

        const msg = eventToMessage(
          event,
          action.userId,
          state.displayNames,
          state.avatarUrls,
          existing.messages,
        );
        if (!msg) continue;

        if (cls === 'thread_reply') {
          threadReplies.push(msg);
        } else {
          timelineMessages.push(msg);
        }
      }

      // Deduplicate timeline messages
      const existingIds = new Set(existing.messages.map((m) => m.id));
      const deduped = timelineMessages.filter((m) => !existingIds.has(m.id));

      // Update thread summaries on root messages for incoming thread replies
      let updatedMessages = [...existing.messages, ...deduped];
      for (const threadReply of threadReplies) {
        if (!threadReply.threadRootId) continue;
        updatedMessages = updatedMessages.map((m) =>
          m.id === threadReply.threadRootId
            ? {
                ...m,
                threadSummary: {
                  replyCount: (m.threadSummary?.replyCount ?? 0) + 1,
                },
              }
            : m,
        );
      }

      // Append thread replies to open thread if matching
      let updatedThreads = existing.threads;
      if (
        state.openThread?.roomId === action.roomId &&
        threadReplies.length > 0
      ) {
        const openRootId = state.openThread.rootEventId;
        const matchingReplies = threadReplies.filter(
          (r) => r.threadRootId === openRootId,
        );
        if (matchingReplies.length > 0) {
          const thread = existing.threads.get(openRootId);
          if (thread) {
            updatedThreads = new Map(existing.threads);
            const threadMsgIds = new Set(thread.messages.map((m) => m.id));
            const newThreadMsgs = matchingReplies.filter(
              (m) => !threadMsgIds.has(m.id),
            );
            updatedThreads.set(openRootId, {
              ...thread,
              messages: [...thread.messages, ...newThreadMsgs],
            });
          }
        }
      }

      if (deduped.length === 0 && threadReplies.length === 0 && existing.prevBatch)
        return state;

      const isInactive = state.activeRoomId !== action.roomId;
      const incomingFromOthers = deduped.filter((m) => !m.isMine).length;

      const next = new Map(state.rooms);
      next.set(action.roomId, {
        ...existing,
        messages: updatedMessages,
        threads: updatedThreads,
        prevBatch: existing.prevBatch ?? action.prevBatch,
        unreadCount:
          isInactive
            ? existing.unreadCount + incomingFromOthers
            : existing.unreadCount,
      });
      return { ...state, rooms: next };
    }

    case 'SYNC_TYPING': {
      const existing = state.rooms.get(action.roomId) ?? makeEmptyRoomState();
      const filtered = action.userIds.filter(
        (id) => id !== action.selfUserId,
      );
      const next = new Map(state.rooms);
      next.set(action.roomId, { ...existing, typingUsers: filtered });
      return { ...state, rooms: next };
    }

    case 'SYNC_MEMBERS': {
      const names = new Map(state.displayNames);
      const avatars = new Map(state.avatarUrls);
      for (const { userId, displayName, avatarUrl } of action.members) {
        names.set(userId, displayName);
        if (avatarUrl) avatars.set(userId, avatarUrl);
      }
      return { ...state, displayNames: names, avatarUrls: avatars };
    }

    case 'OPTIMISTIC_SEND': {
      const existing = state.rooms.get(action.roomId) ?? makeEmptyRoomState();
      const next = new Map(state.rooms);
      const sentTxnIds = new Set(state.sentTxnIds);
      sentTxnIds.add(action.txnId);
      next.set(action.roomId, {
        ...existing,
        messages: [...existing.messages, action.message],
      });
      return { ...state, rooms: next, sentTxnIds };
    }

    case 'CONFIRM_SEND': {
      const existing = state.rooms.get(action.roomId);
      if (!existing) return state;
      const next = new Map(state.rooms);
      next.set(action.roomId, {
        ...existing,
        messages: existing.messages.map((m) =>
          m.id === action.txnId
            ? { ...m, id: action.eventId, isPending: false }
            : m,
        ),
      });
      return { ...state, rooms: next };
    }

    case 'PREPEND_HISTORY': {
      const existing = state.rooms.get(action.roomId) ?? makeEmptyRoomState();
      const historyMessages: ChatMessage[] = [];
      for (const event of action.events) {
        const cls = classifyEvent(event);
        if (cls === 'thread_reply') continue; // Thread replies don't go in main timeline
        const msg = eventToMessage(event, action.userId, state.displayNames, state.avatarUrls, existing.messages);
        if (msg) historyMessages.push(msg);
      }
      // Reverse because /messages?dir=b returns newest first
      historyMessages.reverse();

      const existingIds = new Set(existing.messages.map((m) => m.id));
      const deduped = historyMessages.filter((m) => !existingIds.has(m.id));

      const next = new Map(state.rooms);
      next.set(action.roomId, {
        ...existing,
        messages: [...deduped, ...existing.messages],
        prevBatch: action.end,
        hasMoreHistory: action.events.length > 0 && action.end !== null,
        isLoadingHistory: false,
      });
      return { ...state, rooms: next };
    }

    case 'SET_LOADING_HISTORY': {
      const existing = state.rooms.get(action.roomId) ?? makeEmptyRoomState();
      const next = new Map(state.rooms);
      next.set(action.roomId, {
        ...existing,
        isLoadingHistory: action.loading,
      });
      return { ...state, rooms: next };
    }

    case 'UPDATE_DISPLAY_NAME': {
      const names = new Map(state.displayNames);
      names.set(action.userId, action.displayName);
      return { ...state, displayNames: names };
    }

    case 'SET_RESOLVED_ROOM_IDS':
      return { ...state, resolvedRoomIds: action.mapping };

    case 'OPEN_THREAD': {
      const existing = state.rooms.get(action.roomId) ?? makeEmptyRoomState();
      const threads = new Map(existing.threads);
      threads.set(action.rootEventId, {
        rootMessage: action.rootMessage,
        messages: action.messages,
        isLoading: false,
        hasMore: true,
        nextBatch: action.nextBatch,
      });
      const next = new Map(state.rooms);
      next.set(action.roomId, { ...existing, threads });
      return {
        ...state,
        rooms: next,
        openThread: { roomId: action.roomId, rootEventId: action.rootEventId },
      };
    }

    case 'CLOSE_THREAD':
      return { ...state, openThread: null };

    case 'APPEND_THREAD_MESSAGE': {
      const existing = state.rooms.get(action.roomId);
      if (!existing) return state;
      const thread = existing.threads.get(action.rootEventId);
      if (!thread) return state;
      if (thread.messages.some((m) => m.id === action.message.id)) return state;
      const threads = new Map(existing.threads);
      threads.set(action.rootEventId, {
        ...thread,
        messages: [...thread.messages, action.message],
      });
      const next = new Map(state.rooms);
      next.set(action.roomId, { ...existing, threads });
      return { ...state, rooms: next };
    }

    case 'UPDATE_THREAD_SUMMARY': {
      const existing = state.rooms.get(action.roomId);
      if (!existing) return state;
      const next = new Map(state.rooms);
      next.set(action.roomId, {
        ...existing,
        messages: existing.messages.map((m) =>
          m.id === action.rootEventId
            ? {
                ...m,
                threadSummary: {
                  replyCount:
                    (m.threadSummary?.replyCount ?? 0) + action.incrementBy,
                },
              }
            : m,
        ),
      });
      return { ...state, rooms: next };
    }

    case 'ADD_REACTION': {
      const existing = state.rooms.get(action.roomId);
      if (!existing) return state;
      const next = new Map(state.rooms);
      next.set(action.roomId, {
        ...existing,
        messages: existing.messages.map((m) => {
          if (m.id !== action.targetEventId) return m;
          const reactions = new Map(m.reactions ?? new Map());
          const users = new Set(reactions.get(action.emoji) ?? new Set());
          users.add(action.userId);
          reactions.set(action.emoji, users);
          return { ...m, reactions };
        }),
      });
      return { ...state, rooms: next };
    }

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface MatrixClientProviderProps {
  config: ChatConfig;
  children: React.ReactNode;
}

export function MatrixClientProvider({
  config,
  children,
}: MatrixClientProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    status: 'idle',
    error: null,
    session: null,
    rooms: new Map(),
    displayNames: new Map(),
    avatarUrls: new Map(),
    activeRoomId: config.rooms[0]?.id ?? null,
    sentTxnIds: new Set(),
    resolvedRoomIds: new Map(),
    openThread: null,
  });

  const syncLoopRef = React.useRef<SyncLoop | null>(null);
  const configRef = React.useRef(config);
  configRef.current = config;
  const sessionRef = React.useRef(state.session);
  sessionRef.current = state.session;
  const avatarBlobCacheRef = React.useRef<Set<string>>(new Set());

  // ---- Process a sync response ----
  const processSyncResponse = React.useCallback(
    (response: SyncResponse, userId: string) => {
      const joined = response.rooms?.join;
      if (!joined) return;

      for (const [roomId, roomData] of Object.entries(joined)) {
        // State events (member display names)
        if (roomData.state?.events) {
          const members = roomData.state.events
            .filter(
              (e) =>
                e.type === 'm.room.member' &&
                (e.content as Record<string, unknown>).displayname,
            )
            .map((e) => {
              const content = e.content as Record<string, unknown>;
              const rawAvatar = content.avatar_url as string | undefined;
              return {
                userId: e.state_key!,
                displayName: content.displayname as string,
                avatarUrl: rawAvatar
                  ? mxcToHttp(rawAvatar, config.homeserverUrl)
                  : undefined,
              };
            });
          if (members.length > 0) {
            dispatch({ type: 'SYNC_MEMBERS', members });

            // Fetch avatar blobs asynchronously for members with mxc:// URLs
            for (const member of members) {
              if (
                member.avatarUrl &&
                !avatarBlobCacheRef.current.has(member.userId)
              ) {
                avatarBlobCacheRef.current.add(member.userId);
                fetchAvatarBlob(member.avatarUrl, sessionRef.current?.accessToken ?? '').then(
                  (blobUrl) => {
                    if (blobUrl) {
                      dispatch({
                        type: 'SYNC_MEMBERS',
                        members: [
                          {
                            userId: member.userId,
                            displayName: member.displayName,
                            avatarUrl: blobUrl,
                          },
                        ],
                      });
                    }
                  },
                );
              }
            }
          }
        }

        // Timeline events
        if (roomData.timeline?.events?.length) {
          dispatch({
            type: 'SYNC_ROOM',
            roomId,
            events: roomData.timeline.events,
            prevBatch: roomData.timeline.prev_batch,
            limited: roomData.timeline.limited,
            userId,
          });
        }

        // Ephemeral events (typing)
        if (roomData.ephemeral?.events) {
          for (const event of roomData.ephemeral.events) {
            if (event.type === 'm.typing') {
              dispatch({
                type: 'SYNC_TYPING',
                roomId,
                userIds: (event.content as { user_ids: string[] }).user_ids,
                selfUserId: userId,
              });
            }
          }
        }
      }
    },
    [],
  );

  const joinAndStartSync = React.useCallback(
    async (session: MatrixSession) => {
      dispatch({ type: 'SET_STATUS', status: 'joining' });

      try {
        // Join all configured rooms in parallel, capturing real room IDs
        const joinResults = await Promise.all(
          configRef.current.rooms.map(async (room) => {
            const result = await joinRoom(session, room.id, room.serverName);
            return { configId: room.id, realId: result.room_id };
          }),
        );

        // Build mapping from config IDs (may be aliases) to real room IDs
        const mapping = new Map<string, string>();
        for (const { configId, realId } of joinResults) {
          mapping.set(configId, realId);
        }
        dispatch({ type: 'SET_RESOLVED_ROOM_IDS', mapping });

        dispatch({ type: 'SET_STATUS', status: 'ready' });

        // Start sync loop
        const loop = new SyncLoop(
          session,
          (response) => processSyncResponse(response, session.userId),
          (err) => {
            if (err instanceof MatrixError && err.httpStatus === 401) {
              clearSession();
              dispatch({
                type: 'SET_STATUS',
                status: 'error',
                error: 'Session expired',
              });
            }
            // Transient errors are handled by the sync loop's backoff
          },
        );
        syncLoopRef.current = loop;
        loop.start();
      } catch (err) {
        dispatch({
          type: 'SET_STATUS',
          status: 'error',
          error:
            err instanceof Error ? err.message : 'Failed to join chat rooms',
        });
      }
    },
    [processSyncResponse],
  );

  // ---- Initialize: restore session or ask for name before registering ----
  const initialize = React.useCallback(async () => {
    // Try to restore an existing session
    const saved = loadSession();
    if (saved) {
      try {
        dispatch({ type: 'SET_STATUS', status: 'registering' });
        // Validate the session with a quick sync
        await apiSync(saved, undefined, 0);
        dispatch({ type: 'SET_SESSION', session: saved });

        if (saved.displayName) {
          // Returning user with a name — go straight to joining
          await joinAndStartSync(saved);
        } else {
          // Session exists but no name (shouldn't normally happen)
          dispatch({ type: 'SET_STATUS', status: 'naming' });
        }
        return;
      } catch {
        // Session invalid — clear and start fresh
        clearSession();
      }
    }

    // New user — ask for name BEFORE registering.
    // This way they join the room with their name already set,
    // so other users don't see a name-change event.
    dispatch({ type: 'SET_STATUS', status: 'naming' });
  }, [joinAndStartSync]);

  // ---- Lifecycle ----
  React.useEffect(() => {
    initialize().catch(() => {});
    return () => {
      syncLoopRef.current?.stop();
    };
  }, [initialize]);

  // ---- Room ID resolution ----
  const resolveRoomId = React.useCallback(
    (configId: string): string => {
      return state.resolvedRoomIds.get(configId) ?? configId;
    },
    [state.resolvedRoomIds],
  );

  // ---- Register + join (called after name is chosen or skipped) ----
  const registerAndJoin = React.useCallback(
    async (displayName?: string) => {
      dispatch({ type: 'SET_STATUS', status: 'registering' });
      try {
        const result = await registerGuest(config.registrationProxyUrl);
        const newSession: MatrixSession = {
          accessToken: result.access_token,
          userId: result.user_id,
          deviceId: result.device_id,
          homeserverUrl: config.homeserverUrl,
          displayName,
        };

        // Set display name before joining so the room sees the name immediately
        if (displayName) {
          await apiSetDisplayName(newSession, displayName);
        }

        saveSession(newSession);
        dispatch({ type: 'SET_SESSION', session: newSession });
        if (displayName) {
          dispatch({
            type: 'UPDATE_DISPLAY_NAME',
            userId: newSession.userId,
            displayName,
          });
        }

        await joinAndStartSync(newSession);
      } catch (err) {
        dispatch({
          type: 'SET_STATUS',
          status: 'error',
          error:
            err instanceof Error ? err.message : 'Failed to connect to chat',
        });
      }
    },
    [config.homeserverUrl, config.registrationProxyUrl, joinAndStartSync],
  );

  // ---- Actions ----
  const submitDisplayName = React.useCallback(
    async (name: string) => {
      if (state.status === 'naming' && !state.session) {
        // New user — register with this name, then join
        await registerAndJoin(name);
      } else if (state.session) {
        // Existing user — just update the display name
        await apiSetDisplayName(state.session, name);

        const updatedSession: MatrixSession = {
          ...state.session,
          displayName: name,
        };
        saveSession(updatedSession);
        dispatch({ type: 'SET_SESSION', session: updatedSession });
        dispatch({
          type: 'UPDATE_DISPLAY_NAME',
          userId: state.session.userId,
          displayName: name,
        });
      }
    },
    [state.session, state.status, registerAndJoin],
  );

  /** Skip the name prompt — register with the auto-generated name. */
  const skipDisplayName = React.useCallback(async () => {
    if (state.status === 'naming' && !state.session) {
      await registerAndJoin();
    }
  }, [state.session, state.status, registerAndJoin]);

  const sendMessage = React.useCallback(
    async (configRoomId: string, body: string) => {
      if (!state.session) return;
      const trimmed = body.trim();
      if (!trimmed) return;

      const roomId = resolveRoomId(configRoomId);
      const tempId = `pending_${Date.now()}`;
      const optimistic: ChatMessage = {
        id: tempId,
        sender: state.session.userId,
        displayName:
          state.displayNames.get(state.session.userId) ??
          state.session.displayName ??
          state.session.userId,
        body: trimmed,
        timestamp: Date.now(),
        isMine: true,
        isPending: true,
      };
      dispatch({
        type: 'OPTIMISTIC_SEND',
        roomId,
        message: optimistic,
        txnId: tempId,
      });

      try {
        const result = await apiSendMessage(state.session, roomId, trimmed);
        dispatch({
          type: 'CONFIRM_SEND',
          txnId: tempId,
          eventId: result.event_id,
          roomId,
        });
      } catch {
        // Mark as failed — leave in list but could add error state later
      }
    },
    [state.session, state.displayNames, resolveRoomId],
  );

  const sendReply = React.useCallback(
    async (configRoomId: string, body: string, inReplyToEventId: string) => {
      if (!state.session) return;
      const trimmed = body.trim();
      if (!trimmed) return;

      const roomId = resolveRoomId(configRoomId);
      const tempId = `pending_${Date.now()}`;
      const optimistic: ChatMessage = {
        id: tempId,
        sender: state.session.userId,
        displayName:
          state.displayNames.get(state.session.userId) ??
          state.session.displayName ??
          state.session.userId,
        body: trimmed,
        timestamp: Date.now(),
        isMine: true,
        isPending: true,
      };
      dispatch({
        type: 'OPTIMISTIC_SEND',
        roomId,
        message: optimistic,
        txnId: tempId,
      });

      try {
        const result = await apiSendReply(
          state.session,
          roomId,
          trimmed,
          inReplyToEventId,
        );
        dispatch({
          type: 'CONFIRM_SEND',
          txnId: tempId,
          eventId: result.event_id,
          roomId,
        });
      } catch {
        // Leave as pending
      }
    },
    [state.session, state.displayNames, resolveRoomId],
  );

  const sendThreadReply = React.useCallback(
    async (configRoomId: string, body: string, threadRootEventId: string) => {
      if (!state.session) return;
      const trimmed = body.trim();
      if (!trimmed) return;

      const roomId = resolveRoomId(configRoomId);
      const room = state.rooms.get(roomId);
      const thread = room?.threads.get(threadRootEventId);

      // Find the latest event in the thread for the fallback in_reply_to
      const latestEventId =
        thread?.messages.at(-1)?.id ?? threadRootEventId;

      const tempId = `pending_thread_${Date.now()}`;
      const optimistic: ChatMessage = {
        id: tempId,
        sender: state.session.userId,
        displayName:
          state.displayNames.get(state.session.userId) ??
          state.session.displayName ??
          state.session.userId,
        body: trimmed,
        timestamp: Date.now(),
        isMine: true,
        isPending: true,
        threadRootId: threadRootEventId,
      };
      dispatch({
        type: 'APPEND_THREAD_MESSAGE',
        roomId,
        rootEventId: threadRootEventId,
        message: optimistic,
      });

      try {
        const result = await apiSendThreadReply(
          state.session,
          roomId,
          trimmed,
          threadRootEventId,
          latestEventId,
        );
        // Update the temp message with the real event ID
        dispatch({
          type: 'UPDATE_THREAD_SUMMARY',
          roomId,
          rootEventId: threadRootEventId,
          incrementBy: 0, // The sync will handle the count
        });
        // We don't have a CONFIRM for thread messages; the sync will bring the real event
      } catch {
        // Leave as pending
      }
    },
    [state.session, state.displayNames, state.rooms, resolveRoomId],
  );

  const openThreadPanel = React.useCallback(
    async (configRoomId: string, rootEventId: string) => {
      if (!state.session) return;
      const roomId = resolveRoomId(configRoomId);
      const room = state.rooms.get(roomId);

      // Find the root message — it should be in the main timeline
      let rootMessage = room?.messages.find((m) => m.id === rootEventId);
      if (!rootMessage) {
        // Fetch it from the server
        try {
          const event = await apiGetEvent(state.session, roomId, rootEventId);
          rootMessage = eventToMessage(event, state.session.userId, state.displayNames, state.avatarUrls) ?? undefined;
        } catch {
          // Can't open thread without root
          return;
        }
      }
      if (!rootMessage) return;

      // Fetch thread messages
      try {
        const result = await apiGetThreadMessages(
          state.session,
          roomId,
          rootEventId,
        );
        const messages: ChatMessage[] = [];
        for (const event of result.chunk) {
          const msg = eventToMessage(event, state.session.userId, state.displayNames, state.avatarUrls);
          if (msg) messages.push(msg);
        }
        dispatch({
          type: 'OPEN_THREAD',
          roomId,
          rootEventId,
          rootMessage,
          messages,
          nextBatch: result.next_batch,
        });
      } catch {
        // Open with empty thread
        dispatch({
          type: 'OPEN_THREAD',
          roomId,
          rootEventId,
          rootMessage,
          messages: [],
        });
      }
    },
    [state.session, state.rooms, state.displayNames, resolveRoomId],
  );

  const closeThread = React.useCallback(() => {
    dispatch({ type: 'CLOSE_THREAD' });
  }, []);

  const toggleReaction = React.useCallback(
    (configRoomId: string, eventId: string, emoji: string) => {
      if (!state.session) return;
      const roomId = resolveRoomId(configRoomId);

      // Optimistic update
      dispatch({
        type: 'ADD_REACTION',
        roomId,
        targetEventId: eventId,
        emoji,
        userId: state.session.userId,
      });

      // Send to server
      apiSendReaction(state.session, roomId, eventId, emoji).catch(() => {
        // Could remove the optimistic reaction on failure, but keep it simple
      });
    },
    [state.session, resolveRoomId],
  );

  const typingTimeouts = React.useRef<Map<string, NodeJS.Timeout>>(new Map());

  const sendTyping = React.useCallback(
    (configRoomId: string, typing: boolean) => {
      if (!state.session) return;
      const roomId = resolveRoomId(configRoomId);

      const existing = typingTimeouts.current.get(roomId);
      if (typing) {
        if (existing) return; // Already sent typing, debounce
        apiSendTyping(state.session, roomId, true).catch(() => {});
        const timeout = setTimeout(() => {
          typingTimeouts.current.delete(roomId);
        }, 4000);
        typingTimeouts.current.set(roomId, timeout);
      } else {
        if (existing) {
          clearTimeout(existing);
          typingTimeouts.current.delete(roomId);
        }
        apiSendTyping(state.session, roomId, false).catch(() => {});
      }
    },
    [state.session, resolveRoomId],
  );

  const loadMoreHistory = React.useCallback(
    async (configRoomId: string) => {
      if (!state.session) return;
      const roomId = resolveRoomId(configRoomId);
      const room = state.rooms.get(roomId);
      if (!room || room.isLoadingHistory || !room.hasMoreHistory) return;
      if (!room.prevBatch) return;

      dispatch({ type: 'SET_LOADING_HISTORY', roomId, loading: true });

      try {
        const { getMessages } = await import('@/lib/matrix/api');
        const result = await getMessages(
          state.session,
          roomId,
          room.prevBatch,
          50,
        );
        dispatch({
          type: 'PREPEND_HISTORY',
          roomId,
          events: result.chunk,
          end: result.end ?? null,
          userId: state.session.userId,
        });
      } catch {
        dispatch({ type: 'SET_LOADING_HISTORY', roomId, loading: false });
      }
    },
    [state.session, state.rooms],
  );

  const setActiveRoomId = React.useCallback((roomId: string) => {
    dispatch({ type: 'SET_ACTIVE_ROOM', roomId });
    dispatch({ type: 'CLEAR_UNREAD', roomId });
  }, []);

  const retry = React.useCallback(() => {
    clearSession();
    syncLoopRef.current?.stop();
    initialize().catch(() => {});
  }, [initialize]);

  const value = React.useMemo<MatrixClientContextValue>(
    () => ({
      session: state.session,
      status: state.status,
      error: state.error,
      rooms: state.rooms,
      displayNames: state.displayNames,
      avatarUrls: state.avatarUrls,
      activeRoomId: state.activeRoomId,
      openThread: state.openThread,
      resolveRoomId,
      setActiveRoomId,
      submitDisplayName,
      skipDisplayName,
      sendMessage,
      sendReply,
      sendThreadReply,
      openThreadPanel,
      closeThread,
      toggleReaction,
      sendTyping,
      loadMoreHistory,
      retry,
    }),
    [
      state.session,
      state.status,
      state.error,
      state.rooms,
      state.displayNames,
      state.avatarUrls,
      state.activeRoomId,
      state.openThread,
      resolveRoomId,
      setActiveRoomId,
      submitDisplayName,
      skipDisplayName,
      sendMessage,
      sendReply,
      sendThreadReply,
      openThreadPanel,
      closeThread,
      toggleReaction,
      sendTyping,
      loadMoreHistory,
      retry,
    ],
  );

  return (
    <MatrixClientContext.Provider value={value}>
      {children}
    </MatrixClientContext.Provider>
  );
}
