import type { ReactNode } from "react";

type WellnessCardProps = {
  children: ReactNode;
  className?: string;
};

export function WellnessCard({ children, className = "" }: WellnessCardProps) {
  return (
    <section
      className={`rounded-[2rem] bg-[var(--warm-white)]/88 p-6 shadow-[var(--shadow-card)] ring-1 ring-[var(--line)] backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}
