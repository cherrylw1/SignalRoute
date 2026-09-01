"use client";

import React, { useRef, useState, useCallback } from "react";
import { playRatchetTick } from "@/lib/sound";

interface TactileDialProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  label: string;
  unit?: string;
  prefix?: string;
  onChange: (val: number) => void;
}

export function TactileDial({
  min,
  max,
  step = 1,
  value,
  label,
  unit = "",
  prefix = "",
  onChange,
}: TactileDialProps) {
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const startValRef = useRef(value);
  const lastTickValRef = useRef(value);

  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const rotationDeg = -135 + normalized * 270; // -135deg to +135deg

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startValRef.current = value;
    lastTickValRef.current = value;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = startYRef.current - e.clientY;
      const range = max - min;
      const change = (deltaY / 150) * range;
      let nextVal = Math.round((startValRef.current + change) / step) * step;
      nextVal = Math.max(min, Math.min(max, nextVal));

      if (nextVal !== lastTickValRef.current) {
        playRatchetTick();
        lastTickValRef.current = nextVal;
        onChange(nextVal);
      }
    },
    [isDragging, max, min, step, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 12-segment VU Meter
  const activeSegments = Math.round(normalized * 12);

  return (
    <div className="tactile-dial-card">
      <div className="tactile-dial-header">
        <span className="tactile-dial-label">{label}</span>
        <strong className="tactile-dial-val">
          {prefix}{value.toLocaleString()}{unit ? ` ${unit}` : ""}
        </strong>
      </div>

      <div className="tactile-dial-controls">
        {/* CNC Milled Dial */}
        <div
          className={`tactile-knob-housing ${isDragging ? "is-active" : ""}`}
          onMouseDown={handleMouseDown}
          data-cursor="Turn Knob"
        >
          <div
            className="tactile-knob-disc"
            style={{ transform: `rotate(${rotationDeg}deg)` }}
          >
            <span className="knob-indicator-dot" />
            <div className="knob-knurl-ridges" />
          </div>
          <span className="knob-pointer-marker" />
        </div>

        {/* Phosphor VU Meter */}
        <div className="tactile-vu-column">
          <span className="vu-title">LEVEL</span>
          <div className="tactile-vu-meter">
            {Array.from({ length: 12 }).map((_, idx) => {
              const segIdx = 11 - idx; // Top to bottom
              const isLit = segIdx < activeSegments;
              const isPeak = segIdx >= 9;
              return (
                <div
                  key={idx}
                  className={`vu-segment ${isLit ? (isPeak ? "is-peak" : "is-lit") : ""}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
