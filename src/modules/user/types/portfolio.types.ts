// src/modules/user/types/portfolio.types.ts

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  email?: string;
}

export interface PortfolioProfile {
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  location: string;
  resumeUrl: string;
  socialLinks: SocialLinks;
}
