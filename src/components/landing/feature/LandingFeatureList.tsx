import { clsx } from 'clsx';
import { LandingFeature } from '@/components/landing/feature/LandingFeature';
import { GlowBg } from '@/components/shared/ui/glow-bg';

export interface FeatureListItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * A component meant to be used on the landing page.
 * It displays a grid list of features.
 *
 * Each feature has a title, description and icon.
 */
export const LandingFeatureList = ({
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  featureItems,
  mobileCarousel = false,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
}: {
  className?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  featureItems: FeatureListItem[];
  mobileCarousel?: boolean;
  withBackground?: boolean;
  withBackgroundGlow?: boolean;
  variant?: 'primary' | 'secondary';
  backgroundGlowVariant?: 'primary' | 'secondary';
}) => {
  return (
    <section
      className={clsx(
        'relative w-full flex justify-center items-center gap-8 py-4 lg:py-8 flex-col',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        withBackgroundGlow ? 'relative overflow-hidden' : '',
        className,
      )}
    >
      {withBackgroundGlow ? (
        <div className="hidden lg:flex justify-center w-full h-full absolute -bottom-1/2">
          <GlowBg
            className={clsx('w-full lg:w-2/3 h-auto z-0')}
            variant={backgroundGlowVariant}
          />
        </div>
      ) : null}

      <div
        className={clsx(
          'w-full px-6 max-w-full container-wide relative z-10',
          mobileCarousel ? 'py-0 lg:p-6' : 'py-4 lg:p-6',
        )}
      >
        {title ? (
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold leading-tight max-w-xs sm:max-w-none fancyHeading">
            {title}
          </h2>
        ) : (
          titleComponent
        )}

        {description ? (
          <p className="mt-3 md:mt-6 md:text-xl">{description}</p>
        ) : (
          descriptionComponent
        )}
        {mobileCarousel ? (
          <div className="mt-4 md:mt-12 flex gap-4 overflow-x-auto px-6 -mx-6 w-[calc(100%+3rem)] pb-0 snap-x snap-mandatory scrollbar-hide sm:hidden">
            {featureItems.map((featureItem, index) => (
              <div
                key={index}
                className="snap-center shrink-0 w-[85vw] max-w-sm rounded-lg bg-neutral-500/10 p-3"
              >
                <LandingFeature
                  title={featureItem.title}
                  description={featureItem.description}
                  icon={featureItem.icon}
                  variant={variant}
                />
              </div>
            ))}
          </div>
        ) : null}

        <div
          className={clsx(
            'mt-4 md:mt-12',
            mobileCarousel
              ? 'hidden sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-1 md:grid-cols-3 md:gap-x-12 md:gap-y-2'
              : 'flex flex-col sm:grid sm:grid-cols-2 gap-x-6 gap-y-1 md:gap-x-12 md:gap-y-2',
          )}
        >
          {featureItems.map((featureItem, index) => (
            <LandingFeature
              key={index}
              title={featureItem.title}
              description={featureItem.description}
              icon={featureItem.icon}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
