import React, { useState, useEffect, useCallback } from "react";
import styles from "./Contributors.module.css";

// Track which avatars have been replaced with owncat
const replacedAvatars = new Set<string>();

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface Donor {
  login: string;
  avatar_url?: string;
  html_url: string;
}

export interface ContributorsProps {
  /** Whether to show donors section (default: true) */
  showDonors?: boolean;
  /** Custom title for contributors section */
  contributorsTitle?: string;
  /** Custom title for donors section */
  donorsTitle?: string;
}

export default function Contributors({
  showDonors = true,
  contributorsTitle = "Contributors",
  donorsTitle = "Donors",
}: ContributorsProps): JSX.Element {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch contributors
        const contributorsResponse = await fetch("/data/contributors.json");
        if (!contributorsResponse.ok) {
          throw new Error("Failed to fetch contributors data");
        }
        const contributorsData = await contributorsResponse.json();

        // Filter out bots and copilot
        const filteredContributors = contributorsData.filter(
          (contributor: Contributor) =>
            !contributor.login.toLowerCase().includes("bot") &&
            !contributor.login.toLowerCase().includes("copilot")
        );

        // Deduplicate contributors based on html_url
        const deduplicatedContributors = filteredContributors.filter(
          (contributor: Contributor, index: number, self: Contributor[]) =>
            self.findIndex((c) => c.html_url === contributor.html_url) === index
        );

        // Sort contributors alphabetically by login
        const sortedContributors = deduplicatedContributors.sort(
          (a: Contributor, b: Contributor) =>
            a.login.toLowerCase().localeCompare(b.login.toLowerCase())
        );
        setContributors(sortedContributors);

        // Fetch donors if enabled
        if (showDonors) {
          const donorsResponse = await fetch("/data/donors.json");
          if (donorsResponse.ok) {
            const donorsData = await donorsResponse.json();

            // Filter out guest and incognito donors
            const filteredDonors = donorsData;
            // donorsData.filter(
            //   (donor: Donor) =>
            //     !donor.login.toLowerCase().includes("guest") &&
            //     !donor.login.toLowerCase().includes("incognito")
            // );

            // Deduplicate donors based on html_url
            const deduplicatedDonors = filteredDonors.filter(
              (donor: Donor, index: number, self: Donor[]) =>
                self.findIndex((d) => d.html_url === donor.html_url) === index
            );

            // Sort donors alphabetically by login
            const sortedDonors = deduplicatedDonors.sort((a: Donor, b: Donor) =>
              a.login.toLowerCase().localeCompare(b.login.toLowerCase())
            );
            setDonors(sortedDonors);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        console.error("Error loading contributors/donors data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showDonors]);

  // Detect if an image is a GitHub identicon by checking for vertical symmetry
  const isGitHubIdenticon = (img: HTMLImageElement): boolean => {
    try {
      const canvas = document.createElement("canvas");
      const size = 20; // Sample at small size for performance
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return false;

      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size);
      const pixels = imageData.data;

      // Check for vertical symmetry (GitHub identicons are vertically symmetric)
      let symmetricPixels = 0;
      let totalChecked = 0;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size / 2; x++) {
          const leftIdx = (y * size + x) * 4;
          const rightIdx = (y * size + (size - 1 - x)) * 4;

          totalChecked++;
          // Compare RGB values (allow small tolerance for compression artifacts)
          const rDiff = Math.abs(pixels[leftIdx] - pixels[rightIdx]);
          const gDiff = Math.abs(pixels[leftIdx + 1] - pixels[rightIdx + 1]);
          const bDiff = Math.abs(pixels[leftIdx + 2] - pixels[rightIdx + 2]);

          if (rDiff < 10 && gDiff < 10 && bDiff < 10) {
            symmetricPixels++;
          }
        }
      }

      // If more than 95% symmetric, it's likely an identicon
      const symmetryRatio = symmetricPixels / totalChecked;
      return symmetryRatio > 0.95;
    } catch {
      return false;
    }
  };

  // Component to handle avatar loading with fallback
  const AvatarImage = ({
    src,
    alt,
    className
  }: {
    src: string;
    alt: string;
    className: string;
  }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isOwncat, setIsOwncat] = useState(src.includes("owncat-head"));

    const handleError = useCallback(() => {
      const fallback = generateDefaultAvatar();
      setImgSrc(fallback);
      setIsOwncat(true);
    }, []);

    const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      // Skip if already replaced or if it's an owncat image
      if (imgSrc.includes("owncat-head")) return;

      // Check if it's a GitHub identicon
      if (isGitHubIdenticon(img)) {
        const fallback = generateDefaultAvatar();
        setImgSrc(fallback);
        setIsOwncat(true);
      }
    }, [imgSrc]);

    return (
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        crossOrigin="anonymous"
        className={`${className} ${isOwncat ? styles.squareContributorItem : ""}`}
        onError={handleError}
        onLoad={handleLoad}
      />
    );
  };

  const generateDefaultAvatar = (): string => {
    const colors = [
      "blue",
      "red",
      "green",
      "orange",
      "pink",
      "yellow",
      "teal",
      "indigo",
      "coral",
      "lime",
      "maroon",
      "",
    ];
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    const suffix = color ? `-${color}` : "";
    return `/images/owncat-head${suffix}.svg`;
  };

  // Detect GitHub default identicon avatars and other placeholder services
  const isDefaultAvatar = (url: string): boolean => {
    if (!url) return true;

    // GitHub identicons use IDs in specific ranges or have identicon in URL
    // Default GitHub avatars often have u/ID pattern with low IDs or specific markers
    const defaultPatterns = [
      /identicon/i,
      /gravatar\.com.*[?&]d=/i,  // Gravatar with default fallback
      /ui-avatars\.com/i,
      /robohash\.org/i,
      /placeholder/i,
      /default/i,
    ];

    return defaultPatterns.some(pattern => pattern.test(url));
  };

  const getAvatarUrl = (url: string | undefined): string => {
    if (!url || isDefaultAvatar(url)) {
      return generateDefaultAvatar();
    }
    return url;
  };

  if (loading) {
    return (
      <div className={styles.contributorsContainer}>
        <div className={styles.loading}>Loading contributors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.contributorsContainer}>
        <div className={styles.error}>Error loading contributors: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.contributorsContainer}>
      {/* Contributors Section */}
      {contributors.length > 0 && (
        <section>
          <h2>{contributorsTitle}</h2>
          <ul className={styles.contributorBox}>
            {contributors.map((contributor) => {
              const avatarUrl = getAvatarUrl(contributor.avatar_url);
              return (
                <li key={contributor.login} className={styles.contributorItem}>
                  <figure>
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={contributor.login}
                    >
                      <AvatarImage
                        src={avatarUrl}
                        alt={contributor.login}
                        className={styles.contributorAvatar}
                      />
                    </a>
                  </figure>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Donors Section */}
      {showDonors && (
        <section className={styles.donorBox}>
          <h2>{donorsTitle}</h2>
          <p>
            Help support the project by making a contribution at{" "}
            <a
              href="https://opencollective.com/owncast/donate"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenCollective.
            </a>
          </p>

          {donors.length > 0 && (
            <ul className={styles.contributorBox}>
              {donors.map((donor) => {
                const avatarUrl = getAvatarUrl(donor.avatar_url);
                return (
                  <li key={donor.login} className={styles.contributorItem}>
                    <figure>
                      <a
                        href={donor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={donor.login}
                      >
                        <AvatarImage
                          src={avatarUrl}
                          alt={donor.login}
                          className={styles.contributorAvatar}
                        />
                      </a>
                    </figure>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
