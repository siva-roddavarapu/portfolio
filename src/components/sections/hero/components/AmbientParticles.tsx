// src/components/sections/hero/components/AmbientParticles.tsx
"use client";

import { useEffect, useState } from "react";

const PARTICLE_COUNT = 28;
const PALETTE = ["#64ffda", "#818cf8", "#f472b6"];

interface Particle {
  size: number;
  left: number;
  top: number;
  dur: number;
  del: number;
  dx: number;
  dy: number;
  color: string;
}

// Generate all random values once — called only on the client after mount
function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    size: 1 + Math.random() * 2.2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 9 + Math.random() * 16,
    del: Math.random() * -22,
    dx: (Math.random() - 0.5) * 70,
    dy: (Math.random() - 0.5) * 70,
    color: PALETTE[i % 3],
  }));
}

export const AmbientParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Only runs on the client — never during SSR
  // This means the server renders nothing for this component (no mismatch)
  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  // Render nothing on server / before hydration
  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.color,
            animation: `particle-drift ${p.dur}s ${p.del}s infinite linear`,
            ["--dx" as string]: `${p.dx}px`,
            ["--dy" as string]: `${p.dy}px`,
          }}
        />
      ))}
    </div>
  );
};