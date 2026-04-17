// src/components/sections/hero/components/SplitName.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/animations/ScrambleText";

interface SplitNameProps {
  text: string;
  /** Speed passed to ScrambleText — lower = faster reveal */
  scrambleSpeed?: number;
}

export const SplitName = ({ text, scrambleSpeed = 55 }: SplitNameProps) => {
  const [scrambleKey, setScrambleKey] = useState(0);

  return (
    <motion.span
      className="inline-block cursor-default select-none"
    >
     
        <ScrambleText
          key={scrambleKey}
          text={text}
          speed={scrambleSpeed}
        />
    </motion.span>
  );
};
