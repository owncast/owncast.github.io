import React, { useState, useMemo, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import styles from "./ColorThemeBuilder.module.css";

// Custom Owncast theme for CodeMirror
const owncastTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#12161d",
    foreground: "#e2e8f0",
    caret: "#7a5cf3",
    selection: "#6544e936",
    selectionMatch: "#6544e936",
    lineHighlight: "#2D374830",
    gutterBackground: "#12161d",
    gutterForeground: "#5d5f72",
    gutterBorder: "transparent",
  },
  styles: [
    { tag: t.comment, color: "#5d5f72", fontStyle: "italic" },
    { tag: t.variableName, color: "#da9eff" },
    { tag: [t.string, t.special(t.brace)], color: "#42bea6" },
    { tag: t.number, color: "#42bea6" },
    { tag: t.bool, color: "#da9eff" },
    { tag: t.null, color: "#da9eff" },
    { tag: t.keyword, color: "#7a5cf3" },
    { tag: t.operator, color: "#e2e8f0" },
    { tag: t.className, color: "#2386e2" },
    { tag: t.definition(t.typeName), color: "#2386e2" },
    { tag: t.typeName, color: "#2386e2" },
    { tag: t.angleBracket, color: "#e2e8f0" },
    { tag: t.tagName, color: "#7a5cf3" },
    { tag: t.attributeName, color: "#da9eff" },
    { tag: t.propertyName, color: "#da9eff" },
    { tag: t.unit, color: "#42bea6" },
    { tag: t.color, color: "#42bea6" },
  ],
});

interface SelectorConfig {
  selector: string;
  label: string;
  description: string;
  properties: {
    name: string;
    label: string;
    defaultValue: string;
  }[];
}

