import Link from "next/link";
import { MemberAvatar } from "@/components/coach/MemberAvatar";
import {
  CoachBottomNav,
  CoachPageHeader,
  CoachThemeShell,
  coachTheme,
} from "@/components/layout/CoachThemeShell";
import { demoMembers } from "@/data/mockDemoMembers";
import {
  coachColors,
  getCoachMutedTextColor,
  getCoachPaletteColor,
  getCoachTextColor,
} from "@/lib/coachTheme";

const topMembers = [
  { rank: 1, member: demoMembers[1], score: "920", label: "ส่งต่อเนื่อง 5 วัน" },
  { rank: 2, member: demoMembers[3], score: "860", label: "เช็กอินครบ 4 วัน" },
  { rank: 3, member: demoMembers[4], score: "790", label: "ให้กำลังใจเพื่อนเยอะ" },
] as const;

const rankingRows = [
  { rank: 4, member: demoMembers[2], reason: "เริ่มส่งต่อเนื่อง", score: "680", status: "กำลังมาแรง" },
  { rank: 5, member: demoMembers[5], reason: "กลับมาเช็กอินแล้ว", score: "620", status: "กลับมาแล้ว" },
  { rank: 6, member: demoMembers[6], reason: "ส่งอาหารครบ 3 วัน", score: "590", status: "สม่ำเสมอ" },
  { rank: 7, member: demoMembers[7], reason: "ให้กำลังใจในกลุ่ม", score: "540", status: "พลังบวก" },
  { rank: 8, member: demoMembers[9], reason: "ดื่มน้ำครบเป้า", score: "510", status: "habit ดี" },
] as const;

export default function CoachLeaderboardPage() {
  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="อันดับความสม่ำเสมอ"
        description="สมาชิกที่ควรได้รับคำชมจากโค้ช เพราะส่งการบ้านและช่วยสร้างบรรยากาศดีในกลุ่ม"
      />

      <section className="grid grid-cols-3 items-end gap-2">
        {topMembers.map(({ rank, member, score, label }, index) => {
          const isFirst = rank === 1;
          const backgroundColor = getCoachPaletteColor(index);
          const textColor = getCoachTextColor(backgroundColor);
          const mutedTextColor = getCoachMutedTextColor(backgroundColor);

          return (
            <article
              key={rank}
              className="rounded-[20px] border p-3 text-center"
              style={{
                backgroundColor,
                borderColor: backgroundColor,
                color: textColor,
              }}
            >
              <div
                className={`${coachTheme.displayFont} mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold`}
                style={{
                  backgroundColor: coachColors.darkContainer,
                  borderColor: coachColors.darkContainer,
                  color: coachColors.lightText,
                }}
              >
                #{rank}
              </div>
              <MemberAvatar className={`mx-auto ring-2 ring-[#2A2A2A] ${isFirst ? "h-20 w-20" : "h-14 w-14"}`} variant={member.avatarVariant} />
              <h2 className={`${coachTheme.displayFont} ${isFirst ? "mt-2 text-xl" : "mt-3 text-base"} font-semibold`}>
                {member.name}
              </h2>
              <p className={`${coachTheme.displayFont} mt-1 text-sm font-semibold`}>{score} pts</p>
              <p className="mt-1 text-[11px] leading-4" style={{ color: mutedTextColor }}>
                {label}
              </p>
            </article>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className={`${coachTheme.displayFont} text-[21px] font-semibold leading-tight text-white`}>อันดับถัดไป</h2>
          <span className={`${coachTheme.displayFont} rounded-full bg-[#64FFDA] px-3 py-1 text-xs font-semibold text-[#121212]`}>
            positive habits
          </span>
        </div>

        <div className="space-y-2">
          {rankingRows.map(({ rank, member, reason, score, status }, index) => {
            const backgroundColor = getCoachPaletteColor(index + topMembers.length);
            const textColor = getCoachTextColor(backgroundColor);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
            <article
              key={rank}
              className="grid grid-cols-[26px_34px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[18px] border p-2.5"
              style={{
                backgroundColor,
                borderColor: backgroundColor,
                color: textColor,
              }}
            >
              <p className={`${coachTheme.displayFont} text-sm font-semibold`}>#{rank}</p>
              <MemberAvatar className="h-[34px] w-[34px]" variant={member.avatarVariant} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`${coachTheme.displayFont} truncate text-sm font-semibold`}>{member.name}</h3>
                  <span
                    className={`${coachTheme.displayFont} shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold`}
                    style={{
                      backgroundColor: coachColors.darkContainer,
                      color: coachColors.lightText,
                    }}
                  >
                    {status}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs" style={{ color: mutedTextColor }}>
                  {reason}
                </p>
              </div>
              <p className={`${coachTheme.displayFont} text-sm font-semibold`}>{score}</p>
            </article>
            );
          })}
        </div>
      </section>

      <section className={coachTheme.section}>
        <p className="text-sm leading-6 text-[#D4D4D4]">
          สมาชิกกลุ่มนี้ควรได้รับคำชมวันนี้ เพื่อ reinforce พฤติกรรมที่ดีโดยใช้ข้อความจาก template เท่านั้น
        </p>
        <Link className={`${coachTheme.primaryAction} mt-3 w-full`} href="/coach-chat">
          เปิดหน้าเตรียมข้อความ
        </Link>
      </section>

      <CoachBottomNav activeHref="/coach" />
    </CoachThemeShell>
  );
}

