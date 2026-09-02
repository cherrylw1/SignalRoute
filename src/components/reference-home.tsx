"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OdometerNumber } from "./odometer-counter";
import { MagneticButton } from "./magnetic-button";
import { playSwitchSound, playSuccessSound } from "@/lib/sound";

const proofScenarios = [
  {
    id: "outbound",
    label: "Outbound Intent",
    account: "Northstar Technologies",
    score: 82,
    scoreLabel: "Warming up",
    badge: "✦ SCOUT DEAL BRIEF",
    card1: {
      tag: "WEBSITE SIGNAL",
      title: "Maya returned to pricing.",
      meta: "third high-intent visit · just now",
      detail: "Opened link from outbound sequence; spent 3m 40s comparing Growth vs Pro plans.",
    },
    card2: {
      tag: "SCOUT'S READ",
      title: "Northstar is warming up.",
      meta: "momentum is building across CRM + website activity",
      detail: "Reply velocity +34%, multi-threading active with VP of Growth and Head of Sales.",
    },
    card3: {
      tag: "NEXT MOVE",
      title: "Follow up on rollout details.",
      meta: "grounded in the evidence, while the moment is fresh",
      detail: "Reference their team size and offer a tailored 3-domain onboarding schedule.",
    },
  },
  {
    id: "multithread",
    label: "Executive Consensus",
    account: "CloudScale Systems",
    score: 94,
    scoreLabel: "High Velocity",
    badge: "✦ STAKEHOLDER CONVERGENCE",
    card1: {
      tag: "WEBSITE SIGNAL",
      title: "VP Eng & Sec Lead viewed Docs.",
      meta: "concurrent visits · 4m ago",
      detail: "Both reviewed SOC2 compliance page and custom webhook documentation.",
    },
    card2: {
      tag: "SCOUT'S READ",
      title: "Technical clearance underway.",
      meta: "buying committee consensus confirmed",
      detail: "Zero blockers identified; previous security questions fully validated.",
    },
    card3: {
      tag: "NEXT MOVE",
      title: "Offer technical architecture call.",
      meta: "invite Solutions Engineer",
      detail: "Align on SSO deployment and custom routing specs before procurement.",
    },
  },
  {
    id: "revival",
    label: "Stalled Deal Revival",
    account: "Apex Global",
    score: 68,
    scoreLabel: "Reactivated",
    badge: "✦ DEAL RE-ENGAGEMENT",
    card1: {
      tag: "WEBSITE SIGNAL",
      title: "Revisited ROI Calculator.",
      meta: "dormant for 45 days · 12m ago",
      detail: "Ran simulation for 25 sales reps after recent Q3 budget unlock.",
    },
    card2: {
      tag: "SCOUT'S READ",
      title: "Budget window reopened.",
      meta: "high propensity to resume pilot",
      detail: "Economic buyer active on case studies and conversion ROI benchmarks.",
    },
    card3: {
      tag: "NEXT MOVE",
      title: "Send customized business case.",
      meta: "reconnect with economic sponsor",
      detail: "Reference calculated savings and propose a 30-day fast-track trial.",
    },
  },
];

const faqItems = [
  ["How does Churnaut identify a visitor?", "Churnaut starts with a known tracked link or session created by your outbound workflow. If there is no known signal, Churnaut does not invent an identity."],
  ["Is Churnaut IP-based?", "No. The product is designed around deterministic context from the link your prospect chose to click, rather than IP-to-company guessing."],
  ["What can the website personalize?", "Your approved routing rules can change page headlines, supporting copy, calls to action, offers, calendar embeds and other content you choose."],
  ["What does Scout analyze?", "Scout combines the CRM activity and website signals available in your workspace to produce an evidence-grounded deal brief and a suggested next move."],
  ["Which CRMs are supported?", "HubSpot is available in Starter. Growth supports HubSpot, Pipedrive, Zoho and Close. The team verifies your required integration during onboarding."],
  ["What happens when a visitor is unknown?", "The visitor remains anonymous and sees the default experience. Churnaut only applies personalization when a known signal is present."],
];

