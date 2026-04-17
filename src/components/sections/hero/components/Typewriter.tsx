// src/components/sections/hero/components/Typewriter.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TypewriterProps {
  phrases: string[];
}

export const Typewriter = ({ phrases }: TypewriterProps) => {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [erasing, setErasing] = useState(false);
  const [blink, setBlink] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Variable speed: slower on capitals + punctuation for a mechanical feel
  const delay = useCallback((char: string): number => {
    if (char === char.toUpperCase() && char !== char.toLowerCase()) return 95;
    if ([",", ".", "!"].includes(char)) return 260;
    return 44 + Math.random() * 30;
  }, []);

  useEffect(() => {
    const target = phrases[phraseIdx];
    if (timer.current) clearTimeout(timer.current);

    if (!erasing && text.length < target.length) {
      timer.current = setTimeout(
        () => setText(target.slice(0, text.length + 1)),
        delay(target[text.length]),
      );
    } else if (!erasing && text.length === target.length) {
      timer.current = setTimeout(() => setErasing(true), 2200);
    } else if (erasing && text.length > 0) {
      timer.current = setTimeout(() => setText(text.slice(0, -1)), 22);
    } else {
      setErasing(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, erasing, phraseIdx, phrases, delay]);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="font-mono">
      <span style={{ color: "var(--color-accent)" }}>I build </span>
      <span style={{ color: "var(--color-text-primary)" }}>{text}</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "2px",
          height: "0.85em",
          background: "var(--color-accent)",
          marginLeft: "2px",
          verticalAlign: "middle",
          opacity: blink ? 1 : 0,
          transition: "opacity 0.08s",
        }}
      />
    </span>
  );
};
