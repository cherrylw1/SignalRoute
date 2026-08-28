"use client";

import { useEffect, useState } from "react";

export function SignalChronometer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const milliseconds = progress * 400;
  const readout = milliseconds >= 399.5 ? "✓ 400.0 ms" : `${milliseconds.toFixed(1).padStart(5, "0")} ms`;

  return (
    <aside className={`story-chronometer ${milliseconds >= 399.5 ? "is-complete" : ""}`} aria-label="Signal resolution timing">
      <div className="story-chronometer-rail" aria-hidden="true">
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((tick) => (
          <span key={tick} style={{ top: `${8 + (tick / 400) * 84}%` }}><i />{tick} ms</span>
        ))}
      </div>
      <div className="story-chronometer-marker" style={{ top: `${12 + progress * 76}vh` }}>
        <i aria-hidden="true" />
        <strong>{readout}</strong>
      </div>
    </aside>
  );
}
