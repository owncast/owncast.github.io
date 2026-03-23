'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/shared/ui/dialog';
import { ChatMessageGroup, ChatMessageRow, ChatComposer } from '@/components/shared/ui/chat';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import type { ThreadState } from '@/lib/matrix/types';

interface ThreadPanelProps {
  open: boolean;
  thread: ThreadState;
  onClose: () => void;
  onSendThreadReply: (body: string) => void;
  onTyping: (typing: boolean) => void;
  disabled?: boolean;
}

function ThreadPanel({
  open,
  thread,
  onClose,
  onSendThreadReply,
  onTyping,
  disabled,
}: ThreadPanelProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        hideCloseButton={false}
        className="flex h-[70vh] max-h-[500px] flex-col gap-0 overflow-hidden p-0"
      >
        <DialogHeader className="shrink-0 border-b border-border bg-card/50 px-4 py-3">
          <DialogTitle className="truncate text-sm">
            {thread.rootMessage.body}
          </DialogTitle>
          <DialogDescription>
            Thread by {thread.rootMessage.displayName}
          </DialogDescription>
        </DialogHeader>

        <MessageList
          messages={thread.messages}
          isLoadingHistory={thread.isLoading}
          hasMoreHistory={thread.hasMore}
          onLoadMore={() => {}}
          className="flex-1"
        />

        <MessageInput
          onSendMessage={onSendThreadReply}
          onTyping={onTyping}
          disabled={disabled}
          placeholder="Reply in thread..."
        />
      </DialogContent>
    </Dialog>
  );
}
ThreadPanel.displayName = 'ThreadPanel';

export { ThreadPanel };
