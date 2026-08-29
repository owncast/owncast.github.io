---
title: "How we develop frontend components"
slug: /how-we-develop-frontend-components
displayed_sidebar: devSidebar
tags: ["development", "contributing"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/how-we-develop-frontend-components-W0goMoKAPf"
---
This is how we build components for the Owncast web UI. Use it when changing existing components or adding new ones. A shared pattern keeps the project readable and maintainable.

## Functional components

React has two ways to write components: class-based and functional. Class-based has fallen out of favor, so we write functional components. See the [React component docs](https://react.dev/learn/your-first-component).

## The pattern we use

### Stateless

```tsx
export type MyNewButtonProps = {
  label: string;
  onClick: () => void;
};

export const MyNewButton: FC<MyNewButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
```

### Stateful

```tsx
export type MyNewButtonProps = {
  label: string;
  onClick: () => void;
};

export const MyNewButton: FC<MyNewButtonProps> = ({ label, onClick }) => {
  const handleClick = useCallback(() => {
    alert(label);
    onClick && onClick();
  }, [label, onClick]);

  return <button onClick={handleClick}>{label}</button>;
};
```

There are many common ways to write components, so settling on one keeps things consistent. For why this style, see the [PR that introduced it](https://github.com/owncast/owncast/pull/2082).

## Error boundaries

Components with substantial state and internal logic should be wrapped in an [error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary), so an unexpected error shows a fallback instead of crashing the page. Stateless view components rarely throw and don't need one. The `ComponentError` component is a prebuilt error state with a bug-reporting button.

```tsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <ComponentError
      componentName="DesktopContent"
      message={error.message}
      retryFunction={resetErrorBoundary}
    />
  )}
>
  <YourComponent />
</ErrorBoundary>
```

## Storybook

We use [Storybook](https://storybook.js.org/) as a component library where you can see and interact with each component. Include a `.stories.tsx` file with every exported component, and update it when you change a component. Run the Storybook server with `npm run storybook`.

## Linting and formatting

We use Prettier and ESLint for JavaScript and TypeScript. Set them up in your editor or run them manually. Linting or formatting errors will block a PR until they are fixed.