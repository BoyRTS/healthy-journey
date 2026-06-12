import Link from "next/link";
import type { ReactNode } from "react";
import { coachColors } from "@/lib/coachTheme";

type CoachThemeShellProps = {
  children: ReactNode;
};

type CoachPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  backHref?: string;
  badge?: string;
};

type CoachBottomNavProps = {
  activeHref: string;
};

const coachNavItems = [
  { label: "สมาชิก", href: "/coach" },
  { label: "อินไซต์", href: "/coach/insights" },
  { label: "ติดตาม", href: "/coach/follow-up" },
  { label: "ตั้งค่า", href: "/coach/settings" },
] as const;

export const coachTheme = {
  page: "min-h-screen bg-[#1C1C1E] text-white",
  shell: "mx-auto w-full max-w-[430px]",
  stack: "space-y-4 px-4 pb-8 pt-5",
  section: "rounded-[24px] border border-[#3A3A3C] bg-[#2C2C2E] p-5",
  inner: "rounded-[20px] border border-[#3A3A3C] bg-[#2C2C2E]",
  elevated: "rounded-[20px] border border-[#3A3A3C] bg-[#2C2C2E]",
  displayFont: "[font-family:var(--font-coach-display),var(--font-sans-thai),sans-serif]",
  primaryAction:
    "inline-flex items-center justify-center gap-2 rounded-2xl bg-[#64FFDA] px-5 py-3.5 text-[14px] font-semibold text-[#121212] transition-colors duration-200 hover:bg-[#B388FF]",
  secondaryAction:
    "rounded-2xl border border-[#3A3A3C] bg-[#2C2C2E] px-4 py-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#343438]",
};

export function CoachThemeShell({ children }: CoachThemeShellProps) {
  return (
    <main className={coachTheme.page}>
      <div className={coachTheme.shell}>
        <div className={coachTheme.stack}>{children}</div>
      </div>
    </main>
  );
}

export function CoachPageHeader({
  eyebrow = "Healthy Journey",
  title,
  description,
  backHref = "/coach",
  badge,
}: CoachPageHeaderProps) {
  return (
    <section className="rounded-[28px] border border-[#3A3A3C] bg-[#2C2C2E] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`${coachTheme.displayFont} text-xs font-semibold uppercase tracking-[0.18em] text-[#00E5FF]`}>
            {eyebrow}
          </p>
          <h1 className={`${coachTheme.displayFont} mt-2 text-[22px] font-semibold leading-tight text-white`}>
            {title}
          </h1>
          <p className="mt-3 text-[13px] leading-7 text-[#D4D4D4]">{description}</p>
        </div>
        {badge ? (
          <span
            className={`${coachTheme.displayFont} shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold`}
            style={{
              backgroundColor: coachColors.neon.vividCyan,
              borderColor: coachColors.neon.vividCyan,
              color: coachColors.darkText,
            }}
          >
            {badge}
          </span>
        ) : (
          <Link className={`${coachTheme.secondaryAction} shrink-0 px-3.5 py-2`} href={backHref}>
            กลับ
          </Link>
        )}
      </div>
    </section>
  );
}

export function CoachBottomNav({ activeHref }: CoachBottomNavProps) {
  return (
    <nav className={`${coachTheme.displayFont} grid grid-cols-4 gap-1 rounded-[22px] border border-[#3A3A3C] bg-[#2C2C2E] p-1.5`}>
      {coachNavItems.map((item) => {
        const isActive = item.href === activeHref;

        return (
          <Link
            key={item.href}
            className={`rounded-[16px] px-1 py-2 text-center text-[10px] font-semibold transition-colors duration-200 ${
              isActive
                ? "bg-[#00E5FF] text-[#121212]"
                : "bg-[#1C1C1E] text-[#EBEBEB] hover:bg-[#343438] hover:text-white"
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
