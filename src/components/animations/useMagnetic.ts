"use client";

import { useEffect, useRef } from "react";

export const useMagnetic = (strength = 40) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const moveX = x / strength;
      const moveY = y / strength;

      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    const reset = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return ref;
};