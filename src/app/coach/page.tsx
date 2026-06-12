import Link from "next/link";
import { MemberAvatar } from "@/components/coach/MemberAvatar";
import {
  CoachBottomNav,
  CoachPageHeader,
  CoachThemeShell,
  coachTheme,
} from "@/components/layout/CoachThemeShell";
import { getCoachMemberMessagesOverview } from "@/lib/coachMembers";
import {
  coachColors,
  getCoachMutedTextColor,
  getCoachPaletteColor,
  getCoachTextColor,
} from "@/lib/coachTheme";

const summaryCards = [
  {
    value: "จริง",
    label: "ข้อมูลจาก message table",
    note: "รายการสมาชิกดึงจากฐานข้อมูลจริง",
  },
  {
    value: "Live",
    label: "ข้อความล่าสุด",
    note: "ใช้ข้อมูลที่ coach ส่งไว้จริง",
  },
  {
    value: "1",
    label: "แหล่งข้อมูล",
    note: "เริ่มจาก coach_member_messages",
  },
  {
    value: "DB",
    label: "พร้อมทดสอบ",
    note: "เปิดดูสมาชิกจากข้อมูลจริงได้",
  },
] as const;

const quickActions = [
  { label: "เปิดทีมโค้ช", href: "/coach/organization" },
  { label: "ดูอินไซต์", href: "/coach/insights" },
] as const;

