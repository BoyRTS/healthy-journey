import {
  CoachBottomNav,
  CoachPageHeader,
  CoachThemeShell,
  coachTheme,
} from "@/components/layout/CoachThemeShell";
import {
  coachColors,
  getCoachMutedTextColor,
  getCoachPaletteColor,
  getCoachTextColor,
} from "@/lib/coachTheme";

const followUps = [
  {
    name: "คุณเมย์",
    status: "ยังไม่ส่งการบ้าน",
    action: "ทักแบบอ่อนโยน",
    note: "ชวนกลับมาเริ่มใหม่ด้วยการส่งรูปมื้อถัดไปหนึ่งมื้อ โดยไม่ทำให้รู้สึกถูกกดดัน",
  },
  {
    name: "คุณแพร",
    status: "สม่ำเสมอ",
    action: "ชมและต่อยอด",
    note: "ให้กำลังใจเรื่องความต่อเนื่อง และตั้งเป้าหมายเล็ก ๆ สำหรับรอบถัดไป",
  },
  {
    name: "คุณบีม",
    status: "ทำได้ดี",
    action: "ดูแลผลลัพธ์",
    note: "ติดตามความต่อเนื่องหลังเริ่มทำได้ดี และย้ำพฤติกรรมที่ควรรักษาไว้",
  },
] as const;

const summaryCards = [
  { label: "สม่ำเสมอ", value: "6" },
  { label: "ต้องดูแล", value: "3" },
  { label: "ยังไม่ส่ง", value: "2" },
] as const;

export default function CoachFollowUpPage() {
  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="คิวติดตามวันนี้"
        description="จัดลำดับสมาชิกที่ควรเลือก template และติดตามด้วยตัวเองในรอบวันนี้"
      />

      <section className="grid grid-cols-3 gap-3">
        {summaryCards.map((card, index) => {
          const backgroundColor = getCoachPaletteColor(index);
          const textColor = getCoachTextColor(backgroundColor);
          const mutedTextColor = getCoachMutedTextColor(backgroundColor);

          return (
            <div
              key={card.label}
              className="rounded-[18px] border p-3"
              style={{
                backgroundColor,
                borderColor: backgroundColor,
                color: textColor,
              }}
            >
              <p className={`${coachTheme.displayFont} text-[24px] font-semibold leading-none`}>
                {card.value}
              </p>
              <p className="mt-2 text-[11px] leading-4" style={{ color: mutedTextColor }}>
                {card.label}
              </p>
            </div>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
          Today list
        </p>
        <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
          รายการที่ต้องติดตาม
        </h2>

        <div className="mt-4 space-y-3">
          {followUps.map((item, index) => {
            const backgroundColor = getCoachPaletteColor(index + summaryCards.length);
            const textColor = getCoachTextColor(backgroundColor);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
              <article
                key={item.name}
                className="rounded-[20px] border p-4"
                style={{
                  backgroundColor,
                  borderColor: backgroundColor,
                  color: textColor,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={`${coachTheme.displayFont} text-[18px] font-semibold`}>
                      {item.name}
                    </h3>
                    <p className="mt-1 text-[13px] font-semibold" style={{ color: mutedTextColor }}>
                      {item.action}
                    </p>
                  </div>
                  <span
                    className={`${coachTheme.displayFont} shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold`}
                    style={{
                      backgroundColor: coachColors.darkContainer,
                      borderColor: coachColors.darkContainer,
                      color: coachColors.lightText,
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-6" style={{ color: mutedTextColor }}>
                  {item.note}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={coachTheme.section}>
        <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
          Reminder
        </p>
        <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
          ส่งข้อความจาก template เท่านั้น
        </h2>
        <p className="mt-3 text-[13px] leading-7 text-[#D4D4D4]">
          หน้านี้ช่วยจัดลำดับงานให้โค้ชเลือกเอง ไม่สร้างข้อความใหม่อัตโนมัติ และไม่ส่งข้อความแทนโค้ช
        </p>
      </section>

      <CoachBottomNav activeHref="/coach/follow-up" />
    </CoachThemeShell>
  );
}
