"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stages = [
  {
    eyebrow: "01 / THE HANDOFF",
    title: "Carry the context",
    body: "A tracked link connects the visit to the person and outreach that brought them there.",
    image: "/media/journey-context.png",
    alt: "Churnaut handoff view showing campaign, research, and return context",
  },
  {
    eyebrow: "02 / LIVE INTENT",
    title: "Shape the visit",
    body: "The page can respond to known context instead of treating an interested buyer like anonymous traffic.",
    image: "/media/journey-visit.png",
    alt: "Churnaut account intelligence view showing a live buyer signal",
  },
  {
    eyebrow: "03 / NEXT BEST ACTION",
    title: "Move at the right moment",
    body: "Churnaut shows what changed, while Scout helps your team understand the next move.",
    image: "/media/journey-action.png",
    alt: "Churnaut next best action view connecting intent signals to a teammate",
  },
];

export function SignalJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.stage);
        setActiveStage(index);
      },
      { threshold: [0.35, 0.6, 0.8], rootMargin: "-18% 0px -18%" },
    );

    stageRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="signal-journey" id="how-it-works" aria-labelledby="signal-journey-title">
      <div className="signal-journey-intro">
        <p className="section-index">THE CHURNAUT LOOP / 01 / 03</p>
        <h2 id="signal-journey-title">One signal, carried all the way through.</h2>
        <p>Churnaut keeps the context your rep earned alive from the first click to the next sales action.</p>
      </div>

      <div className="signal-journey-layout">
        <div className="signal-journey-visual" aria-live="polite">
          {stages.map((stage, index) => (
            <div className={`signal-journey-frame ${activeStage === index ? "is-active" : ""}`} key={stage.title} aria-hidden={activeStage !== index}>
              <Image src={stage.image} alt={stage.alt} fill sizes="(max-width: 900px) 100vw, 62vw" />
            </div>
          ))}
        </div>

        <div className="signal-journey-stages">
          {stages.map((stage, index) => (
            <article
              key={stage.title}
              data-stage={index}
              ref={(node) => { stageRefs.current[index] = node; }}
              className={activeStage === index ? "is-active" : ""}
            >
              <span>{index + 1}</span>
              <small>{stage.eyebrow}</small>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
