"use client";

import { BadgeIcon } from "@/components/community/BadgeIcon";
import { mockMemberBadges } from "@/data/mockBadges";

type MemberBadgeDisplayProps = {
  member_id: string;
};

export function MemberBadgeDisplay({ member_id }: MemberBadgeDisplayProps) {
  const member = mockMemberBadges.find((item) => item.memberId === member_id);
  const activeBadges = member?.badges.filter((badge) => badge.is_active) ?? [];

  if (activeBadges.length === 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      {activeBadges.map((badge) => (
        <BadgeIcon
          key={badge.id}
          badge_type={badge.badge_type}
          level={badge.level}
          show_tooltip
        />
      ))}
    </span>
  );
}
