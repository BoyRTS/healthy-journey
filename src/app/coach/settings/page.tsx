import {
  CoachBottomNav,
  CoachPageHeader,
  CoachThemeShell,
  coachTheme,
} from "@/components/layout/CoachThemeShell";
import {
  getCoachMutedTextColor,
  getCoachPaletteColor,
  getCoachTextColor,
} from "@/lib/coachTheme";
import { dailyReviewConfig, getDailyReviewLabel } from "@/lib/dailyReviewConfig";

const settings = [
  {
    title: "Daily review cutoff",
    value: getDailyReviewLabel(),
    note: "ใช้กำหนดเวลาปิดรอบประจำวันของระบบ",
  },
  {
    title: "Daily reset",
    value: dailyReviewConfig.resetTime,
    note: "วันใหม่เริ่มตามเวลาไทย",
  },
  {
    title: "Timezone",
    value: dailyReviewConfig.timeZone,
    note: "ทุกการจัดกลุ่มวันอ้างอิง timezone นี้",
  },
] as const;

export default function CoachSettingsPage() {
  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="ตั้งค่าโค้ช"
        description="ค่าการทำงานที่ระบบใช้จริงสำหรับรอบ review และนโยบายข้อความ"
      />

      <section className="space-y-3">
        {settings.map((item, index) => {
          const backgroundColor = getCoachPaletteColor(index);
          const textColor = getCoachTextColor(backgroundColor);
          const mutedTextColor = getCoachMutedTextColor(backgroundColor);

          return (
            <article
              key={item.title}
              className="rounded-[20px] border p-4"
              style={{ backgroundColor, borderColor: backgroundColor, color: textColor }}
            >
              <p className={`${coachTheme.displayFont} text-[12px] font-semibold uppercase`}>{item.title}</p>
              <h2 className={`${coachTheme.displayFont} mt-2 text-[22px] font-semibold`}>{item.value}</h2>
              <p className="mt-2 text-[13px] leading-6" style={{ color: mutedTextColor }}>
                {item.note}
              </p>
            </article>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
          Policy
        </p>
        <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
          ไม่มี AI สำหรับข้อความถึงสมาชิก
        </h2>
        <p className="mt-3 text-[13px] leading-7 text-[#D4D4D4]">
          Coach/Admin ต้องเลือกข้อความจาก template ตรวจเอง และส่งเอง ระบบไม่สร้างข้อความถึงสมาชิกด้วย AI
        </p>
      </section>

      <CoachBottomNav activeHref="/coach/settings" />
    </CoachThemeShell>
  );
}
