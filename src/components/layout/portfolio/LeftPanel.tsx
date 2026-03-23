// src/components/layout/portfolio/LeftPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { ProfileHeader } from "@/components/common/ProfileHeader";
import { ThemeToggle } from "@/components/common/ThemeToggle";

import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { NavItem } from "@/modules/navigation/types/nav.types";

export const LeftPanel = () => {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY + 200;

      NAV_ITEMS.forEach((item: NavItem) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        const isActive =
          scrollY >= section.offsetTop &&
          scrollY < section.offsetTop + section.offsetHeight;

        if (isActive) {
          setActive(item.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Top */}
      <div>
        <ProfileHeader />

        <p className="mt-6 text-text-secondary max-w-sm">
          I build scalable and high-performance web applications with modern technologies.
        </p>

        {/* NAV (Merged from Sidebar) */}
        <nav className="mt-12 space-y-4">
          {NAV_ITEMS.map((item: NavItem) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`group flex items-center text-base transition-all duration-300 gap-2 ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {/* Line animation (Brittany style) */}
                <span
                  className={`h-px bg-text-secondary block transition-all duration-300 ${
                    isActive ? "w-20" : "w-8"
                  } group-hover:w-20`}
                />

                {/* Text animation */}
                <span
                  className={`transition-all duration-300 ${
                    isActive ? "translate-x-2" : "group-hover:translate-x-2"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4">
        <ThemeToggle />

        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};