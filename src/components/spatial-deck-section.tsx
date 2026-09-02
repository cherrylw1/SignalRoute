"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SpatialDeckSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  zIndex?: number;
  theme?: "orange" | "paper" | "dark" | "forest";
  ariaLabelledby?: string;
}

export function SpatialDeckSection({
  children,
  id,
  className = "",
  zIndex = 1,
  theme = "paper",
  ariaLabelledby,
}: SpatialDeckSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the section's position as it scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // As this section scrolls past the top of the viewport
  });

  // Smooth Z-axis recession as the section exits the active viewport
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.95, 0.72]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 36]); // Subtle parallax grounding

  return (
    <motion.section
      ref={containerRef}
      id={id}
      aria-labelledby={ariaLabelledby}
      style={{
        scale,
        opacity,
        y,
        zIndex,
        transformOrigin: "top center",
      }}
      className={`spatial-deck-plate spatial-theme-${theme} ${className}`}
    >
      {/* Specular Edge Rim that catches photon light as it enters */}
      <div className="deck-specular-rim" aria-hidden="true">
        <span className="deck-rim-laser" />
      </div>

      {/* Kinetic Section Entrance Choreography */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="deck-inner-chassis"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
