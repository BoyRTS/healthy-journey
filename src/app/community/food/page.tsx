// NOTE: If this page needs changes, ask the user first and confirm one page at a time.
import Image from "next/image";
import Link from "next/link";

export default function FoodCommunityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--charcoal)]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col overflow-hidden border-x border-white/40 bg-[var(--warm-white)]/18 shadow-[var(--shadow-soft)] backdrop-blur-[2px]">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/images/background_food.png")',
              backgroundPosition: "center",
              backgroundSize: "cover",
              opacity: 0.52,
            }}
          />
        </div>

        <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(255,253,248,0.68)] px-4 py-3 backdrop-blur-md sm:px-5">
          <div className="flex items-center gap-3">
            <Link
              aria-label="กลับ"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(255,253,248,0.92)] text-lg font-semibold text-[var(--olive)] shadow-[var(--shadow-card)]"
              href="/member"
            >
              ←
            </Link>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-[var(--olive)]">กลุ่มหลัก ส่งการบ้าน</p>
              <p className="text-xs text-[var(--muted)]">ห้องส่งการบ้านและพูดคุยของสมาชิก</p>
            </div>
          </div>
        </header>

        <section className="relative z-10 flex-1 px-4 py-4 sm:px-5">
          <div className="rounded-[1.4rem] border border-white/50 bg-[rgba(255,253,248,0.78)] px-4 py-4 shadow-[0_10px_24px_rgba(70,56,36,0.08)] backdrop-blur-md">
            <p className="text-sm text-[var(--muted)]">
              หน้านี้ใช้สำหรับส่งการบ้านและพูดคุยของสมาชิก
            </p>
          </div>
        </section>

        <footer className="sticky bottom-0 z-20 border-t border-[var(--line)] bg-[rgba(255,253,248,0.70)] px-3 py-3 backdrop-blur-md sm:px-5">
          <div className="flex items-center gap-2 rounded-full bg-[rgba(255,253,248,0.92)] p-2 shadow-[var(--shadow-card)] ring-1 ring-[var(--line)]">
            <button
              aria-label="เพิ่ม"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-xl font-semibold text-[var(--olive)]"
              type="button"
            >
              +
            </button>
            <div className="min-w-0 flex-1 px-2 text-sm text-[var(--muted)]">เขียนข้อความหรือแนบรูปอาหาร...</div>
            <button
              className="rounded-full bg-[var(--olive)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(78,98,63,0.25)]"
              type="button"
            >
              ส่งการบ้านวันนี้
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
