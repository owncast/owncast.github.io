import clsx from 'clsx';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export interface SocialProofItem {
  imageSrc: string;
  name: string;
}

interface LandingAvatarProps extends SocialProofItem {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Shows an avatar image with owncat fallback on error.
 */
export const LandingAvatar = ({
  className,
  imageSrc,
  name,
  size = 'medium',
}: LandingAvatarProps) => {
  return (
    <Avatar
      className={clsx(
        'border-2 border-solid border-primary-100',
        size === 'small' ? 'w-6 h-6' : '',
        size === 'medium' ? 'h-9 w-9' : '',
        size === 'large' ? 'h-16 w-16' : '',
        className,
      )}
    >
      <AvatarImage src={imageSrc} alt={name} />
      <AvatarFallback>
        <img src="/images/owncat-head.svg" alt={name} className="w-full h-full" />
      </AvatarFallback>
    </Avatar>
  );
};
