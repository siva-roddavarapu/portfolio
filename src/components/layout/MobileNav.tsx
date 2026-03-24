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
      <div className="flex justify-between items-center px-6 py-4 bg-background border-b border-border">
        <ProfileHeader />
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {open && (
        <div className="bg-surface px-6 py-6 space-y-4 shadow-soft">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left text-text-secondary hover:text-accent"
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