export function ReferenceEntry() {
  // Zero-latency instant entrance (blocking veil removed for instantaneous load)
  return null;
}

interface HeroProbePreset {
  id: string;
  name: string;
  domain: string;
  persona: string;
  rep: string;
  headline: string;
  subhead: string;
  cta: string;
  score: number;
}

const HERO_PRESETS: Record<string, HeroProbePreset> = {
  stripe: {
    id: "stripe",
    name: "Stripe",
    domain: "stripe.com",
    persona: "VP of Growth",
    rep: "Sarah Jenkins",
    headline: "Deterministic pipeline intelligence for Stripe's revenue team.",
    subhead: "Carry outbound context directly into the site visit in 11ms.",
    cta: "Book demo with Sarah",
    score: 94,
  },
  figma: {
    id: "figma",
    name: "Figma",
    domain: "figma.com",
    persona: "Head of Design Systems",
    rep: "Alex Chen",
    headline: "Turn design team momentum into closed deals for Figma.",
    subhead: "Recognize known design leads the moment they open your outreach link.",
    cta: "Explore Figma enterprise routing",
    score: 91,
  },
  ramp: {
    id: "ramp",
    name: "Ramp",
    domain: "ramp.com",
    persona: "VP of Sales Operations",
    rep: "Marcus Vance",
    headline: "Stop losing known Ramp prospects at the moment of highest intent.",
    subhead: "Automatic headline, ROI calculator and rep calendar embeds.",
    cta: "Schedule 15-min pilot setup",
    score: 86,
  },
  linear: {
    id: "linear",
    name: "Linear",
    domain: "linear.app",
    persona: "Head of Product",
    rep: "Elena Rostova",
    headline: "Developer-grade outbound signal routing built for Linear.",
    subhead: "Zero cookies. Zero IP guesswork. Pure deterministic intent.",
    cta: "Request Linear technical pilot",
    score: 89,
  },
};

