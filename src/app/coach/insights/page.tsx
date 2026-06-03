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

const insightCards = [
  { title: "สมาชิกใหม่", value: "2", note: "ควรดูแลให้คุ้นจังหวะการส่งการบ้าน" },
  { title: "สม่ำเสมอ", value: "6", note: "กลุ่มหลักที่ควรชมและต่อยอดพฤติกรรมดี" },
  { title: "ต้องดูแล", value: "3", note: "มีจุดที่โค้ชควรช่วยปรับแบบนุ่มนวล" },
  { title: "ยังไม่ส่งการบ้าน", value: "2", note: "ทักแบบอ่อนโยน ไม่ดันให้เป็นงานเร่งด่วน" },
  { title: "ทำได้ดี", value: "2", note: "ดูแลผลลัพธ์และความต่อเนื่องหลังซื้อ" },
] as const;

export default function CoachInsightsPage() {
  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="อินไซต์โค้ช"
        description="ภาพรวม mock สำหรับช่วยโค้ชจัดลำดับการดูแลสมาชิกในวันนี้"
      />

      <section className="space-y-3">
        {insightCards.map((card, index) => {
          const backgroundColor = getCoachPaletteColor(index);
          const textColor = getCoachTextColor(backgroundColor);
          const mutedTextColor = getCoachMutedTextColor(backgroundColor);

          return (
          <article
            key={card.title}
            className="rounded-[20px] border p-4"
            style={{
              backgroundColor,
              borderColor: backgroundColor,
              color: textColor,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`${coachTheme.displayFont} text-[13px] font-semibold`}>{card.title}</p>
                <p className={`${coachTheme.displayFont} mt-2 text-[34px] font-semibold leading-none`}>{card.value}</p>
              </div>
              <span
                className={`${coachTheme.displayFont} rounded-full border px-3 py-1 text-[11px] font-semibold`}
                style={{
                  backgroundColor: coachColors.darkContainer,
                  borderColor: coachColors.darkContainer,
                  color: coachColors.lightText,
                }}
              >
                mock
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-6" style={{ color: mutedTextColor }}>
              {card.note}
            </p>
          </article>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00FFFF]`}>
          Focus
        </p>
        <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
          โค้ชยังเป็นคนตัดสินใจเอง
        </h2>
        <p className="mt-3 text-[13px] leading-7 text-[#D4D4D4]">
          อินไซต์หน้านี้เป็น mock data สำหรับเดโมเท่านั้น และไม่ใช้ AI วิเคราะห์ feed หรือสร้างคำแนะนำถึงสมาชิก
        </p>
      </section>

      <CoachBottomNav activeHref="/coach/insights" />
    </CoachThemeShell>
  );
}

