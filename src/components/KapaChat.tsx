import React from "react";
import { KapaProvider, useChat } from "@kapaai/react-sdk";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Syntax highlighting (Prism light build)
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
// You can swap this theme for any other prism theme you like
import { tomorrow as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

// Register just the languages you care about (keeps bundle small)
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

  const [text, setText] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = text.trim();
    if (q) {
      submitQuery(q);
      setText("");
    }
  }

  return (
    <div
      style={{
        border: "3px solid #e5e7eb",
        borderRadius: 12,
        padding: 12,
        height: 520,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ flex: 1, overflow: "auto" }}>
        {conversation.map((qa) => (
          <div key={qa.id} style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 6 }}>
              <strong>You:</strong> {qa.question}
            </div>

            <div style={{ marginBottom: 6 }}>
              <strong>Owncast:</strong>
            </div>

            <div style={{ paddingLeft: 12 }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                // Open links in a new tab, add rel for security
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                  code: ({ inline, className, children, ...props }) => {
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
                            borderRadius: 10,
                            fontSize: "0.9rem",
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      );
                    }
                    return (
                      <code
                        className={className}
                        style={{
                          background: "#f3f4f6",
                          padding: "0.15rem 0.35rem",
                          borderRadius: 6,
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {qa.answer ?? ""}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {isPreparingAnswer && <em>Preparing answer…</em>}
        {isGeneratingAnswer && <em>Typing…</em>}
        {error && <div style={{ color: "crimson" }}>Error: {error}</div>}
      </div>

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything about Owncast…"
          disabled={isGeneratingAnswer}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
          }}
        />
        {isGeneratingAnswer ? (
          <button type="button" onClick={stopGeneration}>
            Stop
          </button>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={resetConversation}>
          Reset
        </button>
      </div>
    </div>
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
