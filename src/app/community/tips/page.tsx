import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { WellnessCard } from "@/components/ui/WellnessCard";

const cards = [
  "เคล็ดลับสั้น ๆ อ่านง่ายในทุกวัน",
  "เน้นคำแนะนำที่ทำได้จริงในชีวิตบ้าน ๆ",
  "โทนสื่อสารควรเป็นกำลังใจ ไม่ใช่สั่งสอน",
];

export default function TipsPage() {
  return (
    <MemberPageShell
      backHref="/member"
      backLabel="กลับไปหน้าหลักสมาชิก"
      eyebrow="HEALTH JOURNEY"
      subtitle="หน้า tips สำหรับ member ใช้หน้าตาเดียวกับหน้าหลักฝั่ง member"
      title="Health Tips"
    >
      <div className="h-full p-5 sm:p-7">
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#f8f2e7,#efe1c7)] p-6 ring-1 ring-[rgba(203,166,93,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
            Health Journey
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--olive)]">
            Health Tips
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            หน้านี้ใช้สำหรับ tips ของสมาชิกที่ต้องการดูข้อมูลสั้น ๆ แบบสบายตาและอ่านง่าย
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {cards.map((card) => (
              <WellnessCard
                key={card}
                className="p-4"
              >
                {card}
              </WellnessCard>
            ))}
          </div>
        </div>
      </div>
    </MemberPageShell>
  );
}
