type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-5xl font-semibold leading-[1.04] text-[var(--olive)] sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
        {subtitle}
      </p>
    </header>
  );
}
