import React from "react";
import ReactDOM from "react-dom";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  Zap,
  MessageCircle,
  ExternalLink,
  Pencil,
  Loader2,
  Info,
} from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Badge } from "@/components/shared/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/shared/ui/tabs";
import { MatrixClientProvider, useMatrixClient } from "@/hooks/useMatrixClient";
import type { ChatConfig } from "@/lib/matrix/types";
import { RoomTabContent } from "@/components/chat/RoomTabContent";
import { DisplayNameDialog } from "@/components/chat/DisplayNameDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/shared/ui/dialog";
import { AIChatTab } from "@/components/chat/AIChatTab";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const CHAT_CONFIG: ChatConfig = {
  homeserverUrl: "https://matrix.owncast.online/",
  registrationProxyUrl: "https://matrix.owncast.online/register-guest",
  rooms: [
    {
      id: "#owncast.support:matrix.org",
      label: "Support",
      alias: "#owncast.support:matrix.org",
    },
  ],
};

const CHATSCOPE_THEME = `
[data-chat-container] { background-color: #12161d !important; border-color: #262e3a !important; color: #e2e8f0 !important; --ifm-list-margin: 0 !important; --ifm-list-item-margin: 0 !important; --ifm-list-paragraph-margin: 0 !important; --ifm-list-left-padding: 1.5em !important; --ifm-leading: 0 !important; --ifm-paragraph-margin-bottom: 0 !important; --ifm-heading-margin-top: 0 !important; --ifm-heading-margin-bottom: 0 !important; --ifm-leading-desktop: 0 !important; --ifm-spacing-horizontal: 0 !important; }
[role="dialog"][data-state] { background-color: #2D3748 !important; color: #e2e8f0 !important; border-color: #262e3a !important; }
[role="dialog"][data-state] input { background-color: #12161d !important; color: #e2e8f0 !important; border-color: #262e3a !important; }
[role="dialog"][data-state] h2, [role="dialog"][data-state] p { color: #e2e8f0 !important; }
.cs-main-container { background-color: #12161d !important; border: none !important; color: #e2e8f0 !important; }
.cs-main-container, .cs-chat-container { height: 100% !important; }
.cs-main-container > .cs-chat-container { flex: 1 !important; min-height: 0 !important; }
.cs-chat-container { background-color: #12161d !important; }
.cs-sidebar { background-color: #2D3748 !important; border-color: #262e3a !important; }
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
.cs-avatar { background-color: #2D3748 !important; border-radius: 50% !important; }
.cs-avatar > img { background-color: #2D3748 !important; border-radius: 50% !important; padding: 4px !important; box-sizing: border-box !important; }
.cs-avatar > .cs-avatar__img { background-color: #1e1346 !important; }
.cs-avatar > .cs-avatar__text { background-color: #1e1346 !important; color: #7a5cf3 !important; }
.cs-main-container > .cs-sidebar.cs-sidebar--right { flex-basis: 35vw !important; max-width: 500px !important; min-width: 300px !important; }
.cs-conversation-header, .cs-sidebar .cs-conversation-header, .cs-main-container .cs-conversation-header { background-color: #2D3748 !important; border-bottom-color: #262e3a !important; color: #e2e8f0 !important; }
.cs-conversation-header__user-name, .cs-conversation-header__content .cs-conversation-header__user-name { color: #e2e8f0 !important; }
.cs-conversation-header__info, .cs-conversation-header__content .cs-conversation-header__info { color: #9ca8ba !important; }
.ps__thumb-y { background-color: #9ca8ba !important; border-radius: 9999px !important; width: 6px !important; }
.msg-group-hover { position: relative; margin-top: 20px; }
.msg-group-hover:first-child { margin-top: 0; }
.msg-action-toolbar { position: absolute; top: 8px; right: 64px; display: flex; gap: 1px; background: #1e2533; border: 1px solid #262e3a; border-radius: 4px; padding: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.1s; z-index: 5; pointer-events: none; }
.msg-group-hover:hover .msg-action-toolbar { opacity: 1; pointer-events: auto; }
.msg-group-hover:hover { background-color: rgba(255,255,255,0.015); }
/* Chat tabs — underline style */
[data-chat-container] [role=tablist] { background: transparent !important; border-radius: 0 !important; padding: 0 !important; gap: 0 !important; height: auto !important; }
[data-chat-container] [role=tab] { background: transparent !important; border-radius: 0 !important; padding: 8px 16px !important; color: #9ca8ba !important; font-size: 0.875rem !important; font-weight: 500 !important; border-bottom: 2px solid transparent !important; box-shadow: none !important; transition: color 0.15s, border-color 0.15s !important; }
[data-chat-container] [role=tab]:hover { color: #e2e8f0 !important; }
[data-chat-container] [role=tab][data-state=active] { color: #e2e8f0 !important; border-bottom-color: #7a5cf3 !important; background: transparent !important; box-shadow: none !important; }
/* Markdown formatting is handled via inline styles in React components. */
`;

