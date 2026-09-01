import React from 'react';

export function AndroidInstallButton() {
  return (
    <a
      className="button button--secondary h-10 inline-flex items-center gap-2 border !border-black"
      href="/apps/owncasts/android/"
    >
      <img
        src="/images/devices/android.svg"
        alt=""
        aria-hidden="true"
        className="homepage-android-install-icon h-5 w-5"
        data-no-image-zoom
      />
      <span className="flex flex-col items-start justify-center leading-none">
        <span className="text-xs font-medium">Install on</span>
        <span>Android</span>
      </span>
    </a>
  );
}
