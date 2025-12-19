import React from "react";
import { LandingBandSection } from "@/components/landing/LandingBand";
import { ChromeIcon, FigmaIcon, GithubIcon, FramerIcon } from "lucide-react";
import OBSIcon from "./obsstudio.svg";
import StreamLabsIcon from "./streamlabs.svg";
import FfmpegIcon from "./ffmpeg.svg";
import GoProIcon from "./gopro.svg";
import BlackMagicDesignIcon from "./blackmagicdesign.svg";
import VmixIcon from "./vmix.svg";

export function SoftwareCompatList() {
  return (
    <LandingBandSection
      title="Compatible with your favorite broadcasting tools"
      description="Point your broadcast at your new Owncast server and you'll be live using a server you control."
      supportingComponent={
        <>
          <a href="https://obsproject.com/" target="_blank" rel="noreferrer">
            <OBSIcon className="w-12 h-12" stroke="black" strokeWidth="1.3" />
          </a>
          <a href="https://streamlabs.com/" target="_blank" rel="noreferrer">
            <StreamLabsIcon className="w-12 h-12" />
          </a>
          <a href="https://ffmpeg.org/" target="_blank" rel="noreferrer">
            <FfmpegIcon className="w-12 h-12" />
          </a>
          <a href="https://gopro.com/" target="_blank" rel="noreferrer">
            <GoProIcon className="w-12 h-12" />
          </a>
          <a
            href="https://www.blackmagicdesign.com/products/atemmini"
            target="_blank"
            rel="noreferrer"
          >
            <BlackMagicDesignIcon
              className="w-12 h-12"
              stroke="black"
              strokeWidth="1.3"
            />
          </a>
          <a href="https://www.vmix.com/" target="_blank" rel="noreferrer">
            <VmixIcon className="w-14 h-14" />
          </a>
        </>
      }
    />
  );
}
