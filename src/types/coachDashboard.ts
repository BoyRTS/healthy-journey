export type CoachMemberTone = "follow_up" | "steady" | "new" | "watch" | "strong";

export type CoachMember = {
  slug: string;
  name: string;
  status: string;
  note: string;
  insight: string;
  lastUpdate: string;
  behaviorTag: string;
  avatarVariant: number;
  href: string;
  tone: CoachMemberTone;
};
