import React, { useRef, useState } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import { Scale, Palette, Gift, Code2, Plane, Radio } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { FinancialSupporters } from "@/components/FinancialSupporters";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import type { FundingData, FundingGoal } from "@/types/funding";
import styles from "./donate.module.css";

const OPEN_COLLECTIVE_PROFILE =
  "https://opencollective.com/owncast/donate/profile";
const OPEN_COLLECTIVE_DONATE = "https://opencollective.com/owncast/donate";

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${new Intl.NumberFormat("en-US").format(amount)} ${currency}`;
  }
}

function getUpdatedAt(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  return {
    dateTime: date.toISOString(),
    label: `${new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(date)} UTC`,
  };
}

function GoalCard({ goal, currency }: { goal: FundingGoal; currency: string }) {
  const progress =
    goal.progress !== null && Number.isFinite(goal.progress)
      ? Math.max(0, Math.min(goal.progress, 100))
      : null;
  const progressLabel = translate({
    id: "donate.goal.progressLabel",
    message: "Progress for {goal}",
  }, { goal: goal.title });

  let kindLabel: React.ReactNode;
  let amountUnit: React.ReactNode = null;
  if (goal.type === "monthlyBudget") {
    kindLabel = (
      <Translate id="donate.goal.monthlyBudget">Estimated monthly budget</Translate>
    );
    amountUnit = <Translate id="donate.goal.perMonth">/ month</Translate>;
  } else if (goal.type === "yearlyBudget") {
    kindLabel = (
      <Translate id="donate.goal.yearlyBudget">Estimated yearly budget</Translate>
    );
    amountUnit = <Translate id="donate.goal.perYear">/ year</Translate>;
  } else if (goal.type === "balance") {
    kindLabel = <Translate id="donate.goal.balance">Balance target</Translate>;
  } else {
    kindLabel = <Translate id="donate.goal.target">Funding goal</Translate>;
  }

  return (
    <article className={styles.goalCard}>
      <p className={styles.goalKind}>{kindLabel}</p>
      <h3 className={styles.goalTitle}>{goal.title}</h3>
      {goal.description ? (
        <p className={styles.goalDescription}>{goal.description}</p>
      ) : null}
      <div className={styles.goalTarget}>
        <span>
          <Translate id="donate.goal.targetLabel">Target</Translate>
        </span>
        <strong>
          {formatCurrency(goal.amount, currency)}
          {amountUnit ? <span className={styles.goalUnit}> {amountUnit}</span> : null}
        </strong>
      </div>
      {progress !== null ? (
        <div className={styles.goalProgress}>
          <progress
            className={styles.progressBar}
            value={progress}
            max={100}
            aria-label={progressLabel}
          />
          <span className={styles.progressValue}>
            <Translate
              id="donate.goal.progressValue"
              values={{ percent: Math.round(progress) }}
            >
              {"{percent}% of target"}
            </Translate>
          </span>
        </div>
      ) : null}
    </article>
  );
}

export default function DonatePage(): React.ReactElement {
  const fundingData = usePluginData("owncast-funding") as FundingData | undefined;
  const funding = fundingData?.available ? fundingData : undefined;
  const currency = funding?.currency ?? "";
  const presets =
    funding?.presets.filter((amount) => Number.isFinite(amount) && amount > 0) ??
    [];
  const [selectedAmount, setSelectedAmount] = useState("10");
  const amountInput = useRef<HTMLInputElement>(null);
  const amount = selectedAmount;
  const amountStep = 10 ** -(currency
    ? new Intl.NumberFormat("en-US", { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2
    : 2);
  const minimumMonthlyAmount =
    funding &&
    funding.minimumAmount !== null &&
    Number.isFinite(funding.minimumAmount) &&
    funding.minimumAmount > 0
      ? funding.minimumAmount
      : amountStep;
  const updatedAt = getUpdatedAt(funding?.fetchedAt ?? null);
  const goals = funding?.goals ?? [];

  function setCheckoutMinimum(minimum: number) {
    amountInput.current?.setAttribute("min", String(minimum));
  }
  return (
    <Layout
      title={translate({ id: "donate.page.title", message: "Donate to Owncast" })}
      description={translate({
        id: "donate.page.description",
        message:
          "Help sustain Owncast, the free and open-source live video and chat server.",
      })}
    >
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>
              <Translate id="donate.hero.eyebrow">Support the project</Translate>
            </p>
            <h1>
              <Translate id="donate.hero.title">
                Independent live video, powered by people.
              </Translate>
            </h1>
            <p className={styles.heroDescription}>
              <Translate id="donate.hero.description">
                Owncast is free, open-source software for live video and chat. Your support helps keep the project running and moving forward for everyone.
              </Translate>
            </p>
            {funding &&
            ((funding.monthlyIncome !== null &&
              Number.isFinite(funding.monthlyIncome)) ||
              (funding.supporterCount !== null &&
                Number.isFinite(funding.supporterCount))) ? (
              <div
                className={styles.supportStats}
                role="group"
                aria-label={translate({
                  id: "donate.stats.label",
                  message: "Current recurring support",
                })}
              >
                {funding.monthlyIncome !== null &&
                Number.isFinite(funding.monthlyIncome) ? (
                  <div className={styles.stat}>
                    <strong>{formatCurrency(funding.monthlyIncome, currency)}</strong>
                    <span>
                      <Translate id="donate.stats.monthlySupport">
                        current monthly recurring support
                      </Translate>
                    </span>
                  </div>
                ) : null}
                {funding.supporterCount !== null &&
                Number.isFinite(funding.supporterCount) ? (
                  <div className={styles.stat}>
                    <strong>
                      {new Intl.NumberFormat("en-US").format(
                        funding.supporterCount,
                      )}
                    </strong>
                    <span>
                      <Translate id="donate.stats.activeSupporters">
                        active recurring contributors
                      </Translate>
                    </span>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className={styles.dataNotice} role="status">
                {funding ? (
                  <Translate id="donate.stats.unavailable">
                    Current recurring support figures are not available for this update.
                  </Translate>
                ) : (
                  <Translate id="donate.data.unavailable">
                    Live funding information is temporarily unavailable. You can still support Owncast below.
                  </Translate>
                )}
              </p>
            )}
          </header>

          <div className={styles.mainGrid}>
            <section
              className={styles.contributeCard}
              id="contribute"
              aria-labelledby="contribute-title"
            >
              <div className={styles.cardIntro}>
                <p className={styles.eyebrow}>
                  <Translate id="donate.contribute.eyebrow">Give directly</Translate>
                </p>
                <h2 id="contribute-title">
                  <Translate id="donate.contribute.title">
                    Help keep Owncast going
                  </Translate>
                </h2>
                <p>
                  <Translate id="donate.contribute.description">
                    Choose an amount that works for you. Monthly contributions provide dependable support; a one-time gift is welcome too.
                  </Translate>
                </p>
              </div>

              <form
                className={styles.donationForm}
                action={OPEN_COLLECTIVE_PROFILE}
                method="get"
              >
                {presets.length > 0 ? (
                  <fieldset className={styles.presetFieldset}>
                    <legend>
                      <Translate id="donate.amount.choose">
                        Choose an amount
                      </Translate>
                    </legend>
                    <div className={styles.presets}>
                      {presets.map((preset, index) => {
                        const isSelected = Number(amount) === preset;
                        const label = formatCurrency(preset, currency);
                        return (
                          <Button
                            key={`${preset}-${index}`}
                            type="button"
                            size="sm"
                            variant={isSelected ? "primary" : "outlinePrimary"}
                            aria-label={translate({
                              id: "donate.amount.presetLabel",
                              message: "Select a contribution of {amount}",
                            }, { amount: label })}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedAmount(String(preset))}
                          >
                            {label}
                          </Button>
                        );
                      })}
                    </div>
                  </fieldset>
                ) : null}

                <div className={styles.customAmount}>
                  <Label htmlFor="donation-amount">
                    <Translate id="donate.amount.customLabel">
                      Donation amount
                    </Translate>
                  </Label>
                  <div className={styles.inputWrap}>
                    <Input
                      ref={amountInput}
                      id="donation-amount"
                      className={`${styles.amountInput} text-base`}
                      type="number"
                      name="amount"
                      inputMode="decimal"
                      step={amountStep}
                      min={minimumMonthlyAmount}
                      value={amount}
                      onChange={(event) => setSelectedAmount(event.target.value)}
                      required
                      aria-describedby="amount-help"
                    />
                    {currency ? (
                      <span className={styles.currencyCode} aria-hidden="true">
                        {currency}
                      </span>
                    ) : null}
                  </div>
                  <p className={styles.inputHelp} id="amount-help">
                    {funding &&
                    funding.minimumAmount !== null &&
                    Number.isFinite(funding.minimumAmount) &&
                    funding.minimumAmount > 0 ? (
                      <Translate
                        id="donate.amount.minimum"
                        values={{
                          amount: formatCurrency(
                            funding.minimumAmount,
                            currency,
                          ),
                        }}
                      >
                        {"Monthly contributions require at least {amount}. You can enter a decimal amount."}
                      </Translate>
                    ) : (
                      <Translate id="donate.amount.help">
                        Enter a positive amount. You can use decimals supported by your currency.
                      </Translate>
                    )}
                  </p>
                </div>

                <div className={styles.checkoutButtons}>
                  <Button
                    type="submit"
                    name="interval"
                    value="month"
                    variant="primary"
                    size="lg"
                    onClick={() => setCheckoutMinimum(minimumMonthlyAmount)}
                  >
                    <Translate id="donate.amount.monthlyAction">
                      Give monthly
                    </Translate>
                  </Button>
                  <Button
                    type="submit"
                    name="interval"
                    value="one-time"
                    variant="outlinePrimary"
                    size="lg"
                    onClick={() => setCheckoutMinimum(amountStep)}
                  >
                    <Translate id="donate.amount.oneTimeAction">
                      Give once
                    </Translate>
                  </Button>
                </div>
                <p className={styles.checkoutNote}>
                  <Translate id="donate.checkout.note">
                    Checkout and payment processing are handled by Open Collective.
                  </Translate>
                </p>
                {!funding ? (
                  <p className={styles.directLink}>
                    <a href={OPEN_COLLECTIVE_DONATE}>
                      <Translate id="donate.checkout.directLink">
                        Continue directly to Open Collective
                      </Translate>
                    </a>
                  </p>
                ) : null}
              </form>
            </section>

            <aside className={styles.purposeCard}>
              <p className={styles.eyebrow}>
                <Translate id="donate.purpose.eyebrow">What your support helps</Translate>
              </p>
              <h2>
                <Translate id="donate.purpose.title">
                  A community project with real-world needs
                </Translate>
              </h2>
              <p>
                <Translate id="donate.purpose.infrastructure">
                  Contributions help pay for the services and infrastructure that keep Owncast available, tested, and reliable.
                </Translate>
              </p>
              <p>
                <Translate id="donate.purpose.building">
                  Support helps us build new features and improve Owncast, while keeping it reliable for the people who depend on it.
                </Translate>
              </p>
              <div className={styles.transparency}>
                <h3>
                  <Translate id="donate.transparency.title">
                    Open books, open project
                  </Translate>
                </h3>
                <p>
                  <Translate id="donate.transparency.description">
                    Review Owncast’s budget and transaction history through Open Collective.
                  </Translate>
                </p>
                <ul>
                  <li>
                    <a
                      href="https://opencollective.com/owncast/budget"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Translate id="donate.transparency.budget">
                        View the Open Collective budget
                      </Translate>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://opencollective.com/owncast/transactions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Translate id="donate.transparency.transactions">
                        View transactions
                      </Translate>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <section className={styles.fundedSection} aria-labelledby="funded-title">
            <h2 id="funded-title">
              <Translate id="donate.funded.title">What donations have made possible</Translate>
            </h2>
            <p>
              <Translate id="donate.funded.description">
                Beyond day-to-day running costs, community donations have directly funded:
              </Translate>
            </p>
            <ul className={styles.fundedList}>
              <li>
                <Scale aria-hidden="true" />
                <Translate id="donate.funded.trademark">Registering the Owncast trademark</Translate>
              </li>
              <li>
                <Palette aria-hidden="true" />
                <Translate id="donate.funded.creativeWork">Creating illustrations, designs, and videos</Translate>
              </li>
              <li>
                <Gift aria-hidden="true" />
                <Translate id="donate.funded.outreachMaterials">Producing stickers, pins, and flyers for conferences and meetups</Translate>
              </li>
            </ul>
          </section>

          <section className={styles.possibilitiesSection} aria-labelledby="possibilities-title">
            <div className={styles.sectionHeading}>
              <h2 id="possibilities-title">
                <Translate id="donate.possibilities.title">What more support could make possible</Translate>
              </h2>
              <p>
                <Translate id="donate.possibilities.introduction">
                  With more dependable funding, we could:
                </Translate>
              </p>
            </div>
            <div className={styles.possibilitiesGrid}>
              <article>
                <Code2 aria-hidden="true" />
                <h3><Translate id="donate.possibilities.developmentTitle">Fund dedicated development time</Translate></h3>
                <p>
                  <Translate id="donate.possibilities.development">
                    Pay for focused time to build new features and improve Owncast.
                  </Translate>
                </p>
              </article>
              <article>
                <Plane aria-hidden="true" />
                <h3><Translate id="donate.possibilities.travelTitle">Connect with communities in person</Translate></h3>
                <p>
                  <Translate id="donate.possibilities.travel">
                    Cover travel to conferences and meetups to share Owncast, learn from streamers, and meet potential contributors.
                  </Translate>
                </p>
              </article>
              <article>
                <Radio aria-hidden="true" />
                <h3><Translate id="donate.possibilities.eventsTitle">Support independent events</Translate></h3>
                <p>
                  <Translate id="donate.possibilities.events">
                    Sponsor Owncast livestreaming servers for indie events, helping communities stream without depending on commercial platforms.
                  </Translate>
                </p>
              </article>
            </div>
          </section>

          <section className={styles.goalsSection} aria-labelledby="goals-title">
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>
                <Translate id="donate.goals.eyebrow">Funding priorities</Translate>
              </p>
              <h2 id="goals-title">
                <Translate id="donate.goals.title">Current funding goals</Translate>
              </h2>
              <p>
                <Translate id="donate.goals.description">
                  These goals are published by Owncast on Open Collective. Budget estimates are distinct from current monthly recurring support.
                </Translate>
              </p>
            </div>
            {goals.length > 0 ? (
              <div className={styles.goalGrid}>
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} currency={currency} />
                ))}
              </div>
            ) : (
              <p className={styles.emptyGoals}>
                {funding ? (
                  <Translate id="donate.goals.none">
                    No active funding goals are currently published.
                  </Translate>
                ) : (
                  <Translate id="donate.goals.unavailable">
                    Funding goals are temporarily unavailable.
                  </Translate>
                )}
              </p>
            )}
          </section>
          <section className={styles.corporateCard} aria-labelledby="corporate-title">
            <div>
              <h2 id="corporate-title">
                <Translate id="donate.corporate.title">Corporate sponsorship</Translate>
              </h2>
              <p>
                <Translate id="donate.corporate.invitation">
                  Does your organization believe in independent livestreaming? We welcome corporate sponsors who want to help sustain Owncast.
                </Translate>
              </p>
              <p>
                <Translate id="donate.corporate.fullTimeDevelopment">
                  Long-term sponsorship can make full-time development possible. Owncast remains independent and open source, with project decisions made by its maintainers.
                </Translate>
              </p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <a href="mailto:gabek@real-ity.com?subject=Owncast%20corporate%20sponsorship">
                <Translate id="donate.corporate.action">Talk to us about sponsorship</Translate>
              </a>
            </Button>
          </section>
          <FinancialSupporters showPast />

          <footer className={styles.pageFooter}>
            {updatedAt ? (
              <p>
                <Translate id="donate.updatedAt">Funding information last updated</Translate>{" "}
                <time dateTime={updatedAt.dateTime}>{updatedAt.label}</time>
              </p>
            ) : null}
          </footer>
        </div>
      </main>
    </Layout>
  );
}
