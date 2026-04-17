"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar — desktop only */}
      <div className="hidden md:block w-[40%] shrink-0">
        <Sidebar />
      </div>

      {/* Single scroll container for both mobile and desktop */}
      <main id="scroll-container" className="flex-1 h-screen overflow-y-auto">
        <div className="mx-auto">{children}</div>
      </main>

      {/* Mobile Nav overlay */}
      <MobileNav />
    </div>
  );
}
