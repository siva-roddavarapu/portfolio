// src/modules/user/hooks/usePortfolio.ts
//
// Single source of truth for identity data.
// Consumed by: Sidebar, ProfileHeader, MobileNav, useHero (for resumeUrl).
//
// ─── To wire up the backend ───────────────────────────────────
// import { useQuery } from "@tanstack/react-query";
// import { profileService } from "@/services/profile.service";
//
// export const usePortfolio = () => {
//   const { data } = useQuery({
//     queryKey: ["profile"],
//     queryFn: profileService.getProfile,
//     placeholderData: STATIC_PROFILE,
//   });
//   return data ?? STATIC_PROFILE;
// };
// ─────────────────────────────────────────────────────────────

import { PortfolioProfile } from "@/modules/user/types/portfolio.types";

 
const STATIC_PROFILE: PortfolioProfile = {
  firstName: "Siva Vasanth",
  lastName: "Roddavarapu",
  role: "Senior Software Engineer",
  status: "Open to opportunities",
  location: "Bengaluru · India",
  resumeUrl: "/resume.pdf",
  socialLinks: {
    github: "https://github.com/siva-vasanth",
    linkedin: "https://linkedin.com/in/siva-vasanth-roddavarapu",
    instagram: "https://instagram.com/siva.vasanth",
    email: "siva.roddavarapu@gmail.com",
  },
};
 
export const usePortfolio = (): PortfolioProfile => {
  return STATIC_PROFILE;
};
 