const CSS_SELECTORS: SelectorConfig[] = [
  // CSS Variables (output as :root block)
  {
    selector: ":root",
    label: "Action Color",
    description: "Links, buttons, and interactive elements",
    properties: [
      { name: "--theme-color-action", label: "Color", defaultValue: "#7a5cf3" },
    ],
  },
  {
    selector: ":root",
    label: "Action Hover",
    description: "Hover state for interactive elements",
    properties: [
      {
        name: "--theme-color-action-hover",
        label: "Color",
        defaultValue: "#6544e9",
      },
    ],
  },
  {
    selector: ":root",
    label: "Main Background",
    description: "Primary page background",
    properties: [
      {
        name: "--theme-color-background-main",
        label: "Color",
        defaultValue: "#1a1a2e",
      },
    ],
  },
  {
    selector: ":root",
    label: "Header Background",
    description: "Header section background color",
    properties: [
      {
        name: "--theme-color-background-header",
        label: "Color",
        defaultValue: "#16161f",
      },
    ],
  },
  {
    selector: ":root",
    label: "Button Background",
    description: "Primary button background color",
    properties: [
      {
        name: "--theme-color-components-primary-button-background",
        label: "Color",
        defaultValue: "#7a5cf3",
      },
    ],
  },
  {
    selector: ":root",
    label: "Button Text",
    description: "Primary button text color",
    properties: [
      {
        name: "--theme-color-components-primary-button-text",
        label: "Color",
        defaultValue: "#ffffff",
      },
    ],
  },
  {
    selector: ":root",
    label: "Button Border",
    description: "Primary button border color",
    properties: [
      {
        name: "--theme-color-components-primary-button-border",
        label: "Color",
        defaultValue: "#6544e9",
      },
    ],
  },
  {
    selector: ":root",
    label: "Chat Background",
    description: "Chat container background",
    properties: [
      {
        name: "--theme-color-components-chat-background",
        label: "Color",
        defaultValue: "#1e1e2e",
      },
    ],
  },
  {
    selector: ":root",
    label: "Chat Text",
    description: "Chat message text color",
    properties: [
      {
        name: "--theme-color-components-chat-text",
        label: "Color",
        defaultValue: "#e0e0e0",
      },
    ],
  },
  {
    selector: ":root",
    label: "Chat Input Background",
    description: "Chat input field background",
    properties: [
      {
        name: "--theme-color-components-chat-input-background",
        label: "Color",
        defaultValue: "#2a2a3e",
      },
    ],
  },
  {
    selector: ":root",
    label: "Primary Text",
    description: "Main text color",
    properties: [
      {
        name: "--theme-color-palette-0",
        label: "Color",
        defaultValue: "#ffffff",
      },
    ],
  },
  {
    selector: ":root",
    label: "Secondary Text",
    description: "Secondary/muted text",
    properties: [
      {
        name: "--theme-color-palette-1",
        label: "Color",
        defaultValue: "#b0b0b0",
      },
    ],
  },
  {
    selector: ":root",
    label: "Tertiary Text",
    description: "Tertiary/disabled text",
    properties: [
      {
        name: "--theme-color-palette-2",
        label: "Color",
        defaultValue: "#808080",
      },
    ],
  },
  // Element Selectors
  {
    selector: "header",
    label: "Header",
    description: "The main header element",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#16161f",
      },
      { name: "color", label: "Text", defaultValue: "#ffffff" },
    ],
  },
  {
    selector: "footer",
    label: "Footer",
    description: "The main footer element",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#16161f",
      },
      { name: "color", label: "Text", defaultValue: "#b0b0b0" },
    ],
  },
  {
    selector: "#global-header-text",
    label: "Header Text",
    description: "The text in the header",
    properties: [{ name: "color", label: "Text", defaultValue: "#ffffff" }],
  },
  {
    selector: "#offline-banner",
    label: "Offline Banner",
    description: "The banner that appears when the stream is offline",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#2a2a3e",
      },
      { name: "color", label: "Text", defaultValue: "#e0e0e0" },
    ],
  },
  {
    selector: "#custom-page-content",
    label: "Custom Content",
    description: "The custom content of the page",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#1e1e2e",
      },
      { name: "color", label: "Text", defaultValue: "#e0e0e0" },
    ],
  },
  {
    selector: "#notify-button",
    label: "Notify Button",
    description: "Button to display the notify modal",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#7a5cf3",
      },
      { name: "color", label: "Text", defaultValue: "#ffffff" },
    ],
  },
  {
    selector: "#follow-button",
    label: "Follow Button",
    description: "Button to display the follow modal",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#7a5cf3",
      },
      { name: "color", label: "Text", defaultValue: "#ffffff" },
    ],
  },
  {
    selector: "#followers-collection",
    label: "Followers Collection",
    description: "The collection of followers",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#1e1e2e",
      },
    ],
  },
  {
    selector: "#modal-container",
    label: "Modal Container",
    description: "The container for the modals",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#1e1e2e",
      },
      { name: "color", label: "Text", defaultValue: "#e0e0e0" },
    ],
  },
  {
    selector: "#chat-container",
    label: "Chat Container",
    description: "The container for the chat",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#1e1e2e",
      },
    ],
  },
  {
    selector: ".chat-message_user",
    label: "User Chat Message",
    description: "A user-sent chat message",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#2a2a3e",
      },
      { name: "color", label: "Text", defaultValue: "#e0e0e0" },
    ],
  },
  {
    selector: ".chat-message_system",
    label: "System Chat Message",
    description: "A system-sent chat message",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#3a3a4e",
      },
      { name: "color", label: "Text", defaultValue: "#b0b0b0" },
    ],
  },
  {
    selector: ".chat-message_social",
    label: "Social Chat Message",
    description: "A social message from the Fediverse",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#2e3a4e",
      },
      { name: "color", label: "Text", defaultValue: "#e0e0e0" },
    ],
  },
  {
    selector: ".followers-follower",
    label: "Follower Item",
    description: "A single Follower in the followers collection",
    properties: [
      {
        name: "background-color",
        label: "Background",
        defaultValue: "#2a2a3e",
      },
      { name: "color", label: "Text", defaultValue: "#e0e0e0" },
    ],
  },
];

