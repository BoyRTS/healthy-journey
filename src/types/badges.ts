export type BadgeType = "consistency" | "cheerleader";

export type BadgeLevel = 1 | 2 | 3;

export type MemberBadge = {
  id: string;
  member_id: string;
  badge_type: BadgeType;
  level: BadgeLevel;
  earned_at: Date;
  current_streak: number;
  is_active: boolean;
};

export type MemberActivityType = "post" | "reaction" | "comment";

export type MemberActivity = {
  id: string;
  member_id: string;
  activity_type: MemberActivityType;
  target_member_id: string | null;
  created_at: Date;
};

export type BadgeConfig = {
  type: BadgeType;
  label: string;
  tooltip: string;
  display: string;
};

