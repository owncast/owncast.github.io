// Matrix Client-Server API types for the support chat widget.
// Only the subset we actually use — not a full spec implementation.

export interface MatrixSession {
  accessToken: string;
  userId: string;
  deviceId: string;
  homeserverUrl: string;
  displayName?: string;
}

export interface MatrixRelatesTo {
  rel_type?: string;
  event_id?: string;
  is_falling_back?: boolean;
  'm.in_reply_to'?: {
    event_id: string;
  };
}

export interface MatrixEvent {
  event_id: string;
  type: string;
  sender: string;
  origin_server_ts: number;
  content: Record<string, unknown> & {
    'm.relates_to'?: MatrixRelatesTo;
  };
  state_key?: string;
  unsigned?: {
    age?: number;
    transaction_id?: string;
    'm.relations'?: {
      'm.thread'?: {
        count: number;
        latest_event: MatrixEvent;
        current_user_participated: boolean;
      };
    };
  };
}

export interface RoomMessageContent {
  msgtype: 'm.text' | 'm.notice' | 'm.emote';
  body: string;
  format?: string;
  formatted_body?: string;
}

export interface JoinedRoom {
  timeline: {
    events: MatrixEvent[];
    prev_batch: string;
    limited: boolean;
  };
  state: {
    events: MatrixEvent[];
  };
  ephemeral: {
    events: MatrixEvent[];
  };
  unread_notifications?: {
    notification_count?: number;
    highlight_count?: number;
  };
}

export interface SyncResponse {
  next_batch: string;
  rooms?: {
    join?: Record<string, JoinedRoom>;
    invite?: Record<string, unknown>;
    leave?: Record<string, unknown>;
  };
}

export interface MessagesResponse {
  chunk: MatrixEvent[];
  start: string;
  end?: string;
}

export interface RegisterResponse {
  access_token: string;
  user_id: string;
  device_id: string;
}

export interface MatrixErrorResponse {
  errcode: string;
  error: string;
}

/** Our display model — distinct from raw Matrix events. */
export interface ChatMessage {
  id: string;
  sender: string;
  displayName: string;
  body: string;
  formattedBody?: string;
  timestamp: number;
  isMine: boolean;
  isPending?: boolean;
  avatarUrl?: string;

  /** Reactions on this message — emoji key → list of user IDs who reacted. */
  reactions?: Map<string, Set<string>>;

  /** Present on thread root messages — summary of the thread. */
  threadSummary?: {
    replyCount: number;
  };

  /** Present on plain replies — the parent message being replied to. */
  replyTo?: ReplyContext;

  /** Present on thread replies — the root event ID (used for filtering). */
  threadRootId?: string;
}

export interface ReplyContext {
  eventId: string;
  sender: string;
  displayName: string;
  body: string;
}

export interface ThreadState {
  rootMessage: ChatMessage;
  messages: ChatMessage[];
  isLoading: boolean;
  hasMore: boolean;
  nextBatch?: string;
}

export interface RelationsResponse {
  chunk: MatrixEvent[];
  next_batch?: string;
}

export const REACTION_EMOJIS = ['👍', '❤️', '😂', '🎉', '👀', '🚀'] as const;

export type EventClass = 'thread_reply' | 'plain_reply' | 'reaction' | 'regular';

/** Classify a Matrix event for routing in the timeline. */
export function classifyEvent(event: MatrixEvent): EventClass {
  if (event.type === 'm.reaction') return 'reaction';
  const rel = event.content?.['m.relates_to'];
  if (!rel) return 'regular';
  if (rel.rel_type === 'm.thread') return 'thread_reply';
  if (rel['m.in_reply_to']?.event_id) return 'plain_reply';
  return 'regular';
}

export interface RoomConfig {
  id: string;
  serverName?: string;
  label: string;
  /** The Matrix alias (e.g. #owncast.support:matrix.org) shown in the header. */
  alias?: string;
}

export interface ChatConfig {
  homeserverUrl: string;
  registrationProxyUrl: string;
  rooms: RoomConfig[];
}
