"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const signalStages = [
  { kicker: "01 / OUTBOUND", title: "The message earns the click.", body: "A rep sends one tracked link with the account context already attached.", image: "/media/scroll-outbound-vertical.png", alt: "Abstract Churnaut outbound signal route resolving into an account card" },
  { kicker: "02 / RESOLVE", title: "The link is the identity.", body: "Churnaut recognizes the known session from the direct relationship—not an IP guess.", image: "/media/scroll-resolve-vertical.png", alt: "Abstract Churnaut signal threads converging into a known account" },
  { kicker: "03 / PERSONALIZE", title: "The website responds.", body: "Approved headlines, copy, offers and CTAs can match the conversation that brought them there.", image: "/media/scroll-personalize-vertical.png", alt: "Abstract Churnaut route selecting a personalized website experience" },
  { kicker: "04 / ACT", title: "Scout gives the rep a reason.", body: "The return becomes evidence: person, page, timing and what changed in the deal.", image: "/media/scroll-act-vertical.png", alt: "Abstract Churnaut signals resolving into a next action card" },
];

// The rail gets a short settling beat before it starts and a longer final hold
// after the last card is fully visible. Between those points it travels as one
// continuous row, directly controlled by scroll.
function railMotionProgress(progress: number) {
  const start = 0.06;
  const end = 0.82;
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

const faqItems = [
  ["How does Churnaut identify a visitor?", "Churnaut starts with a known tracked link or session created by your outbound workflow. If there is no known signal, Churnaut does not invent an identity."],
  ["Is Churnaut IP-based?", "No. The product is designed around deterministic context from the link your prospect chose to click, rather than IP-to-company guessing."],
  ["What can the website personalize?", "Your approved routing rules can change page headlines, supporting copy, calls to action, offers, calendar embeds and other content you choose."],
  ["What does Scout analyze?", "Scout combines the CRM activity and website signals available in your workspace to produce an evidence-grounded deal brief and a suggested next move."],
  ["Which CRMs are supported?", "HubSpot is available in Starter. Growth supports HubSpot, Pipedrive, Zoho and Close. The team verifies your required integration during onboarding."],
  ["What happens when a visitor is unknown?", "The visitor remains anonymous and sees the default experience. Churnaut only applies personalization when a known signal is present."],
];

export function ReferenceEntry() {
  return <div className="reference-entry" aria-hidden="true"><div className="reference-entry-orb">C<span>+</span></div><p>signal received</p><strong>context attached</strong><div className="reference-entry-bar"><i /></div></div>;
}

export function ReferenceHero() {
  return (
    <section className="reference-hero" id="hero" aria-labelledby="reference-hero-title">
      <div className="reference-hero-sky" aria-hidden="true"><i /><i /><i /></div>
      <div className="reference-hero-inner">
        <div className="reference-hero-copy">
          <p className="reference-kicker"><i /> DETERMINISTIC PERSONALIZATION FOR OUTBOUND</p>
          <h1 id="reference-hero-title">Your CRM knows who they are.<br /><em>Your website should too.</em></h1>
          <p className="reference-hero-lede">Churnaut carries the context from your outbound link into the visit, then turns that moment into a clear sales action.</p>
          <div className="reference-hero-actions"><a className="reference-pill reference-pill-dark" href="https://cal.com/sharath.mb/demo" target="_blank" rel="noreferrer">Book a demo <span>↗</span></a><a className="reference-text-link" href="#statement">See how it works <span>↓</span></a></div>
        </div>
        <div className="reference-hero-product" aria-label="Churnaut dashboard showing the known buyer journey">
          <Image src="/media/hero-dashboard-static.png" alt="Churnaut signal route dashboard showing a known account, return visit, and next action" fill priority sizes="(max-width: 900px) 92vw, 1080px" />
        </div>
      </div>
      <div className="reference-hero-bottom"><span>CONTEXT THAT SURVIVES THE VISIT</span><span>SCROLL TO CONTINUE ↓</span></div>
    </section>
  );
}

export function ProgressiveStatement() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const words = useMemo(() => "Outbound already knows who the buyer is. Churnaut keeps that context alive when they reach your website.".split(" "), []);
  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; const node = ref.current; if (!node) return; const r = node.getBoundingClientRect(); const travel = Math.max(1, r.height - window.innerHeight); setProgress(Math.min(1, Math.max(0, -r.top / travel))); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", update); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return <section className="reference-statement" id="statement" ref={ref} aria-labelledby="statement-title"><div className="reference-statement-pin"><p className="reference-kicker">THE PROBLEM WITH THE CLICK</p><h2 id="statement-title">{words.map((word, i) => <span key={`${word}-${i}`} style={{ opacity: Math.max(.16, Math.min(1, progress * (words.length + 3) - i + 1)) }}>{word}{i < words.length - 1 ? " " : ""}</span>)}</h2><p className="reference-statement-note">A known prospect should not become anonymous at the exact moment intent is highest.</p></div></section>;
}

