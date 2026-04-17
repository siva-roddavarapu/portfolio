// src/components/sections/hero/components/MagneticButton.tsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  href: string;
  download?: boolean;
  variant?: "solid" | "outline" | "ghost";
  children: React.ReactNode;
}

export const MagneticButton = ({
  href,
  download,
  variant = "outline",
  children,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const sx = useSpring(bx, { stiffness: 180, damping: 18 });
  const sy = useSpring(by, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    bx.set((e.clientX - r.left - r.width / 2) * 0.28);
    by.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => {
    bx.set(0);
    by.set(0);
  };

  // All colors reference CSS variables so they switch with the theme
  const solidStyle: React.CSSProperties = {
    background: "var(--color-accent)",
    color: "var(--color-background)",
    border: "none",
    fontWeight: 600,
  };
  const outlineStyle: React.CSSProperties = {
    background: "transparent",
    color: "var(--color-accent)",
    border: "1px solid rgba(var(--color-accent-rgb), 0.35)",
  };
  const ghostStyle: React.CSSProperties = {
    background: "transparent",
    color: "var(--color-text-muted)",
    border: "none",
  };

  const styleMap = { solid: solidStyle, outline: outlineStyle, ghost: ghostStyle };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      style={{ x: sx, y: sy, ...styleMap[variant] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={
        variant === "outline"
          ? {
              borderColor: "rgba(var(--color-accent-rgb), 0.8)",
              backgroundColor: "rgba(var(--color-accent-rgb), 0.06)",
            }
          : variant === "ghost"
            ? { color: "var(--color-text-secondary)" }
            : {}
      }
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-3 rounded text-sm font-mono font-medium overflow-hidden select-none"
    >
      {/* Sweep shimmer on solid variant */}
      {variant === "solid" && (
        <motion.span
          className="absolute inset-0 -skew-x-12 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.38) 50%, transparent 100%)",
            x: "-110%",
          }}
          whileHover={{ x: "210%" }}
          transition={{ duration: 0.42 }}
        />
      )}
      {variant === "solid" && (
        <motion.span
          className="absolute inset-0 rounded pointer-events-none"
          initial={{ boxShadow: "0 0 0px 0px transparent" }}
          whileHover={{
            boxShadow: "0 0 22px 4px rgba(var(--color-accent-rgb), 0.18)",
          }}
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
};
