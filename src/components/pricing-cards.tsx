const plans = [
  { name: "Starter", price: "$199", summary: "For founder-led teams ready to stop flying blind.", features: ["1 domain", "500 tracked visits / month", "5 routing rules", "HubSpot integration"], cta: "Start 14-day free trial", href: "https://app.churnaut.com" },
  { name: "Growth", price: "$399", summary: "For teams turning buyer intent into a repeatable edge.", features: ["3 domains and 5,000 visits", "Unlimited routing rules", "Scout AI deal intelligence", "HubSpot, Pipedrive, Zoho and Close"], cta: "Start 14-day free trial", href: "https://app.churnaut.com", featured: true },
  { name: "Pro", price: "$799", summary: "For sales teams that need a complete signal system.", features: ["10 domains and unlimited visits", "Multi-rep management", "Advanced integrations", "Dedicated onboarding"], cta: "Talk to us", href: "https://cal.com/sharath.mb/demo" },
];

export function PricingCards() {
  return <div className="plan-grid">{plans.map((plan,index) => <article className={`plan-card ${plan.featured ? "plan-card-featured" : ""}`} key={plan.name}>{plan.featured && <span className="popular-badge">FULL SIGNAL SYSTEM</span>}<div className="plan-topline"><span className="plan-label">0{index+1} / {plan.name.toUpperCase()}</span><small>MONTHLY</small></div><h3>{plan.price} <span>/ month</span></h3><p>{plan.summary}</p><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className={`button ${plan.featured ? "button-signal" : "button-outline"}`} href={plan.href} target="_blank" rel="noreferrer">{plan.cta}</a></article>)}</div>;
}
