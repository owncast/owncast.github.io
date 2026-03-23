'use client';

/**
 * Shared chat UI primitives — Discord-inspired flat layout.
 *
 * Layout per message group:
 *   [40px avatar]  SenderName   10:41 AM
 *                  Message text here that wraps naturally
 *                  across multiple lines
 *
 * Continuation messages (same sender, <5min gap):
 *                  Just the text, no avatar/name repeated
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';

// ---------------------------------------------------------------------------
// ChatContainer
// ---------------------------------------------------------------------------

const chatContainerVariants = cva(
  'flex flex-col overflow-hidden rounded-lg border shadow-sm',
  {
    variants: {
      size: {
        default: 'h-[600px] w-full max-w-2xl',
        compact: 'h-[400px] w-full max-w-md',
        full: 'h-full w-full rounded-none border-0 shadow-none',
      },
    },
    defaultVariants: { size: 'default' },
  },
);

interface ChatContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatContainerVariants> {}

const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(chatContainerVariants({ size }), className)} {...props} />
  ),
);
ChatContainer.displayName = 'ChatContainer';

// ---------------------------------------------------------------------------
// ChatHeader
// ---------------------------------------------------------------------------

const ChatHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex shrink-0 items-center justify-between border-b border-border bg-card/50 px-4 py-2',
        className,
      )}
      {...props}
    />
  ),
);
ChatHeader.displayName = 'ChatHeader';

// ---------------------------------------------------------------------------
// ChatMessageList — scrollable area with auto-scroll
// ---------------------------------------------------------------------------

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const isNearBottomRef = React.useRef(true);
    const prevChildCountRef = React.useRef(0);

    const handleScroll = React.useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      isNearBottomRef.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    }, []);

    const childCount = React.Children.count(children);
    React.useEffect(() => {
      if (childCount > prevChildCountRef.current && isNearBottomRef.current) {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      }
      prevChildCountRef.current = childCount;
    }, [childCount]);

    return (
      <div
        ref={(node) => {
          (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('flex-1 overflow-y-auto', className)}
        onScroll={handleScroll}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ChatMessageList.displayName = 'ChatMessageList';

// ---------------------------------------------------------------------------
// ChatMessageGroup — avatar + name + timestamp, then children
// ---------------------------------------------------------------------------

interface ChatMessageGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  sender: string;
  timestamp?: string;
}

const ChatMessageGroup = React.forwardRef<HTMLDivElement, ChatMessageGroupProps>(
  ({ className, avatar, sender, timestamp, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('group/msg relative mt-[17px] first:mt-2 py-0.5 pr-12 hover:bg-foreground/[0.03]', className)}
      {...props}
    >
      {/* Avatar column */}
      <div className="absolute left-4 top-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20 text-primary-500">
          {avatar ?? (
            <span className="text-sm font-bold select-none">
              {sender.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Content — indented past avatar */}
      <div className="pl-[68px]">
        <div className="flex items-baseline gap-2 leading-none">
          <span className="text-[0.9375rem] font-semibold text-foreground hover:underline cursor-default">
            {sender}
          </span>
          {timestamp && (
            <span className="text-[0.6875rem] text-muted-foreground">{timestamp}</span>
          )}
        </div>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  ),
);
ChatMessageGroup.displayName = 'ChatMessageGroup';

// ---------------------------------------------------------------------------
// ChatMessage — a single message line (inside a group or standalone)
// ---------------------------------------------------------------------------

interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
  /** Continuation message — indent to align with group text, no avatar */
  continuation?: boolean;
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ className, children, actions, continuation, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'group/msg relative py-[1px] hover:bg-foreground/[0.03]',
        continuation && 'pl-[68px] pr-12',
        className,
      )}
      {...props}
    >
      <div className="text-[0.9375rem] leading-[1.375rem] text-foreground/[0.85]">
        {children}
      </div>
      {actions && (
        <div className="absolute -top-2 right-2 flex rounded border border-border bg-card shadow-sm opacity-0 transition-opacity group-hover/msg:opacity-100">
          {actions}
        </div>
      )}
    </div>
  ),
);
ChatMessage.displayName = 'ChatMessage';

// ---------------------------------------------------------------------------
// ChatDivider — date separator
// ---------------------------------------------------------------------------

const ChatDivider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative my-2 flex items-center px-4', className)} {...props}>
      <div className="h-px flex-1 bg-border" />
      <span className="mx-4 text-[0.6875rem] font-semibold uppercase text-muted-foreground">
        {children}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  ),
);
ChatDivider.displayName = 'ChatDivider';

