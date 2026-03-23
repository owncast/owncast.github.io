'use client';

/**
 * Standalone MessageList — used by ThreadPanel when rendered inside a Dialog.
 * The main chat uses chatscope's MessageList directly in RoomTabContent.
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { translate } from '@docusaurus/Translate';
import { Loader2 } from 'lucide-react';
import { ChatMessageList, ChatDivider } from '@/components/shared/ui/chat';
import { Message } from './Message';
import type { ChatMessage } from '@/lib/matrix/types';

interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: ChatMessage[];
  isLoadingHistory: boolean;
  hasMoreHistory: boolean;
  onLoadMore: () => void;
  onReplyToMessage?: (message: ChatMessage) => void;
  onOpenThread?: (rootEventId: string) => void;
}

function isNewGroup(prev: ChatMessage | undefined, curr: ChatMessage): boolean {
  if (!prev) return true;
  if (prev.sender !== curr.sender) return true;
  if (curr.timestamp - prev.timestamp > 5 * 60 * 1000) return true;
  return false;
}

const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  (
    {
      className,
      messages,
      isLoadingHistory,
      hasMoreHistory,
      onLoadMore,
      onReplyToMessage,
      onOpenThread,
      ...props
    },
    ref,
  ) => {
    return (
      <ChatMessageList ref={ref} className={cn('py-2', className)} {...props}>
        {isLoadingHistory && (
          <div className="flex justify-center py-3">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}

        {messages.length === 0 && !isLoadingHistory && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">{translate({ id: 'chat.messages.empty', message: 'No messages yet' })}</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <Message
            key={msg.id}
            message={msg}
            showHeader={isNewGroup(messages[i - 1], msg)}
            onReply={onReplyToMessage}
            onOpenThread={onOpenThread}
          />
        ))}
      </ChatMessageList>
    );
  },
);
MessageList.displayName = 'MessageList';

export { MessageList };
