// src/components/common/ThemeToggle.tsx
"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex items-center gap-3 w-fit focus-visible:outline-none"
    >
      {/* Track */}
      <div
        className="relative w-12 h-6 rounded-full transition-all duration-500 overflow-hidden"
        style={{
          background: isDark
            ? "rgba(var(--color-accent-rgb), 0.12)"
            : "rgba(var(--color-accent-rgb), 0.18)",
          border: "1px solid rgba(var(--color-accent-rgb), 0.35)",
        }}
      >
        {/* Sliding thumb */}
        <motion.div
          className="absolute top-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
          animate={{ x: isDark ? 3 : 27 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          style={{ background: "var(--color-accent)" }}
        >
          {/* Icon inside thumb */}
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -40, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 40, scale: 0.5 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                <BsMoonStarsFill size={9} style={{ color: "var(--color-background)" }} />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 40, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -40, scale: 0.5 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                <BsSun size={9} style={{ color: "var(--color-background)" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Label crossfade */}
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-[11px] font-mono tracking-widest uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          {isDark ? "dark" : "light"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