// ---------------------------------------------------------------------------
// ChatReplyBar — "N replies" thread indicator
// ---------------------------------------------------------------------------

interface ChatReplyBarProps extends React.HTMLAttributes<HTMLButtonElement> {
  count: number;
}

const ChatReplyBar = React.forwardRef<HTMLButtonElement, ChatReplyBarProps>(
  ({ className, count, ...props }, ref) => (
    <div className="pl-[68px]">
      <button
        ref={ref}
        type="button"
        className={cn(
          'mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-[0.8125rem] font-medium text-primary-500 hover:bg-primary-500/10 dark:text-primary-300',
          className,
        )}
        {...props}
      >
        <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
        {count} {count === 1 ? 'reply' : 'replies'}
      </button>
    </div>
  ),
);
ChatReplyBar.displayName = 'ChatReplyBar';

// ---------------------------------------------------------------------------
// ChatReplyQuote — left-border quote for replies
// ---------------------------------------------------------------------------

interface ChatReplyQuoteProps extends React.HTMLAttributes<HTMLDivElement> {
  sender: string;
  body: string;
  onDismiss?: () => void;
}

const ChatReplyQuote = React.forwardRef<HTMLDivElement, ChatReplyQuoteProps>(
  ({ className, sender, body, onDismiss, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2 rounded bg-foreground/[0.04] border-l-2 border-primary-500/40 px-2.5 py-1.5 text-[0.8125rem]',
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <span className="font-semibold text-foreground/70">{sender}</span>
        {body && <span className="ml-2 truncate text-foreground/50">{body}</span>}
      </div>
      {onDismiss && (
        <Button variant="ghost" size="icon" onClick={onDismiss} className="h-5 w-5 shrink-0">
          <X className="h-3 w-3" />
          <span className="sr-only">Cancel reply</span>
        </Button>
      )}
    </div>
  ),
);
ChatReplyQuote.displayName = 'ChatReplyQuote';

// ---------------------------------------------------------------------------
// ChatComposer — input bar at the bottom
// ---------------------------------------------------------------------------

interface ChatComposerProps extends React.HTMLAttributes<HTMLFormElement> {
  onSendMessage: (body: string) => void;
  placeholder?: string;
  disabled?: boolean;
  header?: React.ReactNode;
}

const ChatComposer = React.forwardRef<HTMLFormElement, ChatComposerProps>(
  ({ className, onSendMessage, placeholder, disabled, header, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSendMessage(trimmed);
        setValue('');
        inputRef.current?.focus();
      },
      [value, disabled, onSendMessage],
    );

    return (
      <form
        ref={ref}
        className={cn('shrink-0 px-4 pb-3', className)}
        onSubmit={handleSubmit}
        {...props}
      >
        {header && <div className="mb-2">{header}</div>}
        <div className="flex items-center rounded-lg bg-foreground/[0.06] ring-1 ring-border focus-within:ring-2 focus-within:ring-ring">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={placeholder ?? 'Type a message...'}
            disabled={disabled}
            className="min-h-[44px] flex-1 bg-transparent px-4 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={disabled || !value.trim()}
            className="mr-1 h-9 w-9 shrink-0 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <Send className="h-[18px] w-[18px]" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    );
  },
);
ChatComposer.displayName = 'ChatComposer';

// ---------------------------------------------------------------------------
// ChatStatus — typing indicator
// ---------------------------------------------------------------------------

interface ChatStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string | null;
}

const ChatStatus = React.forwardRef<HTMLDivElement, ChatStatusProps>(
  ({ className, text, ...props }, ref) => {
    if (!text) return null;
    return (
      <div
        ref={ref}
        className={cn('shrink-0 px-4 pb-1 text-[0.75rem] text-muted-foreground', className)}
        {...props}
      >
        <em>
          {text}
          <span className="ml-0.5 inline-flex tracking-widest">
            <span className="animate-bounce [animation-delay:0ms]">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </em>
      </div>
    );
  },
);
ChatStatus.displayName = 'ChatStatus';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  ChatContainer,
  chatContainerVariants,
  ChatHeader,
  ChatMessageList,
  ChatMessageGroup,
  ChatMessage,
  ChatDivider,
  ChatReplyBar,
  ChatReplyQuote,
  ChatComposer,
  ChatStatus,
};
