"use client";

// src/components/sections/hero/Hero.tsx
//
// Layout shell only. Zero hardcoded content.
// All copy comes from useHero() → edit src/modules/hero/hooks/useHero.ts

import { motion } from "framer-motion";
import { useHero } from "@/modules/hero/hooks/useHero";
import { AmbientParticles } from "@/components/sections/hero/components/AmbientParticles";
import { MagneticButton } from "@/components/sections/hero/components/MagneticButton";

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */

const orchestrate = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" as const },
  },
};

/* ─────────────────────────────────────────────────────────────
   STACK CHIP
───────────────────────────────────────────────────────────── */

const StackChip = ({ label, delay }: { label: string; delay: number }) => (
  <motion.span
    className="inline-block text-[11px] font-mono px-2.5 py-1 rounded-full cursor-default"
    style={{
      border: "1px solid rgba(var(--color-accent-rgb), 0.18)",
      color: "var(--color-text-secondary)",
      background: "rgba(var(--color-accent-rgb), 0.03)",
    }}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{
      color: "var(--color-accent)",
      borderColor: "rgba(var(--color-accent-rgb), 0.55)",
      background: "rgba(var(--color-accent-rgb), 0.07)",
      scale: 1.04,
      transition: { duration: 0.1 },
    }}
  >
    {label}
  </motion.span>
);

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */

export const Hero = () => {
  const { eyebrow, headline, paragraphs, stack, resumeUrl } = useHero();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background: particles + dot grid */}
      <AmbientParticles />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(var(--color-accent-rgb), 0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 20% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <motion.div
        variants={orchestrate}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-2xl"
      >
        {/* ── Eyebrow label ── */}
        <motion.p
          variants={fadeIn}
          className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase mb-8"
          style={{ color: "var(--color-accent)" }}
        >
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 1,
              background: "var(--color-accent)",
              flexShrink: 0,
            }}
          />
          {eyebrow}
        </motion.p>

        {/* ── Headline ── */}
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.1] tracking-tight mb-10"
          style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
            color: "var(--color-text-primary)",
            fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
          }}
        >
          {headline}
        </motion.h2>

        {/* ── Paragraphs ── */}
        <div className="space-y-5 mb-10">
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-[15px] leading-[1.9] max-w-[58ch]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* ── Stack pills ── */}
        <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mb-12">
          {stack.map((tech, i) => (
            <StackChip key={tech} label={tech} delay={0.5 + i * 0.05} />
          ))}
        </motion.div>

        {/* ── Gradient rule ── */}
        <motion.div
          variants={fadeIn}
          className="mb-8 h-px"
          style={{
            maxWidth: 240,
            background:
              "linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.35), transparent)",
          }}
        />

        {/* ── CTAs ── */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <MagneticButton href="#experience" variant="solid">
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↗
            </motion.span>
            View my work
          </MagneticButton>

          <MagneticButton href={resumeUrl} download variant="outline">
            ↓ Resume
          </MagneticButton>

          <MagneticButton href="#contact" variant="ghost">
            <span className="flex items-center gap-1.5">
              Get in touch
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};