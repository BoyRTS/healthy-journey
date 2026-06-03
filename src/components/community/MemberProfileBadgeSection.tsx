import { WellnessCard } from "@/components/ui/WellnessCard";
import { mockMemberBadges } from "@/data/mockBadges";
import type { BadgeLevel, BadgeType } from "@/types/badges";

type MemberProfileBadgeSectionProps = {
  member_id: string;
};

const badgeTitles: Record<BadgeType, string> = {
  consistency: "สายสม่ำเสมอ",
  cheerleader: "ขวัญใจกลุ่ม",
};

const badgeLevels: Record<BadgeType, Record<BadgeLevel, string>> = {
  consistency: {
    1: "ฅ",
    2: "ฅฅ",
    3: "ฅฅฅ",
  },
  cheerleader: {
    1: "✦",
    2: "✦✦",
    3: "✦✦✦",
  },
};

export function MemberProfileBadgeSection({ member_id }: MemberProfileBadgeSectionProps) {
  const member = mockMemberBadges.find((item) => item.memberId === member_id);
  const badges = member?.badges ?? [];

  return (
    <WellnessCard className="p-4">
      <h2 className="text-lg font-semibold text-[var(--olive)]">Badges</h2>
      <div className="mt-3 space-y-2">
        {badges.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">ยังไม่มี badge ที่ได้รับ</p>
        ) : (
          badges.map((badge) => (
            <div
              key={badge.id}
              className="rounded-[1rem] border border-[var(--line)] bg-white/76 p-3 shadow-[0_8px_18px_rgba(70,56,36,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--charcoal)]">
                    {badgeTitles[badge.badge_type]} {badgeLevels[badge.badge_type][badge.level]}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    ได้รับครั้งแรก {badge.earned_at.toLocaleDateString("th-TH")}
                  </p>
                </div>
                <span className="rounded-full bg-[var(--sage-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--olive)]">
                  level {badge.level}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </WellnessCard>
  );
}
