// src/app/(admin)/layout.tsx
import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/dashboard/Sidebar";
import { MobileNav } from "@/components/layout/dashboard/MobileNav";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-64 p-6">
        <MobileNav />
        {children}
      </main>
    </div>
  );
};