export function HorizontalSignalStory() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [railShift, setRailShift] = useState(0);
  useEffect(() => {
    let scrollFrame = 0;
    let motionFrame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animateRail = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const next = reduceMotion ? target : current + (target - current) * 0.12;
      smoothProgressRef.current = next;
      if (trackRef.current) {
        const motion = railMotionProgress(next);
        trackRef.current.style.transform = `translate3d(${-motion * railShift}px,0,0)`;
      }
      if (!reduceMotion && Math.abs(target - next) > 0.0005) {
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
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(update); };
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
    return () => { observer?.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  // The counter follows the row's continuous travel and settles on the final
  // stage for the closing hold.
  const active = Math.min(signalStages.length - 1, Math.floor(railMotionProgress(progress) * signalStages.length));
  return (
    <section className="reference-horizontal" id="how-it-works" ref={ref} data-stage={active + 1} aria-labelledby="horizontal-title">
      <div className="reference-horizontal-pin">
        <div className="reference-horizontal-head"><p className="reference-kicker">THE KNOWN-VISITOR JOURNEY</p><strong>{String(active + 1).padStart(2, "0")} / 04</strong></div>
        <div className="journey-viewport" ref={canvasRef}>
          <div className="journey-track" ref={trackRef}>
            {signalStages.map((stage, i) => (
              <figure key={stage.kicker} className={`journey-slide ${i === active ? "is-active" : ""}`}>
                <div className="journey-image"><Image src={stage.image} alt={stage.alt} fill priority={i === 0} sizes="(max-width: 620px) 82vw, 380px" /></div>
                <figcaption className="journey-caption">
                  <span>{stage.kicker}</span>
                  <strong id={i === 0 ? "horizontal-title" : undefined}>{stage.title}</strong>
                  <small>{stage.body}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="reference-horizontal-instruction">SCROLL <span>TO MOVE THE SIGNAL</span></p>
      </div>
    </section>
  );
}

export function TransitionMark() {
  return <section className="reference-transition" aria-hidden="true"><div className="reference-transition-mark"><span>C</span><i /><i /><i /></div><p>THE SIGNAL BECOMES THE STORY</p></section>;
}

export function ReferenceProof() {
  return <section className="reference-proof" id="proof" aria-labelledby="proof-title"><div className="reference-proof-bg" aria-hidden="true">SIGNALS<br />IN MOTION.</div><div className="reference-proof-head"><p className="reference-kicker">SCOUT AI / DEAL INTELLIGENCE</p><h2 id="proof-title">The return is not another alert. It is a reason to act.</h2><p>Scout connects the website moment to the deal context, then shows the evidence behind the next move.</p><Link className="reference-pill reference-pill-light" href="/scout">Meet Scout AI <span>↗</span></Link></div><div className="reference-proof-cards"><article className="reference-proof-card proof-card-one"><span>WEBSITE SIGNAL</span><strong>Maya returned to pricing.</strong><small>third high-intent visit · just now</small></article><article className="reference-proof-card proof-card-two"><span>SCOUT&apos;S READ</span><strong>Northstar is warming up.</strong><small>momentum is building across CRM + website activity</small></article><article className="reference-proof-card proof-card-three"><span>NEXT MOVE</span><strong>Follow up on rollout details.</strong><small>grounded in the evidence, while the moment is fresh</small></article></div></section>;
}

export function ReferenceFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="reference-faq" id="faq" aria-labelledby="faq-title"><div className="reference-faq-head"><p className="reference-kicker">NO GUESSWORK</p><h2 id="faq-title">Questions, answered.</h2><p>Clear boundaries are part of the product.</p></div><div className="reference-faq-list">{faqItems.map(([question, answer], i) => <div className={`reference-faq-item ${open === i ? "is-open" : ""}`} key={question}><button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}><span>{question}</span><i>{open === i ? "−" : "+"}</i></button><div className="reference-faq-answer"><p>{answer}</p></div></div>)}</div></section>;
}

export function ReferenceCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => { const fine = matchMedia("(pointer:fine)"); const move = (e: MouseEvent) => { if (cursor.current) { cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`; } }; const over = (e: Event) => { const target = e.target as HTMLElement; const hit = target.closest("a,button,[data-cursor]"); if (!label.current) return; label.current.textContent = hit?.getAttribute("data-cursor") || (hit?.tagName === "BUTTON" ? "Open" : "View"); cursor.current?.classList.toggle("is-active", !!hit); }; const onChange = () => setEnabled(fine.matches); setEnabled(fine.matches); window.addEventListener("mousemove", move, { passive: true }); document.addEventListener("mouseover", over, true); fine.addEventListener?.("change", onChange); return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over, true); fine.removeEventListener?.("change", onChange); }; }, []);
  if (!enabled) return null;
  return <div className="reference-cursor" ref={cursor} aria-hidden="true"><i /><span ref={label}>View</span></div>;
}
