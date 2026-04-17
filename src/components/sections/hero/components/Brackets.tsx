// src/components/sections/hero/components/Brackets.tsx
"use client";

import { motion } from "framer-motion";

export const Brackets = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5">
    <motion.span
      className="font-mono select-none"
      style={{ color: "rgba(var(--color-accent-rgb), 0.3)" }}
      animate={{ opacity: [0.35, 1, 0.35] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {"<"}
    </motion.span>
    {children}
    <motion.span
      className="font-mono select-none"
      style={{ color: "rgba(var(--color-accent-rgb), 0.3)" }}
      animate={{ opacity: [0.35, 1, 0.35] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
    >
      {"/>"}
    </motion.span>
  </span>
);
