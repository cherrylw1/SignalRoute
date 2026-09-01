"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OdometerNumber } from "./odometer-counter";
import { MagneticButton } from "./magnetic-button";

const signalStages = [
  {
    step: "01",
    tag: "OUTBOUND",
    kicker: "01 / OUTBOUND",
    title: "The message earns the click.",
    body: "A rep sends one tracked link with the account context already attached.",
    badge: "Tracked Outbound Link",
    image: "/media/scroll-outbound-vertical.png",
    alt: "Abstract Churnaut outbound signal route resolving into an account card",
  },
  {
    step: "02",
    tag: "RESOLVE",
    kicker: "02 / RESOLVE",
    title: "The link is the identity.",
    body: "Churnaut recognizes the known session from the direct relationship—not an IP guess.",
    badge: "Deterministic Resolve",
    image: "/media/scroll-resolve-vertical.png",
    alt: "Abstract Churnaut signal threads converging into a known account",
  },
  {
    step: "03",
    tag: "PERSONALIZE",
    kicker: "03 / PERSONALIZE",
    title: "The website responds.",
    body: "Approved headlines, copy, offers and CTAs can match the conversation that brought them there.",
    badge: "Live Swaps in 12ms",
    image: "/media/scroll-personalize-vertical.png",
    alt: "Abstract Churnaut route selecting a personalized website experience",
  },
  {
    step: "04",
    tag: "ACT",
    kicker: "04 / ACT",
    title: "Scout gives the rep a reason.",
    body: "The return becomes evidence: person, page, timing and what changed in the deal.",
    badge: "Evidence-Grounded Action",
    image: "/media/scroll-act-vertical.png",
    alt: "Abstract Churnaut signals resolving into a next action card",
  },
];

function railMotionProgress(progress: number) {
  const start = 0.05;
  const end = 0.84;
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

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
  return (
    <div className="reference-entry" aria-hidden="true">
      <div className="reference-entry-orb">C<span>+</span></div>
      <p>signal received</p>
      <strong>context attached</strong>
      <div className="reference-entry-bar"><i /></div>
    </div>
  );
}

