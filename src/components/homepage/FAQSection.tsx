import React from "react";
import { LandingFaqCollapsibleSection } from "@/components/landing/LandingFaqCollapsible";

export function FAQSection() {
  return (
    <LandingFaqCollapsibleSection
      title="FAQ"
      description="Get answers to your questions about transforming your garden with Gnomie."
      faqItems={[
        {
          question: "Do the Owncast developers know what I'm streaming?",
          answer: (
            <>
              By default, <strong>absolutely not.</strong> There is no way for
              anybody to know this but you and your viewers. However, if you
              choose to list your live stream on the{" "}
              <a href="/docs/directory">Owncast directory</a>, or have the
              <a href="/docs/social"> stream publicly posted</a> on the
              Fediverse, then more information about your content will be
              available to others.
            </>
          ),
        },
        {
          question: "Is it expensive to run Owncast?",
          answer: (
            <>
              <div>
                Owncast can run at a low-cost and run on modest hardware. Even a
                modern Raspberry Pi. It's generally{" "}
                <a href="/docs/resources-requirements">
                  up to you how much you wish{" "}
                </a>
                to pay. The more you ask of your server, the more you'll need to
                pay for computing.
                <br />
                <br />
              </div>
              <div>
                Most people begin with a small server or even self-host on their
                own hardware. Starting with a simple configuration keeps things
                manageable. As your audience grows, you can{" "}
                <a href="/docs/scaling">scale up</a> your hosting solution
                accordingly to manage increased traffic. Moving to{" "}
                <a href="/docs/storage">Object Storage</a> generally removes
                most bandwidth concerns for around $5 a month.
              </div>
            </>
          ),
        },
        {
          question: "Is it hard to set up Owncast?",
          answer: (
            <>
              Owncast is designed to be user-friendly and straightforward to set
              up. Our documentation provides{" "}
              <a href="/quickstart">step-by-step instructions</a> to help you
              get started quickly.
            </>
          ),
        },
        {
          question:
            "I want to grow my audience. Can Owncast get me more viewers?",
          answer: (
            <>
              In general, we've all become accustomed to platforms hand feeding
              our content to the masses, and creators having to do nothing. In
              return, creators have to live by strict rules, limitations, data
              harvesting, and no-good, very bad stuff.
              <br />
              <br />
              Owncast is live streaming software that you control. It gives you
              the tools to build your own audience on your own terms. It does
              not do it for you, that's your job.
              <br />
              <br />
              However, there are some options.
              <ul className="list-disc pl-5">
                <li>
                  Owncast can optionally connect to the{" "}
                  <a href="/docs/social">Fediverse</a>, allowing your stream to
                  be discovered by a wider audience by users using software like
                  Pleroma, Misskey, and Mastodon. Make sure you encourage people
                  to follow your stream, and ask them to share it with their
                  followers.
                </li>
                <li>
                  You can list your stream in the{" "}
                  <a href="/docs/directory">Owncast directory</a>, making it
                  discoverable by people browsing for new streams to watch.
                  Additionally, some applications and services pull from the
                  directory, so your stream may be featured in other places as
                  well.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      withBackground
      withBackgroundGlow
      backgroundGlowVariant="primary"
      variant="primary"
    />
  );
}
