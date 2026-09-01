"use client";

import { motion } from "framer-motion";

interface OdometerProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function SingleDigit({ digit }: { digit: string }) {
  const num = parseInt(digit, 10);
  if (isNaN(num)) {
    return <span className="odometer-char">{digit}</span>;
  }

  return (
    <span className="odometer-digit-slot">
      <motion.span
        className="odometer-digit-column"
        initial={{ y: "0%" }}
        animate={{ y: `-${num * 10}%` }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="odometer-digit-item">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function OdometerNumber({ value, prefix = "", suffix = "", className = "" }: OdometerProps) {
  const str = typeof value === "number" ? value.toLocaleString("en-US") : String(value);
  const chars = str.split("");

  return (
    <span className={`odometer-root ${className}`} aria-label={`${prefix}${str}${suffix}`}>
      {prefix && <span className="odometer-affix">{prefix}</span>}
      <span className="odometer-digits" aria-hidden="true">
        {chars.map((char, i) => (
          <SingleDigit key={`${i}-${char}`} digit={char} />
        ))}
      </span>
      {suffix && <span className="odometer-affix">{suffix}</span>}
    </span>
  );
}
