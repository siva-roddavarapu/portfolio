// src/components/animations/ScrambleText.tsx
"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface ScrambleTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export const ScrambleText = ({ text, speed = 100, className }: ScrambleTextProps) => {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "; // preserve spaces
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      iteration += 0.5;

      if (iteration >= text.length) {
        clearInterval(interval);
        setOutput(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]); // speed is now in the dep array

  return <span className={className}>{output}</span>;
};
