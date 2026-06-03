import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { WellnessCard } from "@/components/ui/WellnessCard";

const cards = [
  "ผลลัพธ์ค่อย ๆ ดีขึ้นแบบค่อยเป็นค่อยไป",
  "สมาชิกมีแรงฮึดเมื่อเห็นความคืบหน้าของตัวเอง",
  "โทนภาพรวมควรชัดและไม่กดดัน",
];

export default function ResultsPage() {
  return (
    <MemberPageShell
      backHref="/member"
      backLabel="กลับไปหน้าหลักสมาชิก"
      eyebrow="HEALTH JOURNEY"
      subtitle="หน้าผลลัพธ์ของสมาชิกในโครงเดียวกับหน้าอื่นของฝั่ง member"
      title="ผลลัพธ์สมาชิก"
    >
      <div className="h-full p-5 sm:p-7">
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#f7f0e2,#eadbbf)] p-6 ring-1 ring-[rgba(203,166,93,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
            Health Journey
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--olive)]">
            ผลลัพธ์สมาชิก
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            หน้าแสดงตัวอย่างผลลัพธ์เพื่อให้สมาชิกและโค้ชมองภาพความก้าวหน้าได้ง่าย
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