export function ReferenceHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const perspectiveTilt = Math.min(10, Math.max(0, scrollY * 0.016));
  const perspectiveScale = Math.max(0.95, 1 - scrollY * 0.00012);

  return (
    <section className="reference-hero" id="hero" aria-labelledby="reference-hero-title">
      <div className="reference-hero-sky" aria-hidden="true">
        <i /><i /><i />
      </div>
      <div className="reference-hero-inner">
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
        </div>

        <div
          className="reference-hero-product-container"
          style={{
            transform: `perspective(1200px) rotateX(${perspectiveTilt}deg) scale(${perspectiveScale})`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* Floating Live Signal Badges */}
          <div className="hero-floating-badge hero-badge-left">
            <span className="badge-pulse-dot" />
            <div>
              <strong>Maya @ Northstar</strong>
              <small>Clicked outbound link · 3m ago</small>
            </div>
          </div>

          <div className="hero-floating-badge hero-badge-right">
            <span className="badge-bolt">⚡</span>
            <div>
              <strong>Personalized in 12ms</strong>
              <small>Headline & CTA tailored to intent</small>
            </div>
          </div>

          <div className="hero-floating-badge hero-badge-bottom">
            <span className="badge-spark">✦</span>
            <div>
              <strong>Scout Deal Score: 82</strong>
              <small>High momentum · Ready for outreach</small>
            </div>
          </div>

          <div className="reference-hero-product" aria-label="Churnaut dashboard showing the known buyer journey">
            <Image
              src="/media/hero-dashboard-static.png"
              alt="Churnaut signal route dashboard showing a known account, return visit, and next action"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 1080px"
            />
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

export function HorizontalSignalStory() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const lastProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [railShift, setRailShift] = useState(0);
  const [, setScrollVelocity] = useState(0);

  useEffect(() => {
    let scrollFrame = 0;
    let motionFrame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateRail = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const next = reduceMotion ? target : current + (target - current) * 0.12;
      smoothProgressRef.current = next;

      // Calculate smooth velocity for 3D card tilt & skew
      const delta = (next - lastProgressRef.current) * 100;
      lastProgressRef.current = next;
      const clampedVelocity = Math.max(-4, Math.min(4, delta));
      setScrollVelocity(clampedVelocity);

      if (trackRef.current) {
        const motion = railMotionProgress(next);
        trackRef.current.style.transform = `translate3d(${-motion * railShift}px,0,0) skewX(${-clampedVelocity * 0.35}deg)`;
      }

      if (!reduceMotion && (Math.abs(target - next) > 0.0005 || Math.abs(clampedVelocity) > 0.05)) {
        motionFrame = requestAnimationFrame(animateRail);
      } else {
        motionFrame = 0;
      }
    };

    const update = () => {
      scrollFrame = 0;
      const node = ref.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const travel = Math.max(1, r.height - window.innerHeight);
      const next = Math.min(1, Math.max(0, -r.top / travel));
      targetProgressRef.current = next;
      setProgress(next);
      if (!motionFrame) motionFrame = requestAnimationFrame(animateRail);
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (motionFrame) cancelAnimationFrame(motionFrame);
    };
  }, [railShift]);

  useEffect(() => {
    const measure = () => {
      const canvas = canvasRef.current;
      const track = trackRef.current;
      if (!canvas || !track) return;
      setRailShift(Math.max(0, track.scrollWidth - canvas.clientWidth));
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (observer) {
      if (canvasRef.current) observer.observe(canvasRef.current);
      if (trackRef.current) observer.observe(trackRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const motionVal = railMotionProgress(progress);
  const active = Math.min(signalStages.length - 1, Math.floor(motionVal * signalStages.length));

  // Interactive 3D Card Hover & Mouse Spotlight
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  // Jump smoothly to a specific stage when clicking the header route markers
  const scrollToStage = (stageIndex: number) => {
    if (!ref.current) return;
    const node = ref.current;
    const rect = node.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const travel = Math.max(1, rect.height - window.innerHeight);
    const targetScroll = scrollTop + (0.06 + (stageIndex / (signalStages.length - 1)) * 0.76) * travel;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 1.1 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section className="reference-horizontal" id="how-it-works" ref={ref} data-stage={active + 1} aria-labelledby="horizontal-title">
      <div className="reference-horizontal-pin">
        {/* Interactive Top Signal Route Bar */}
        <div className="reference-horizontal-head">
          <div className="horizontal-head-title">
            <p className="reference-kicker">THE KNOWN-VISITOR JOURNEY</p>
            <strong>{String(active + 1).padStart(2, "0")} / 04</strong>
          </div>

          <nav className="horizontal-signal-nav" aria-label="Journey stages">
            {signalStages.map((stage, i) => (
              <button
                key={stage.step}
                type="button"
                className={`signal-nav-step ${i === active ? "is-active" : ""} ${i < active ? "is-passed" : ""}`}
                onClick={() => scrollToStage(i)}
                data-cursor="Inspect"
              >
                <span className="step-dot" />
                <span className="step-label">{stage.kicker}</span>
              </button>
            ))}
            <div
              className="signal-nav-progress-line"
              style={{ width: `${Math.min(100, Math.max(0, motionVal * 100))}%` }}
            />
          </nav>
        </div>

        <div className="journey-viewport" ref={canvasRef}>
          <div className="journey-track" ref={trackRef}>
            {signalStages.map((stage, i) => {
              // Calculate parallax offset for the inner image
              const parallaxOffset = (motionVal * 3 - i) * -24;

              return (
                <figure
                  key={stage.kicker}
                  className={`journey-slide ${i === active ? "is-active" : ""}`}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  data-cursor="Explore"
                >
                  <div className="journey-card-3d-wrapper">
                    <div className="journey-card-spotlight" />
                    <span className="journey-card-badge">{stage.badge}</span>
                    <div className="journey-image">
                      <div
                        className="journey-image-inner"
                        style={{
                          transform: `translate3d(${parallaxOffset}px, 0, 0) scale(1.05)`,
                          transition: "transform 0.15s ease-out",
                        }}
                      >
                        <Image
                          src={stage.image}
                          alt={stage.alt}
                          fill
                          priority={i === 0}
                          sizes="(max-width: 620px) 82vw, 410px"
                        />
                      </div>
                    </div>
                  </div>
                  <figcaption className="journey-caption">
                    <span>{stage.kicker}</span>
                    <strong id={i === 0 ? "horizontal-title" : undefined}>{stage.title}</strong>
                    <small>{stage.body}</small>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="reference-horizontal-footer">
          <p className="reference-horizontal-instruction">
            SCROLL <span className="instruction-arrow">→</span> <span>TO MOVE THE SIGNAL ROUTE</span>
          </p>
        </div>
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
      <div className="reference-proof-bg" aria-hidden="true">
        SIGNALS<br />IN MOTION.
      </div>
      <div className="reference-proof-head">
        <div className="proof-head-top">
          <p className="reference-kicker">SCOUT AI / DEAL INTELLIGENCE</p>
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
        <p className="reference-kicker">NO GUESSWORK</p>
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
