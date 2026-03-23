// src/components/layout/portfolio/RightPanel.tsx
"use client";

import { ReactNode } from "react";

interface RightPanelProps {
  children?: ReactNode;
}

export const RightPanel = ({ children }: RightPanelProps) => {
  return (
    <div className="w-full md:w-1/2 md:ml-[50%] px-6 md:px-16 py-20">
      <div className="space-y-32">{children}</div>
    </div>
  );
};