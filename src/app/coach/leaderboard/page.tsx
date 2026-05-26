import Link from "next/link";
import { MemberAvatar } from "@/components/coach/MemberAvatar";

const topMembers = [
  {
    rank: 2,
    name: "คุณแอน",
    score: "860",
    label: "เช็กอินครบ 4 วัน",
    accent: "from-[#67E8F9] to-[#A78BFA]",
    avatarVariant: 1,
  },
  {
    rank: 1,
    name: "คุณแพร",
    score: "920",
    label: "ส่งต่อเนื่อง 5 วัน",
    accent: "from-[#F8D77A] via-[#67E8F9] to-[#A7F3D0]",
    avatarVariant: 5,
  },
  {
    rank: 3,
    name: "คุณจอย",
    score: "790",
    label: "ให้กำลังใจเพื่อนเยอะ",
    accent: "from-[#FB7185] to-[#A78BFA]",
    avatarVariant: 7,
  },
];

const rankingRows = [
  { rank: 4, name: "คุณฝน", reason: "เริ่มส่งต่อเนื่อง", score: "680", status: "กำลังมาแรง", avatarVariant: 2 },
  { rank: 5, name: "คุณเมย์", reason: "กลับมาเช็กอินแล้ว", score: "620", status: "กลับมาแล้ว", avatarVariant: 3 },
  { rank: 6, name: "คุณบี", reason: "ส่งอาหารครบ 3 วัน", score: "590", status: "สม่ำเสมอ", avatarVariant: 6 },
  { rank: 7, name: "คุณนุ่น", reason: "ให้กำลังใจในกลุ่ม", score: "540", status: "พลังบวก", avatarVariant: 8 },
  { rank: 8, name: "คุณปลา", reason: "ดื่มน้ำครบเป้า", score: "510", status: "habit ดี", avatarVariant: 9 },
];

const navItems = ["สมาชิก", "อินไซต์", "หน้าแรก", "ติดตามผล", "ตั้งค่า"];

export default function CoachLeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#080B12] px-4 py-4 text-[#F6F7FB]">
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[430px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,#1B3142_0%,#0D111C_46%,#080B12_100%)] shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
        <header className="px-4 pb-4 pt-5">
          <div className="flex items-center justify-between gap-3">
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-lg text-white shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur"
              href="/coach"
              aria-label="Back to coach dashboard"
            >
              ←
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-xl text-white/80 backdrop-blur"
              aria-label="Open leaderboard menu"
              type="button"
            >
              ⋯
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#67E8F9]">HEALTHY JOURNEY</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-white">Consistency Leaderboard</h1>
            <p className="mt-2 text-sm leading-6 text-white/66">สมาชิกที่ส่งการบ้านสม่ำเสมอ</p>
          </div>
        </header>

        <div className="px-4">
          <div className="grid grid-cols-2 rounded-full border border-white/10 bg-white/7 p-1 backdrop-blur">
            <button className="rounded-full bg-[#67E8F9] px-4 py-2 text-sm font-semibold text-[#071018] shadow-[0_0_22px_rgba(103,232,249,0.28)]" type="button">
              สัปดาห์นี้
            </button>
            <button className="rounded-full px-4 py-2 text-sm font-semibold text-white/62" type="button">
              เดือนนี้
            </button>
          </div>
        </div>

        <section className="px-4 pt-5">
          <div className="grid grid-cols-3 items-end gap-2">
            {topMembers.map((member) => {
              const isFirst = member.rank === 1;

              return (
                <article
                  key={member.rank}
                  className={`relative overflow-hidden rounded-[1.4rem] border border-white/12 bg-white/9 p-3 text-center shadow-[0_18px_42px_rgba(0,0,0,0.24)] backdrop-blur ${isFirst ? "min-h-[188px] pb-4" : "min-h-[156px]"}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${member.accent}`} />
                  <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/14 bg-black/24 text-xs font-semibold text-white/82">
                    #{member.rank}
                  </div>
                  <MemberAvatar
                    className={`mx-auto ring-2 ring-white/15 ${isFirst ? "h-20 w-20" : "h-14 w-14"}`}
                    variant={member.avatarVariant}
                  />
                  {isFirst ? <div className="mt-2 text-lg text-[#F8D77A]">★</div> : null}
                  <h2 className={`${isFirst ? "mt-1 text-xl" : "mt-3 text-base"} font-semibold text-white`}>{member.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-[#F8D77A]">{member.score} ⭐</p>
                  <p className="mt-1 text-[11px] leading-4 text-white/62">{member.label}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-5 flex-1 px-4">
          <div className="rounded-[1.6rem] border border-white/10 bg-white/7 p-3 shadow-[0_18px_42px_rgba(0,0,0,0.2)] backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">อันดับถัดไป</h2>
              <span className="rounded-full bg-[#A7F3D0]/14 px-3 py-1 text-xs font-semibold text-[#A7F3D0]">positive habits</span>
            </div>

            <div className="space-y-2">
              {rankingRows.map((member) => (
                <article key={member.rank} className="grid grid-cols-[26px_34px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[1rem] border border-white/8 bg-black/16 p-2.5">
                  <p className="text-sm font-semibold text-white/58">#{member.rank}</p>
                  <MemberAvatar className="h-[34px] w-[34px]" variant={member.avatarVariant} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-white">{member.name}</h3>
                      <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/64">{member.status}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-white/58">{member.reason}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#F8D77A]">{member.score} ⭐</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-3 pt-4">
          <div className="rounded-[1.35rem] border border-[#67E8F9]/20 bg-[linear-gradient(135deg,rgba(103,232,249,0.14),rgba(251,113,133,0.12))] p-4 shadow-[0_0_34px_rgba(103,232,249,0.12)] backdrop-blur">
            <p className="text-sm leading-6 text-white/82">สมาชิกกลุ่มนี้ควรได้รับคำชมวันนี้ เพื่อ reinforce พฤติกรรมที่ดี</p>
            <button className="mt-3 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0C111C] shadow-[0_14px_34px_rgba(0,0,0,0.24)]" type="button">
              ส่งคำชมให้สมาชิก
            </button>
          </div>
        </section>

        <nav className="mx-4 mb-4 grid grid-cols-5 gap-1 rounded-[1.5rem] border border-white/10 bg-black/28 p-2 shadow-[0_18px_42px_rgba(0,0,0,0.26)] backdrop-blur">
          {navItems.map((item, index) => (
            <Link
              key={item}
              className={`rounded-full px-1 py-2 text-center text-[10px] font-semibold ${index === 3 ? "bg-[#67E8F9]/16 text-[#67E8F9]" : "text-white/54"}`}
              href={index === 0 ? "/coach" : index === 3 ? "/coach/leaderboard" : "/coach"}
            >
              {item}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
