"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface PhotonicSplitSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  zIndex?: number;
  theme?: "paper" | "dark" | "forest";
  ariaLabelledby?: string;
}

export function PhotonicSplitSection({
  children,
  id,
  className = "",
  zIndex = 1,
  theme = "paper",
  ariaLabelledby,
}: PhotonicSplitSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track as this section approaches and enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 0.3"],
  });

  // Dual-blade mechanical shutter parting:
  // Top blade covers the top half, parts upward off-screen (0% -> -100%)
  // Bottom blade covers the bottom half, parts downward off-screen (0% -> 100%)
  const topBladeY = useTransform(
    scrollYProgress,
    [0.1, 0.65],
    prefersReducedMotion ? ["-100%", "-100%"] : ["0%", "-100%"]
  );

  const bottomBladeY = useTransform(
    scrollYProgress,
    [0.1, 0.65],
    prefersReducedMotion ? ["100%", "100%"] : ["0%", "100%"]
  );

  // Photonic Horizon Laser Beam:
  // Shoots across horizontally at the equator, then fades as the shutter opens
  const beamOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.14, 0.58, 0.68],
    [0, 1, 1, 0]
  );

  const beamScaleX = useTransform(
    scrollYProgress,
    [0.06, 0.16],
    [0.05, 1]
  );

  // Subtle optical contrast reveal of the inner content
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    [0.7, 1]
  );

  return (
    <div
      ref={containerRef}
      id={id}
      aria-labelledby={ariaLabelledby}
      style={{ zIndex }}
      className={`photonic-split-container theme-${theme} ${className}`}
    >
      {/* The Section Content (Unveiled Underneath in Crystal-Clear Focus) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="photonic-content-chassis"
      >
        {children}
      </motion.div>

      {/* Dual-Blade Mechanical Shutter Gate (Parts Vertically from Horizon) */}
      <div className="shutter-gate" aria-hidden="true">
        {/* Top Shutter Blade */}
        <motion.div
          style={{ y: topBladeY }}
          className="shutter-blade shutter-blade-top"
        >
          <div className="shutter-edge-glow shutter-edge-glow-bottom" />
        </motion.div>

        {/* Bottom Shutter Blade */}
        <motion.div
          style={{ y: bottomBladeY }}
          className="shutter-blade shutter-blade-bottom"
        >
          <div className="shutter-edge-glow shutter-edge-glow-top" />
        </motion.div>

        {/* Photonic Horizon Laser Beam (Deterministic Signal Slice) */}
        <motion.div
          style={{
            opacity: beamOpacity,
            scaleX: beamScaleX,
          }}
          className="horizon-laser-beam"
        />
      </div>
    </div>
  );
}
