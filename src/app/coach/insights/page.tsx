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

export default async function CoachInsightsPage() {
  const members = await getCoachMemberMessagesOverview();
  const strong = members.filter((member) => member.tone === "strong").length;
  const steady = members.filter((member) => member.tone === "steady").length;
  const newMembers = members.filter((member) => member.tone === "new").length;
  const followUp = members.filter((member) => member.tone === "follow_up" || member.tone === "watch").length;

  const insightCards = [
    { title: "สมาชิกทั้งหมด", value: String(members.length), note: "นับจากสมาชิกที่มีข้อความจริงในระบบ" },
    { title: "ต่อเนื่องสูง", value: String(strong), note: "กลุ่มที่ควรได้รับคำชมจาก template" },
    { title: "สม่ำเสมอ", value: String(steady), note: "กลุ่มที่ควรติดตามต่อแบบปกติ" },
    { title: "สมาชิกใหม่", value: String(newMembers), note: "กลุ่มที่เพิ่งเริ่มมีข้อมูลในระบบ" },
    { title: "ต้องติดตาม", value: String(followUp), note: "กลุ่มที่ควรเปิดรายละเอียดก่อนส่งข้อความ" },
  ] as const;

  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="อินไซต์โค้ช"
        description="ภาพรวมจากข้อมูลข้อความและสถานะสมาชิกที่มีอยู่จริงในระบบ"
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
              style={{ backgroundColor, borderColor: backgroundColor, color: textColor }}
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
                  live
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-6" style={{ color: mutedTextColor }}>
                {card.note}
              </p>
            </article>
          );
        })}
      </section>

      <CoachBottomNav activeHref="/coach/insights" />
    </CoachThemeShell>
  );
}
