import React from "react";
import { translate } from "@docusaurus/Translate";
import {
  LandingProductCardSection,
  LandingAppStoreButton,
} from "@/components/landing";

export function AppsList() {
  return (
    <LandingProductCardSection
      title={translate({
        id: "homepage.apps.title",
        message: "Owncast works everywhere",
      })}
      withBackground
      description={translate({
        id: "homepage.apps.description",
        message:
          "Because Owncast is built on open standards you can watch an Owncast-powered stream on any device. But if you want, we've built some easy ways to watch that work out of the box.",
      })}
      products={[
        {
          title: translate({
            id: "homepage.apps.ios.title",
            message: "Owncasts for iOS",
          }),
          description: translate({
            id: "homepage.apps.ios.description",
            message:
              "Browse the directory, add private servers, and get notified when streams go live on the iPhone.",
          }),
          imageSrc:
            "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/0d/14/93/0d149310-7032-5a4c-a23e-af5667fe8f5e/AppIcon-0-1x_U007epad-0-0-P3-85-220-0.png/400x400ia-75.webp",
          actionComponent: (
            <a href="https://apps.apple.com/us/app/owncasts/id6451178968">
              <LandingAppStoreButton appStore="ios-appstore" />
            </a>
          ),
        },
        {
          title: translate({
            id: "homepage.apps.roku.title",
            message: "Owncasts for Roku",
          }),
          description: translate({
            id: "homepage.apps.roku.description",
            message:
              "The Roku channel lets you browse the Owncasst directory and add private servers. A very convenient way to watch live streams on the most popular set-top box.",
          }),
          imageSrc: "/images/devices/roku/owncasts-roku-home.jpg",
          actionComponent: (
            <a href="https://apps.apple.com/us/app/owncasts/id6451178968">
              <LandingAppStoreButton appStore="roku-channelstore" />
            </a>
          ),
        },
        {
          title: translate({
            id: "homepage.apps.appletv.title",
            message: "Owncasts for AppleTV",
          }),
          description: translate({
            id: "homepage.apps.appletv.description",
            message:
              "For users of AppleTV, this app provides an easy way to access the Owncast directory and your favorite streams right from your TV.",
          }),
          imageSrc:
            "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/af/71/3e/af713ebb-2ca3-8bbc-019a-9da5c3efff11/d9a535e2-d0b8-49ba-9ad2-fd4b9f06802e_Screen_Shot_2023-08-10_at_9.51.07_PM.png/960x540bb.webp",
          actionComponent: (
            <a href="https://apps.apple.com/us/app/owncasts/id6451178968">
              <LandingAppStoreButton appStore="tvos-appstore" />
            </a>
          ),
        },
      ]}
    />
  );
}
