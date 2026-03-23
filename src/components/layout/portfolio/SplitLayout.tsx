// src/components/layout/SplitLayout.tsx
"use client";

import { ReactNode } from "react";
import { MobileHeader } from "@/components/layout/portfolio/MobileHeader";

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export const SplitLayout = ({ left, right }: SplitLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <MobileHeader />
      {/* LEFT PANEL (Brittany style) */}
      <div className="hidden md:flex w-1/2 fixed left-0 top-0 h-screen px-16 py-20">{left}</div>

      {/* RIGHT PANEL (scrollable) */}
      <div className="w-full md:w-1/2 md:ml-[50%] h-screen overflow-y-auto px-6 md:px-16 py-24 md:py-20">
        {" "}
        {right}
      </div>
    </div>
  );
};
