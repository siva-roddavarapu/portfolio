"use client";

// src/components/sections/experience/Experience.tsx
//
// Layout shell only. All data from useExperience().
// To update content → src/modules/experience/hooks/useExperience.ts

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/modules/experience/hooks/useExperience";
import { ExperienceEntry, ExperienceProject } from "@/modules/experience/types/experience.types";
import { usePortfolio } from "@/modules/user/hooks/usePortfolio";

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(3px)",
    transition: { duration: 0.2, ease: "easeIn"  as const},
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const bulletVariant = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─────────────────────────────────────────────────────────────
   STACK PILL
───────────────────────────────────────────────────────────── */

const StackPill = ({ label }: { label: string }) => (
  <span
    className="inline-block text-[11px] font-mono px-2.5 py-1 rounded-full"
    style={{
      border: "1px solid rgba(var(--color-accent-rgb), 0.2)",
      color: "var(--color-accent)",
      background: "rgba(var(--color-accent-rgb), 0.05)",
    }}
  >
    {label}
  </span>
);

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────── */

const ProjectCard = ({ name, description, link }: ExperienceProject) => (
  <motion.div
    variants={bulletVariant}
    className="group relative rounded-md p-4 cursor-default transition-all duration-200"
    style={{
      background: "rgba(var(--color-accent-rgb), 0.03)",
      border: "1px solid rgba(var(--color-accent-rgb), 0.1)",
    }}
    whileHover={{
      backgroundColor: "rgba(var(--color-accent-rgb), 0.07)",
      borderColor: "rgba(var(--color-accent-rgb), 0.25)",
      transition: { duration: 0.15 },
    }}
  >
    <div className="flex items-start justify-between gap-3 mb-1.5">
      <span
        className="text-[13px] font-semibold font-mono"
        style={{ color: "var(--color-text-primary)" }}
      >
        {name}
      </span>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ color: "var(--color-accent)" }}
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </a>
      )}
    </div>
    <p
      className="text-[13px] leading-relaxed"
      style={{ color: "var(--color-text-secondary)" }}
    >
      {description}
    </p>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   ROLE PANEL
───────────────────────────────────────────────────────────── */

const RolePanel = ({ entry }: { entry: ExperienceEntry }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={entry.role + entry.period}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* Role + company */}
      <div className="mb-5">
        <h3
          className="text-lg font-semibold leading-tight mb-1"
          style={{
            color: "var(--color-text-primary)",
            fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
          }}
        >
          {entry.role}{" "}
          <span style={{ color: "var(--color-accent)" }}>·</span>{" "}
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-70"
              style={{ color: "var(--color-accent)" }}
            >
              {entry.company}
            </a>
          ) : (
            <span style={{ color: "var(--color-accent)" }}>{entry.company}</span>
          )}
        </h3>
        <p
          className="text-xs font-mono tracking-wide"
          style={{ color: "var(--color-text-muted)" }}
        >
          {entry.period}
          {entry.type === "intern" && (
            <span
              className="ml-2 px-1.5 py-0.5 rounded text-[10px]"
              style={{
                background: "rgba(var(--color-accent-rgb), 0.08)",
                color: "var(--color-accent)",
                border: "1px solid rgba(var(--color-accent-rgb), 0.2)",
              }}
            >
              internship
            </span>
          )}
        </p>
      </div>

      {/* Summary */}
      <p
        className="text-[14px] leading-relaxed mb-5 max-w-[56ch]"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {entry.summary}
      </p>

      {/* Bullets */}
      <motion.ul variants={stagger} initial="hidden" animate="show" className="space-y-3 mb-6">
        {entry.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            variants={bulletVariant}
            className="flex gap-3 text-[14px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span className="shrink-0 mt-1.25" style={{ color: "var(--color-accent)" }} aria-hidden>
              ▹
            </span>
            <span>{bullet}</span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {entry.stack.map((tech) => (
          <StackPill key={tech} label={tech} />
        ))}
      </div>

      {/* Embedded project cards */}
      {entry.projects && entry.projects.length > 0 && (
        <div>
          <p
            className="text-[11px] font-mono tracking-[0.15em] uppercase mb-3"
            style={{ color: "var(--color-text-muted)" }}
          >
            shipped work
          </p>
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
            {entry.projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
);

/* ─────────────────────────────────────────────────────────────
   SECTION LABEL — consistent with Hero eyebrow pattern
───────────────────────────────────────────────────────────── */

const SectionLabel = ({ label }: { label: string }) => (
  <div
    className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase mb-12"
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
    {label}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE SECTION
───────────────────────────────────────────────────────────── */

export const Experience = () => {
  const { entries } = useExperience();
  const {resumeUrl} = usePortfolio();
  const [activeIdx, setActiveIdx] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIdx(Math.min(idx + 1, entries.length - 1));
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIdx(Math.max(idx - 1, 0));
      }
    },
    [entries.length]
  );

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <SectionLabel label="experience" />

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Tab list */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Work experience"
          className="relative flex md:flex-col shrink-0 overflow-x-auto md:overflow-visible"
          style={{ borderLeft: "2px solid rgba(var(--color-accent-rgb), 0.1)" }}
        >
          {/* Sliding indicator */}
          <div
            className="absolute left-0 hidden md:block transition-transform duration-300 ease-out"
            style={{
              width: 2,
              height: `${100 / entries.length}%`,
              background: "var(--color-accent)",
              transform: `translateY(${activeIdx * 100}%)`,
            }}
            aria-hidden
          />

          {entries.map((entry, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={entry.period}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${idx}`}
                id={`tab-${idx}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="relative text-left px-5 py-3 text-sm font-mono whitespace-nowrap
                           transition-all duration-200 focus-visible:outline-none
                           focus-visible:ring-2"
                style={{
                  color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                  background: isActive
                    ? "rgba(var(--color-accent-rgb), 0.06)"
                    : "transparent",
                }}
              >
                {/* Mobile active indicator */}
                <span
                  className="md:hidden absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200"
                  style={{ background: isActive ? "var(--color-accent)" : "transparent" }}
                  aria-hidden
                />
                {entry.company}
                <span
                  className="block text-[10px] tracking-wide mt-0.5"
                  style={{ color: "var(--color-text-muted)", opacity: 0.7 }}
                >
                  {entry.period.split("—")[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          className="flex-1 min-w-0"
          id={`panel-${activeIdx}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeIdx}`}
        >
          <RolePanel entry={entries[activeIdx]} />
        </div>
      </div>

      {/* Resume link */}
      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href={`${resumeUrl}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-mono transition-colors duration-150"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span className="group-hover:underline">View full résumé</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "var(--color-accent)" }}
          >
            ↗
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
};