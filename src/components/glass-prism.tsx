"use client";

import React, { useRef, useEffect } from "react";
import { playPrismChime } from "@/lib/sound";

export function GlassPrism() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrameRef = useRef<number>(0);
  const rotRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let t = 0;

    const render = () => {
      t += 0.015;
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      rotRef.current.y = (m.x - 0.5) * 1.6 + Math.sin(t * 0.5) * 0.2;
      rotRef.current.x = (m.y - 0.5) * -1.2 + Math.cos(t * 0.5) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const size = Math.min(width, height) * 0.32;

      // Draw Caustic Glow Beams
      const gradient = ctx.createRadialGradient(
        cx + (m.x - 0.5) * 80,
        cy + (m.y - 0.5) * 80,
        10,
        cx,
        cy,
        size * 1.8
      );
      gradient.addColorStop(0, "rgba(223, 255, 91, 0.22)");
      gradient.addColorStop(0.4, "rgba(223, 99, 68, 0.14)");
      gradient.addColorStop(1, "rgba(20, 57, 52, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D Octahedral Glass Prism Facets
      const ry = rotRef.current.y;
      const rx = rotRef.current.x;

      const vertices = [
        { x: 0, y: -size, z: 0 }, // Top
        { x: Math.cos(ry) * size, y: 0, z: Math.sin(ry) * size },
        { x: Math.cos(ry + Math.PI / 2) * size, y: 0, z: Math.sin(ry + Math.PI / 2) * size },
        { x: Math.cos(ry + Math.PI) * size, y: 0, z: Math.sin(ry + Math.PI) * size },
        { x: Math.cos(ry + (Math.PI * 3) / 2) * size, y: 0, z: Math.sin(ry + (Math.PI * 3) / 2) * size },
        { x: 0, y: size, z: 0 }, // Bottom
      ];

      // Rotate with X
      const projected = vertices.map((v) => {
        const yRot = v.y * Math.cos(rx) - v.z * Math.sin(rx);
        const zRot = v.y * Math.sin(rx) + v.z * Math.cos(rx);
        return {
          x: cx + v.x,
          y: cy + yRot,
          z: zRot,
        };
      });

      const faces = [
        [0, 1, 2],
        [0, 2, 3],
        [0, 3, 4],
        [0, 4, 1],
        [5, 2, 1],
        [5, 3, 2],
        [5, 4, 3],
        [5, 1, 4],
      ];

      // Sort faces by Z-depth
      faces.sort((a, b) => {
        const zA = (projected[a[0]].z + projected[a[1]].z + projected[a[2]].z) / 3;
        const zB = (projected[b[0]].z + projected[b[1]].z + projected[b[2]].z) / 3;
        return zA - zB;
      });

      faces.forEach((face, idx) => {
        const p1 = projected[face[0]];
        const p2 = projected[face[1]];
        const p3 = projected[face[2]];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        const lightFactor = Math.max(0.1, (p1.z + p2.z + p3.z + size * 2) / (size * 4));
        const isOdd = idx % 2 === 0;

        ctx.fillStyle = isOdd
          ? `rgba(223, 255, 91, ${0.12 + lightFactor * 0.18})`
          : `rgba(223, 99, 68, ${0.1 + lightFactor * 0.15})`;
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Refracted Core Node
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#dfff5b";
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleClick = () => {
    playPrismChime();
  };

  return (
    <div className="glass-prism-container" onClick={handleClick} data-cursor="Refract">
      <canvas ref={canvasRef} className="glass-prism-canvas" />
      <div className="glass-prism-badge">
        <span className="prism-pip">✦</span> 3D SIGNAL REFRACTION MATRIX
      </div>
    </div>
  );
}
