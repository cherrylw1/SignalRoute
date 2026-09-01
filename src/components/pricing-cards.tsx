"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OdometerNumber } from "./odometer-counter";
import { MagneticButton } from "./magnetic-button";

type BillingCycle = "monthly" | "annual";

const plans = [
  { name: "Starter", monthly: 199, annual: 1990, summary: "For founder-led teams ready to stop flying blind.", features: ["1 domain", "500 tracked visits / month", "5 routing rules", "HubSpot integration"], cta: "Start 14-day free trial", href: "https://app.churnaut.com" },
  { name: "Growth", monthly: 399, annual: 3990, summary: "For teams turning buyer intent into a repeatable edge.", features: ["3 domains and 5,000 visits", "Unlimited routing rules", "Scout AI deal intelligence", "HubSpot, Pipedrive, Zoho and Close"], cta: "Start 14-day free trial", href: "https://app.churnaut.com", featured: true },
  { name: "Pro", monthly: 799, annual: 7990, summary: "For sales teams that need a complete signal system.", features: ["10 domains and unlimited visits", "Multi-rep management", "Advanced integrations", "Dedicated onboarding"], cta: "Talk to us", href: "https://cal.com/sharath.mb/demo" },
];

export function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const annual = billingCycle === "annual";

  return (
    <>
      <div className="plan-billing relative" role="group" aria-label="Choose billing period">
        <button
          type="button"
          className={`plan-billing-option relative z-10 ${!annual ? "is-active" : ""}`}
          aria-pressed={!annual}
          onClick={() => setBillingCycle("monthly")}
          data-cursor="Select"
        >
          {!annual && (
            <motion.span
              layoutId="active-billing-pill"
              className="billing-pill-active"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-20">Monthly</span>
        </button>
        <button
          type="button"
          className={`plan-billing-option relative z-10 ${annual ? "is-active" : ""}`}
          aria-pressed={annual}
          onClick={() => setBillingCycle("annual")}
          data-cursor="Select"
        >
          {annual && (
            <motion.span
              layoutId="active-billing-pill"
              className="billing-pill-active"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-20">
            Annual <span>Save 2 months</span>
          </span>
        </button>
      </div>

      <div className="plan-grid" aria-live="polite">
        {plans.map((plan, index) => (
          <motion.article
            className={`plan-card ${plan.featured ? "plan-card-featured has-border-beam" : ""}`}
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
          >
            {plan.featured && <span className="popular-badge">Most complete</span>}
            {plan.featured && <span className="border-beam-ring" aria-hidden="true" />}
            <div className="plan-topline">
              <span className="plan-label">{plan.name}</span>
              <small>{annual ? "Annual" : "Monthly"}</small>
            </div>
            <h3>
              <OdometerNumber prefix="$" value={annual ? plan.annual : plan.monthly} />
              <span>/ {annual ? "year" : "month"}</span>
            </h3>
            <p>{plan.summary}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <MagneticButton
              href={plan.href}
              target="_blank"
              rel="noreferrer"
              beam={plan.featured}
              data-cursor="Start"
              className={`button ${plan.featured ? "button-signal" : "button-outline"}`}
            >
              {plan.cta}
            </MagneticButton>
          </motion.article>
        ))}
      </div>
    </>
  );
}
