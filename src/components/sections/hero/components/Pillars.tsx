// src/components/sections/hero/components/Pillars.tsx
"use client";

import { motion } from "framer-motion";

const blurUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface PillarsProps {
  pillars: [string, string, string];
}

export const Pillars = ({ pillars }: PillarsProps) => (
  <motion.div variants={blurUp} className="flex items-center gap-2 mt-7 flex-wrap">
    {pillars.map((p, i) => (
      <motion.span
        key={p}
        className="text-[11px] font-mono px-3 py-1.5 rounded-full cursor-default"
        style={{
          border: "1px solid rgba(var(--color-accent-rgb), 0.14)",
          color: "var(--color-text-muted)",
          background: "rgba(var(--color-accent-rgb), 0.025)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
        whileHover={{
          color: "var(--color-accent)",
          borderColor: "rgba(var(--color-accent-rgb), 0.6)",
          backgroundColor: "rgba(var(--color-accent-rgb), 0.08)",
          scale: 1.05,
          transition: { duration: 0.12 },
        }}
      >
        {p}
      </motion.span>
    ))}
    <motion.span
      className="text-[11px] font-mono"
      style={{ color: "var(--color-surface-light)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      — the things I refuse to compromise on.
    </motion.span>
  </motion.div>
);
