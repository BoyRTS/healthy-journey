import Link from "next/link";

const cards = [
  "คลังสอนการออกกำลังกายแบบสั้น ดูง่าย",
  "เลือกระดับการฝึกที่เหมาะกับสมาชิก",
  "ตัวอย่างท่าทางและแนวทางการดูแลตัวเอง",
];

export default function ExercisePage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] px-4 py-5 text-[var(--charcoal)] sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-3xl flex-col rounded-[2rem] border border-white/60 bg-[var(--warm-white)]/92 p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <Link className="text-sm font-semibold text-[var(--olive)]" href="/member">
          ← กลับไปหน้า member
        </Link>
        <div className="mt-6 rounded-[1.75rem] bg-[linear-gradient(135deg,#f9f3e7,#efe3d0)] p-6 ring-1 ring-[rgba(203,166,93,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
            Healthy Journey
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-[var(--olive)]">
            สอนการออกกำลังกาย
          </h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card}
                className="rounded-[1.35rem] bg-[rgba(255,253,248,0.9)] p-4 shadow-[0_10px_24px_rgba(70,56,36,0.08)] ring-1 ring-[var(--line)]"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
