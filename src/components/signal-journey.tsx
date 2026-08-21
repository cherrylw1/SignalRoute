"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stages = [
  {
    title: "Carry the context",
    body: "A tracked link connects the visit to the person and outreach that brought them there.",
  },
  {
    title: "Shape the visit",
    body: "The page can respond to known context instead of treating an interested buyer like anonymous traffic.",
  },
  {
    title: "Move at the right moment",
    body: "Churnaut shows what changed, while Scout helps your team understand the next move.",
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
        <h2 id="signal-journey-title">One signal, carried all the way through.</h2>
        <p>Churnaut keeps the context your rep earned alive from the first click to the next sales action.</p>
      </div>

      <div className="signal-journey-layout">
        <div className={`signal-journey-visual signal-journey-stage-${activeStage + 1}`} aria-hidden="true">
          <Image src="/signal-landscape.png" alt="" fill sizes="(max-width: 900px) 100vw, 58vw" />
          <div className="signal-journey-wash" />
          <div className="signal-journey-route">
            {stages.map((stage, index) => (
              <i key={stage.title} className={index <= activeStage ? "is-active" : ""} />
            ))}
          </div>
          <div className="signal-journey-caption">
            <span>{stages[activeStage].title}</span>
            <strong>{activeStage + 1} / {stages.length}</strong>
          </div>
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
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
