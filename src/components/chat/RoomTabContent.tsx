'use client';

import * as React from 'react';
import {
  MainContainer,
  ChatContainer as CSChatContainer,
  MessageList as CSMessageList,
  Message as CSMessage,
  MessageGroup as CSMessageGroup,
  MessageSeparator,
  MessageInput as CSMessageInput,
  ConversationHeader,
  Avatar,
  TypingIndicator,
  Sidebar,
} from '@chatscope/chat-ui-kit-react';
import { translate } from '@docusaurus/Translate';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/ui/button';
import { useRoom } from '@/hooks/useRoom';
import { useMatrixClient } from '@/hooks/useMatrixClient';
import type { ChatMessage, ReplyContext } from '@/lib/matrix/types';
import { REACTION_EMOJIS } from '@/lib/matrix/types';

/** Existing reaction pills for a message. Only renders if there are reactions. */
function ReactionPills({
  message,
  onToggle,
  currentUserId,
}: {
  message: ChatMessage;
  onToggle: (eventId: string, emoji: string) => void;
  currentUserId?: string;
}) {
  if (!message.reactions || message.reactions.size === 0) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
      {Array.from(message.reactions.entries()).map(([emoji, users]) => {
        const isMine = currentUserId ? users.has(currentUserId) : false;
        return (
          <button
            key={emoji}
            type="button"
            onClick={() => onToggle(message.id, emoji)}
            aria-label={`${emoji} ${users.size} reaction${users.size !== 1 ? 's' : ''}${isMine ? ', you reacted' : ''}`}
            aria-pressed={isMine}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              borderRadius: 12,
              border: isMine ? '1px solid #7a5cf3' : '1px solid #262e3a',
              backgroundColor: isMine ? 'rgba(122, 92, 243, 0.15)' : 'rgba(255,255,255,0.05)',
              color: '#e2e8f0',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              lineHeight: 1.4,
            }}
          >
            <span aria-hidden="true">{emoji}</span>
            <span style={{ fontSize: '0.6875rem', color: '#9ca8ba' }}>{users.size}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Emoji picker popover — triggered from the hover action bar. */
function EmojiPicker({
  messageId,
  onToggle,
}: {
  messageId: string;
  onToggle: (eventId: string, emoji: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Add reaction"
        aria-expanded={open}
        aria-haspopup="true"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem',
          padding: '4px 6px',
          color: '#9ca8ba',
          lineHeight: 1,
        }}
      >
        <span aria-hidden="true">😀</span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Reaction emojis"
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: 4,
            display: 'flex',
            gap: 2,
            padding: '4px 6px',
            borderRadius: 8,
            backgroundColor: '#2D3748',
            border: '1px solid #262e3a',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 10,
          }}
        >
          {REACTION_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              role="menuitem"
              aria-label={`React with ${emoji}`}
              onClick={() => {
                onToggle(messageId, emoji);
                setOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.125rem',
                padding: '2px 4px',
                borderRadius: 4,
                lineHeight: 1,
              }}
              onMouseOver={(e) => { (e.target as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
              onMouseOut={(e) => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              <span aria-hidden="true">{emoji}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Render a Matrix message body — uses formatted HTML if available, otherwise markdown. */
/** Shared markdown component overrides — uses <span> with display:block
 * instead of semantic HTML elements to avoid Docusaurus Infima CSS rules. */
const markdownComponents = {
  p: ({ node, ...props }: any) => <span style={{ display: 'block', margin: '0.15em 0', padding: 0 }} {...props} />,
  h1: ({ node, ...props }: any) => <span style={{ display: 'block', margin: '0.4em 0 0.1em', fontWeight: 700, fontSize: '1.1em' }} {...props} />,
  h2: ({ node, ...props }: any) => <span style={{ display: 'block', margin: '0.4em 0 0.1em', fontWeight: 700, fontSize: '1.05em' }} {...props} />,
  h3: ({ node, ...props }: any) => <span style={{ display: 'block', margin: '0.4em 0 0.1em', fontWeight: 600, fontSize: '1em' }} {...props} />,
  h4: ({ node, ...props }: any) => <span style={{ display: 'block', margin: '0.3em 0 0.1em', fontWeight: 600, fontSize: '0.95em' }} {...props} />,
  ul: ({ node, ordered, ...props }: any) => <ul style={{ display: 'block', margin: '0.15em 0', padding: '0 0 0 1.5em', fontSize: 0, lineHeight: 0, listStyleType: 'disc', listStylePosition: 'outside' }} {...props} />,
  ol: ({ node, ordered, ...props }: any) => <ol style={{ display: 'block', margin: '0.15em 0', padding: '0 0 0 1.5em', fontSize: 0, lineHeight: 0, listStyleType: 'decimal', listStylePosition: 'outside' }} {...props} />,
  li: ({ node, ordered, children, ...props }: any) => {
    const unwrapped = React.Children.map(children, (child: any) => {
      if (child?.props?.style?.display === 'block' && child?.type === 'span') {
        return child.props.children;
      }
      return child;
    });
    return <li style={{ display: 'list-item', margin: 0, padding: '0.25em 0', fontSize: '0.875rem', lineHeight: '1.5' }} {...props}>{unwrapped}</li>;
  },
  blockquote: ({ node, ...props }: any) => <span style={{ display: 'block', margin: '0.2em 0', padding: '0.1em 0 0.1em 0.75em', borderLeft: '3px solid #262e3a' }} {...props} />,
  a: ({ node, ...props }: any) => <a style={{ color: '#7db4f4' }} target="_blank" rel="noopener noreferrer" {...props} />,
  code: ({ inline, className, children, ...props }: any) => {
    if (!inline) {
      return <code style={{ display: 'block', background: '#12161d', padding: '0.5em 0.75em', borderRadius: 6, fontSize: '0.85em', overflowX: 'auto' as const }} {...props}>{children}</code>;
    }
    return <code style={{ background: '#2D3748', padding: '0.15rem 0.35rem', borderRadius: 6, fontSize: '0.85em' }} {...props}>{children}</code>;
  },
  pre: ({ node, ...props }: any) => <span style={{ display: 'block', margin: '0.2em 0' }} {...props} />,
};

function MessageContent({ message }: { message: ChatMessage }) {
  if (message.formattedBody) {
    return <div dangerouslySetInnerHTML={{ __html: message.formattedBody }} />;
  }
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {message.body}
    </ReactMarkdown>
  );
}

interface RoomTabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  roomId: string;
  disabled?: boolean;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function isDifferentDay(a: ChatMessage | undefined, b: ChatMessage): boolean {
  if (!a) return true;
  return new Date(a.timestamp).toDateString() !== new Date(b.timestamp).toDateString();
}

function isNewGroup(prev: ChatMessage | undefined, curr: ChatMessage): boolean {
  if (!prev) return true;
  if (prev.sender !== curr.sender) return true;
  if (curr.timestamp - prev.timestamp > 5 * 60 * 1000) return true;
  return false;
}

function renderAvatar(name: string, avatarUrl?: string) {
  if (avatarUrl) {
    return <Avatar name={name} src={avatarUrl} />;
  }
  return (
    <Avatar name={name}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--accent))',
          color: 'hsl(var(--accent-foreground))',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </Avatar>
  );
}

/** Build grouped message structure for chatscope rendering. */
function buildGroups(
  messages: ChatMessage[],
  avatarUrls: Map<string, string>,
  onOpenThread?: (rootEventId: string) => void,
  onToggleReaction?: (eventId: string, emoji: string) => void,
  currentUserId?: string,
) {
  const elements: React.ReactNode[] = [];
  let currentGroup: ChatMessage[] = [];
  let groupSender = '';

  function flushGroup() {
    if (currentGroup.length === 0) return;
    const first = currentGroup[0];
    const direction = 'incoming';

    // Get the last message in the group for the hover toolbar target
    const lastMsg = currentGroup[currentGroup.length - 1];

    elements.push(
      <div key={`group-${first.id}`} className="msg-group-hover" style={{ position: 'relative' }}>
        <CSMessageGroup
          direction={direction as 'incoming' | 'outgoing'}
          sender={first.displayName}
          sentTime={formatTime(first.timestamp)}
        >
          {renderAvatar(first.displayName, avatarUrls.get(first.sender))}
          <CSMessageGroup.Header>
            {first.displayName} &middot; {formatTime(first.timestamp)}
          </CSMessageGroup.Header>
          <CSMessageGroup.Messages>
            {currentGroup.map((msg, i) => (
              <CSMessage
                key={msg.id}
                model={{
                  direction: direction as 'incoming' | 'outgoing',
                  position: currentGroup.length === 1
                    ? 'single'
                    : i === 0
                      ? 'first'
                      : i === currentGroup.length - 1
                        ? 'last'
                        : 'normal',
                }}
              >
                <CSMessage.CustomContent>
                  <MessageContent message={msg} />
                </CSMessage.CustomContent>
                {msg.replyTo?.body && (
                  <CSMessage.Header>
                    ↩ {msg.replyTo.displayName}: {msg.replyTo.body.slice(0, 60)}
                    {msg.replyTo.body.length > 60 ? '...' : ''}
                  </CSMessage.Header>
                )}
                {(msg.threadSummary?.replyCount ?? 0) > 0 || (msg.reactions && msg.reactions.size > 0) ? (
                  <CSMessage.Footer>
                    {msg.threadSummary && msg.threadSummary.replyCount > 0 && (
                      <button
                        type="button"
                        onClick={() => onOpenThread?.(msg.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#7db4f4',
                          cursor: 'pointer',
                          padding: 0,
                          fontSize: 'inherit',
                          marginBottom: 2,
                        }}
                      >
                        🧵 {translate({ id: 'chat.thread.viewThread', message: 'View thread' })} ({msg.threadSummary.replyCount})
                      </button>
                    )}
                    {onToggleReaction && (
                      <ReactionPills
                        message={msg}
                        onToggle={onToggleReaction}
                        currentUserId={currentUserId}
                      />
                    )}
                  </CSMessage.Footer>
                ) : null}
              </CSMessage>
            ))}
          </CSMessageGroup.Messages>
        </CSMessageGroup>

        {/* Action toolbar — outside chatscope DOM, positioned at right edge of row */}
        {onToggleReaction && (
          <div className="msg-action-toolbar">
            <EmojiPicker messageId={lastMsg.id} onToggle={onToggleReaction} />
          </div>
        )}
      </div>,
    );

    currentGroup = [];
  }

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const prev = messages[i - 1];

    // Date separator
    if (isDifferentDay(prev, msg)) {
      flushGroup();
      elements.push(
        <MessageSeparator key={`sep-${msg.id}`} content={formatDate(msg.timestamp)} />,
      );
    }

    // New group?
    if (isNewGroup(prev, msg)) {
      flushGroup();
      groupSender = msg.sender;
    }

    currentGroup.push(msg);
  }
  flushGroup();

  return elements;
}

const RoomTabContent = React.forwardRef<HTMLDivElement, RoomTabContentProps>(
  ({ className, roomId, disabled, ...props }, ref) => {
    const {
      messages,
      typingDisplay,
      isLoadingHistory,
      hasMoreHistory,
      activeThread,
      isThreadOpen,
      sendMessage,
      sendReply,
      sendThreadReply,
      openThread,
      closeThread,
      toggleReaction,
      sendTyping,
      loadMoreHistory,
    } = useRoom(roomId);

    const { avatarUrls, session } = useMatrixClient();

    const [replyContext, setReplyContext] = React.useState<ReplyContext | null>(null);

    const handleSend = React.useCallback(
      (_innerHTML: string, textContent: string) => {
        const text = textContent.trim();
        if (!text) return;

        if (replyContext) {
          sendReply(text, replyContext.eventId);
          setReplyContext(null);
        } else {
          sendMessage(text);
        }
      },
      [replyContext, sendReply, sendMessage],
    );

    const handleThreadSend = React.useCallback(
      (_innerHTML: string, textContent: string) => {
        const text = textContent.trim();
        if (!text || !activeThread) return;
        sendThreadReply(text, activeThread.rootMessage.id);
      },
      [activeThread, sendThreadReply],
    );

    const messageElements = React.useMemo(
      () => buildGroups(messages, avatarUrls, openThread, toggleReaction, session?.userId),
      [messages, avatarUrls, openThread, toggleReaction, session?.userId],
    );

    return (
      <div ref={ref} className={cn('relative flex-1 overflow-hidden', className)} style={{ height: '100%' }} role="log" aria-label="Chat messages" aria-live="polite" {...props}>
        <MainContainer>
          <CSChatContainer>
            <CSMessageList
              typingIndicator={
                typingDisplay ? <TypingIndicator content={typingDisplay} /> : undefined
              }
              loadingMore={isLoadingHistory}
              onYReachStart={hasMoreHistory ? loadMoreHistory : undefined}
              autoScrollToBottom
              autoScrollToBottomOnMount
            >
              {messages.length === 0 && !isLoadingHistory && (
                <MessageSeparator content={translate({ id: 'chat.community.welcome', message: "You're now in the Owncast support chat. Say hello!" })} />
              )}
              {messageElements}
            </CSMessageList>

            <CSMessageInput
              placeholder={disabled ? translate({ id: 'chat.input.connecting', message: 'Connecting...' }) : translate({ id: 'chat.input.placeholder', message: 'Type a message...' })}
              disabled={disabled}
              onSend={handleSend}
              attachButton={false}
            />
          </CSChatContainer>

          {/* Thread sidebar */}
          {isThreadOpen && activeThread && (
            <Sidebar position="right">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', backgroundColor: '#2D3748', borderBottom: '1px solid #262e3a' }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    🧵 {activeThread.rootMessage.body.slice(0, 40)}{activeThread.rootMessage.body.length > 40 ? '...' : ''}
                  </div>
                  <div style={{ color: '#9ca8ba', fontSize: '0.75rem' }}>
                    {translate({ id: 'chat.thread.by', message: 'Thread by' })} {activeThread.rootMessage.displayName}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeThread} className="h-7 w-7" style={{ color: '#e2e8f0' }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <CSMessageList autoScrollToBottom autoScrollToBottomOnMount>
                {/* Root message */}
                <CSMessage
                  model={{
                    direction: 'incoming' as const,
                    position: 'single',
                  }}
                  avatarPosition="cl"
                >
                  {renderAvatar(activeThread.rootMessage.displayName, avatarUrls.get(activeThread.rootMessage.sender))}
                  <CSMessage.Header
                    sender={activeThread.rootMessage.displayName}
                    sentTime={formatTime(activeThread.rootMessage.timestamp)}
                  />
                  <CSMessage.CustomContent>
                    <MessageContent message={activeThread.rootMessage} />
                  </CSMessage.CustomContent>
                </CSMessage>

                {activeThread.messages.length > 0 && (
                  <MessageSeparator content={`${activeThread.messages.length} ${activeThread.messages.length === 1 ? translate({ id: 'chat.thread.replySingular', message: 'reply' }) : translate({ id: 'chat.thread.replyPlural', message: 'replies' })}`} />
                )}

                {buildGroups(activeThread.messages, avatarUrls, undefined, toggleReaction, session?.userId)}
              </CSMessageList>

              <CSMessageInput
                placeholder={translate({ id: 'chat.thread.replyPlaceholder', message: 'Reply in thread...' })}
                onSend={handleThreadSend}
                attachButton={false}
              />
            </Sidebar>
          )}
        </MainContainer>
      </div>
    );
  },
);
RoomTabContent.displayName = 'RoomTabContent';

export { RoomTabContent };
