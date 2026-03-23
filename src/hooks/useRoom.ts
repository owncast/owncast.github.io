'use client';

import { useMemo } from 'react';
import { useMatrixClient, type RoomState } from './useMatrixClient';
import type { ThreadState } from '@/lib/matrix/types';

const EMPTY_ROOM: RoomState = {
  messages: [],
  threads: new Map(),
  typingUsers: [],
  prevBatch: null,
  isLoadingHistory: false,
  hasMoreHistory: true,
  unreadCount: 0,
};

export function useRoom(roomId: string) {
  const {
    rooms,
    displayNames,
    resolveRoomId,
    openThread,
    sendMessage,
    sendReply,
    sendThreadReply,
    toggleReaction,
    openThreadPanel,
    closeThread,
    sendTyping,
    loadMoreHistory,
  } = useMatrixClient();

  const realRoomId = resolveRoomId(roomId);
  const room = rooms.get(realRoomId) ?? EMPTY_ROOM;

  // Get the currently open thread for this room
  const activeThread: ThreadState | null = useMemo(() => {
    if (!openThread || openThread.roomId !== realRoomId) return null;
    return room.threads.get(openThread.rootEventId) ?? null;
  }, [openThread, realRoomId, room.threads]);

  const typingDisplay = useMemo(() => {
    if (room.typingUsers.length === 0) return null;
    const names = room.typingUsers.map(
      (id) => displayNames.get(id) ?? id.replace(/:.*$/, '').slice(1),
    );
    if (names.length === 1) return `${names[0]} is typing`;
    if (names.length === 2) return `${names[0]} and ${names[1]} are typing`;
    return `${names.length} people are typing`;
  }, [room.typingUsers, displayNames]);

  return {
    messages: room.messages,
    typingUsers: room.typingUsers,
    typingDisplay,
    prevBatch: room.prevBatch,
    isLoadingHistory: room.isLoadingHistory,
    hasMoreHistory: room.hasMoreHistory,
    unreadCount: room.unreadCount,
    activeThread,
    isThreadOpen: activeThread !== null,
    sendMessage: (body: string) => sendMessage(roomId, body),
    sendReply: (body: string, inReplyToEventId: string) =>
      sendReply(roomId, body, inReplyToEventId),
    sendThreadReply: (body: string, threadRootEventId: string) =>
      sendThreadReply(roomId, body, threadRootEventId),
    toggleReaction: (eventId: string, emoji: string) =>
      toggleReaction(roomId, eventId, emoji),
    openThread: (rootEventId: string) => openThreadPanel(roomId, rootEventId),
    closeThread,
    sendTyping: (typing: boolean) => sendTyping(roomId, typing),
    loadMoreHistory: () => loadMoreHistory(roomId),
  };
}
