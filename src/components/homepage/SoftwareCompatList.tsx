import React from "react";
import { LandingBandSection } from "@/components/landing/LandingBand";
import { ChromeIcon, FigmaIcon, GithubIcon, FramerIcon } from "lucide-react";
import OBSIcon from "./obsstudio.svg";
import StreamLabsIcon from "./streamlabs.svg";
import FfmpegIcon from "./ffmpeg.svg";
import GoProIcon from "./gopro.svg";
import BlackMagicDesignIcon from "./blackmagicdesign.svg";

export function SoftwareCompatList() {
  return (
    <LandingBandSection
      title="Compatible with your favorite broadcasting tools"
      description="Point your broadcast at your new Owncast server and you'll be live using a server you control."
      supportingComponent={
        <>
          <OBSIcon
            className="w-12 h-12"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <StreamLabsIcon className="w-12 h-12" />
          <FfmpegIcon className="w-12 h-12" />
          <GoProIcon className="w-12 h-12" />
          <BlackMagicDesignIcon
            className="w-12 h-12"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </>
      }
    />
  );
}