export default async function CoachDashboardPage() {
  const coachMembers = await getCoachMemberMessagesOverview();
  const topFocusMember = coachMembers[0];

  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="แดชบอร์ดโค้ช"
        description="มุมมองสรุปงานประจำวันสำหรับคัดกรองสมาชิก ดูงานที่ต้องติดตาม และเข้าไปจัดการได้เร็วขึ้น"
        badge="Coach"
      />

      <section className="relative overflow-hidden rounded-[30px] border border-[#3A3A3C] bg-[linear-gradient(180deg,#2C2C2E_0%,#232326_100%)] p-5">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#00E5FF]/10 blur-2xl" />
        <div className="absolute -bottom-10 left-1/2 h-28 w-28 rounded-full bg-[#64FFDA]/10 blur-2xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00E5FF]`}>
              Today overview
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[26px] font-semibold leading-tight text-white`}>
              พร้อมดูข้อมูลจริงแล้ว
            </h2>
            <p className="mt-3 max-w-[280px] text-[13px] leading-7 text-[#D4D4D4]">
              หน้านี้อ่านข้อมูลจากตารางข้อความของโค้ชจริง เพื่อให้ทดสอบ flow ส่งข้อความและเปิดรายละเอียดสมาชิกได้
            </p>
          </div>

          <div className="rounded-[20px] border border-[#3A3A3C] bg-[#1C1C1E] px-3 py-2 text-right">
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64FFDA]`}>
              Live
            </p>
            <p className={`${coachTheme.displayFont} mt-1 text-[20px] font-semibold text-white`}>
              {coachMembers.length}
            </p>
            <p className="text-[11px] leading-5 text-[#D4D4D4]">สมาชิกที่มีข้อความล่าสุด</p>
          </div>
        </div>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              className={`${coachTheme.displayFont} rounded-2xl border border-[#3A3A3C] bg-white/5 px-4 py-3 text-[12px] font-semibold text-white transition-colors duration-200 hover:border-[#00E5FF]/60 hover:bg-white/10`}
              href={action.href}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {summaryCards.map((item, index) => {
          const backgroundColor = index === 0 ? "#FFC79C" : getCoachPaletteColor(index);
          const textColor = getCoachTextColor(backgroundColor);
          const mutedTextColor = getCoachMutedTextColor(backgroundColor);

          return (
            <div
              key={item.label}
              className="rounded-[22px] border p-4 shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
              style={{
                backgroundColor,
                borderColor: backgroundColor,
                color: textColor,
              }}
            >
              <p className={`${coachTheme.displayFont} text-[34px] font-semibold leading-none`}>
                {item.value}
              </p>
              <p className={`${coachTheme.displayFont} mt-2 text-[12px] font-semibold leading-5`}>
                {item.label}
              </p>
              <p className="mt-1 text-[11px] leading-5" style={{ color: mutedTextColor }}>
                {item.note}
              </p>
            </div>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
              Member queue
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
              รายชื่อสมาชิก
            </h2>
          </div>
          <Link
            className={`${coachTheme.displayFont} text-[12px] font-semibold text-[#64FFDA]`}
            href="/coach/organization"
          >
            เปิดทีมโค้ช
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {coachMembers.map((member, index) => {
            const backgroundColor = getCoachPaletteColor(index);
            const textColor = getCoachTextColor(backgroundColor);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
              <Link
                key={member.slug}
                className="relative block overflow-hidden rounded-[20px] border p-4 transition-colors duration-200 hover:border-white"
                href={member.href}
                style={{
                  backgroundColor,
                  borderColor: backgroundColor,
                  color: textColor,
                }}
              >
                <div
                  className="absolute inset-y-4 left-0 w-1 rounded-r-full"
                  style={{ backgroundColor: textColor }}
                />
                <div className="flex gap-3 pl-1">
                  <MemberAvatar className="h-14 w-14 ring-2 ring-[#2A2A2A]" variant={member.avatarVariant} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className={`${coachTheme.displayFont} text-[16px] font-semibold leading-tight`}>
                          {member.name}
                        </p>
                        <p className="mt-1 text-[12px] leading-5" style={{ color: mutedTextColor }}>
                          {member.note}
                        </p>
                      </div>
                      <span
                        className={`${coachTheme.displayFont} shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold`}
                        style={{
                          backgroundColor: coachColors.darkContainer,
                          borderColor: coachColors.darkContainer,
                          color: coachColors.lightText,
                        }}
                      >
                        {member.status}
                      </span>
                    </div>

                    <p className="mt-3 text-[12px] leading-6" style={{ color: textColor }}>
                      {member.insight}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#2C2C2E] bg-[#2C2C2E] px-2.5 py-1 text-[10px] text-white">
                        {member.lastUpdate}
                      </span>
                      <span className="rounded-full border border-[#2C2C2E] bg-[#2C2C2E] px-2.5 py-1 text-[10px] text-white">
                        {member.behaviorTag}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
              Focus
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
              สิ่งที่ควรทำต่อ
            </h2>
          </div>
          <span className={`${coachTheme.displayFont} rounded-full border border-[#64FFDA] bg-[#64FFDA] px-3 py-1 text-[11px] font-semibold text-[#121212]`}>
            Today
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "พร้อมทดสอบ", value: String(coachMembers.length) },
            { label: "หน้ารายละเอียดจริง", value: topFocusMember ? "1" : "0" },
            { label: "เชื่อมฐานข้อมูล", value: "DB" },
          ].map((item, index) => {
            const backgroundColor = getCoachPaletteColor(index + summaryCards.length);
            const textColor = getCoachTextColor(backgroundColor);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
              <div
                key={item.label}
                className="rounded-[18px] border p-3"
                style={{
                  backgroundColor,
                  borderColor: backgroundColor,
                  color: textColor,
                }}
              >
                <p className={`${coachTheme.displayFont} text-[24px] font-semibold leading-none`}>
                  {item.value}
                </p>
                <p className="mt-2 text-[11px] leading-4" style={{ color: mutedTextColor }}>
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {topFocusMember ? (
          <Link
            className="mt-4 block rounded-[20px] border border-[#3A3A3C] bg-[#1C1C1E] p-4 transition-colors duration-200 hover:bg-[#262629]"
            href={topFocusMember.href}
          >
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64FFDA]`}>
              Next member
            </p>
            <div className="mt-3 flex items-center gap-3">
              <MemberAvatar className="h-12 w-12" variant={topFocusMember.avatarVariant} />
              <div className="min-w-0 flex-1">
                <p className={`${coachTheme.displayFont} text-[16px] font-semibold text-white`}>
                  {topFocusMember.name}
                </p>
                <p className="mt-1 text-[12px] leading-5 text-[#D4D4D4]">
                  {topFocusMember.note}
                </p>
              </div>
              <span className={`${coachTheme.displayFont} rounded-full bg-[#00E5FF] px-3 py-1 text-[11px] font-semibold text-[#121212]`}>
                เปิดดู
              </span>
            </div>
          </Link>
        ) : null}
      </section>

      <CoachBottomNav activeHref="/coach" />
    </CoachThemeShell>
  );
}
