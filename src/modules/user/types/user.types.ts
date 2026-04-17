export interface UserProfile {
  id: string;
  name: string;
  role: string;

  bio: string;
  location: string;
  status: "available" | "busy" | "offline";

  taglines: string[]; // for typewriter
  resumeUrl: string;

  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };

  theme?: {
    primaryColor: string;
  };
}