import React from 'react';

export const TvosAppStoreWhite = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="h-full w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 158 40"
      {...props}
    >
      <rect x=".5" y=".5" width="157" height="39" rx="6.5" fill="#0C0D10" />
      <rect x=".5" y=".5" width="157" height="39" rx="6.5" stroke="#A6A6A6" />
      {/* Apple Logo */}
      <path
        d="M24.769 20.3a4.989 4.989 0 0 1 2.357-4.151 5.128 5.128 0 0 0-3.992-2.158c-1.679-.176-3.307 1.005-4.163 1.005-.872 0-2.19-.987-3.608-.958a5.359 5.359 0 0 0-4.473 2.728c-1.934 3.348-.491 8.27 1.361 10.976.927 1.325 2.01 2.805 3.428 2.753 1.387-.058 1.905-.885 3.58-.885 1.658 0 2.144.885 3.59.852 1.489-.024 2.426-1.332 3.32-2.67a10.96 10.96 0 0 0 1.52-3.092 4.824 4.824 0 0 1-2.92-4.4ZM22.037 12.211a4.872 4.872 0 0 0 1.115-3.49 4.957 4.957 0 0 0-3.208 1.66 4.678 4.678 0 0 0-1.143 3.36 4.148 4.148 0 0 0 3.236-1.53Z"
        fill="#fff"
      />
      {/* "Available on" text */}
      <text
        x="35"
        y="14"
        fill="#fff"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="10"
        fontWeight="400"
      >
        Available on
      </text>
      {/* "Apple TV" text */}
      <text
        x="35"
        y="29"
        fill="#fff"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="18"
        fontWeight="600"
      >
        Apple TV
      </text>
    </svg>
  );
};

export default TvosAppStoreWhite;
