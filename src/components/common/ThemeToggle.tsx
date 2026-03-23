// src/components/common/ThemeToggle.tsx
"use client";

import { useTheme } from "@/providers/ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="border border-border px-3 py-1 rounded-md">
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};
