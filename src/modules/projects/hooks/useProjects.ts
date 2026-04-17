// src/modules/projects/hooks/useProjects.ts
//
// Single source of truth for shipped projects.
// Layout shell lives in src/components/sections/projects/Projects.tsx
//
// ─── To wire up the backend ───────────────────────────────────
// import { useQuery } from "@tanstack/react-query";
// import { projectsService } from "@/services/projects.service";
//
// export const useProjects = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["projects"],
//     queryFn: projectsService.getProjects,
//     placeholderData: STATIC_PROJECTS,
//   });
//   return { projects: data ?? STATIC_PROJECTS, isLoading };
// };
// ─────────────────────────────────────────────────────────────

import { Project } from "@/modules/projects/types/projects.types";

const STATIC_PROJECTS: Project[] = [
  {
    id: "workforce-platform",
    title: "Workforce Management Platform",
    tagline: "AI-driven demand–supply engine for 2,000+ employees.",
    description:
      "Enterprise platform that replaced a fragmented set of spreadsheets with a unified workforce intelligence system. The AI recommendation engine — built on Azure OpenAI GPT-4 and vector embeddings — surfaces role matches and capacity gaps in real time, giving managers decisions in seconds instead of days.",
    stack: [
      "React",
      "Next.js",
      "Azure OpenAI",
      "GPT-4",
      "Vector Embeddings",
      "Node.js",
      "PostgreSQL",
    ],
    metrics: [
      { value: "2k+", label: "employees on platform" },
      { value: "35%", label: "search perf gain" },
      { value: "30+", label: "shared UI components" },
    ],
    year: "2023",
    category: "platform",
  },
  {
    id: "career-compass",
    title: "Career Compass",
    tagline: "Interactive career graph — explore every path forward.",
    description:
      "Turned a static career ladder document into a living, explorable graph. Employees click any role and see exactly which skills to build, which transitions peers have made, and what timelines are realistic. Built entirely with React Flow and a custom layout algorithm that keeps the graph readable at any scale.",
    stack: ["React", "React Flow", "TypeScript", "Node.js", "REST APIs"],
    metrics: [
      { value: "↗", label: "engagement jump" },
      { value: "∞", label: "role paths mapped" },
      { value: "0", label: "PDFs replaced" },
    ],
    year: "2024",
    category: "viz",
  },
  {
    id: "ml-monitoring",
    title: "ML Monitoring Dashboard",
    tagline: "Real-time pulse on 50+ production pipelines.",
    description:
      "End-to-end observability dashboard for a fleet of production ML models. Surfaces drift signals, throughput stats, and failure alerts in sub-second refresh cycles. The backend uses optimised Node.js APIs with MongoDB aggregation pipelines; the frontend renders live data without ever blocking the main thread.",
    stack: ["React", "Node.js", "MongoDB", "ApexCharts", "Recharts", "REST APIs"],
    metrics: [
      { value: "50+", label: "ML pipelines tracked" },
      { value: "15%", label: "faster refresh" },
      { value: "<1s", label: "update latency" },
    ],
    year: "2023",
    category: "tooling",
  },
  {
    id: "analytics-platform",
    title: "Analytics Platform Redesign",
    tagline: "40% faster dashboards through smarter caching.",
    description:
      "Complete overhaul of the rendering pipeline for a data-heavy analytics platform. Replaced naive re-fetch patterns with a layered React Query caching strategy and surgically eliminated unnecessary re-renders across the component tree. Also shipped an RBAC system that now gates 15+ permission levels without touching a line of backend auth logic.",
    stack: ["React", "React Query", "TypeScript", "Redux Toolkit", "RBAC", "Azure"],
    metrics: [
      { value: "40%", label: "load time drop" },
      { value: "15+", label: "permission levels" },
      { value: "25%", label: "engagement lift" },
    ],
    year: "2025",
    category: "platform",
  },
];

export const useProjects = () => {
  return { projects: STATIC_PROJECTS };
};
