import { MemberProfileBadgeSection } from "@/components/community/MemberProfileBadgeSection";
import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { StatCard } from "@/components/ui/StatCard";

export default function MemberProfilePage() {
  return (
    <MemberPageShell
      backHref="/member"
      backLabel="กลับไปหน้าหลักสมาชิก"
      eyebrow="HEALTH JOURNEY"
      subtitle="หน้าสรุปสมาชิกสำหรับดูสถานะและ badge ในรูปแบบเดียวกับหน้าสมาชิกอื่น"
      title="Member Profile"
    >
      <div className="flex h-full flex-col gap-5 p-5 sm:p-7">
        <header className="rounded-[1.75rem] bg-[linear-gradient(135deg,#f8f2e7,#efe1c7)] p-6 ring-1 ring-[rgba(203,166,93,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
            Health Journey
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--olive)]">
            Prae
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            หน้าสรุปสมาชิกสำหรับดู badge สถานะ และข้อมูลสำคัญของสมาชิกแบบอ่านง่าย
          </p>
        </header>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "สถานะ", value: "สม่ำเสมอ" },
            { label: "แผนวันนี้", value: "ส่งการบ้าน" },
            { label: "โหมดดูแล", value: "ปกติ" },
          ].map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </section>

        <section>
          <MemberProfileBadgeSection member_id="member-prae" />
        </section>
      </div>
    </MemberPageShell>
  );
}
