'use client';

import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { Loader2, Pencil, RefreshCw, Users, HelpCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/shared/ui/tabs';
import { chatContainerVariants, ChatContainer } from '@/components/shared/ui/chat';
import {
  MatrixClientProvider,
  useMatrixClient,
} from '@/hooks/useMatrixClient';
import type { ChatConfig } from '@/lib/matrix/types';
import { RoomTabContent } from './RoomTabContent';
import { DisplayNameDialog } from './DisplayNameDialog';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

/*
 * Owncast dark theme colors (hardcoded because CSS variables don't resolve
 * correctly through Docusaurus CSS layers):
 *   background:       #12161d
 *   foreground:       #e2e8f0
 *   card:             #2D3748
 *   muted-foreground: #9ca8ba
 *   accent:           #1e1346
 *   accent-foreground:#7a5cf3
 *   border:           #262e3a
 *   ring:             #7a5cf3
 */
const CHATSCOPE_THEME = `
[data-chat-container] { background-color: #12161d !important; border-color: #262e3a !important; color: #e2e8f0 !important; }
[data-chat-container] > div:first-child > div:first-child { background-color: #2D3748 !important; color: #e2e8f0 !important; border-bottom-color: #262e3a !important; }
[data-chat-container] button, [data-chat-container] a { color: #e2e8f0 !important; }
[data-chat-container] [data-state=active] { background-color: #12161d !important; color: #e2e8f0 !important; }
[data-chat-container] [role=tablist] { background-color: #1e2533 !important; }
[role="dialog"][data-state] { background-color: #2D3748 !important; color: #e2e8f0 !important; border-color: #262e3a !important; }
[role="dialog"][data-state] input { background-color: #12161d !important; color: #e2e8f0 !important; border-color: #262e3a !important; }
[role="dialog"][data-state] h2, [role="dialog"][data-state] p { color: #e2e8f0 !important; }
.cs-main-container { background-color: #12161d !important; border-color: #262e3a !important; color: #e2e8f0 !important; }
.cs-main-container, .cs-chat-container { height: 100% !important; }
.cs-main-container > .cs-chat-container { flex: 1 !important; min-height: 0 !important; }
.cs-chat-container { background-color: #12161d !important; }
.cs-sidebar { background-color: #2D3748 !important; border-color: #262e3a !important; }
.cs-conversation-header { background-color: #2D3748 !important; border-bottom-color: #262e3a !important; color: #e2e8f0 !important; }
.cs-conversation-header__content .cs-conversation-header__user-name { color: #e2e8f0 !important; }
.cs-conversation-header__content .cs-conversation-header__info { color: #9ca8ba !important; }
.cs-message-list { background-color: #12161d !important; }
.cs-message__content { border-radius: 0.5rem !important; font-size: 0.9375rem !important; line-height: 1.375 !important; }
.cs-message--incoming .cs-message__content { background-color: #2D3748 !important; color: #e2e8f0 !important; }
.cs-message--outgoing .cs-message__content { background-color: #1e1346 !important; color: #e2e8f0 !important; }
.cs-message__header, .cs-message__footer { color: #9ca8ba !important; }
.cs-message__sender-name { color: #e2e8f0 !important; font-weight: 600 !important; }
.cs-message__sent-time { color: #9ca8ba !important; }
.cs-message-group__header { color: #9ca8ba !important; }
.cs-message-separator { color: #9ca8ba !important; background-color: transparent !important; }
.cs-message-separator > span { background-color: #12161d !important; }
.cs-message-separator::before, .cs-message-separator::after { background-color: #262e3a !important; }
.cs-message-input { background-color: #12161d !important; border-top: 1px solid #262e3a !important; }
.cs-message-input__content-editor-wrapper { background-color: #2D3748 !important; border: 1px solid #262e3a !important; border-radius: 0.5rem !important; width: 100% !important; }
.cs-message-input__content-editor-wrapper:focus-within { border-color: #7a5cf3 !important; }
.cs-message-input--disabled .cs-message-input__content-editor-wrapper { opacity: 0.5 !important; }
.cs-message-input__content-editor-container, .cs-message-input__content-editor { background-color: transparent !important; color: #e2e8f0 !important; }
.cs-message-input__content-editor[data-placeholder]::before { color: #9ca8ba !important; }
.cs-button--send { color: #7a5cf3 !important; }
.cs-button--send:hover { color: #e2e8f0 !important; }
.cs-button--attachment { color: #9ca8ba !important; }
.cs-typing-indicator { background-color: #12161d !important; color: #9ca8ba !important; }
.cs-typing-indicator__dot { background-color: #9ca8ba !important; }
.cs-avatar > .cs-avatar__img { background-color: #2D3748 !important; }
.cs-avatar > .cs-avatar__text { background-color: #1e1346 !important; color: #7a5cf3 !important; }
.cs-conversation-list { background-color: #2D3748 !important; }
.cs-conversation { background-color: transparent !important; border-bottom-color: #262e3a !important; }
.cs-conversation:hover { background-color: #2D3748 !important; }
.cs-conversation--active, .cs-conversation--active:hover { background-color: #1e1346 !important; }
.cs-conversation__name { color: #e2e8f0 !important; }
.cs-conversation__info, .cs-conversation__info-content, .cs-conversation__last-activity-time { color: #9ca8ba !important; }
.cs-expansion-panel { border-color: #262e3a !important; }
.cs-expansion-panel__header { background-color: #2D3748 !important; color: #e2e8f0 !important; }
.cs-expansion-panel__content { background-color: #12161d !important; color: #e2e8f0 !important; }
.ps__thumb-y { background-color: #9ca8ba !important; border-radius: 9999px !important; width: 6px !important; }
.cs-main-container > .cs-sidebar.cs-sidebar--right { flex-basis: 35vw !important; max-width: 500px !important; min-width: 300px !important; }
.cs-conversation-header, .cs-sidebar .cs-conversation-header, .cs-main-container .cs-conversation-header { background-color: #2D3748 !important; border-bottom-color: #262e3a !important; color: #e2e8f0 !important; }
.cs-conversation-header__user-name, .cs-conversation-header__content .cs-conversation-header__user-name { color: #e2e8f0 !important; }
.cs-conversation-header__info, .cs-conversation-header__content .cs-conversation-header__info { color: #9ca8ba !important; }
.cs-conversation-header__back, .cs-conversation-header__actions { color: #e2e8f0 !important; }
`;

// ---------------------------------------------------------------------------
// Icon map for room tabs
// ---------------------------------------------------------------------------

const ROOM_ICONS: Record<string, React.ElementType> = {
  community: Users,
  support: HelpCircle,
};

function getRoomIcon(label: string): React.ElementType {
  return ROOM_ICONS[label.toLowerCase()] ?? Users;
}

// ---------------------------------------------------------------------------
// Inner component (uses context)
// ---------------------------------------------------------------------------

function ChatPanelInner({ config }: { config: ChatConfig }) {
  const {
    session,
    status,
    error,
    rooms,
    activeRoomId,
    resolveRoomId,
    setActiveRoomId,
    submitDisplayName,
    retry,
  } = useMatrixClient();

  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);
  const activeRoom = config.rooms.find((r) => r.id === activeRoomId) ?? config.rooms[0];

  React.useEffect(() => {
    if (status === 'naming') setNameDialogOpen(true);
  }, [status]);

  if (status === 'idle' || status === 'registering') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Connecting to chat...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <p className="text-sm text-destructive">{error ?? 'Something went wrong'}</p>
        <Button variant="outline" size="sm" onClick={retry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    );
  }

  if (status === 'naming') {
    return (
      <>
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground">Almost ready...</p>
        </div>
        <DisplayNameDialog
          open={nameDialogOpen}
          required
          onSubmit={submitDisplayName}
          onOpenChange={setNameDialogOpen}
        />
      </>
    );
  }

  if (status === 'joining') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Joining chat rooms...</p>
      </div>
    );
  }

  return (
    <>
      <Tabs
        value={activeRoomId ?? config.rooms[0]?.id}
        onValueChange={setActiveRoomId}
        className="flex flex-1 flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-card/50 px-4 py-2">
          <TabsList>
            {config.rooms.map((room) => {
              const Icon = getRoomIcon(room.label);
              const roomState = rooms.get(resolveRoomId(room.id));
              const unread = roomState?.unreadCount ?? 0;

              return (
                <TabsTrigger key={room.id} value={room.id} className="relative gap-1.5">
                  <Icon className="h-4 w-4" />
                  {room.label}
                  {unread > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px]">
                      {unread > 99 ? '99+' : unread}
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {activeRoom?.alias && (
            <a
              href={`https://app.element.io/#/room/${activeRoom.alias}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3 w-3" />
              {activeRoom.alias}
            </a>
          )}

          {session?.displayName && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNameDialogOpen(true)}
              className="gap-1.5 text-xs text-muted-foreground"
            >
              {session.displayName}
              <Pencil className="h-3 w-3" />
            </Button>
          )}
        </div>

        {config.rooms.map((room) => (
          <TabsContent
            key={room.id}
            value={room.id}
            className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
            forceMount
          >
            <RoomTabContent roomId={room.id} />
          </TabsContent>
        ))}
      </Tabs>

      <DisplayNameDialog
        open={nameDialogOpen}
        currentName={session?.displayName}
        onSubmit={submitDisplayName}
        onOpenChange={setNameDialogOpen}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Public ChatPanel
// ---------------------------------------------------------------------------

interface ChatPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatContainerVariants> {
  config: ChatConfig;
}

function useChatScopeTheme() {
  React.useEffect(() => {
    const id = 'chatscope-owncast-theme';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = CHATSCOPE_THEME;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);
}

const ChatPanel = React.forwardRef<HTMLDivElement, ChatPanelProps>(
  ({ className, size, config, ...props }, ref) => {
    useChatScopeTheme();
    return (
      <ChatContainer ref={ref} size={size} className={className} data-chat-container {...props}>
        <MatrixClientProvider config={config}>
          <ChatPanelInner config={config} />
        </MatrixClientProvider>
      </ChatContainer>
    );
  },
);
ChatPanel.displayName = 'ChatPanel';

export { ChatPanel };
