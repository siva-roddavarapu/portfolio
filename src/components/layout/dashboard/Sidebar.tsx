// src/components/layout/dashboard/Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { NavItem } from "@/modules/navigation/types/nav.types";

export const Sidebar = () => {
  const [active, setActive] = useState<string>("dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item: NavItem) =>
        document.getElementById(item.id)
      );

      const scrollY = window.scrollY + 200;

      sections.forEach((section, i) => {
        if (!section) return;

        if (
          scrollY >= section.offsetTop &&
          scrollY < section.offsetTop + section.offsetHeight
        ) {
          setActive(NAV_ITEMS[i].id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col px-6 py-8 border-r border-white/5">
      <h1 className="text-lg font-semibold">Admin</h1>

      <nav className="mt-10 space-y-3">
        {NAV_ITEMS.map((item: NavItem) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`text-sm transition ${
              active === item.id
                ? "text-accent"
                : "text-text-secondary hover:text-accent"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};