"use client";

import { useEffect, useState, useRef } from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ProfileHeader } from "@/components/common/ProfileHeader";
import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { NavItem } from "@/modules/navigation/types/nav.types";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const scrollY = container.scrollTop + 200;

      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (!section) continue;

        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
          setActive(item.id);
          break;
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const section = document.getElementById(id);
    if (!container || !section) return;

    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const offset = sectionRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[40%] max-w-[420px] flex-col justify-between px-10 py-16">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProfileHeader />
        </motion.div>
        <div className="mt-6 space-y-3">
          <p className="text-text-muted text-sm">React • Next.js • SaaS</p>

          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Open to work
          </div>
        </div>
        <nav className="mt-16 space-y-5">
          {NAV_ITEMS.map((item: NavItem) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="group flex items-center gap-3 cursor-pointer"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive ? "w-20 bg-text-primary" : "w-8 bg-text-muted group-hover:w-20"
                  }`}
                />
                <span
                  className={`transition-all duration-300 ${
                    isActive
                      ? "text-text-primary translate-x-2"
                      : "text-text-secondary group-hover:text-text-primary group-hover:translate-x-2"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <ThemeToggle />
        <p className="text-xs text-text-muted">© {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
};
