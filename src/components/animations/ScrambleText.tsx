"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const ScrambleText = ({ text, speed = 100 }: { text: string; speed: number }) => {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
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
  }, [text]);

  return <span>{output}</span>;
};
