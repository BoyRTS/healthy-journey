import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { WellnessCard } from "@/components/ui/WellnessCard";

const cards = [
  {
    title: "เคล็ดลับง่าย ๆ",
    text: "ออกกำลังกายทีละนิดแต่ทำได้ทุกวัน",
  },
  {
    title: "ระดับฝึกที่เหมาะกับตัวเอง",
    text: "เลือกเริ่มตั้งแต่เบาไปจนถึงกลาง เพื่อให้เห็นผลและไม่กดดัน",
  },
  {
    title: "โทนภาพรวมในครอบครัว",
    text: "ชี้จุดดีและจุดที่ควรปรับแบบไม่ทำให้รู้สึกหนักเกินไป",
  },
];

export default function ExercisePage() {
  return (
    <MemberPageShell
      backHref="/member"
      backLabel="กลับไปหน้าหลักสมาชิก"
      eyebrow="HEALTH JOURNEY"
      subtitle="หน้าพรีเซนต์เรื่องการออกกำลังกายที่เข้าชุดกับ member pages อื่น"
      title="การออกกำลังกาย"
    >
      <div className="h-full p-5 sm:p-7">
        <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#f9f3e7,#efe3d0)] p-6 ring-1 ring-[rgba(203,166,93,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
            Health Journey
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--olive)]">
            สอนการออกกำลังกาย
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            หน้านี้ใช้สำหรับการออกกำลังกายแบบเรียบง่าย อ่านง่าย และเข้ากับธีมเดียวกันของฝั่ง member
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
