'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Reply, MessageSquare } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import {
  ChatMessageGroup,
  ChatMessage as ChatMessageRow,
  ChatReplyBar,
  ChatReplyQuote,
} from '@/components/shared/ui/chat';
import type { ChatMessage } from '@/lib/matrix/types';

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: ChatMessage;
  showHeader?: boolean;
  onReply?: (message: ChatMessage) => void;
  onOpenThread?: (rootEventId: string) => void;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

const Message = React.memo(
  React.forwardRef<HTMLDivElement, MessageProps>(
    ({ className, message, showHeader = true, onReply, onOpenThread, ...props }, ref) => {
      const threadCount = message.threadSummary?.replyCount ?? 0;
      const hasActions = (onReply && !message.isPending) || (onOpenThread && threadCount > 0);

      const hoverActions = hasActions ? (
        <>
          {onReply && !message.isPending && (
            <Button variant="ghost" size="icon" onClick={() => onReply(message)} className="h-7 w-7">
              <Reply className="h-3.5 w-3.5" />
              <span className="sr-only">Reply</span>
            </Button>
          )}
          {onOpenThread && threadCount > 0 && (
            <Button variant="ghost" size="icon" onClick={() => onOpenThread(message.id)} className="h-7 w-7">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="sr-only">Open thread</span>
            </Button>
          )}
        </>
      ) : undefined;

      const replyQuote = message.replyTo?.body ? (
        <ChatReplyQuote
          sender={message.replyTo.displayName}
          body={message.replyTo.body}
          className="mb-1"
        />
      ) : null;

      const body = (
        <p className={cn('whitespace-pre-wrap break-words', message.isPending && 'opacity-40')}>
          {message.body}
        </p>
      );

      if (showHeader) {
        return (
          <div ref={ref} className={className} {...props}>
            <ChatMessageGroup sender={message.displayName} timestamp={formatTime(message.timestamp)}>
              {replyQuote}
              <ChatMessageRow actions={hoverActions}>{body}</ChatMessageRow>
            </ChatMessageGroup>
            {threadCount > 0 && onOpenThread && (
              <ChatReplyBar count={threadCount} onClick={() => onOpenThread(message.id)} />
            )}
          </div>
        );
      }

      return (
        <div ref={ref} className={className} {...props}>
          {replyQuote && <div className="pl-[68px] px-4">{replyQuote}</div>}
          <ChatMessageRow continuation actions={hoverActions}>{body}</ChatMessageRow>
          {threadCount > 0 && onOpenThread && (
            <ChatReplyBar count={threadCount} onClick={() => onOpenThread(message.id)} />
          )}
        </div>
      );
    },
  ),
);
Message.displayName = 'Message';

export { Message };
