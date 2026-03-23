'use client';

import * as React from 'react';
import { ChatComposer, ChatReplyQuote } from '@/components/shared/ui/chat';
import type { ReplyContext } from '@/lib/matrix/types';

interface MessageInputProps extends React.HTMLAttributes<HTMLFormElement> {
  onSendMessage: (body: string) => void;
  onTyping: (typing: boolean) => void;
  disabled?: boolean;
  replyContext?: ReplyContext | null;
  onCancelReply?: () => void;
  placeholder?: string;
}

const MessageInput = React.forwardRef<HTMLFormElement, MessageInputProps>(
  (
    {
      className,
      onSendMessage,
      onTyping,
      disabled,
      replyContext,
      onCancelReply,
      placeholder,
      ...props
    },
    ref,
  ) => {
    // Typing indicator debounce
    const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSend = React.useCallback(
      (body: string) => {
        onSendMessage(body);
        onTyping(false);
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
      },
      [onSendMessage, onTyping],
    );

    const replyHeader = replyContext ? (
      <div className="px-4 pt-2">
        <ChatReplyQuote
          sender={replyContext.displayName}
          body={replyContext.body}
          onDismiss={onCancelReply}
        />
      </div>
    ) : null;

    return (
      <ChatComposer
        ref={ref}
        className={className}
        onSendMessage={handleSend}
        placeholder={placeholder ?? (disabled ? 'Connecting...' : 'Type a message...')}
        disabled={disabled}
        header={replyHeader}
        {...props}
      />
    );
  },
);
MessageInput.displayName = 'MessageInput';

export { MessageInput };
