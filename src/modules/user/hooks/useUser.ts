import { UserProfile } from "../types/user.types";

export const useUser = (): UserProfile => {
  // 🔥 TEMP (later replace with API)
  return {
    name: "Siva Vasanth Roddavarapu",
    role: "Full Stack Developer",
  };
};