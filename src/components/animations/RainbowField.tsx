"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* 🌈 Softer rainbow palette */
const ARC_HUES = [265, 240, 210, 170, 120, 60, 25, 350];

interface Config {
  numArcs: number;
  segsPerArc: number;
  segLength: number;
  segWidth: number;
  arcStartRadius: number;
  arcSpacing: number;
  magnetStrength: number;
  originXRatio: number;
  originYRatio: number;
  sweepStart: number;
  sweepEnd: number;
}

const DEFAULT_CONFIG: Config = {
  numArcs: 8,
  segsPerArc: 32,
  segLength: 20,
  segWidth: 3.5,
  arcStartRadius: 65,
  arcSpacing: 16,
  magnetStrength: 1.2,
  originXRatio: 0.5,
  originYRatio: 1.25,
  sweepStart: Math.PI * 1.1,
  sweepEnd: Math.PI * 1.9,
};

interface Seg {
  x: number;
  y: number;
  baseAngle: number;
  currentAngle: number;
  hue: number;
}

export const RainbowField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const springRef = useRef({ x: 0, y: 0 });

  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  /* 🧲 Mouse tracking */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -500, y: -500 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let isMounted = true;

    /* 🎯 Resize handling */
    function resize() {
      const rect = canvas.getBoundingClientRect();
      const DPR = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);   

      return { W: rect.width, H: rect.height };
    }

    let { W, H } = resize();
    window.addEventListener("resize", () => {
      const size = resize();
      W = size.W;
      H = size.H;
    });

    /* 🎯 Build segments */
    function buildSegments(): Seg[] {
      const segments: Seg[] = [];

      const OX = W * config.originXRatio;
      const OY = H * config.originYRatio;

      for (let a = 0; a < config.numArcs; a++) {
        const radius = config.arcStartRadius + a * config.arcSpacing;
        const hue = ARC_HUES[a % ARC_HUES.length];

        for (let s = 0; s < config.segsPerArc; s++) {
          const t = s / (config.segsPerArc - 1);
          const angle =
            config.sweepStart +
            t * (config.sweepEnd - config.sweepStart);

          const x = OX + Math.cos(angle) * radius;
          const y = OY + Math.sin(angle) * radius;

          const baseAngle = angle + Math.PI / 2;

          segments.push({
            x,
            y,
            baseAngle,
            currentAngle: baseAngle,
            hue,
          });
        }
      }

      return segments;
    }

    let segments = buildSegments();

    const lerp = (a: number, b: number, t: number) =>
      a + (b - a) * t;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick() {
      if (!isMounted) return;

      /* 🧲 Smooth cursor */
      springRef.current.x = lerp(
        springRef.current.x,
        mouseRef.current.x,
        0.08
      );
      springRef.current.y = lerp(
        springRef.current.y,
        mouseRef.current.y,
        0.08
      );

      /* ✅ Transparent background */
      ctx.clearRect(0, 0, W, H);

      const { x: sx, y: sy } = springRef.current;

      for (const seg of segments) {
        const dx = sx - seg.x;
        const dy = sy - seg.y;

        const dist = Math.hypot(dx, dy);
        const toCursor = Math.atan2(dy, dx);

        const reach = 180;
        const rawT = Math.max(0, 1 - dist / reach);

        const influence = easeOut(rawT) * config.magnetStrength;

        const diff =
          ((toCursor - seg.baseAngle + Math.PI * 3) %
            (Math.PI * 2)) -
          Math.PI;

        seg.currentAngle +=
          (seg.baseAngle + diff * influence - seg.currentAngle) * 0.15;

        const half = config.segLength / 2;
        const cos = Math.cos(seg.currentAngle);
        const sin = Math.sin(seg.currentAngle);

        ctx.save();

        const lightness = 60 + rawT * 10;

        ctx.strokeStyle = `hsl(${seg.hue}, 85%, ${lightness}%)`;
        ctx.lineWidth = config.segWidth;
        ctx.lineCap = "round";

        ctx.shadowColor = `hsl(${seg.hue}, 90%, 70%)`;
        ctx.shadowBlur = 8 * rawT;

        ctx.beginPath();
        ctx.moveTo(seg.x - cos * half, seg.y - sin * half);
        ctx.lineTo(seg.x + cos * half, seg.y + sin * half);
        ctx.stroke();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [config]);

  return (
    <div style={{ width: "100%" }}>
      {/* 🎛️ Configurator */}
      <div style={{ padding: 12 }}>
        <label>Arcs: {config.numArcs}</label>
        <input
          type="range"
          min={3}
          max={12}
          value={config.numArcs}
          onChange={(e) =>
            setConfig({ ...config, numArcs: Number(e.target.value) })
          }
        />

        <label>Spacing: {config.arcSpacing}</label>
        <input
          type="range"
          min={10}
          max={40}
          value={config.arcSpacing}
          onChange={(e) =>
            setConfig({ ...config, arcSpacing: Number(e.target.value) })
          }
        />

        <label>Magnet: {config.magnetStrength}</label>
        <input
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={config.magnetStrength}
          onChange={(e) =>
            setConfig({
              ...config,
              magnetStrength: Number(e.target.value),
            })
          }
        />
      </div>

      {/* 🎨 Canvas */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: 300,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};