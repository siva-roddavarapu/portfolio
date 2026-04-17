
export interface ProjectMetric {
  value: string;   // e.g. "40%", "2k+", "50+"
  label: string;   // e.g. "faster load", "users", "pipelines"
}
 
export interface Project {
  id: string;
  title: string;
  tagline: string;          // one-line description shown on card face
  description: string;      // expanded paragraph shown on hover / expanded
  stack: string[];
  metrics: ProjectMetric[]; // 2-3 impact numbers
  year: string;
  category: "platform" | "ai" | "tooling" | "viz";
  link?: string;
}