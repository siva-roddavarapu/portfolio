"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { NavItem } from "@/modules/navigation/types/nav.types";

export const MobileHeader = () => {
  const [open, setOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur px-6 py-4 flex justify-between items-center">
      <h1 className="text-text-primary font-semibold">YourName</h1>

      <button onClick={() => setOpen(!open)} className="space-y-1">
        <span className="block w-6 h-[2px] bg-text-primary"></span>
        <span className="block w-6 h-[2px] bg-text-primary"></span>
        <span className="block w-6 h-[2px] bg-text-primary"></span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-surface p-6 space-y-4">
          {NAV_ITEMS.map((item: NavItem) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="block text-text-secondary hover:text-accent"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};