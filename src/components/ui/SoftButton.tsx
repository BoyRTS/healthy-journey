import type { ButtonHTMLAttributes, ReactNode } from "react";

type SoftButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function SoftButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: SoftButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[var(--olive)] text-white shadow-[0_12px_28px_rgba(79,99,70,0.18)] hover:bg-[var(--sage)]"
      : "bg-[var(--warm-white)] text-[var(--olive)] ring-1 ring-[var(--line)] hover:bg-white";

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${styles} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
