// src/components/sections/hero/components/StatusChip.tsx
"use client";

import { motion } from "framer-motion";

interface StatusChipProps {
  status: string;
  location: string;
}

const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const,
  },
};

export const StatusChip = ({ status, location }: StatusChipProps) => (
  <motion.div variants={slideLeft} className="flex items-center gap-3 mb-8">
    {/* Breathing pulse dot — accent color from CSS variable */}
    <span className="relative flex h-[9px] w-[9px]">
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: "var(--color-accent)" }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="relative flex h-full w-full rounded-full"
        style={{ background: "var(--color-accent)" }}
      />
    </span>

    <span
      className="text-[11px] font-mono tracking-[0.18em] uppercase"
      style={{ color: "var(--color-accent)" }}
    >
      {status}
    </span>

    <span
      className="hidden sm:inline text-[11px] font-mono"
      style={{ color: "var(--color-surface-light)" }}
    >
      ·
    </span>
    <span
      className="hidden sm:inline text-[11px] font-mono"
      style={{ color: "var(--color-text-muted)" }}
    >
      {location}
    </span>
  </motion.div>
);
