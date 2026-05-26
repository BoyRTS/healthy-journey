type StatCardProps = {
  label: string;
  value: string;
  tone?: "sage" | "gold" | "beige" | "olive";
};

const toneStyles = {
  sage: "bg-[var(--sage-soft)]",
  gold: "bg-[var(--gold)]",
  beige: "bg-[var(--beige)]",
  olive: "bg-[var(--olive)]",
};

export function StatCard({ label, value, tone = "sage" }: StatCardProps) {
  return (
    <div className="rounded-[1.5rem] bg-white/72 p-5 shadow-[0_10px_30px_rgba(70,56,36,0.06)] ring-1 ring-[var(--line)]">
      <div className={`mb-5 h-2 w-14 rounded-full ${toneStyles[tone]}`} />
      <p className="text-3xl font-semibold text-[var(--olive)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{label}</p>
    </div>
  );
}