function useChatTheme() {
  React.useEffect(() => {
    const id = "chatscope-owncast-theme";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = CHATSCOPE_THEME;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);
}

// ---------------------------------------------------------------------------
// Community tab — mounts MatrixClientProvider only when activated
// ---------------------------------------------------------------------------

function CommunityTab() {
  const {
    session,
    status,
    error,
    rooms,
    resolveRoomId,
    submitDisplayName,
    skipDisplayName,
    retry,
  } = useMatrixClient();

  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (status === "naming") setNameDialogOpen(true);
  }, [status]);

  const communityRoom = CHAT_CONFIG.rooms[0];
  const communityReady = status === "ready";

  return (
    <>
      {communityReady && communityRoom ? (
        <RoomTabContent roomId={communityRoom.id} />
      ) : status === "error" ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <p role="alert" style={{ color: "#ff4b39", fontSize: "0.875rem" }}>
            {error ??
              translate({
                id: "chat.error.generic",
                message: "Something went wrong",
              })}
          </p>
          <Button variant="outline" size="sm" onClick={retry}>
            <Translate id="chat.error.retry">Try again</Translate>
          </Button>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 2rem",
            maxWidth: 520,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {status !== "naming" && (
            <Loader2
              className="animate-spin"
              aria-hidden="true"
              style={{
                width: 48,
                height: 48,
                color: "#7db4f4",
                marginBottom: 16,
              }}
            />
          )}
          <div
            role="status"
            aria-live="polite"
            style={{ fontSize: "1.25rem", marginBottom: 16, color: "#e2e8f0" }}
          >
            {status === "naming"
              ? translate({
                  id: "chat.community.chooseName",
                  message: "Choose a name to join the chat",
                })
              : translate({
                  id: "chat.community.connecting",
                  message: "Connecting to the Owncast support chat...",
                })}
          </div>
          <p
            style={{
              color: "#9ca8ba",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              marginBottom: 12,
            }}
          >
            <Translate id="chat.community.description">
              This is a community chat room where you can ask questions and get
              help from other Owncast users and contributors.
            </Translate>
          </p>
          <p
            style={{ color: "#9ca8ba", fontSize: "0.8125rem", lineHeight: 1.6 }}
          >
            <Translate
              id="chat.community.guidelines"
              values={{
                docsLink: (
                  <a href="/docs" style={{ color: "#7db4f4" }}>
                    {translate({
                      id: "chat.community.docsLink",
                      message: "documentation",
                    })}
                  </a>
                ),
                issuesLink: (
                  <a
                    href="https://github.com/owncast/owncast/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#7db4f4" }}
                  >
                    {translate({
                      id: "chat.community.issuesLink",
                      message: "past issues",
                    })}
                  </a>
                ),
              }}
            >
              {
                "Please be courteous and respectful of others who may be volunteering their time to help. Before asking, consider checking the {docsLink} and {issuesLink} to see if your question has already been answered."
              }
            </Translate>
          </p>
        </div>
      )}

      <DisplayNameDialog
        open={nameDialogOpen}
        currentName={session?.displayName}
        required={status === "naming"}
        onSubmit={submitDisplayName}
        onSkip={skipDisplayName}
        onOpenChange={setNameDialogOpen}
      />
    </>
  );
}

