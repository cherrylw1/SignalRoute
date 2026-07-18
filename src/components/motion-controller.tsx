"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("motion-ready");

    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(.hero), .page-hero-inner, .feature-card, .blog-card, .plan-card, .article-header, .blog-content, .legal-shell, .footer-cta",
      ),
    );

    revealNodes.forEach((node, index) => {
      node.dataset.motion = "reveal";
      const parent = node.parentElement;
      const siblings = parent
        ? Array.from(parent.children).filter((child) =>
            (child as HTMLElement).matches?.(".feature-card, .blog-card, .plan-card, .journal-card"),
          )
        : [];
      const siblingIndex = siblings.indexOf(node);
      node.style.setProperty("--reveal-order", String(siblingIndex >= 0 ? siblingIndex : index % 3));
    });

    const scoutSection = document.querySelector<HTMLElement>(".scout-system");
    const score = scoutSection?.querySelector<HTMLElement>(".scout-pressure strong");
    let scoreAnimated = false;
    if (score && !reducedMotion) score.textContent = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("in-view");

          if (target === scoutSection && score && !scoreAnimated) {
            scoreAnimated = true;
            if (reducedMotion) {
              score.textContent = "82";
            } else {
              const startedAt = performance.now();
              const tick = (now: number) => {
                const progress = clamp((now - startedAt) / 1050);
                const eased = 1 - Math.pow(1 - progress, 3);
                score.textContent = String(Math.round(82 * eased));
                if (progress < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            }
          }

          observer.unobserve(target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    revealNodes.forEach((node) => observer.observe(node));
    if (scoutSection) observer.observe(scoutSection);
    const signatureSections = document.querySelectorAll<HTMLElement>(
      ".signal-system, .privacy-system, .scout-system, .pricing-preview, .journal-preview",
    );
    signatureSections.forEach((section) => observer.observe(section));

    let frame = 0;
    const updateScrollMotion = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) hero.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.055, 54)}px`);

      const mechanism = document.querySelector<HTMLElement>(".signal-system");
      if (mechanism) {
        const rect = mechanism.getBoundingClientRect();
        const progress = clamp((window.innerHeight * 0.78 - rect.top) / (rect.height * 0.66));
        const step = progress < 0.12 ? 0 : progress < 0.34 ? 1 : progress < 0.55 ? 2 : progress < 0.76 ? 3 : 4;
        mechanism.style.setProperty("--signal-progress", `${progress * 100}%`);
        mechanism.dataset.step = String(step);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScrollMotion);
    };

    const scene = document.querySelector<HTMLElement>(".hero-signal-scene");
    const onPointerMove = (event: PointerEvent) => {
      if (!scene || reducedMotion || window.innerWidth < 900) return;
      const rect = scene.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width) - 0.5;
      const y = clamp((event.clientY - rect.top) / rect.height) - 0.5;
      scene.style.setProperty("--scene-tilt-x", `${y * -2.4}deg`);
      scene.style.setProperty("--scene-tilt-y", `${x * 3}deg`);
    };
    const resetPointer = () => {
      scene?.style.setProperty("--scene-tilt-x", "0deg");
      scene?.style.setProperty("--scene-tilt-y", "0deg");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    scene?.addEventListener("pointermove", onPointerMove);
    scene?.addEventListener("pointerleave", resetPointer);
    updateScrollMotion();
    requestAnimationFrame(() => root.classList.add("motion-loaded"));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      scene?.removeEventListener("pointermove", onPointerMove);
      scene?.removeEventListener("pointerleave", resetPointer);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("motion-loaded");
    };
  }, [pathname]);

  return null;
}
