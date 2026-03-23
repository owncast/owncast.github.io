'use client';

import * as React from 'react';
import { ChatStatus } from '@/components/shared/ui/chat';

interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string | null;
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ text, ...props }, ref) => <ChatStatus ref={ref} text={text} {...props} />,
);
TypingIndicator.displayName = 'TypingIndicator';

export { TypingIndicator };
