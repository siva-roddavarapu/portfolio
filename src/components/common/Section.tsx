import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
}

export const Section=({ id, children }: SectionProps)=> {
  return (
    <section
      id={id}
      className="py-24 md:py-32 border-b border-border"
    >
      {children}
    </section>
  );
}