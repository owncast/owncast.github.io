import React from 'react';

export const RokuChannelStoreBlack = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="h-full w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 158 40"
      {...props}
    >
      <rect x=".5" y=".5" width="157" height="39" rx="6.5" fill="#fff" />
      <rect x=".5" y=".5" width="157" height="39" rx="6.5" stroke="#000" />
      {/* Roku Logo - simplified "ROKU" text with distinctive styling */}
      <text
        x="12"
        y="26"
        fill="#662D91"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="16"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        ROKU
      </text>
      {/* "Add Channel" text */}
      <text
        x="60"
        y="15"
        fill="#000"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="8"
        fontWeight="400"
      >
        Available on
      </text>
      <text
        x="60"
        y="28"
        fill="#000"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="13"
        fontWeight="600"
      >
        Channel Store
      </text>
    </svg>
  );
};

export default RokuChannelStoreBlack;
