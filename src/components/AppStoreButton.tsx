import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export type AppStoreType = "iphone" | "appletv";

interface AppStoreButtonProps {
  url: string;
  type: AppStoreType;
  width?: string;
  className?: string;
}

const AppStoreButton: React.FC<AppStoreButtonProps> = ({
  url,
  type,
  width = "200px",
  className = "",
}) => {
  const imageSrc =
    type === "iphone"
      ? "/images/ios-app-store.svg"
      : "/images/tvos-app-store.svg";
  const altText =
    type === "iphone"
      ? "Download on the iPhone app store"
      : "Download on the Apple TV app store";

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

export default AppStoreButton;
