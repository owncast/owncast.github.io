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
Displays the contributor avatar grid from `static/data/contributors-processed.json`.

**Usage:**
```tsx
import { Contributors } from './components';

<Contributors />
```

The homepage's financial appeal lives in
`src/components/homepage/SupportSection.tsx`, immediately after the installer
section. It links to `/donate/` without showing funding amounts or goals. Move
`<SupportSection />` in `src/pages/index.tsx` to experiment with placement.
The appeal has one donation action: the supporter button. Current
supporter recognition sits below a divider without a nested panel; these styles
are scoped to the homepage so the donation page keeps its supporter panels.

`FinancialSupporters.tsx` displays the same current supporter list on the homepage
and donation page, using `static/data/donors-processed.json`. “Current” means a
BACKER whose last transaction was within the past 90 days, including one-time donors.
The donation page opts into `<FinancialSupporters showPast />`, adding a collapsed
“Thank you to our past supporters” accordion backed by
`static/data/past-donors-processed.json`. Earlier paid BACKERs are shown
alphabetically, excluding current profiles and duplicates, with anonymous public
names preserved and no contribution amounts displayed.
The donor workflow derives both lists from the same Open Collective members
response and cutoff; `scripts/process-donors.js` deduplicates, sorts, and assigns
fallback avatars to both raw snapshots.
The collapsed disclosure is an unboxed text control; the historical avatar panel
appears only when expanded and shares the current supporter panel’s width.

`SponsorsSection.tsx` recognizes in-kind contributions under “Infrastructure
and service sponsors”, separate from the financial supporters in `SupportSection`.

The site-wide Donate link is configured in `docusaurus.config.ts` and styled
with `.header-donate-link` in `src/css/custom.css`.

### Homepage section analytics

`src/pages/index.tsx` sends `Homepage Section Viewed: <section>` to Plausible,
once per homepage visit when at least 10% of a section is
visible. Lazy sections count only after their content loads, not while showing
a placeholder. Hidden mobile sections do not count. Financial supporters are
measured separately from the surrounding support appeal. Shared components
have no view tracking, so the donor list on `/donate/` does not send this event.

In Plausible **Site settings → Goals**, add custom event goals with matching
names, such as `Homepage Section Viewed: Financial supporters`. The section
names are Hero, Feature preview, Streaming software, Use cases, Features,
Protocols, Installer, Support, Financial supporters, FAQ, Store, Apps,
Sponsors, and Contributors. Separate event names avoid requiring Plausible's
Business-plan custom properties. These passive events use `interactive: false`
to avoid affecting bounce rate. Custom events count toward billable usage.

`src/lib/analytics.ts` shares the event queue with the wizards, preserving
early views until the deferred Plausible script loads.
With a local server running, verify visibility, deduplication, homepage
revisits, and donation-page exclusion without sending real analytics:

```bash
node scripts/verify-homepage-analytics.mjs http://127.0.0.1:3000/
```

On Linux hosts that cannot launch Chromium's sandbox, append `--no-sandbox`
for this local smoke check.

### Donation page

`src/pages/donate.tsx` uses the shared Button, Input, and Label primitives.
Visitors can select an Open Collective preset or enter a custom amount, then
continue to monthly or one-time checkout. Open Collective handles payment.
The suggested starting donation is $10; visitors can change it before checkout.
Amount presets use 44px touch targets. The selected amount and monthly action use
the primary Button variant; unselected amounts and one-time support use
outlinePrimary. Donation-scoped CSS normalizes native button/input borders because
Tailwind preflight is disabled. The past-supporter disclosure uses a brand-colored
keyboard focus outline without animating the focus ring.
Control borders share the amount field’s solid color for at least 3:1 contrast
against the card surface. Compact hero spacing keeps the monthly action within
the first screen at a 1440×900 desktop viewport.
Concrete funded examples appear in a separate responsive list, keeping the
ongoing-support sidebar concise.
The corporate sponsorship section invites long-term support while reserving
project decisions to the maintainers, and links to the public maintainer email.
Future possibilities (paid development time, conference travel, and independent
event streaming) are presented separately from past funded work and the live
Open Collective goals, without promises, targets, or timelines.
Donation-page section headings share one scoped typography rule, while the main
page title and item headings retain their separate hierarchy.

`plugins/owncast-funding/index.js` adapts the public queries and normalization
from `fedifunding.org/scripts/sync-opencollective.mjs`. Each site build or dev
server startup fetches Open Collective data, reusing the existing one-hour
build cache. The page shows the snapshot timestamp. Updating Open Collective
goals or presets requires no source changes, but becomes visible on the next
build after the cache expires.

Recurring monthly support is active monthly contributions plus active yearly
contributions divided by twelve. Goal progress follows Open Collective's goal
type: estimated monthly budget, yearly budget, or available balance. Budget
estimates are not presented as recurring support. Goal targets and tier presets
are converted from minor currency units; no funding targets are hardcoded.

If fetching fails, the plugin publishes unavailable figures rather than fake
zeroes, and the page retains a direct Open Collective donation option.

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