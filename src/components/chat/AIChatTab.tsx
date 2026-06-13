"use client";

/**
 * AI chat tab — Kapa-powered, rendered with chatscope components
 * to match the community chat visual style.
 */

import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { KapaProvider, useChat } from "@kapaai/react-sdk";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RotateCcw, Square } from "lucide-react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageGroup,
  MessageInput,
  Avatar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Button } from "@/components/shared/ui/button";

// Syntax highlighting
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("golang", go);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("python", python);

const KAPA_INTEGRATION_ID = "522021ac-58af-4320-a842-bee82f47c211";

/**
 * ReactMarkdown component overrides for chat responses.
 * Uses <span> with display:block instead of <div>/<p>/<h*> to avoid
 * Docusaurus Infima CSS rules that target those elements.
 * All spacing is via inline styles which cannot be overridden.
 */
const FS = "0.875rem";
const LH = "1.5";
const chatMarkdownComponents = {
  p: ({ node, ...props }: any) => (
    <span
      style={{
        display: "block",
        margin: "0.15em 0",
        padding: 0,
        fontSize: FS,
        lineHeight: LH,
      }}
      {...props}
    />
  ),
  h1: ({ node, ...props }: any) => (
    <span
      style={{
        display: "block",
        margin: "0.4em 0 0.1em",
        padding: 0,
        fontWeight: 700,
        fontSize: "1rem",
        lineHeight: LH,
      }}
      {...props}
    />
  ),
  h2: ({ node, ...props }: any) => (
    <span
      style={{
        display: "block",
        margin: "0.4em 0 0.1em",
        padding: 0,
        fontWeight: 700,
        fontSize: "0.95rem",
        lineHeight: LH,
      }}
      {...props}
    />
  ),
  h3: ({ node, ...props }: any) => (
    <span
      style={{
        display: "block",
        margin: "0.3em 0 0",
        padding: 0,
        fontWeight: 600,
        fontSize: FS,
        lineHeight: LH,
      }}
      {...props}
    />
  ),
  h4: ({ node, ...props }: any) => (
    <span
      style={{
        display: "block",
        margin: "0.2em 0 0",
        padding: 0,
        fontWeight: 600,
        fontSize: FS,
        lineHeight: LH,
      }}
      {...props}
    />
  ),
  ul: ({ node, ordered, ...props }: any) => (
    <ul
      style={{
        display: "block",
        margin: "0.1em 0",
        padding: "0 0 0 1.5em",
        fontSize: 0,
        lineHeight: 0,
        listStyleType: "disc",
        listStylePosition: "outside",
      }}
      {...props}
    />
  ),
  ol: ({ node, ordered, ...props }: any) => (
    <ol
      style={{
        display: "block",
        margin: "0.1em 0",
        padding: "0 0 0 1.5em",
        fontSize: 0,
        lineHeight: 0,
        listStyleType: "decimal",
        listStylePosition: "outside",
      }}
      {...props}
    />
  ),
  li: ({ node, ordered, children, ...props }: any) => {
    // Unwrap any block-level <span> (from our <p> override) that is the first/only child,
    // so list content stays inline with the marker.
    const unwrapped = React.Children.map(children, (child: any) => {
      if (child?.props?.style?.display === "block" && child?.type === "span") {
        return child.props.children;
      }
      return child;
    });
    return (
      <li
        style={{
          display: "list-item",
          margin: 0,
          padding: "0.25em 0",
          fontSize: FS,
          lineHeight: LH,
        }}
        {...props}
      >
        {unwrapped}
      </li>
    );
  },
  blockquote: ({ node, ...props }: any) => (
    <span
      style={{
        display: "block",
        margin: "0.2em 0",
        padding: "0.1em 0 0.1em 0.75em",
        borderLeft: "3px solid #262e3a",
        fontSize: FS,
        lineHeight: LH,
      }}
      {...props}
    />
  ),
  a: ({ node, ...props }: any) => (
    <a
      style={{ color: "#7db4f4", fontSize: "inherit" }}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  pre: ({ node, ...props }: any) => (
    <span
      style={{
        display: "block",
        margin: "0.2em 0",
        fontSize: FS,
        lineHeight: LH,
      }}
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const lang = match?.[1];
    if (!inline) {
      return (
        <SyntaxHighlighter
          style={codeTheme}
          language={lang ?? "plaintext"}
          PreTag="span"
          customStyle={{
            display: "block",
            margin: 0,
            borderRadius: 8,
            fontSize: "0.85rem",
            lineHeight: "1.4",
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }
    return (
      <code
        style={{
          background: "#2D3748",
          padding: "0.15rem 0.35rem",
          borderRadius: 6,
          fontSize: "0.85em",
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
};

/** Common questions shown to new users. Easy to edit. */
const SUGGESTED_QUESTIONS = [
  "What are some good uses for Owncast?",
  "How do I install Owncast?",
  "What do I need to run Owncast?",
  "How do I configure my broadcasting software?",
];

function AIChatInner({
  onSuggestCommunity,
}: {
  onSuggestCommunity?: () => void;
}) {
  const {
    conversation,
    submitQuery,
    isGeneratingAnswer,
    isPreparingAnswer,
    resetConversation,
    stopGeneration,
    error,
  } = useChat();

  const typingIndicator =
    isPreparingAnswer || isGeneratingAnswer ? (
      <TypingIndicator
        content={
          isPreparingAnswer
            ? translate({
                id: "chat.answers.preparing",
                message: "Owncat is pretending to type...",
              })
            : translate({
                id: "chat.answers.thinking",
                message: "Owncat is pretending to type...",
              })
        }
      />
    ) : undefined;

  const handleSend = (_html: string, textContent: string) => {
    const text = textContent.trim();
    if (text) submitQuery(text);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, minHeight: 0 }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typingIndicator}
              autoScrollToBottom
              autoScrollToBottomOnMount
            >
              {conversation.length === 0 && (
                <>
                  <MessageGroup
                    direction="incoming"
                    sender={translate({
                      id: "chat.answers.senderName",
                      message: "Owncat",
                    })}
                  >
                    <Avatar name="Owncat" src="/images/owncat-head.svg" />
                    <MessageGroup.Header>
                      {translate({
                        id: "chat.answers.senderName",
                        message: "Owncat",
                      })}
                    </MessageGroup.Header>
                    <MessageGroup.Messages>
                      <Message
                        model={{ direction: "incoming", position: "single" }}
                      >
                        <Message.CustomContent>
                          <p style={{ marginBottom: 8 }}>
                            <Translate
                              id="chat.answers.welcome"
                              values={{
                                docsLink: (
                                  <a href="/docs" style={{ color: "#7db4f4" }}>
                                    {translate({
                                      id: "chat.answers.welcomeDocsLink",
                                      message: "documentation",
                                    })}
                                  </a>
                                ),
                              }}
                            >
                              {
                                "Hi, I'm Owncat! You can ask me questions and I'll search the Owncast {docsLink} and other resources to quickly try to find answers for you."
                              }
                            </Translate>
                          </p>
                          <p
                            style={{
                              marginBottom: 0,
                              color: "#9ca8ba",
                              fontSize: "0.8125rem",
                            }}
                          >
                            <Translate
                              id="chat.answers.welcomeAlternatives"
                              values={{
                                chatLink: (
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onSuggestCommunity?.();
                                    }}
                                    style={{
                                      color: "#7db4f4",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {translate({
                                      id: "chat.answers.welcomeChatLink",
                                      message:
                                        "chat with real Owncast developers and community members",
                                    })}
                                  </a>
                                ),
                                issueTracker: (
                                  <a
                                    href="https://github.com/owncast/owncast/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#7db4f4" }}
                                  >
                                    {translate({
                                      id: "chat.answers.welcomeIssueTracker",
                                      message: "issue tracker",
                                    })}
                                  </a>
                                ),
                              }}
                            >
                              {
                                "If you'd prefer to {chatLink}, you can do that too, though you may have to wait for someone to respond. You're also welcome to file questions on our {issueTracker}."
                              }
                            </Translate>
                          </p>
                        </Message.CustomContent>
                      </Message>
                    </MessageGroup.Messages>
                  </MessageGroup>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "14px 8px",
                      padding: "8px 16px 8px 58px",
                    }}
                  >
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => submitQuery(q)}
                        style={{
                          background: "rgba(122, 92, 243, 0.1)",
                          border: "1px solid rgba(122, 92, 243, 0.3)",
                          borderRadius: 16,
                          padding: "6px 14px",
                          color: "#7db4f4",
                          fontSize: "0.8125rem",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          transition:
                            "background-color 0.15s, border-color 0.15s",
                        }}
                        onMouseOver={(e) => {
                          const t = e.currentTarget;
                          t.style.backgroundColor = "rgba(122, 92, 243, 0.2)";
                          t.style.borderColor = "rgba(122, 92, 243, 0.5)";
                        }}
                        onMouseOut={(e) => {
                          const t = e.currentTarget;
                          t.style.backgroundColor = "rgba(122, 92, 243, 0.1)";
                          t.style.borderColor = "rgba(122, 92, 243, 0.3)";
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {conversation.map((qa) => (
                <React.Fragment key={qa.id}>
                  <MessageGroup direction="outgoing" sender="You">
                    <MessageGroup.Messages>
                      <Message
                        model={{
                          message: qa.question,
                          direction: "outgoing",
                          position: "single",
                        }}
                      />
                    </MessageGroup.Messages>
                  </MessageGroup>

                  {qa.answer && (
                    <MessageGroup
                      direction="incoming"
                      sender={translate({
                        id: "chat.answers.senderName",
                        message: "Owncat",
                      })}
                    >
                      <Avatar name="Owncat" src="/images/owncat-head.svg" />
                      <MessageGroup.Header>
                        {translate({
                          id: "chat.answers.senderName",
                          message: "Owncat",
                        })}
                      </MessageGroup.Header>
                      <MessageGroup.Messages>
                        <Message
                          model={{
                            direction: "incoming",
                            position: "single",
                          }}
                        >
                          <Message.CustomContent>
                            <div
                              className="max-w-none"
                              style={{
                                fontSize: 0,
                                lineHeight: 0,
                                color: "#e2e8f0",
                              }}
                            >
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={chatMarkdownComponents}
                              >
                                {qa.answer}
                              </ReactMarkdown>
                            </div>
                          </Message.CustomContent>
                        </Message>
                      </MessageGroup.Messages>
                    </MessageGroup>
                  )}
                </React.Fragment>
              ))}

              {/* Suggest community after a few exchanges */}
              {conversation.length >= 2 && onSuggestCommunity && (
                <div style={{ textAlign: "center", padding: "12px 16px" }}>
                  <button
                    type="button"
                    onClick={onSuggestCommunity}
                    style={{
                      background: "none",
                      border: "1px solid #262e3a",
                      borderRadius: 8,
                      color: "#7db4f4",
                      cursor: "pointer",
                      padding: "8px 16px",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {translate({
                      id: "chat.answers.askCommunity",
                      message: "Need more help? Ask the community →",
                    })}
                  </button>
                </div>
              )}
            </MessageList>

            <MessageInput
              placeholder={translate({
                id: "chat.answers.placeholder",
                message: "Ask anything about Owncast...",
              })}
              onSend={handleSend}
              disabled={isGeneratingAnswer}
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            padding: "8px 16px",
            color: "#ff4b39",
            fontSize: "0.875rem",
          }}
        >
          Error: {error}
        </div>
      )}
    </div>
  );
}

interface AIChatTabProps {
  onSuggestCommunity?: () => void;
}

export function AIChatTab({ onSuggestCommunity }: AIChatTabProps) {
  return (
    <KapaProvider
      integrationId={KAPA_INTEGRATION_ID}
      customizationId="c99663e3-30fd-47d8-9d30-875024da4a2a"
    >
      <AIChatInner onSuggestCommunity={onSuggestCommunity} />
    </KapaProvider>
  );
}
