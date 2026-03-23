import { UserProfile } from "../types/user.types";

export const useUser = (): UserProfile => {
  // 🔥 TEMP (later replace with API)
  return {
    name: "Krishi Jaguar",
    role: "Full Stack Developer",
  };
};