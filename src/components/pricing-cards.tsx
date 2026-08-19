"use client";

import { useState } from "react";

type BillingCycle = "monthly" | "annual";

const plans = [
  { name: "Starter", monthly: 199, annual: 1990, summary: "For founder-led teams ready to stop flying blind.", features: ["1 domain", "500 tracked visits / month", "5 routing rules", "HubSpot integration"], cta: "Start 14-day free trial", href: "https://app.churnaut.com" },
  { name: "Growth", monthly: 399, annual: 3990, summary: "For teams turning buyer intent into a repeatable edge.", features: ["3 domains and 5,000 visits", "Unlimited routing rules", "Scout AI deal intelligence", "HubSpot, Pipedrive, Zoho and Close"], cta: "Start 14-day free trial", href: "https://app.churnaut.com", featured: true },
  { name: "Pro", monthly: 799, annual: 7990, summary: "For sales teams that need a complete signal system.", features: ["10 domains and unlimited visits", "Multi-rep management", "Advanced integrations", "Dedicated onboarding"], cta: "Talk to us", href: "https://cal.com/sharath.mb/demo" },
];

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}

export function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const annual = billingCycle === "annual";

  return <>
    <div className="plan-billing" role="group" aria-label="Choose billing period">
      <button type="button" className={`plan-billing-option ${!annual ? "is-active" : ""}`} aria-pressed={!annual} onClick={() => setBillingCycle("monthly")}>Monthly</button>
      <button type="button" className={`plan-billing-option ${annual ? "is-active" : ""}`} aria-pressed={annual} onClick={() => setBillingCycle("annual")}>Annual <span>Save 2 months</span></button>
    </div>
    <div className="plan-grid" aria-live="polite">{plans.map((plan,index) => <article className={`plan-card ${plan.featured ? "plan-card-featured" : ""}`} key={plan.name}>{plan.featured && <span className="popular-badge">FULL SIGNAL SYSTEM</span>}<div className="plan-topline"><span className="plan-label">0{index+1} / {plan.name.toUpperCase()}</span><small>{annual ? "ANNUAL" : "MONTHLY"}</small></div><h3>{formatPrice(annual ? plan.annual : plan.monthly)} <span>/ {annual ? "year" : "month"}</span></h3><p>{plan.summary}</p><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className={`button ${plan.featured ? "button-signal" : "button-outline"}`} href={plan.href} target="_blank" rel="noreferrer">{plan.cta}</a></article>)}</div>
  </>;
}
