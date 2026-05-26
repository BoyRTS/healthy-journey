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
    1: "🔥",
    2: "🔥🔥",
    3: "🔥🔥🔥",
  },
  cheerleader: {
    1: "❤️",
    2: "❤️❤️",
    3: "❤️❤️",
  },
};

export function MemberProfileBadgeSection({ member_id }: MemberProfileBadgeSectionProps) {
  const member = mockMemberBadges.find((item) => item.memberId === member_id);
  const badges = member?.badges ?? [];

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/7 p-4 backdrop-blur">
      <h2 className="text-lg font-semibold text-white">Badges</h2>
      <div className="mt-3 space-y-2">
        {badges.length === 0 ? (
          <p className="text-sm text-white/58">ยังไม่มี badge ที่ได้รับ</p>
        ) : (
          badges.map((badge) => (
            <div key={badge.id} className="rounded-[1rem] border border-white/8 bg-black/16 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {badgeTitles[badge.badge_type]} {badgeLevels[badge.badge_type][badge.level]}
                  </p>
                  <p className="mt-1 text-xs text-white/58">
                    ได้รับครั้งแรก {badge.earned_at.toLocaleDateString("th-TH")}
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/72">
                  level {badge.level}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

