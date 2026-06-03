import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { WellnessCard } from "@/components/ui/WellnessCard";

const cards = [
  {
    title: "มื้อที่ทำตามได้จริง",
    text: "คัดเมนูที่ดูง่ายและเหมาะกับการใช้ในบ้านของสมาชิกส่วนใหญ่",
  },
  {
    title: "บาลานซ์แบบสบาย ๆ",
    text: "ช่วยให้เห็นภาพการจัดจานโดยไม่ต้องลงลึกเกินไปในเดโม",
  },
  {
    title: "ของที่มีอยู่ในครัว",
    text: "เน้นเมนูที่ปรับจากวัตถุดิบใกล้ตัวและหาได้ไม่ยาก",
  },
];

export default function MealPlanPage() {
  return (
    <MemberPageShell
      backHref="/member"
      backLabel="กลับไปหน้าหลักสมาชิก"
      eyebrow="HEALTH JOURNEY"
      subtitle="หน้าแผนมื้ออาหารที่ใช้โครงและโทนเดียวกับหน้าสมาชิกอื่น"
      title="Meal Plan"
    >
      <div className="h-full p-5 sm:p-7">
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#f9f1e2,#e9dcc0)] p-6 ring-1 ring-[rgba(203,166,93,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
            Health Journey
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--olive)]">
            Meal Plan
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            หน้านี้รวบรวมตัวอย่างแผนมื้ออาหารแบบเรียบง่ายเพื่อใช้ในเดโมและสื่อสารกับสมาชิก
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {cards.map((card) => (
              <WellnessCard
                key={card.title}
                className="p-4"
              >
                <h3 className="text-sm font-semibold text-[var(--olive)]">{card.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{card.text}</p>
              </WellnessCard>
            ))}
          </div>
        </div>
      </div>
    </MemberPageShell>
  );
}
