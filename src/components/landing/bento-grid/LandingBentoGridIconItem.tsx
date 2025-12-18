import React from "react";
import clsx from "clsx";
import { LandingBentoGridItem, ItemVariant } from "./LandingBentoGridItem";

export type ColorVariant = "default" | "primary" | "secondary";

export interface LandingBentoGridIconItemProps {
  topText?: string;
  topTextComponent?: React.ReactNode;
  topTextVariant?: ColorVariant;

  icon?: React.ReactNode;
  iconVariant?: ColorVariant;

  bottomText?: string;
  bottomTextComponent?: React.ReactNode;
  bottomTextVariant?: ColorVariant;

  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  className?: string;
  href?: string;
  variant?: ItemVariant;
  asChild?: boolean;
  children?: React.ReactNode;
}

/**
 * A specialized bento grid item with optional top text, center icon, and bottom text.
 * Each text and the icon can have different color variants (default, primary, secondary).
 */
export function LandingBentoGridIconItem({
  topText,
  topTextComponent,
  icon,
  bottomText,
  bottomTextComponent,
  colSpan,
  rowSpan,
  className,
  href,
  variant = "default",
  asChild = false,
  children,
  ...props
}: LandingBentoGridIconItemProps) {
  const content = (
    <div className="w-full h-full flex flex-col justify-center gap-3">
      {topTextComponent || (
        <div
          className={clsx(
            "flex items-start justify-center text-sm text-center",
            variant === "primary" && "text-primary-500 dark:text-primary-200",
            variant === "secondary" &&
              "text-secondary-500 dark:text-secondary-200",
            variant === "default" && "text-gray-900 dark:text-gray-400"
          )}
        >
          {topText}
        </div>
      )}

      {icon && (
        <div
          className={clsx(
            "flex items-center justify-center text-3xl",
            variant === "primary" && "text-primary-500 dark:text-primary-200",
            variant === "secondary" &&
              "text-secondary-500 dark:text-secondary-200",
            variant === "default" && "text-gray-900 dark:text-gray-400"
          )}
        >
          {icon}
        </div>
      )}

      {bottomTextComponent || (
        <div
          className={clsx(
            "flex items-end justify-center text-sm text-center",
            variant === "primary" && "text-primary-500 dark:text-primary-200",
            variant === "secondary" &&
              "text-secondary-500 dark:text-secondary-200",
            variant === "default" && "text-gray-900 dark:text-gray-400"
          )}
        >
          {bottomText}
        </div>
      )}
    </div>
  );

  return (
    <LandingBentoGridItem
      content={content}
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={className}
      href={href}
      variant={variant}
      asChild={asChild}
      {...props}
    >
      {children}
    </LandingBentoGridItem>
  );
}
