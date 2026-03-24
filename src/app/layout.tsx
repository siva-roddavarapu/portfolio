import type { Metadata } from "next";
import "@/styles/globals.css";

import { GlowBackground } from "@/components/ui/GlowBackground";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Krishi Portfolio",
  description: "Portfolio + SaaS Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <QueryProvider>
            <GlowBackground />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
