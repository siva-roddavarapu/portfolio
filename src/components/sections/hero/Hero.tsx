"use client";

import { RainbowField } from "@/components/animations/RainbowField";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { useUser } from "@/modules/user/hooks/useUser";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

interface HeroProps {
  resumeUrl?: string;
}

/* ================= ANIMATIONS ================= */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const highlights = [
  "AI-powered platforms",
  "high-performance systems",
  "scalable SaaS applications",
];

/* ================= COMPONENT ================= */

export const Hero = ({ resumeUrl = "/resume.pdf" }: HeroProps) => {
  const user = useUser();

  /* ===== Rotating Text ===== */
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % highlights.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center overflow-hidden">
        <RainbowField />
      {/* ================= CONTENT ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-2xl"
      >
        {/* Intro */}
        <motion.p variants={item} className="text-accent text-sm mb-4">
          Hi, my name is
        </motion.p>

        {/* Name (SCRAMBLE) */}
        <motion.h1 variants={item} className="text-5xl sm:text-7xl font-bold tracking-tight">
          <ScrambleText text={user.name} speed={100} />
        </motion.h1>

        {/* Role */}
        <motion.h2 variants={item} className="text-2xl sm:text-4xl text-text-secondary mt-2">
          {user.role}
        </motion.h2>

        {/* Highlight */}
        <motion.h3
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg text-accent mt-4"
        >
          I build {highlights[index]}
        </motion.h3>

        {/* Description */}
        <motion.p variants={item} className="mt-6 text-text-secondary max-w-xl leading-relaxed">
          I engineer high-performance, AI-powered web platforms used by thousands of users, focusing
          on scalability, clean architecture, and real-world impact.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          {/* Projects */}
          <a
            href="#projects"
            className="px-6 py-3 border border-accent text-accent rounded-md hover:bg-accent-soft transition"
          >
            Explore my Work
          </a>

          {/* Resume (Shimmer) */}
          <a
            href={resumeUrl}
            download
            className="relative px-6 py-3 rounded-md border border-accent text-accent overflow-hidden group"
          >
            <span className="relative z-10">Download Resume</span>

            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-shimmer" />
            </span>
          </a>

          {/* Contact */}
          <a href="#contact" className="px-6 py-3 text-text-secondary hover:text-accent transition">
            Let’s Connect →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
