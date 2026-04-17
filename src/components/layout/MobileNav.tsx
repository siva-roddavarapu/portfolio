// src/components/layout/MobileNav.tsx
// No changes to logic — ProfileHeader already pulls from usePortfolio now,
// so this file only needs its own imports to stay clean.
"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { ProfileHeader } from "@/components/common/ProfileHeader";

export const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);

  const scrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const section = document.getElementById(id);

    if (container && section) {
      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const offset = sectionRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: offset, behavior: "smooth" });
    }

    setOpen(false);
  };

  return (
    <div className="md:hidden fixed top-0 left-0 w-full z-50">
      <div
        className="flex justify-between items-center px-6 py-4 border-b"
        style={{
          background: "var(--color-background)",
          borderColor: "rgba(var(--color-accent-rgb), 0.1)",
        }}
      >
        {/* ProfileHeader reads firstName + lastName + role from usePortfolio */}
        <ProfileHeader />
        <button
          onClick={() => setOpen(!open)}
          style={{ color: "var(--color-text-secondary)" }}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          className="px-6 py-6 space-y-4"
          style={{
            background: "var(--color-surface)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left transition-colors duration-200"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")
              }
            >
              {item.label}
            </button>
          ))}
          <ThemeToggle />
        </div>
      )}
    </div>
  );
};
