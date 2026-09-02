"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OdometerNumber } from "./odometer-counter";
import { MagneticButton } from "./magnetic-button";
import { playSwitchSound } from "@/lib/sound";

type BillingCycle = "monthly" | "annual";

interface PlanItem {
  name: string;
  badge?: string;
  monthly: number;
  annual: number;
  domainSpec: string;
  visitSpec: string;
  summary: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

const plans: PlanItem[] = [
  {
    name: "Starter",
    monthly: 199,
    annual: 1990,
    domainSpec: "1 Domain",
    visitSpec: "500 tracked visits / mo",
    summary: "For founder-led sales teams ready to stop flying blind.",
    features: [
      "1 Production website domain",
      "500 Deterministic visits / month",
      "5 Active routing & rewrite rules",
      "Native HubSpot CRM integration",
      "Standard email & chat support",
    ],
    cta: "Start 14-day free trial",
    href: "https://app.churnaut.com",
  },
  {
    name: "Growth",
    badge: "MOST POPULAR",
    monthly: 399,
    annual: 3990,
    domainSpec: "3 Domains",
    visitSpec: "5,000 tracked visits / mo",
    summary: "For teams turning outbound momentum into closed revenue.",
    features: [
      "3 Production website domains",
      "5,000 Deterministic visits / month",
      "Unlimited routing & personalization rules",
      "Scout AI Deal Intelligence engine",
      "HubSpot, Pipedrive, Zoho & Close",
      "Priority 1-on-1 Slack channel support",
    ],
    cta: "Start 14-day free trial",
    href: "https://app.churnaut.com",
    featured: true,
  },
  {
    name: "Pro",
    badge: "SCALE & TEAMS",
    monthly: 799,
    annual: 7990,
    domainSpec: "10 Domains",
    visitSpec: "Unlimited tracked visits",
    summary: "For high-velocity outbound teams requiring total signal infrastructure.",
    features: [
      "10 Production website domains",
      "Unlimited deterministic visits / month",
      "Multi-rep routing & team permissions",
      "Real-time webhook & Salesforce data bus",
      "Custom domain masking & sub-12ms edge",
      "Dedicated onboarding & routing architect",
    ],
    cta: "Start 14-day free trial",
    href: "https://app.churnaut.com",
  },
];

export function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const annual = billingCycle === "annual";

  const handleToggle = (cycle: BillingCycle) => {
    if (cycle !== billingCycle) {
      playSwitchSound();
      setBillingCycle(cycle);
    }
  };

  return (
    <div className="pricing-luxury-container">
      {/* Interactive Billing Cycle Toggle */}
      <div className="plan-billing relative" role="group" aria-label="Choose billing period">
        <button
          type="button"
          className={`plan-billing-option relative z-10 ${!annual ? "is-active" : ""}`}
          aria-pressed={!annual}
          onClick={() => handleToggle("monthly")}
          data-cursor="Monthly"
        >
          {!annual && (
            <motion.span
              layoutId="active-billing-pill"
              className="billing-pill-active"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-20">Monthly billing</span>
        </button>
        <button
          type="button"
          className={`plan-billing-option relative z-10 ${annual ? "is-active" : ""}`}
          aria-pressed={annual}
          onClick={() => handleToggle("annual")}
          data-cursor="Annual"
        >
          {annual && (
            <motion.span
              layoutId="active-billing-pill"
              className="billing-pill-active"
              transition={{ type: "spring", stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-20">
            Annual billing <span className="save-badge">Save 2 months</span>
          </span>
        </button>
      </div>

      {/* 3 Cohesive Edge-Lit Pricing Cards */}
      <div className="plan-grid" aria-live="polite">
        {plans.map((plan, index) => (
          <motion.article
            className={`plan-card luxury-pricing-card ${plan.featured ? "plan-card-featured" : ""}`}
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Glow & Badge for Featured */}
            {plan.featured && <div className="card-featured-glow" aria-hidden="true" />}
            {plan.badge && (
              <span className={`plan-tier-badge ${plan.featured ? "badge-featured" : ""}`}>
                {plan.badge}
              </span>
            )}

            {/* Plan Header & Volume Specs */}
            <div className="plan-topline">
              <div>
                <span className="plan-label">{plan.name}</span>
                <div className="plan-capacity-row">
                  <span className="capacity-pill">{plan.domainSpec}</span>
                  <span className="capacity-pill">{plan.visitSpec}</span>
                </div>
              </div>
            </div>

            {/* Price Row */}
            <div className="plan-price-block">
              <h3>
                <OdometerNumber prefix="$" value={annual ? plan.annual : plan.monthly} />
                <span className="price-cadence">/ {annual ? "year" : "month"}</span>
              </h3>
              <p className="price-subnote">
                {annual ? "Billed annually · 2 months free" : "Billed monthly · Cancel anytime"}
              </p>
            </div>

            <p className="plan-summary">{plan.summary}</p>

            {/* Feature List */}
            <ul className="plan-features-list">
              {plan.features.map((feature) => (
                <li key={feature} className="feature-item">
                  <svg className="feature-check" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="plan-cta-wrap">
              <MagneticButton
                href={plan.href}
                target="_blank"
                rel="noreferrer"
                beam={plan.featured}
                data-cursor="Trial"
                className={`button plan-action-btn ${plan.featured ? "btn-featured" : "btn-standard"}`}
              >
                {plan.cta} <span>→</span>
              </MagneticButton>
              <span className="cta-guarantee">14-day full access · No credit card required</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

