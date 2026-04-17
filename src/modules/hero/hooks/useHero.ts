// src/modules/hero/hooks/useHero.ts
//
// Provides everything the Hero section needs in one place.
// Merges identity data from usePortfolio() with hero-specific content.
//
// ─── To wire up the backend ───────────────────────────────────
// import { useQuery } from "@tanstack/react-query";
// import { heroService } from "@/services/hero.service";
//
// export const useHero = () => {
//   const profile = usePortfolio();
//   const { data: content } = useQuery({
//     queryKey: ["hero"],
//     queryFn: heroService.getHeroContent,
//     placeholderData: STATIC_HERO,
//   });
//   return { ...profile, ...(content ?? STATIC_HERO) };
// };
// ─────────────────────────────────────────────────────────────

import { usePortfolio } from "@/modules/user/hooks/usePortfolio";
import { HeroContent } from "@/modules/hero/types/hero.types";

const STATIC_HERO: HeroContent = {
  eyebrow: "about",

  headline: "I build for the intersection of design and engineering.",

  paragraphs: [
    "I'm a full-stack engineer who cares about both sides of the stack — the architecture underneath and the feel of every interaction on top. My specialty is React and Next.js, where I spend most of my time building interfaces that are fast, accessible, and refined enough that people notice when something's off.",

    "Over the years I've worked across product studios, startups, and larger engineering teams — and that range shaped how I think. I know what a scrappy MVP needs, and I know what it takes to make something hold up at scale. I gravitate toward the work at the edge of design and code: the pixel-level decisions most engineers hand off, and the system-level thinking most designers don't get to touch.",

    "These days I'm deep into AI integration — not the hype, but the actual plumbing: fitting language models into real products, with real latency constraints and real users. When I'm not at my desk, I'm on a climbing wall, a tennis court, or somewhere in an open world looking for things I was never supposed to find.",
  ],

  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Azure OpenAI",
    "System design",
  ],
};

export const useHero = () => {
  const { resumeUrl } = usePortfolio();

  return {
    // From identity hook — only resumeUrl is needed in Hero
    resumeUrl,

    // Hero-specific content
    ...STATIC_HERO,
  };
};