const ColorThemeBuilder: React.FC = () => {
  const [selectorValues, setSelectorValues] = useState<
    Record<string, Record<string, string>>
  >({});
  const [manualCss, setManualCss] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectorChange = useCallback(
    (selector: string, property: string, value: string) => {
      setSelectorValues((prev) => {
        const newValues = { ...prev };
        if (value) {
          if (!newValues[selector]) {
            newValues[selector] = {};
          }
          newValues[selector][property] = value;
        } else {
          if (newValues[selector]) {
            delete newValues[selector][property];
            if (Object.keys(newValues[selector]).length === 0) {
              delete newValues[selector];
            }
          }
        }
        return newValues;
      });
      // Clear manual CSS when using color pickers
      setManualCss(null);
    },
    []
  );

  const generatedCSS = useMemo(() => {
    const parts: string[] = [];
    const rootProperties: Record<string, string> = {};

    // Separate :root properties from regular selectors
    Object.entries(selectorValues).forEach(([selector, properties]) => {
      if (selector === ":root") {
        Object.entries(properties).forEach(([prop, value]) => {
          if (value) {
            rootProperties[prop] = value;
          }
        });
      }
    });

    // Generate :root block first if there are any CSS variables
    if (Object.keys(rootProperties).length > 0) {
      const props = Object.entries(rootProperties)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join("\n");
      parts.push(`:root {\n${props}\n}`);
    }

    // Generate other selector blocks
    Object.entries(selectorValues).forEach(([selector, properties]) => {
      if (selector === ":root") return; // Already handled above

      const propEntries = Object.entries(properties).filter(
        ([_, value]) => value
      );
      if (propEntries.length > 0) {
        const props = propEntries
          .map(([prop, value]) => `  ${prop}: ${value};`)
          .join("\n");
        parts.push(`${selector} {\n${props}\n}`);
      }
    });

    if (parts.length === 0) {
      return "/* Select colors to generate CSS */";
    }

    return parts.join("\n\n");
  }, [selectorValues]);

  const displayCSS = manualCss !== null ? manualCss : generatedCSS;

  const handleEditorChange = useCallback((value: string) => {
    setManualCss(value);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(displayCSS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [displayCSS]);

  const handleReset = useCallback(() => {
    setSelectorValues({});
    setManualCss(null);
  }, []);

  const getSelectorPropertyValue = (
    selector: string,
    property: string,
    defaultValue: string
  ): string => {
    return selectorValues[selector]?.[property] || defaultValue;
  };

  const hasChanges =
    Object.keys(selectorValues).length > 0 || manualCss !== null;

  return (
    <div className={styles.container}>
      <div className={styles.pickerSection}>
        <h3 className={styles.sectionTitle}>Owncast Components</h3>
        <p className={styles.sectionDescription}>
          Select colors to customize your Owncast instance. The CSS will be
          generated automatically.
        </p>

        <div className={styles.selectors}>
          {CSS_SELECTORS.map((config) => {
            const isRootVar = config.selector === ":root";
            const displayCode = isRootVar
              ? config.properties[0]?.name
              : config.selector;
            const uniqueKey = isRootVar
              ? `root-${config.properties[0]?.name}`
              : config.selector;

            return (
              <div key={uniqueKey} className={styles.selectorItem}>
                <div className={styles.selectorHeader}>
                  <span className={styles.selectorLabel}>{config.label}</span>
                  <code className={styles.selectorCode}>{displayCode}</code>
                </div>
                {config.properties.length > 1 && (
                  <p className={styles.selectorDescription}>
                    {config.description}
                  </p>
                )}
                <div className={styles.selectorProperties}>
                  {config.properties.map((prop) => (
                    <div key={prop.name} className={styles.selectorProperty}>
                      <div className={styles.colorInputWrapper}>
                        <input
                          type="color"
                          value={getSelectorPropertyValue(
                            config.selector,
                            prop.name,
                            prop.defaultValue
                          )}
                          onChange={(e) =>
                            handleSelectorChange(
                              config.selector,
                              prop.name,
                              e.target.value
                            )
                          }
                          className={styles.colorInput}
                          title={`${config.label} ${prop.label}`}
                        />
                        <div
                          className={styles.colorSwatch}
                          style={{
                            backgroundColor: getSelectorPropertyValue(
                              config.selector,
                              prop.name,
                              prop.defaultValue
                            ),
                          }}
                        />
                      </div>
                      <span className={styles.propertyLabel}>
                        {config.properties.length === 1
                          ? config.description
                          : prop.label}
                      </span>
                      {selectorValues[config.selector]?.[prop.name] && (
                        <button
                          className={styles.resetButton}
                          onClick={() =>
                            handleSelectorChange(config.selector, prop.name, "")
                          }
                          title="Reset to default"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.editorSection}>
        <div className={styles.editorHeader}>
          <h3 className={styles.sectionTitle}>Generated CSS</h3>
          <div className={styles.editorActions}>
            {hasChanges && (
              <button onClick={handleReset} className={styles.resetAllButton}>
                Reset All
              </button>
            )}
            <button onClick={handleCopy} className={styles.copyButton}>
              {copied ? "Copied!" : "Copy CSS"}
            </button>
          </div>
        </div>

        <div className={styles.editorContainer}>
          <CodeMirror
            value={displayCSS}
            height="300px"
            extensions={[css()]}
            onChange={handleEditorChange}
            theme={owncastTheme}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              highlightActiveLine: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorThemeBuilder;
