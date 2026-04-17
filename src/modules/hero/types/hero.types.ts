// src/modules/hero/types/hero.types.ts
//
// Shape of the hero section content.
// Will match the /api/hero response shape when the backend is wired up.

export interface HeroContent {
  // The small uppercase label above the headline (e.g. "about")
  eyebrow: string;

  // The one big headline
  headline: string;

  // Body copy — 2–4 paragraphs, conversational voice
  paragraphs: string[];

  // Stack pills shown below the paragraphs
  stack: string[];
}