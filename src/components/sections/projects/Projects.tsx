"use client";

// src/components/sections/projects/Projects.tsx
//
// "Things I've Shipped" — numbered accordion cards.
// Each card expands independently; the grid never stretches siblings.
//
// Layout shell only. All data from useProjects().
// To update content → src/modules/projects/hooks/useProjects.ts

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/modules/projects/hooks/useProjects";
import { Project, ProjectMetric } from "@/modules/projects/types/projects.types";

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */

const sectionFade = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const descVariant = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15 },
  },
};

/* ─────────────────────────────────────────────────────────────
   CATEGORY BADGE
───────────────────────────────────────────────────────────── */

const categoryLabel: Record<Project["category"], string> = {
  platform: "platform",
  ai: "AI / ML",
  tooling: "tooling",
  viz: "visualisation",
};

const CategoryBadge = ({ category }: { category: Project["category"] }) => (
  <span
    className="text-[10px] font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
    style={{
      border: "1px solid var(--color-card-border-active)",
      color: "var(--color-text-secondary)",
      background: "var(--color-metric-bg)",
    }}
  >
    {categoryLabel[category]}
  </span>
);

/* ─────────────────────────────────────────────────────────────
   METRIC CHIP — neutral, works in both themes
───────────────────────────────────────────────────────────── */

const MetricChip = ({ metric, index }: { metric: ProjectMetric; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center px-3 py-2.5 rounded-lg"
    style={{
      background: "var(--color-metric-bg)",
      border: "1px solid var(--color-metric-border)",
      minWidth: 68,
    }}
  >
    <span
      className="text-lg font-bold font-mono leading-none mb-1"
      style={{ color: "var(--color-metric-value)" }}
    >
      {metric.value}
    </span>
    <span
      className="text-[10px] font-mono text-center leading-tight"
      style={{ color: "var(--color-text-muted)" }}
    >
      {metric.label}
    </span>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   STACK PILL
───────────────────────────────────────────────────────────── */

const StackPill = ({ label }: { label: string }) => (
  <span
    className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full"
    style={{
      border: "1px solid var(--color-card-border)",
      color: "var(--color-text-muted)",
      background: "var(--color-metric-bg)",
    }}
  >
    {label}
  </span>
);

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
   Note: self-contained in its own grid cell. The grid uses
   `items-start` so expanding this card never stretches siblings.
───────────────────────────────────────────────────────────── */

const ProjectCard = ({
  project,
  index,
  isActive,
  onToggle,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.article
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      onClick={onToggle}
      className="relative rounded-xl p-6 cursor-pointer"
      style={{
        background: isActive ? "var(--color-card-bg-active)" : "var(--color-card-bg)",
        border: isActive
          ? "1px solid var(--color-card-border-active)"
          : "1px solid var(--color-card-border)",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
      whileHover={{
        borderColor: "var(--color-card-border-hover)",
        transition: { duration: 0.15 },
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="text-[11px] font-mono tabular-nums shrink-0"
            style={{ color: "var(--color-accent)", opacity: 0.7 }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="text-[15px] font-semibold leading-snug truncate"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
            }}
          >
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono" style={{ color: "var(--color-text-muted)" }}>
            {project.year}
          </span>
          <CategoryBadge category={project.category} />
        </div>
      </div>

      {/* ── Tagline ── */}
      <p
        className="text-[13px] leading-relaxed mb-4 pl-7"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {project.tagline}
      </p>

      {/* ── Metrics — always visible ── */}
      <div className="flex gap-2 flex-wrap pl-7 mb-4">
        {project.metrics.map((metric, i) => (
          <MetricChip key={metric.value + metric.label} metric={metric} index={i} />
        ))}
      </div>

      {/* ── Expanded content ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            variants={descVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="pl-7"
          >
            <p
              className="text-[13px] leading-relaxed mb-4"
              style={{
                color: "var(--color-text-secondary)",
                borderTop: "1px solid var(--color-divider)",
                paddingTop: "1rem",
              }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <StackPill key={tech} label={tech} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Caret ── */}
      <motion.div
        className="absolute bottom-4 right-5"
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ color: "var(--color-text-muted)" }}
        >
          <path
            d="M3 5L7 9L11 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────────────────────
   SECTION LABEL — matches Experience eyebrow
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
   PROJECTS SECTION
───────────────────────────────────────────────────────────── */

export const Projects = () => {
  const { projects } = useProjects();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <SectionLabel label="things I've shipped" />

        <p
          className="text-[14px] leading-relaxed mb-12 max-w-[52ch]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          A handful of systems I built from scratch or reshaped significantly.{" "}
          <span className="font-mono text-[12px]" style={{ color: "var(--color-text-muted)" }}>
            Click any card to read the full story.
          </span>
        </p>
      </motion.div>

      {/*
        `items-start` is the key fix for the expanding-sibling bug.
        Without it, CSS grid stretches BOTH cells in a row to match
        the tallest one — so opening card 01 also grows card 02's
        bounding box even though its content hasn't changed.
        `items-start` pins each cell to its own content height.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isActive={activeId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        ))}
      </div>
    </section>
  );
};
