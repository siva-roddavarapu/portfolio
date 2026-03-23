// src/components/layout/dashboard/MobileNav.tsx
"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { NavItem } from "@/modules/navigation/types/nav.types";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden mb-4">
      <button onClick={() => setOpen(!open)} className="text-sm">
        Menu
      </button>

      {open && (
        <div className="mt-2 space-y-2 bg-surface p-4 rounded-md">
          {NAV_ITEMS.map((item: NavItem) => (
            <div key={item.id}>{item.label}</div>
          ))}
        </div>
      )}
    </div>
  );
};