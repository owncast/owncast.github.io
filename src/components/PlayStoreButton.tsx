import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export type PlayStoreType = "android";

interface PlayStoreButtonProps {
  url: string;
  type: PlayStoreType;
  width?: string;
  className?: string;
}

const PlayStoreButton: React.FC<PlayStoreButtonProps> = ({
  url,
  type,
  width = "200px",
  className = "",
}) => {
  const imageSrc = "/images/google-play-store.png";
  const altText = "Get it on Google Play";

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

export default PlayStoreButton;
