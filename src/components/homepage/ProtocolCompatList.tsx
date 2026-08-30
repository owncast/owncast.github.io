import React from "react";
import { translate } from "@docusaurus/Translate";
import { LandingBandSection } from "@/components/landing/LandingBand";
import HLSIcon from "./hls.svg";
import RTMPIcon from "./rtmp.svg";
import ObjectStorageIcon from "./objectstorage.svg";
import ActivityPubLogo from "./activitypub-logo.svg";

export function ProtocolCompatList() {
  return (
    <LandingBandSection
      title={translate({
        id: "homepage.protocolCompat.title",
        message: "Uses open protocols and standards",
      })}
      description={translate({
        id: "homepage.protocolCompat.description",
        message:
          "Choose the tools, services, and software of your choice to work with Owncast.",
      })}
      className="!mt-0 !p-6"
      innerClassName="!max-w-full !px-6 !py-0 lg:!px-6 lg:!py-4"
      supportingClassName="!mt-0 !p-0"
      variant="secondary"
      supportingComponent={
        <div className="grid grid-cols-2 justify-items-center gap-2 w-full lg:flex lg:gap-4">
          <HLSIcon className="w-32 h-auto lg:w-40 lg:h-40" />
          <ObjectStorageIcon className="w-32 h-auto lg:w-40 lg:h-40" />
          <RTMPIcon className="w-32 h-auto lg:w-40 lg:h-40" />
          <ActivityPubLogo className="w-32 h-auto lg:w-40 lg:h-40" />
        </div>
      }
    />
  );
}
