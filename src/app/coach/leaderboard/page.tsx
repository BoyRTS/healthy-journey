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

export default async function CoachLeaderboardPage() {
  const members = await getCoachMemberMessagesOverview();
  const rankedMembers = members
    .map((member, index) => ({
      member,
      rank: index + 1,
      score: member.tone === "strong" ? 900 : member.tone === "steady" ? 720 : 520,
    }))
    .sort((a, b) => b.score - a.score);
  const topMembers = rankedMembers.slice(0, 3);
  const rankingRows = rankedMembers.slice(3);

  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="อันดับความต่อเนื่อง"
        description="จัดอันดับจากข้อมูลข้อความและสถานะสมาชิกที่มีอยู่จริงในระบบ"
      />

      {topMembers.length > 0 ? (
        <section className="grid grid-cols-3 items-end gap-2">
          {topMembers.map(({ rank, member, score }, index) => {
            const isFirst = rank === 1;
            const backgroundColor = getCoachPaletteColor(index);
            const textColor = getCoachTextColor(backgroundColor);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
              <article
                key={member.slug}
                className="rounded-[20px] border p-3 text-center"
                style={{ backgroundColor, borderColor: backgroundColor, color: textColor }}
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
                <MemberAvatar
                  className={`mx-auto ring-2 ring-[#2A2A2A] ${isFirst ? "h-20 w-20" : "h-14 w-14"}`}
                  variant={member.avatarVariant}
                />
                <h2 className={`${coachTheme.displayFont} ${isFirst ? "mt-2 text-xl" : "mt-3 text-base"} font-semibold`}>
                  {member.name}
                </h2>
                <p className={`${coachTheme.displayFont} mt-1 text-sm font-semibold`}>{score} pts</p>
                <p className="mt-1 text-[11px] leading-4" style={{ color: mutedTextColor }}>
                  {member.behaviorTag}
                </p>
              </article>
            );
          })}
        </section>
      ) : (
        <section className={coachTheme.section}>
          <h2 className={`${coachTheme.displayFont} text-[21px] font-semibold leading-tight text-white`}>
            ยังไม่มีข้อมูลสมาชิก
          </h2>
          <p className="mt-3 text-[13px] leading-7 text-[#D4D4D4]">
            เมื่อมีการส่งข้อความถึงสมาชิก รายชื่อจะถูกนำมาจัดอันดับที่นี่
          </p>
        </section>
      )}

      {rankingRows.length > 0 ? (
        <section className={coachTheme.section}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className={`${coachTheme.displayFont} text-[21px] font-semibold leading-tight text-white`}>
              อันดับถัดไป
            </h2>
            <span className={`${coachTheme.displayFont} rounded-full bg-[#64FFDA] px-3 py-1 text-xs font-semibold text-[#121212]`}>
              live data
            </span>
          </div>

          <div className="space-y-2">
            {rankingRows.map(({ rank, member, score }, index) => {
              const backgroundColor = getCoachPaletteColor(index + topMembers.length);
              const textColor = getCoachTextColor(backgroundColor);
              const mutedTextColor = getCoachMutedTextColor(backgroundColor);

              return (
                <article
                  key={member.slug}
                  className="grid grid-cols-[26px_34px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[18px] border p-2.5"
                  style={{ backgroundColor, borderColor: backgroundColor, color: textColor }}
                >
                  <p className={`${coachTheme.displayFont} text-sm font-semibold`}>#{rank}</p>
                  <MemberAvatar className="h-[34px] w-[34px]" variant={member.avatarVariant} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`${coachTheme.displayFont} truncate text-sm font-semibold`}>{member.name}</h3>
                      <span
                        className={`${coachTheme.displayFont} shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold`}
                        style={{ backgroundColor: coachColors.darkContainer, color: coachColors.lightText }}
                      >
                        {member.status}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs" style={{ color: mutedTextColor }}>
                      {member.lastUpdate}
                    </p>
                  </div>
                  <p className={`${coachTheme.displayFont} text-sm font-semibold`}>{score}</p>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <CoachBottomNav activeHref="/coach" />
    </CoachThemeShell>
  );
}
