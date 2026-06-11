import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
  subtitleClassName?: string;
  titleClassName?: string;
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  subtitleClassName = "text-lg sm:text-xl",
  titleClassName = "text-5xl sm:text-6xl",
}: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className={`mt-4 font-semibold leading-[1.04] text-[var(--olive)] ${titleClassName}`}>
          {title}
        </h1>
        <p className={`mt-5 max-w-2xl whitespace-pre-line leading-8 text-[var(--muted)] ${subtitleClassName}`}>
          {subtitle}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
