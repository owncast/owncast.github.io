import React from "react";
import { LandingFaqCollapsibleSection } from "@/components/landing/LandingFaqCollapsible";

export function FAQSection() {
  return (
    <LandingFaqCollapsibleSection
      className="py-4 lg:py-6"
      title="FAQ"
      description="Answers to common questions people ask about Owncast."
      faqItems={[
        {
          question:
            "Should I move to Owncast from Twitch, YouTube, Facebook, or another platform?",
          answer: (
            <>
              Honestly, <strong>probably not.</strong> Owncast is an alternative
              for when those platforms no longer meet your needs. If you are
              happy with your current platform, and the tradeoffs involved,
              there's no need to switch.
              <br />
              <br />
              But if you're building a project that requires a live streaming
              component, or have an internal streaming requirement, or you're a
              media company who wants to create a 24/7 stream, then Owncast
              makes sense where other options do not.
              <br />
              <br />
              Or if you're somebody who has found other platforms no longer
              welcoming to you and your content, or you want to go a different
              direction, then building your own thing, taking your existing
              audience with you, and being responsible for your own destiny also
              makes a lot of sense.
            </>
          ),
        },
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
          question:
            "Is it expensive to run Owncast? Somebody on Twitch said it's really expensive.",
          answer: (
            <>
              <div>
                Owncast can run at a low-cost and run on modest hardware. Even a
                modern Raspberry Pi. It's generally{" "}
                <a href="/docs/resources-requirements">
                  up to you how much you wish{" "}
                </a>
                to pay.{" "}
                <strong>
                  The more you ask of your server, the more you'll need to pay
                  for computing.
                </strong>
                <br />
                <br />
              </div>
              <div>
                Most people begin with a small server or even self-host on their
                own hardware. Starting with a simple configuration keeps things
                manageable. As your audience grows, you can{" "}
                <a href="/docs/scaling">scale up</a> your hosting solution
                accordingly to manage increased traffic. Moving to{" "}
                <a href="/docs/storage">Object Storage</a> generally{" "}
                <strong>removes</strong> most bandwidth concerns.
              </div>
            </>
          ),
        },
        {
          question:
            "Is it hard to set up Owncast? Somebody on YouTube said it's really hard.",
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
            "I want to grow my audience. Can Owncast get me more viewers? TikTok gives me more viewers.",
          answer: (
            <>
              If you were in a band, and went through all the work to write
              songs, practice, book a show, but didn't tell anybody about it,
              <strong>
                {" "}
                you'd be pretty disappointed when nobody showed up.
              </strong>
              <br />
              <br />
              We've all become accustomed to platforms hand feeding our content
              to the masses. In return, creators live by strict rules,
              limitations, and data harvesting.
              <br />
              <br />
              Owncast gives you the tools to build your own audience on your own
              terms. It does not do it for you, that's your job. However, there
              are some opportunities:
              <ul className="list-disc pl-5">
                <li>
                  Connect to the <a href="/docs/social">Fediverse</a>, allowing
                  your stream to be discovered by users on Mastodon, Pleroma,
                  and Misskey. Encourage people to follow and share your stream.
                </li>
                <li>
                  List your stream in the{" "}
                  <a href="/docs/directory">Owncast directory</a>, making it
                  discoverable by people browsing for new streams.
                </li>
              </ul>
              Owncast may not be a good fit if you're looking to press "Go Live"
              and expect people to just show up.
            </>
          ),
        },
        {
          question:
            "I'm a representative of a media company looking to take down a live stream that says it's run by Owncast. Take it down, or else!",
          answer: (
            <>
              <strong>Sounds like a you problem.</strong> Owncast is not
              involved and cannot be of any help to you. You'd be surprised how
              many people refuse to understand this.
            </>
          ),
        },
        {
          question:
            "Where can I chat with people about Owncast if I have questions?",
          answer: (
            <>
              If our <a href="/docs">documentation</a> isn't answering your
              question, visit our <a href="/contact">contact page</a> for links
              to community chat rooms, issue trackers, and other ways to get in
              touch with the Owncast community and developers.
            </>
          ),
        },
      ]}
      withBackground
      withBackgroundGlow
      backgroundGlowVariant="secondary"
      variant="primary"
    />
  );
}
