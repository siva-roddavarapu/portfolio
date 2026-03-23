// src/components/layout/MobileNav.tsx
"use client";

import { useState } from "react";
import {ThemeToggle} from "@/components/common/ThemeToggle";
import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";


export const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setOpen(false);
  };

  return (
    <div className="md:hidden fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-4 bg-background border-b border-border">
        <h1 className="font-bold">YourName</h1>

        <button onClick={() => setOpen(!open)}>
          ☰
        </button>
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
}