import { clsx } from 'clsx';
import { cloneElement, ReactElement } from 'react';
import { CheckIcon, LucideIcon } from 'lucide-react';

type Child = ReactElement<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface KeyPoint {
  title: string;
  description?: React.ReactNode;
}

/**
 * Display a list of key points with an icon.
 * Can be used with a Product Feature or a standalone component.
 */
export const LandingProductFeatureKeyPoints = ({
  className,
  iconClassName,
  keyPoints,
  variant = 'primary',
  descriptionStyle = 'block',
  icon,
  mobileCarousel = false,
}: {
  className?: string;
  iconClassName?: string;
  keyPoints: KeyPoint[];
  variant?: 'primary' | 'secondary';
  descriptionStyle?: 'inline' | 'block';
  icon?: React.ReactNode | SVGSVGElement | LucideIcon;
  mobileCarousel?: boolean;
}) => {
  const iconClass = clsx(
    'h-5 w-5 inline -mt-0.5',
    variant === 'primary' ? 'text-primary-500' : 'text-secondary-500',
    iconClassName,
  );

  const iconAsReactNode = icon as Child;

  const iconWithProps = icon ? (
    cloneElement(iconAsReactNode, {
      className: (iconAsReactNode?.props?.className || '').concat(
        ` ${iconClass}`,
      ),
    })
  ) : (
    <CheckIcon className={iconClass} />
  );

  return (
    <dl
      className={clsx(
        'mt-10 w-full min-w-0 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-500 lg:max-w-md',
        mobileCarousel &&
          'flex items-stretch gap-4 overflow-x-auto pb-2 mb-0 px-6 -mx-6 !w-[calc(100%+3rem)] snap-x snap-mandatory scrollbar-hide lg:block lg:overflow-visible lg:pb-0 lg:px-0 lg:mx-0 lg:!w-auto',
        className,
      )}
    >
      {keyPoints.map((keyPoint, index) => {
        return (
          <div
            key={index}
            className={clsx(
              'last:mb-0',
              keyPoint.description ? 'mb-8' : 'mb-2',
              mobileCarousel &&
                'snap-center shrink-0 w-[85vw] max-w-sm rounded-lg bg-neutral-500/10 p-3 lg:w-auto lg:mb-8 lg:bg-transparent',
            )}
          >
            <dt className="inline text-lg font-semibold text-gray-900 dark:text-gray-100">
              {iconWithProps} {keyPoint.title}.
            </dt>{' '}
            {keyPoint.description ? (
              <dd
                className={clsx(
                  'leading-normal',
                  descriptionStyle === 'inline' ? 'inline' : '',
                )}
              >
                {keyPoint.description}
              </dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
};
