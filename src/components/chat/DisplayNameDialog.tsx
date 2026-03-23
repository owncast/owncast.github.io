'use client';

import * as React from 'react';
import { translate } from '@docusaurus/Translate';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/shared/ui/dialog';
import { Input } from '@/components/shared/ui/input';
import { Button } from '@/components/shared/ui/button';

interface DisplayNameDialogProps {
  open: boolean;
  currentName?: string;
  /** If true, the dialog cannot be dismissed without entering a name (unless onSkip is provided). */
  required?: boolean;
  onSubmit: (name: string) => Promise<void>;
  onOpenChange?: (open: boolean) => void;
  /** Called when the user dismisses the dialog without entering a name. */
  onSkip?: () => void;
}

function DisplayNameDialog({
  open,
  currentName,
  required,
  onSubmit,
  onOpenChange,
  onSkip,
}: DisplayNameDialogProps) {
  const [name, setName] = React.useState(currentName ?? '');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setName(currentName ?? '');
      setError(null);
    }
  }, [open, currentName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(translate({ id: 'chat.displayName.errorEmpty', message: 'Please enter a name' }));
      return;
    }
    if (trimmed.length > 255) {
      setError(translate({ id: 'chat.displayName.errorTooLong', message: 'Name is too long' }));
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(trimmed);
      onOpenChange?.(false);
    } catch {
      setError(translate({ id: 'chat.displayName.errorFailed', message: 'Failed to set name. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && required && !currentName) {
      if (onSkip) {
        onSkip();
        onOpenChange?.(false);
      }
      return;
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        hideCloseButton={required && !currentName && !onSkip}
        onPointerDownOutside={(e) => {
          if (required && !currentName && !onSkip) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (required && !currentName && !onSkip) e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {currentName
                ? translate({ id: 'chat.displayName.titleChange', message: 'Change your name' })
                : translate({ id: 'chat.displayName.titleWelcome', message: 'Welcome to Owncast support chat' })}
            </DialogTitle>
            <DialogDescription>
              {currentName
                ? translate({ id: 'chat.displayName.descriptionChange', message: 'Update the name shown with your messages.' })
                : translate({ id: 'chat.displayName.descriptionWelcome', message: 'What should we call you?' })}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label htmlFor="display-name-input" className="sr-only">
              {translate({ id: 'chat.displayName.label', message: 'Display name' })}
            </label>
            <Input
              id="display-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={translate({ id: 'chat.displayName.placeholder', message: 'Your display name' })}
              autoFocus
              maxLength={255}
              disabled={isSubmitting}
              aria-describedby={error ? 'display-name-error' : undefined}
              aria-invalid={error ? true : undefined}
            />
            {error && (
              <p id="display-name-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p>
            )}
          </div>

          <DialogFooter>
            {currentName ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange?.(false)}
                disabled={isSubmitting}
              >
                {translate({ id: 'chat.displayName.cancel', message: 'Cancel' })}
              </Button>
            ) : onSkip ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => { onSkip(); onOpenChange?.(false); }}
                disabled={isSubmitting}
              >
                {translate({ id: 'chat.displayName.skip', message: 'Skip' })}
              </Button>
            ) : null}
            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {isSubmitting
                ? translate({ id: 'chat.displayName.saving', message: 'Saving...' })
                : currentName
                  ? translate({ id: 'chat.displayName.update', message: 'Update' })
                  : translate({ id: 'chat.displayName.join', message: 'Join Chat' })}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
DisplayNameDialog.displayName = 'DisplayNameDialog';

export { DisplayNameDialog };
