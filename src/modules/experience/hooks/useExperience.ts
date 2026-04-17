// src/modules/experience/hooks/useExperience.ts
//
// Provides the full experience list for the Experience section.
//
// ─── To wire up the backend ───────────────────────────────────
// import { useQuery } from "@tanstack/react-query";
// import { experienceService } from "@/services/experience.service";
//
// export const useExperience = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["experience"],
//     queryFn: experienceService.getExperience,
//     placeholderData: STATIC_EXPERIENCE,
//   });
//   return { entries: data ?? STATIC_EXPERIENCE, isLoading };
// };
// ─────────────────────────────────────────────────────────────

import { ExperienceEntry } from "@/modules/experience/types/experience.types";

const STATIC_EXPERIENCE: ExperienceEntry[] = [
  {
    period: "Apr 2025 — Present",
    role: "Senior Software Engineer",
    company: "Tredence",
    companyUrl: "https://www.tredence.com",
    type: "full-time",
    summary:
      "Leading frontend architecture and AI integration for an enterprise analytics platform. Focused on making ML-heavy systems feel fast and human.",
    bullets: [
      "Redesigned analytics platform rendering pipeline — dashboard load times down 40% through React Query caching strategies and targeted re-render elimination.",
      "Built the bridge between Python ML models and the React frontend via REST APIs; measurably improved employee engagement by 25%.",
      "Architected real-time monitoring dashboards that now track 50+ production ML pipelines with sub-second refresh.",
      "Designed and shipped an RBAC authorization system supporting 15+ distinct permission levels across the platform.",
    ],
    stack: ["React", "Next.js", "React Query", "Python", "REST APIs", "RBAC", "Azure"],
    projects: [
      {
        name: "ML Monitoring Dashboard",
        description:
          "Real-time analytics dashboards tracking 50+ active ML pipelines. Built on React and Node.js APIs with live refresh and alert surfacing.",
      },
    ],
  },
  {
    period: "Jun 2023 — Apr 2025",
    role: "Software Engineer",
    company: "Tredence",
    companyUrl: "https://www.tredence.com",
    type: "full-time",
    summary:
      "Owned frontend architecture for the company's internal workforce platform. Built the shared component library the whole engineering org uses today.",
    bullets: [
      "Led frontend architecture for the workforce platform — primary interface for 2,000+ employees across the organisation.",
      "Improved MLWorks search performance by 35% through state management restructuring and targeted database indexing on the API layer.",
      "Built a shared UI library from scratch: 30+ reusable components that cut frontend development time by 20% across teams.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "Node.js", "PostgreSQL", "Ant Design"],
    projects: [
      {
        name: "Workforce Management Platform",
        description:
          "Enterprise workforce system for 2,000+ employees. Integrated Azure OpenAI GPT-4 and vector embeddings to build an AI demand–supply recommendation engine.",
      },
      {
        name: "Career Compass",
        description:
          "Interactive career progression explorer built with React Flow, letting employees visualise role transitions and plan their growth paths.",
      },
    ],
  },
  {
    period: "Feb 2023 — Apr 2023",
    role: "UI Developer Intern",
    company: "Tredence",
    companyUrl: "https://www.tredence.com",
    type: "intern",
    summary:
      "First engineering role. Shipped dashboards and improved API performance before converting to full-time.",
    bullets: [
      "Built 10+ dashboards visualising ML pipeline performance metrics for internal data science teams.",
      "Optimised Node.js API endpoints and MongoDB query patterns — pipeline refresh cycles improved by 15%.",
    ],
    stack: ["React", "Node.js", "MongoDB", "ApexCharts"],
  },
];

export const useExperience = () => {
  return { entries: STATIC_EXPERIENCE };
};