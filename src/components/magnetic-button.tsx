"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "data-cursor"?: string;
  beam?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  target,
  rel,
  "data-cursor": cursorLabel,
  beam = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.28, y: middleY * 0.28 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.5 }}
      className={`magnetic-wrapper ${beam ? "has-border-beam" : ""} ${className}`}
      data-cursor={cursorLabel}
    >
      {beam && <span className="border-beam-ring" aria-hidden="true" />}
      <span className="magnetic-sheen" aria-hidden="true" />
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className="magnetic-anchor"
        data-cursor={cursorLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="magnetic-anchor" data-cursor={cursorLabel}>
      {content}
    </button>
  );
}
