import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

type MemberPageShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  backHref: string;
  backLabel: string;
  action?: ReactNode;
  children: ReactNode;
};

export function MemberPageShell({
  eyebrow,
  title,
  subtitle,
  backHref,
  backLabel,
  action,
  children,
}: MemberPageShellProps) {
  return (
    <main className="min-h-screen bg-[var(--cream)] px-3 py-3 overflow-hidden sm:px-4 sm:py-4">
      <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[941px] flex-col gap-3 lg:min-h-[calc(100vh-2rem)]">
        <div className="rounded-[1.6rem] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,251,242,0.84)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:px-5">
          <PageHeader
            action={
              action ?? (
                <Link
                  className="rounded-full bg-[var(--olive)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
                  href={backHref}
                >
                  {backLabel}
                </Link>
              )
            }
            eyebrow={eyebrow}
            subtitle={subtitle}
            title={title}
          />
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden rounded-[2rem] bg-[var(--warm-white)] shadow-[var(--shadow-soft)] md:rounded-[2.25rem]">
          {children}
        </div>
      </section>
    </main>
  );
}
