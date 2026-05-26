import { MemberProfileBadgeSection } from "@/components/community/MemberProfileBadgeSection";

export default function MemberProfilePage() {
  return (
    <main className="min-h-screen bg-[#0E1117] px-4 py-4 text-white">
      <section className="mx-auto max-w-[430px] space-y-4">
        <header className="rounded-[1.6rem] border border-white/10 bg-white/7 p-4 backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#67E8F9]">HEALTHY JOURNEY</p>
          <h1 className="mt-2 text-2xl font-semibold">Member Profile</h1>
          <p className="mt-1 text-sm text-white/60">ตัวอย่างหน้าโปรไฟล์สำหรับแสดง badge ที่สมาชิกได้รับ</p>
        </header>

        <MemberProfileBadgeSection member_id="member-prae" />
      </section>
    </main>
  );
}

