import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { LandingFaqCollapsibleSection } from "@/components/landing/LandingFaqCollapsible";

export function FAQSection() {
  return (
    <LandingFaqCollapsibleSection
      className="py-4 lg:py-6"
      title={translate({
        id: "homepage.faq.title",
        message: "FAQ",
      })}
      description={translate({
        id: "homepage.faq.description",
        message: "Answers to common questions people ask about Owncast.",
      })}
      faqItems={[
        {
          question: translate({
            id: "homepage.faq.q1.question",
            message:
              "Should I move to Owncast from Twitch, YouTube, Facebook, or another platform?",
          }),
          answer: (
            <Translate
              id="homepage.faq.q1.answer"
              values={{
                probablyNot: <strong>probably not.</strong>,
              }}
            >
              {
                "Honestly, {probablyNot} Owncast is an alternative for when those platforms no longer meet your needs. If you are happy with your current platform, and the tradeoffs involved, there's no need to switch.\n\nBut if you're building a project that requires a live streaming component, or have an internal streaming requirement, or you're a media company who wants to create a 24/7 stream, then Owncast makes sense where other options do not.\n\nOr if you're somebody who has found other platforms no longer welcoming to you and your content, or you want to go a different direction, then building your own thing, taking your existing audience with you, and being responsible for your own destiny also makes a lot of sense."
              }
            </Translate>
          ),
        },
        {
          question: translate({
            id: "homepage.faq.q2.question",
            message: "Do the Owncast developers know what I'm streaming?",
          }),
          answer: (
            <Translate
              id="homepage.faq.q2.answer"
              values={{
                absolutelyNot: <strong>absolutely not.</strong>,
                directoryLink: (
                  <a href="/docs/directory">Owncast directory</a>
                ),
                socialLink: <a href="/docs/social">stream publicly posted</a>,
              }}
            >
              {
                "By default, {absolutelyNot} There is no way for anybody to know this but you and your viewers. However, if you choose to list your live stream on the {directoryLink}, or have the {socialLink} on the Fediverse, then more information about your content will be available to others."
              }
            </Translate>
          ),
        },
        {
          question: translate({
            id: "homepage.faq.q3.question",
            message:
              "Is it expensive to run Owncast? Somebody on Twitch said it's really expensive.",
          }),
          answer: (
            <Translate
              id="homepage.faq.q3.answer"
              values={{
                resourcesLink: (
                  <a href="/docs/resources-requirements">
                    up to you how much you wish
                  </a>
                ),
                costEmphasis: (
                  <strong>
                    The more you ask of your server, the more you'll need to pay
                    for computing.
                  </strong>
                ),
                scalingLink: <a href="/docs/scaling">scale up</a>,
                storageLink: <a href="/docs/storage">Object Storage</a>,
                removes: <strong>removes</strong>,
              }}
            >
              {
                "Owncast can run at a low-cost and run on modest hardware. Even a modern Raspberry Pi. It's generally {resourcesLink} to pay. {costEmphasis}\n\nMost people begin with a small server or even self-host on their own hardware. Starting with a simple configuration keeps things manageable. As your audience grows, you can {scalingLink} your hosting solution accordingly to manage increased traffic. Moving to {storageLink} generally {removes} most bandwidth concerns."
              }
            </Translate>
          ),
        },
        {
          question: translate({
            id: "homepage.faq.q4.question",
            message:
              "Is it hard to set up Owncast? Somebody on YouTube said it's really hard.",
          }),
          answer: (
            <Translate
              id="homepage.faq.q4.answer"
              values={{
                quickstartLink: (
                  <a href="/quickstart">step-by-step instructions</a>
                ),
              }}
            >
              {
                "Owncast is designed to be user-friendly and straightforward to set up. Our documentation provides {quickstartLink} to help you get started quickly."
              }
            </Translate>
          ),
        },
        {
          question: translate({
            id: "homepage.faq.q5.question",
            message:
              "I want to grow my audience. Can Owncast get me more viewers? TikTok gives me more viewers.",
          }),
          answer: (
            <>
              <Translate
                id="homepage.faq.q5.answer.intro"
                values={{
                  disappointed: (
                    <strong>
                      you'd be pretty disappointed when nobody showed up.
                    </strong>
                  ),
                }}
              >
                {
                  "If you were in a band, and went through all the work to write songs, practice, book a show, but didn't tell anybody about it, {disappointed}\n\nWe've all become accustomed to platforms hand feeding our content to the masses. In return, creators live by strict rules, limitations, and data harvesting.\n\nOwncast gives you the tools to build your own audience on your own terms. It does not do it for you, that's your job. However, there are some opportunities:"
                }
              </Translate>
              <ul className="list-disc pl-5">
                <li>
                  <Translate
                    id="homepage.faq.q5.answer.fediverse"
                    values={{
                      fediverseLink: <a href="/docs/social">Fediverse</a>,
                    }}
                  >
                    {
                      "Connect to the {fediverseLink}, allowing your stream to be discovered by users on Mastodon, Pleroma, and Misskey. Encourage people to follow and share your stream."
                    }
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="homepage.faq.q5.answer.directory"
                    values={{
                      directoryLink: (
                        <a href="/docs/directory">Owncast directory</a>
                      ),
                    }}
                  >
                    {
                      "List your stream in the {directoryLink}, making it discoverable by people browsing for new streams."
                    }
                  </Translate>
                </li>
              </ul>
              <Translate id="homepage.faq.q5.answer.conclusion">
                {
                  "Owncast may not be a good fit if you're looking to press \"Go Live\" and expect people to just show up."
                }
              </Translate>
            </>
          ),
        },
        {
          question: translate({
            id: "homepage.faq.q6.question",
            message:
              "I'm a representative of a media company looking to take down a live stream that says it's run by Owncast. Take it down, or else!",
          }),
          answer: (
            <Translate
              id="homepage.faq.q6.answer"
              values={{
                youProblem: <strong>Sounds like a you problem.</strong>,
              }}
            >
              {
                "{youProblem} Owncast is not involved and cannot be of any help to you. You'd be surprised how many people refuse to understand this."
              }
            </Translate>
          ),
        },
        {
          question: translate({
            id: "homepage.faq.q7.question",
            message:
              "Where can I chat with people about Owncast if I have questions?",
          }),
          answer: (
            <Translate
              id="homepage.faq.q7.answer"
              values={{
                docsLink: <a href="/docs">documentation</a>,
                contactLink: <a href="/contact">contact page</a>,
              }}
            >
              {
                "If our {docsLink} isn't answering your question, visit our {contactLink} for links to community chat rooms, issue trackers, and other ways to get in touch with the Owncast community and developers."
              }
            </Translate>
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
