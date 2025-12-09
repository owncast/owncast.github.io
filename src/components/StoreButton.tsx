import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export type StoreType = "ios" | "tvos" | "android" | "amazon" | "roku";

interface StoreButtonProps {
  url: string;
  type: StoreType;
  width?: string;
  className?: string;
}

const StoreButton: React.FC<StoreButtonProps> = ({
  url,
  type,
  width = "200px",
  className = "",
}) => {
  const getImageSrc = (storeType: StoreType): string => {
    switch (storeType) {
      case "ios":
        return "/images/ios-app-store.svg";
      case "tvos":
        return "/images/tvos-app-store.svg";
      case "android":
        return "/images/google-play-store.png";
      case "amazon":
        return "/images/amazon-app-store.png";
      case "roku":
        return "/images/roku-channel-store.svg";
      default:
        return "/images/ios-app-store.svg";
    }
  };

  const getAltText = (storeType: StoreType): string => {
    switch (storeType) {
      case "ios":
        return "Download on the iPhone app store";
      case "tvos":
        return "Download on the Apple TV app store";
      case "android":
        return "Get it on Google Play";
      case "amazon":
        return "Available at Amazon Appstore";
      case "roku":
        return "Add to Roku";
      default:
        return "Download app";
    }
  };

  const imageSrc = getImageSrc(type);
  const altText = getAltText(type);

  return (
    <div style={{ textAlign: "center" }} className={className}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={altText}
      >
        <img
          src={useBaseUrl(imageSrc)}
          alt={altText}
          style={{ width, height: "auto" }}
        />
      </a>
    </div>
  );
};

export default StoreButton;
