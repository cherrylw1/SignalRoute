"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const beats = [
  {
    label: "01 / THE SIGNAL",
    title: "A rep spent days earning this click.",
    body: "The prospect arrives from the message your team already sent. The context is there, but most websites let it disappear.",
    image: "/media/journey-context.png",
    alt: "Churnaut handoff view showing campaign, research, and return context",
    status: "CONTEXT ATTACHED",
  },
  {
    label: "02 / RESOLUTION",
    title: "The link itself is the identity.",
    body: "Churnaut connects the known visitor to the person, account and outreach that brought them there, without turning an anonymous visit into a guess.",
    image: "/media/journey-visit.png",
    alt: "Churnaut account intelligence view showing a live buyer signal",
    status: "SESSION RECOGNIZED",
  },
  {
    label: "03 / THE NEXT MOVE",
    title: "The page becomes part of the conversation.",
    body: "The visit becomes useful to sales. Churnaut shows what changed, while Scout helps your team understand the next move.",
    image: "/media/journey-action.png",
    alt: "Churnaut next best action view connecting intent signals to a teammate",
    status: "NEXT MOVE READY",
  },
];

export function HomeSignalNarrative() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * 0.5) - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.5))[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.beat));
      },
      { threshold: [0.1, 0.35, 0.6], rootMargin: "-27% 0px -27%" },
    );
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-narrative" id="signal" aria-labelledby="home-narrative-title">
      <div className="home-narrative-intro">
        <p className="narrative-eyebrow">SCROLL TO FOLLOW THE SIGNAL</p>
        <h2 id="home-narrative-title">Your website should remember the conversation.</h2>
        <p>One tracked link carries context from the first click to the next sales action.</p>
      </div>

      <div className="home-narrative-grid">
        <div className={`narrative-stage narrative-stage-${active + 1}`} aria-live="polite">
          <div className="narrative-stage-head"><span><i /> LIVE SIGNAL ROUTE</span><strong>{String(active + 1).padStart(2, "0")} / 03</strong></div>
          <div className="narrative-stage-screen">
            {beats.map((beat, index) => (
              <div className={`narrative-frame ${index === active ? "is-active" : ""}`} key={beat.image} aria-hidden={index !== active}>
                <Image src={beat.image} alt={beat.alt} fill sizes="(max-width: 900px) 100vw, 60vw" />
              </div>
            ))}
            <div className="narrative-route" aria-hidden="true">
              <span className="narrative-route-line" />
              <i /><i /><i />
            </div>
            <div className="narrative-stage-label"><span>{beats[active].status}</span><strong>{beats[active].title}</strong></div>
          </div>
        </div>

        <div className="home-narrative-beats">
          {beats.map((beat, index) => (
            <article key={beat.label} data-beat={index} ref={(node) => { refs.current[index] = node; }} className={active === index ? "is-active" : ""}>
              <span className="narrative-number">{String(index + 1).padStart(2, "0")}</span>
              <p className="narrative-eyebrow">{beat.label}</p>
              <h3>{beat.title}</h3>
              <p>{beat.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="home-resolution" id="resolution">
        <div>
          <p className="narrative-eyebrow">THE MECHANISM</p>
          <h2>No guessing. Just signals your prospects already sent.</h2>
        </div>
        <div className="resolution-stamps" role="list" aria-label="Churnaut signal sequence">
          <div role="listitem"><span>01</span><strong>Link signature verified</strong><em>Known</em></div>
          <div role="listitem"><span>02</span><strong>Prospect and account connected</strong><em>Resolved</em></div>
          <div role="listitem"><span>03</span><strong>Approved page context applied</strong><em>Personalized</em></div>
          <div role="listitem"><span>04</span><strong>Sales sees the next move</strong><em>Actionable</em></div>
        </div>
      </div>
    </section>
  );
}
