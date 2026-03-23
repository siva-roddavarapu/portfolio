// src/components/layout/Sidebar.tsx
"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { NavItem } from "@/modules/navigation/types/nav.types";

interface SidebarProps {
  userName?: string;
  userTitle?: string;
}

export const Sidebar = ({
  userName = "Your Name",
  userTitle = "Full Stack Developer",
}: SidebarProps) => {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY + 200;

      NAV_ITEMS.forEach((item: NavItem) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        const isActive =
          scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight;

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
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col justify-between px-8 py-10">
      {" "}
      <div>
        <h1 className="text-xl font-bold text-text-primary">{userName}</h1>

        <p className="text-text-secondary text-sm mt-2">{userTitle}</p>

        <nav className="mt-12 space-y-4">
          {NAV_ITEMS.map((item: NavItem) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`group flex items-center text-base transition-all duration-300 cursor-pointer gap-2 ${
                  isActive ? "text-text-primary" : "text-secondary hover:text-text-primary"
                }`}
              >
                <span
                  className={`h-px bg-text-secondary block transition-all duration-300 ${
                    isActive ? "w-20" : "w-8"
                  } group-hover:w-20`}
                ></span>

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
          © {new Date().getFullYear()} {userName}
        </p>
      </div>
    </aside>
  );
};
