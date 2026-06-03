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

const settings = [
  {
    title: "Template Message",
    note: "เลือกข้อความจากชุดที่เตรียมไว้ก่อนส่งทุกครั้ง โค้ชเป็นคนตรวจและส่งเอง",
  },
  {
    title: "Member Status",
    note: "ใช้สถานะสมาชิกชุดเดียวกันทุกหน้า เพื่อช่วยเลือก template ให้เหมาะกับบริบท",
  },
  {
    title: "Review First",
    note: "เปิดหน้า member detail เพื่อดูบริบทก่อนคัดลอกหรือส่งข้อความจริง",
  },
] as const;

export default function CoachSettingsPage() {
  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="ตั้งค่าโค้ช"
        description="ค่าตั้งต้น mock สำหรับคุมวิธีทำงานของโค้ชใน prototype"
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
            style={{
              backgroundColor,
              borderColor: backgroundColor,
              color: textColor,
            }}
          >
            <h2 className={`${coachTheme.displayFont} text-[18px] font-semibold`}>{item.title}</h2>
            <p className="mt-2 text-[13px] leading-6" style={{ color: mutedTextColor }}>{item.note}</p>
          </article>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
          Policy
        </p>
        <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
          ไม่มีข้อความ AI ถึงสมาชิก
        </h2>
        <p className="mt-3 text-[13px] leading-7 text-[#D4D4D4]">
          หน้า settings นี้เป็น mock UI เท่านั้น และย้ำว่า coach/admin ต้องเลือกข้อความจาก template ตรวจเอง และส่งเอง
        </p>
      </section>

      <CoachBottomNav activeHref="/coach/settings" />
    </CoachThemeShell>
  );
}

