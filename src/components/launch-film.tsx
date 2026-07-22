"use client";

import { useEffect, useRef, useState } from "react";

export function LaunchFilmLink() {
  return (
    <a className="button button-signal hero-film-trigger" href="#product-film">
      <span>See what happens after the click</span>
      <i aria-hidden="true">↓</i>
    </a>
  );
}

export function LaunchFilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const observerPausedRef = useRef(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    userPausedRef.current = reducedMotion;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) video.play().catch(() => setPlaying(false));
        } else if (!video.paused) {
          observerPausedRef.current = true;
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => setPlaying(false));
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <section className="launch-film-section" id="product-film" aria-labelledby="product-film-title">
      <div className="launch-film-heading">
        <p className="section-index">CHURNAUT / PRODUCT STORY / 01:00</p>
        <div>
          <h2 id="product-film-title">See the buyer moment <strong>unfold.</strong></h2>
          <p>From the first signal to the next best action—one connected journey, shown in full.</p>
        </div>
      </div>

      <div className="launch-film-stage">
        <div className="launch-film-topline" aria-hidden="true">
          <span><i /> BUYER CONTEXT, IN MOTION</span>
          <span>1920 × 1080 / WITH CAPTIONS</span>
        </div>

        <video
          ref={videoRef}
          src="/media/churnaut-launch-2026.mp4"
          poster="/media/churnaut-launch-poster.png"
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => {
            userPausedRef.current = false;
            setPlaying(true);
          }}
          onPause={() => {
            setPlaying(false);
            if (observerPausedRef.current) observerPausedRef.current = false;
            else userPausedRef.current = true;
          }}
          aria-label="Churnaut product story"
        >
          Your browser does not support HTML video.
        </video>

        <div className="launch-film-actions">
          <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause product film" : "Play product film"}>
            <i aria-hidden="true">{playing ? "Ⅱ" : "▶"}</i>
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
          <button className={muted ? "is-muted" : ""} type="button" onClick={toggleSound} aria-pressed={!muted}>
            <i aria-hidden="true">{muted ? "×" : "•"}</i>
            <span>{muted ? "Turn sound on" : "Sound on"}</span>
          </button>
        </div>
      </div>

      <div className="launch-film-footnote" aria-hidden="true">
        <span>SEE THE CONTEXT</span><i /><span>SHAPE THE EXPERIENCE</span><i /><span>MOVE AT THE RIGHT MOMENT</span>
      </div>
    </section>
  );
}