export function ReferenceHero() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedProbe, setSelectedProbe] = useState<string>("stripe");
  const [customInput, setCustomInput] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activePreset: HeroProbePreset = isCustom
    ? {
        id: "custom",
        name: customInput || "Acme Corp",
        domain: `${(customInput || "acme").toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
        persona: "VP of Revenue",
        rep: "Sarah Jenkins",
        headline: `Deterministic personalization for ${(customInput || "Acme Corp")}'s revenue team.`,
        subhead: "Carry outbound outreach context into the website visit in real time.",
        cta: `Schedule 15-min demo with Sarah`,
        score: 88,
      }
    : HERO_PRESETS[selectedProbe] || HERO_PRESETS.stripe;

  const handleSelectPreset = (id: string) => {
    playSwitchSound();
    setIsCustom(false);
    setSelectedProbe(id);
    setIsMutating(true);
    setTimeout(() => {
      setIsMutating(false);
      playSuccessSound();
    }, 280);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    playSwitchSound();
    setIsCustom(true);
    setIsMutating(true);
    setTimeout(() => {
      setIsMutating(false);
      playSuccessSound();
    }, 280);
  };

  const handleInstrumentMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -5;
    const ry = ((x - cx) / cx) * 5;
    setCardTilt({ rx, ry });
    card.style.setProperty("--hero-mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--hero-mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleInstrumentMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0 });
  };

  const perspectiveTilt = Math.min(8, Math.max(0, scrollY * 0.012));
  const perspectiveScale = Math.max(0.96, 1 - scrollY * 0.0001);

  return (
    <section className="reference-hero" id="hero" aria-labelledby="reference-hero-title">
      {/* Blueprint Coordinate Grid & Ambient Sky */}
      <div className="reference-hero-sky" aria-hidden="true">
        <div className="hero-blueprint-grid" />
        <div className="hero-ambient-spotlight" />
      </div>

      <div className="reference-hero-inner">
        {/* Left Column: Copy, CTAs, and 3-Second Signal Probe */}
        <div className="reference-hero-copy">
          <p className="reference-kicker"><i /> DETERMINISTIC PERSONALIZATION FOR OUTBOUND</p>
          <h1 id="reference-hero-title">
            Your CRM knows who they are.<br />
            <em>Your website should too.</em>
          </h1>
          <p className="reference-hero-lede">
            Churnaut carries the context from your outbound link into the visit, then turns that moment into a clear sales action.
          </p>

          <div className="reference-hero-actions">
            <MagneticButton
              href="https://cal.com/sharath.mb/demo"
              target="_blank"
              rel="noreferrer"
              data-cursor="Book"
              beam
              className="reference-pill reference-pill-dark"
            >
              Book a demo <span>↗</span>
            </MagneticButton>
            <MagneticButton
              href="#statement"
              data-cursor="Explore"
              className="reference-text-link"
            >
              See how it works <span>↓</span>
            </MagneticButton>
          </div>

          {/* Instant 3-Second Signal Probe Bar */}
          <div className="hero-signal-probe-bar">
            <div className="probe-bar-top">
              <span className="probe-live-pip" />
              <span className="probe-title">PROVE 11MS DETERMINISTIC ROUTE:</span>
              <span className="probe-badge">LIVE ENGINE</span>
            </div>

            <div className="probe-chips-row">
              {Object.values(HERO_PRESETS).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`probe-chip ${!isCustom && selectedProbe === p.id ? "is-active" : ""}`}
                  onClick={() => handleSelectPreset(p.id)}
                  data-cursor="Probe"
                >
                  <span className="chip-domain">{p.name}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleCustomSubmit} className="probe-input-form">
              <input
                type="text"
                placeholder="Or type prospect company (e.g. Brex, Datadog)..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="probe-custom-input"
              />
              <button type="submit" className="probe-submit-btn" data-cursor="Inject">
                ⚡ Test
              </button>
            </form>

            <div className="probe-footer">
              <span>LATENCY: <b>11.2MS</b></span>
              <span>•</span>
              <span>ZERO COOKIES REQUIRED</span>
              <span>•</span>
              <span>100% DETERMINISTIC</span>
            </div>
          </div>
        </div>

        {/* Right Column: The Living Signal Instrument */}
        <div
          className="reference-hero-product-container"
          style={{
            transform: `perspective(1200px) rotateX(${perspectiveTilt}deg) scale(${perspectiveScale})`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <div
            className="living-instrument-chassis"
            onMouseMove={handleInstrumentMouseMove}
            onMouseLeave={handleInstrumentMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
            }}
          >
            {/* Top Hardware Chrome Bar */}
            <div className="living-chassis-topbar">
              <div className="living-topbar-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="living-topbar-url">
                <span className="lock-icon">🔒</span>
                <span>https://yourproduct.com/<b>?ref=churnaut&target={activePreset.domain}</b></span>
              </div>
              <div className="living-topbar-latency">
                <span className="latency-bolt">⚡</span> 11.2ms Swap
              </div>
            </div>

            {/* Live Webpage Mock Viewport */}
            <div className="living-viewport-content">
              {/* Laser Scanline Beam on DOM mutation */}
              {isMutating && <div className="living-laser-scanline" />}

              {/* CRM Context Badge */}
              <div className="living-context-banner">
                <span className="living-pulse-dot" />
                <span>KNOWN PROSPECT: <b>{activePreset.name.toUpperCase()}</b> ({activePreset.persona}) · SENT BY {activePreset.rep.toUpperCase()}</span>
              </div>

              {/* Dynamic Headline */}
              <div className="living-headline-box">
                <span className="living-devtools-tag">#hero-title [480×64] · Deterministic</span>
                <h3 className="living-headline">{activePreset.headline}</h3>
                <p className="living-subhead">{activePreset.subhead}</p>
              </div>

              {/* Dynamic CTA & Sales Rep Bar */}
              <div className="living-cta-row">
                <button type="button" className="living-cta-btn">
                  {activePreset.cta} <span>↗</span>
                </button>
                <div className="living-rep-status">
                  <span className="rep-avatar">✦</span>
                  <div>
                    <strong>{activePreset.rep}</strong>
                    <small>Assigned Account Rep</small>
                  </div>
                </div>
              </div>

              {/* Scout Deal Intelligence Brief Overlay */}
              <div className="living-scout-overlay">
                <div className="scout-overlay-left">
                  <span className="scout-spark">✦</span>
                  <div>
                    <small>SCOUT DEAL INTEL</small>
                    <strong>Score: {activePreset.score}/100 · High Intent</strong>
                  </div>
                </div>
                <span className="scout-status-pill">SLACK DISPATCHED</span>
              </div>
            </div>

            {/* Hardware Bottom Bar */}
            <div className="living-chassis-bottombar">
              <div className="hardware-screws">
                <span className="screw" /><span className="screw" />
              </div>
              <span className="bus-spec">CHURNAUT EDGE FABRIC · 11MS ZERO-IP DETERMINISTIC BUS</span>
              <div className="hardware-screws">
                <span className="screw" /><span className="screw" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reference-hero-bottom">
        <span>CONTEXT THAT SURVIVES THE VISIT</span>
        <span>SCROLL TO CONTINUE ↓</span>
      </div>
    </section>
  );
}

