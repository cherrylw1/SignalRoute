"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize Lenis smooth scroll
    let lenis: Lenis | null = null;
    let frameId: number | null = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.18,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.25,
      });

      window.__lenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
    }

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(element as HTMLElement, { offset: -30, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Staggered scroll reveal observer
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(.hero):not(.home-hero):not(.signal-film), .page-hero-inner, .feature-card, .blog-card, .plan-card, .article-header, .blog-content, .legal-shell, .footer-cta",
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("in-view");
          observer.unobserve(target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );

    revealNodes.forEach((node) => observer.observe(node));
    requestAnimationFrame(() => root.classList.add("motion-loaded"));

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleAnchorClick);
      if (frameId) cancelAnimationFrame(frameId);
      if (lenis) {
        lenis.destroy();
        delete window.__lenis;
      }
      root.classList.remove("motion-loaded");
    };
  }, [pathname]);

  return null;
}
