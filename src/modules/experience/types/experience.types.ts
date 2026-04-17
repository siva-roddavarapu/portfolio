// src/modules/experience/types/experience.types.ts
//
// Shape of the experience section content.
// Will match the /api/experience response shape when the backend is wired up.

export interface ExperienceProject {
  name: string;
  description: string;
  link?: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  type: "full-time" | "intern";
  summary: string;
  bullets: string[];
  stack: string[];
  projects?: ExperienceProject[];
}