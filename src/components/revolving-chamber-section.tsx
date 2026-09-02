"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface RevolvingChamberSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  zIndex?: number;
  theme?: "paper" | "dark" | "forest";
  ariaLabelledby?: string;
}

export function RevolvingChamberSection({
  children,
  id,
  className = "",
  zIndex = 1,
  theme = "paper",
  ariaLabelledby,
}: RevolvingChamberSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track the section's position as it enters, traverses, and leaves the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D Revolving Signal Chamber Transform Curves
  // [0 = entering bottom, 0.28 = locked flat, 0.72 = begins revolving out, 1 = exiting top]
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [-24, 0, 0, 24]
  );

  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [-320, 0, 0, -320]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.92, 1, 1, 0.92]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.35, 1, 1, 0.35]
  );

  return (
    <div className={`revolving-chamber-stage theme-${theme}`} style={{ zIndex }}>
      <motion.section
        ref={containerRef}
        id={id}
        aria-labelledby={ariaLabelledby}
        style={{
          rotateX,
          translateZ,
          scale,
          opacity,
          transformOrigin: "center center -100px",
        }}
        className={`revolving-chamber-facet ${className}`}
      >
        {/* Optical 3D Horizon Seam (Glows when chamber locks to 0 deg) */}
        <div className="chamber-horizon-seam" aria-hidden="true" />

        {/* Content */}
        <div className="chamber-content-wrap">
          {children}
        </div>
      </motion.section>
    </div>
  );
}