export function ProgressiveStatement() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const words = useMemo(
    () => "Outbound already knows who the buyer is. Churnaut keeps that context alive when they reach your website.".split(" "),
    []
  );

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const travel = Math.max(1, r.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -r.top / travel)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="reference-statement" id="statement" ref={ref} aria-labelledby="statement-title">
      <div className="reference-statement-pin">
        <p className="reference-kicker">THE PROBLEM WITH THE CLICK</p>
        <h2 id="statement-title">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                opacity: Math.max(0.16, Math.min(1, progress * (words.length + 3) - i + 1)),
                transform: `translateY(${Math.max(0, (1 - (progress * (words.length + 3) - i + 1)) * 8)}px)`,
                display: "inline-block",
                transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
              }}
            >
              {word}{i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h2>
        <p className="reference-statement-note">A known prospect should not become anonymous at the exact moment intent is highest.</p>
      </div>
    </section>
  );
}

export function TransitionMark() {
  return (
    <section className="reference-transition" aria-hidden="true">
      <div className="reference-transition-mark">
        <span>C</span>
        <i /><i /><i />
      </div>
      <p>THE SIGNAL BECOMES THE STORY</p>
    </section>
  );
}

export function ReferenceProof() {
  const [activeScenarioId, setActiveScenarioId] = useState("outbound");
  const scenario = proofScenarios.find((s) => s.id === activeScenarioId) || proofScenarios[0];

  return (
    <section className="reference-proof" id="proof" aria-labelledby="proof-title">
      {/* Ambient Radar Sweep */}
      <div className="proof-radar-sweep-cone" aria-hidden="true" />

      <div className="reference-proof-bg" aria-hidden="true">
        SIGNALS<br />IN MOTION.
      </div>
      <div className="reference-proof-head">
        <div className="proof-head-top">
          <p className="reference-kicker"><i /> SCOUT AI / DEAL INTELLIGENCE</p>
          <div className="live-pulse-badge">
            <span className="live-dot" /> LIVE EVIDENCE STREAM
          </div>
        </div>
        <h2 id="proof-title">The return is not another alert. It is a reason to act.</h2>
        <p>Scout connects the website moment to the deal context, then shows the evidence behind the next move.</p>

        {/* Interactive Scenario Selector */}
        <div className="proof-scenario-tabs" role="tablist" aria-label="Buyer signal scenarios">
          {proofScenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === activeScenarioId}
              className={`scenario-tab-btn ${item.id === activeScenarioId ? "is-active" : ""}`}
              onClick={() => setActiveScenarioId(item.id)}
              data-cursor="Select"
            >
              {item.id === activeScenarioId && (
                <motion.span
                  layoutId="active-scenario-indicator"
                  className="scenario-tab-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        <MagneticButton
          href="/scout"
          data-cursor="Open"
          beam
          className="reference-pill reference-pill-light"
        >
          Meet Scout AI <span>↗</span>
        </MagneticButton>
      </div>

      {/* Dynamic Animated Signal Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          className="reference-proof-cards"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Signal Ray Connector */}
          <div className="proof-signal-flow-beam" aria-hidden="true">
            <div className="beam-particle" />
          </div>

          <article className="reference-proof-card proof-card-one" data-cursor="Inspect">
            <div className="proof-card-header">
              <span>{scenario.card1.tag}</span>
              <span className="proof-card-pulse-icon">●</span>
            </div>
            <strong>{scenario.card1.title}</strong>
            <small>{scenario.card1.meta}</small>
            <p className="proof-card-detail">{scenario.card1.detail}</p>
          </article>

          <article className="reference-proof-card proof-card-two" data-cursor="Inspect">
            <div className="proof-card-header">
              <span>{scenario.card2.tag}</span>
              <span className="proof-score-pill">
                Score <b><OdometerNumber value={scenario.score} /></b>
              </span>
            </div>
            <strong>{scenario.card2.title}</strong>
            <small>{scenario.card2.meta}</small>
            <p className="proof-card-detail">{scenario.card2.detail}</p>
          </article>

          <article className="reference-proof-card proof-card-three" data-cursor="Inspect">
            <div className="proof-card-header">
              <span>{scenario.card3.tag}</span>
              <span className="proof-action-icon">✦</span>
            </div>
            <strong>{scenario.card3.title}</strong>
            <small>{scenario.card3.meta}</small>
            <p className="proof-card-detail">{scenario.card3.detail}</p>
          </article>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export function ReferenceFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="reference-faq" id="faq" aria-labelledby="faq-title">
      <div className="reference-faq-head">
        <p className="reference-kicker"><i /> NO GUESSWORK</p>
        <h2 id="faq-title">Questions, answered.</h2>
        <p>Clear boundaries are part of the product.</p>
      </div>
      <div className="reference-faq-list">
        {faqItems.map(([question, answer], i) => (
          <div className={`reference-faq-item ${open === i ? "is-open" : ""}`} key={question}>
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              data-cursor={open === i ? "Close" : "Open"}
            >
              <span>{question}</span>
              <i className="faq-toggle-icon">{open === i ? "−" : "+"}</i>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  className="reference-faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReferenceCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    const fine = matchMedia("(pointer:fine)");
    if (!fine.matches) return;
    setEnabled(true);

    let rafId = 0;

    const move = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    const updateCursor = () => {
      const pos = posRef.current;
      pos.x += (pos.targetX - pos.x) * 0.22;
      pos.y += (pos.targetY - pos.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    const over = (e: Event) => {
      const target = e.target as HTMLElement;
      const hit = target.closest("a, button, [data-cursor], .journey-slide, .reference-proof-card, .sim-card");
      if (!labelRef.current) return;

      const cursorState = hit?.getAttribute("data-cursor");
      if (cursorState) {
        labelRef.current.textContent = cursorState;
        cursorRef.current?.classList.add("is-active");
      } else if (hit?.tagName === "BUTTON" || hit?.tagName === "A") {
        labelRef.current.textContent = "Open";
        cursorRef.current?.classList.add("is-active");
      } else {
        cursorRef.current?.classList.remove("is-active");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, true);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over, true);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="reference-cursor" ref={cursorRef} aria-hidden="true">
      <i />
      <span ref={labelRef}>View</span>
    </div>
  );
}
