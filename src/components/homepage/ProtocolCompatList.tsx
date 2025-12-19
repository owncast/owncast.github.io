import React from "react";
import { LandingBandSection } from "@/components/landing/LandingBand";
import { ChromeIcon, FigmaIcon, GithubIcon, FramerIcon } from "lucide-react";
import HLSIcon from "./hls.svg";
import RTMPIcon from "./rtmp.svg";
import FediverseIcon from "./fediverse.svg";
import ObjectStorageIcon from "./objectstorage.svg";

export function ProtocolCompatList() {
  return (
    <LandingBandSection
      title="Uses open protocols and standards"
      description="Choose the tools and services of your choice to work with Owncast."
      withBackground
      className="!py-0 md:!py-0 [&>div]:!py-2"
      supportingComponent={
        <>
          <HLSIcon className="w-40 h-40" />
          <ObjectStorageIcon className="w-40 h-40" />
          <RTMPIcon className="w-40 h-40" />
          <FediverseIcon className="w-40 h-40" />
        </>
      }
    />
  );
}