function CommunityTabHeader() {
  const { session, submitDisplayName } = useMatrixClient();
  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const communityRoom = CHAT_CONFIG.rooms[0];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setInfoOpen(true)}
        aria-label={translate({
          id: "chat.info.buttonLabel",
          message: "About this chat",
        })}
        style={{ color: "#9ca8ba", width: 28, height: 28 }}
      >
        <Info style={{ width: 16, height: 16 }} aria-hidden="true" />
      </Button>

      {session?.displayName && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setNameDialogOpen(true)}
          style={{ color: "#e2e8f0", gap: 6, fontSize: "0.75rem" }}
        >
          {session.displayName}
          <Pencil style={{ width: 12, height: 12 }} />
        </Button>
      )}

      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Translate id="chat.info.title">Owncast Community Chat</Translate>
            </DialogTitle>
            <DialogDescription>
              <Translate id="chat.info.subtitle">
                A place to ask questions and get help from the Owncast
                community.
              </Translate>
            </DialogDescription>
          </DialogHeader>

          <div
            style={{
              color: "#e2e8f0",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <p>
              <Translate id="chat.info.body">
                This is a community chat room where you can connect with other
                Owncast users and contributors. Please be courteous and
                respectful of others who volunteer their time to help.
              </Translate>
            </p>
            <p>
              <Translate
                id="chat.info.checkFirst"
                values={{
                  docsLink: (
                    <a href="/docs" style={{ color: "#7db4f4" }}>
                      {translate({
                        id: "chat.info.docsLink",
                        message: "documentation",
                      })}
                    </a>
                  ),
                  issuesLink: (
                    <a
                      href="https://github.com/owncast/owncast/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#7db4f4" }}
                    >
                      {translate({
                        id: "chat.info.issuesLink",
                        message: "past issues",
                      })}
                    </a>
                  ),
                }}
              >
                {
                  "Before asking, consider checking the {docsLink} and {issuesLink} to see if your question has already been answered."
                }
              </Translate>
            </p>

            <div
              style={{
                borderTop: "1px solid #262e3a",
                paddingTop: 12,
                marginTop: 4,
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: 8 }}>
                <Translate id="chat.info.matrix.title">
                  Connect with any Matrix client
                </Translate>
              </p>
              <p style={{ color: "#9ca8ba" }}>
                <Translate
                  id="chat.info.matrix.description"
                  values={{
                    matrixLink: (
                      <a
                        href="https://matrix.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#7db4f4" }}
                      >
                        Matrix
                      </a>
                    ),
                  }}
                >
                  {
                    "This chat is powered by {matrixLink}, an open, decentralized communication protocol. You can join this room using any Matrix client:"
                  }
                </Translate>
              </p>
              {communityRoom?.alias && (
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#12161d",
                      borderRadius: 6,
                      padding: "8px 12px",
                      fontSize: "0.8125rem",
                      fontFamily: "monospace",
                      color: "#e2e8f0",
                    }}
                  >
                    {communityRoom.alias}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a
                      href={`https://app.element.io/#/room/${communityRoom.alias}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        color: "#7db4f4",
                        fontSize: "0.8125rem",
                        textDecoration: "none",
                      }}
                    >
                      <ExternalLink style={{ width: 12, height: 12 }} />
                      <Translate id="chat.info.matrix.openElement">
                        Open in Element
                      </Translate>
                    </a>
                    <a
                      href={`https://matrix.to/#/${communityRoom.alias}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        color: "#7db4f4",
                        fontSize: "0.8125rem",
                        textDecoration: "none",
                      }}
                    >
                      <ExternalLink style={{ width: 12, height: 12 }} />
                      <Translate id="chat.info.matrix.matrixToLink">
                        matrix.to link
                      </Translate>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DisplayNameDialog
        open={nameDialogOpen}
        currentName={session?.displayName}
        onSubmit={submitDisplayName}
        onOpenChange={setNameDialogOpen}
      />
    </>
  );
}

/** Renders CommunityTabHeader into the header bar via a portal. */
function CommunityTabHeaderPortal() {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setContainer(document.getElementById("community-header-portal"));
  }, []);

  if (!container) return null;
  return ReactDOM.createPortal(<CommunityTabHeader />, container);
}

// ---------------------------------------------------------------------------
// Unified page
// ---------------------------------------------------------------------------

export default function ChatPage(): JSX.Element {
  const [activeTab, setActiveTab] = React.useState("ai");
  const [communityMounted, setCommunityMounted] = React.useState(false);

  useChatTheme();

  // Only mount the Matrix provider when community tab is first activated
  const handleTabChange = React.useCallback(
    (tab: string) => {
      setActiveTab(tab);
      if (tab === "community" && !communityMounted) {
        setCommunityMounted(true);
      }
    },
    [communityMounted],
  );

  const switchToCommunity = React.useCallback(() => {
    handleTabChange("community");
  }, [handleTabChange]);

  return (
    <Layout
      title="Chat"
      description="Chat with the Owncast community and get support."
      noFooter
    >
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 60px)",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <div
          data-chat-container
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            backgroundColor: "#12161d",
            color: "#e2e8f0",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="flex flex-1 flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                backgroundColor: "#2D3748",
                borderBottom: "1px solid #262e3a",
                flexShrink: 0,
              }}
            >
              <TabsList>
                <TabsTrigger value="ai" className="gap-1.5">
                  <Zap className="h-4 w-4" />
                  <Translate id="chat.tab.answers">Instant Help</Translate>
                </TabsTrigger>
                <TabsTrigger value="community" className="gap-1.5">
                  <MessageCircle className="h-4 w-4" />
                  <Translate id="chat.tab.community">Chat with Us</Translate>
                </TabsTrigger>
              </TabsList>

              <div
                style={{ display: "flex", alignItems: "center", gap: 12 }}
                id="community-header-portal"
              />
            </div>

            {/* AI tab */}
            <TabsContent
              value="ai"
              className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
              forceMount
            >
              <AIChatTab onSuggestCommunity={switchToCommunity} />
            </TabsContent>

            {/* Community tab — single provider wraps header + content */}
            {communityMounted ? (
              <MatrixClientProvider config={CHAT_CONFIG}>
                {activeTab === "community" && <CommunityTabHeaderPortal />}
                <TabsContent
                  value="community"
                  className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
                  forceMount
                >
                  <CommunityTab />
                </TabsContent>
              </MatrixClientProvider>
            ) : (
              <TabsContent
                value="community"
                className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
                forceMount
              />
            )}
          </Tabs>
        </div>
      </main>
    </Layout>
  );
}
