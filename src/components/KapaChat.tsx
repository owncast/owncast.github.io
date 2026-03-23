import React from "react";
import { KapaProvider, useChat } from "@kapaai/react-sdk";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RotateCcw, Square } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import {
  ChatContainer,
  ChatHeader,
  ChatMessageList,
  ChatMessageGroup,
  ChatMessage,
  ChatComposer,
  ChatStatus,
} from "@/components/shared/ui/chat";

// Syntax highlighting (Prism light build)
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import { tomorrow as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

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

function ChatUI() {
  const {
    conversation,
    submitQuery,
    isGeneratingAnswer,
    isPreparingAnswer,
    resetConversation,
    stopGeneration,
    error,
  } = useChat();

  const statusText = isPreparingAnswer
    ? "Preparing answer"
    : isGeneratingAnswer
      ? "Typing"
      : null;

  return (
    <ChatContainer size="default">
      <ChatHeader>
        <span className="text-sm font-semibold">Ask Owncast AI</span>
        <div className="flex gap-1">
          {isGeneratingAnswer && (
            <Button variant="ghost" size="sm" onClick={stopGeneration}>
              <Square className="mr-1.5 h-3 w-3" />
              Stop
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={resetConversation}>
            <RotateCcw className="mr-1.5 h-3 w-3" />
            Reset
          </Button>
        </div>
      </ChatHeader>

      <ChatMessageList className="py-2">
        {conversation.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Ask anything about Owncast...
            </p>
          </div>
        )}

        {conversation.map((qa) => (
          <React.Fragment key={qa.id}>
            <ChatMessageGroup sender="You" timestamp="">
              <ChatMessage>
                <p>{qa.question}</p>
              </ChatMessage>
            </ChatMessageGroup>

            {qa.answer && (
              <ChatMessageGroup sender="Owncast" timestamp="">
                <ChatMessage>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                        code: ({
                          inline,
                          className,
                          children,
                          ...props
                        }) => {
                          const match = /language-(\w+)/.exec(className || "");
                          const lang = match?.[1];
                          if (!inline) {
                            return (
                              <SyntaxHighlighter
                                style={theme}
                                language={lang ?? "plaintext"}
                                PreTag="div"
                                customStyle={{
                                  margin: 0,
                                  borderRadius: 8,
                                  fontSize: "0.85rem",
                                }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            );
                          }
                          return (
                            <code
                              className="rounded bg-muted px-1.5 py-0.5 text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {qa.answer}
                    </ReactMarkdown>
                  </div>
                </ChatMessage>
              </ChatMessageGroup>
            )}
          </React.Fragment>
        ))}
      </ChatMessageList>

      <ChatStatus text={statusText} />

      {error && (
        <div className="px-4 py-2 text-sm text-destructive">
          Error: {error}
        </div>
      )}

      <ChatComposer
        onSendMessage={(text) => submitQuery(text)}
        placeholder="Ask anything about Owncast..."
        disabled={isGeneratingAnswer}
      />
    </ChatContainer>
  );
}

export default function KapaChat() {
  const integrationId = "522021ac-58af-4320-a842-bee82f47c211";

  return (
    <KapaProvider integrationId={integrationId}>
      <ChatUI />
    </KapaProvider>
  );
}
