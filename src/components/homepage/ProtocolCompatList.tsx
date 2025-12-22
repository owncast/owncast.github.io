import React from "react";
import { LandingBandSection } from "@/components/landing/LandingBand";
import HLSIcon from "./hls.svg";
import RTMPIcon from "./rtmp.svg";
import ObjectStorageIcon from "./objectstorage.svg";
import ActivityPubLogo from "./activitypub-logo.svg";

export function ProtocolCompatList() {
  return (
    <LandingBandSection
      title="Uses open protocols and standards"
      description="Choose the tools and services of your choice to work with Owncast."
      className="!mt-0 lg:!mt-0"
      variant="secondary"
      supportingComponent={
        <div className="grid grid-cols-2 gap-4 w-full lg:flex lg:gap-4">
          <HLSIcon className="w-full h-auto lg:w-40 lg:h-40" />
          <ObjectStorageIcon className="w-full h-auto lg:w-40 lg:h-40" />
          <RTMPIcon className="w-full h-auto lg:w-40 lg:h-40" />
          <ActivityPubLogo className="w-full h-auto lg:w-40 lg:h-40" />
        </div>
      }
    />
  );
}
