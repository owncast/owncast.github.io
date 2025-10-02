# Custom Components for Owncast Docusaurus

This directory contains React components that replicate the functionality of the custom Hugo shortcodes used in the original Owncast documentation site.

## Components

### 1. Alert
Warning/info boxes with different types.

**Usage:**
```tsx
import { Alert } from './components';

<Alert text="This is a warning message" icon="⚠️" type="warning" />
<Alert text="This is an info message" type="info" />
```

**Props:**
- `text` (string): Alert text content
- `icon` (string, optional): Optional icon to display
- `type` ('warning' | 'info' | 'danger' | 'success', optional): Alert type - determines styling
- `className` (string, optional): Additional CSS classes

### 2. VersionSupport
Version badges showing feature availability.

**Usage:**
```tsx
import { VersionSupport } from './components';

<VersionSupport feature="webhooks" version="0.0.8" />
```

**Props:**
- `feature` (string): The feature name
- `version` (string): The version when the feature was introduced

### 3. ResponsiveImage
Responsive image component with optional captions and links.

**Usage:**
```tsx
import { ResponsiveImage } from './components';

<ResponsiveImage
  src="/img/screenshot.png"
  alt="Screenshot of feature"
  caption="This shows the new feature in action"
  align="center"
  link="https://example.com"
/>
```

**Props:**
- `src` (string): Image source URL
- `alt` (string, optional): Alt text for accessibility
- `caption` (string, optional): Caption text to display below image
- `align` ('left' | 'center' | 'right', optional): Text alignment
- `link` (string, optional): Optional link URL to wrap the image
- `className` (string, optional): Additional CSS class

### 4. GitHubIssue
GitHub issue link component.

**Usage:**
```tsx
import { GitHubIssue } from './components';

<GitHubIssue issueNumber={123} />
<GitHubIssue issueNumber={456} repo="owner/repo" />
```

**Props:**
- `issueNumber` (number | string): GitHub issue number
- `repo` (string, optional): Optional custom repository (defaults to owncast/owncast)

### 5. EmbedContent
Include other markdown files.

**Usage:**
```tsx
import { EmbedContent } from './components';

<EmbedContent file="shared/installation-steps.md" />
```

**Props:**
- `file` (string): Path to the file to embed (relative to the site's static folder)
- `language` (string, optional): Language for syntax highlighting (currently not used)

**Note:** Files to be embedded should be placed in the `static/` folder of your Docusaurus site.

### 6. Contributors
Display contributors grid from data/contributors.json.

**Usage:**
```tsx
import { Contributors } from './components';

<Contributors />
<Contributors showDonors={false} contributorsTitle="Project Contributors" />
```

**Props:**
- `showDonors` (boolean, optional): Whether to show donors section (default: true)
- `contributorsTitle` (string, optional): Custom title for contributors section
- `donorsTitle` (string, optional): Custom title for donors section

**Data Files:**
The component expects the following JSON files in `static/data/`:
- `contributors.json`: Array of contributor objects with `login`, `avatar_url`, and `html_url`
- `donors.json`: Array of donor objects with `login`, `html_url`, and optional `avatar_url`

## Installation Dependencies

The following packages may need to be installed:

```bash
npm install react-markdown
```

## Usage in MDX Files

To use these components in MDX files, import them at the top of your MDX file:

```mdx
---
title: My Page
---

import { Alert, VersionSupport, ResponsiveImage } from '@site/src/components';

# My Documentation Page

<Alert text="Make sure to configure your settings properly!" type="warning" icon="⚠️" />

<VersionSupport feature="webhooks" version="0.0.8" />

<ResponsiveImage src="/img/example.png" alt="Example" caption="An example screenshot" />
```

## Global Component Registration

To make components available globally without imports, you can register them in `docusaurus.config.js`:

```js
module.exports = {
  // ... other config
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    // ... other plugins
    [
      '@docusaurus/plugin-content-docs',
      {
        // ... other options
        remarkPlugins: [
          // Add any remark plugins here
        ],
      },
    ],
  ],
  // You can also add global components via swizzling or theme configuration
};
```

## Styling

All components use CSS modules for styling and support Docusaurus's dark/light theme modes. The styles are designed to integrate well with Docusaurus's default theme.

## Migration from Hugo Shortcodes

These components replicate the functionality of the original Hugo shortcodes:

- `{{< alert >}}` → `<Alert />`
- `{{< versionsupport >}}` → `<VersionSupport />`
- `{{< img >}}` → `<ResponsiveImage />`
- `{{< githubissue >}}` → `<GitHubIssue />`
- `{{< embedcontent >}}` → `<EmbedContent />`
- `{{< collaborators >}}` → `<Contributors />`