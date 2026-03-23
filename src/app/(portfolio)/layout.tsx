// src/app/(portfolio)/layout.tsx

import { ReactNode } from "react";
import { SplitLayout } from "@/components/layout/portfolio/SplitLayout";
import { LeftPanel } from "@/components/layout/portfolio/LeftPanel";
import { RightPanel } from "@/components/layout/portfolio/RightPanel";

interface PortfolioLayoutProps {
  children: ReactNode;
}

const PortfolioLayout = ({ children }: PortfolioLayoutProps) => {
  return <SplitLayout left={<LeftPanel />} right={<RightPanel>{children}</RightPanel>} />;
};

export default PortfolioLayout;
