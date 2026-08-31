import React, { useEffect, useState } from 'react';
import mediumZoom from 'medium-zoom';
import Translate, { translate } from '@docusaurus/Translate';
import { LandingProductCardSection, LandingAppStoreButton } from '@/components/landing';
import { AndroidInstallButton } from '@/components/AndroidInstallButton';

export function AppsList() {
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    const zoom = mediumZoom('.homepage-native-apps img:not([data-no-image-zoom])');
    return () => {
      zoom.detach();
    };
  }, []);
  useEffect(() => {
    setIsIPhone(navigator.userAgent.includes('iPhone'));
  }, []);

  return (
    <LandingProductCardSection
      className="homepage-native-apps"
      title={translate({
        id: 'homepage.apps.title',
        message: 'Owncast works everywhere',
      })}
      descriptionComponent={
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-semibold max-w-4xl mb-4 md:mb-8">
          <Translate id="homepage.apps.description">
            Because Owncast is built on open standards you can watch an Owncast-powered stream on
            any device. But if you want, we've built some easy ways to watch that work out of the
            box.
          </Translate>
        </p>
      }
      products={[
        {
          title: translate({
            id: 'homepage.apps.owncasts.title',
            message: 'Owncasts apps',
          }),
          description: translate({
            id: 'homepage.apps.owncasts.description',
            message:
              'Browse the directory, add private servers, and get notified when streams go live.',
          }),
          imageSrc: '/images/devices/iphone-ipad/owncasts-ios-directory.png',
          imageClassName: 'homepage-native-app-screenshot homepage-native-app-screenshot-cropped',
          imageContainerClassName: 'aspect-square lg:aspect-auto lg:h-48',
          actionComponent: (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <LandingAppStoreButton appStore="ios-appstore" asChild>
                <a
                  href="https://apps.apple.com/us/app/owncasts/id6451178968"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </LandingAppStoreButton>
              <AndroidInstallButton />
            </div>
          ),
        },
        ...(!isIPhone
          ? [
              {
                title: translate({
                  id: 'homepage.apps.roku.title',
                  message: 'Owncasts for Roku',
                }),
                description: translate({
                  id: 'homepage.apps.roku.description',
                  message:
                    'The Roku channel lets you browse the Owncasst directory and add private servers. A very convenient way to watch live streams on the most popular set-top box.',
                }),
                imageSrc: '/images/devices/roku/owncasts-roku-home.jpg',
                imageClassName: 'homepage-native-app-screenshot',
                actionComponent: (
                  <LandingAppStoreButton appStore="roku-channelstore" asChild>
                    <a
                      href="https://channelstore.roku.com/details/2179326b6b85869a1a3a18d48ca76de6/owncasts"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </LandingAppStoreButton>
                ),
              },
              {
                title: translate({
                  id: 'homepage.apps.appletv.title',
                  message: 'Owncasts for AppleTV',
                }),
                description: translate({
                  id: 'homepage.apps.appletv.description',
                  message:
                    'For users of AppleTV, this app provides an easy way to access the Owncast directory and your favorite streams right from your TV.',
                }),
                imageSrc: '/images/devices/apple-tv/owncasts-tvos-home.png',
                imageClassName: 'homepage-native-app-screenshot',
                actionComponent: (
                  <LandingAppStoreButton appStore="tvos-appstore" asChild>
                    <a
                      href="https://apps.apple.com/us/app/owncasts/id6451178968"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </LandingAppStoreButton>
                ),
              },
            ]
          : []),
      ]}
    />
  );
}
