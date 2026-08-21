"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

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
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    revealNodes.forEach((node) => observer.observe(node));
    requestAnimationFrame(() => root.classList.add("motion-loaded"));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-loaded");
    };
  }, [pathname]);

  return null;
}
