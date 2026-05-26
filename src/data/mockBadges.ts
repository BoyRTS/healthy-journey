import type { MemberActivity, MemberBadge } from "@/types/badges";

export type MockMemberBadgeProfile = {
  memberId: string;
  displayName: string;
  badges: MemberBadge[];
};

export const mockMemberBadges: MockMemberBadgeProfile[] = [
  {
    memberId: "member-prae",
    displayName: "คุณแพร",
    badges: [
      {
        id: "badge-prae-consistency",
        member_id: "member-prae",
        badge_type: "consistency",
        level: 3,
        earned_at: new Date("2026-05-03T08:00:00.000Z"),
        current_streak: 21,
        is_active: true,
      },
      {
        id: "badge-prae-cheerleader",
        member_id: "member-prae",
        badge_type: "cheerleader",
        level: 2,
        earned_at: new Date("2026-05-05T08:00:00.000Z"),
        current_streak: 14,
        is_active: true,
      },
    ],
  },
  {
    memberId: "member-anne",
    displayName: "คุณแอน",
    badges: [
      {
        id: "badge-anne-consistency",
        member_id: "member-anne",
        badge_type: "consistency",
        level: 2,
        earned_at: new Date("2026-05-08T08:00:00.000Z"),
        current_streak: 14,
        is_active: true,
      },
    ],
  },
  {
    memberId: "member-joy",
    displayName: "คุณจอย",
    badges: [
      {
        id: "badge-joy-consistency",
        member_id: "member-joy",
        badge_type: "consistency",
        level: 1,
        earned_at: new Date("2026-05-11T08:00:00.000Z"),
        current_streak: 7,
        is_active: true,
      },
    ],
  },
  {
    memberId: "member-fon",
    displayName: "คุณฝน",
    badges: [
      {
        id: "badge-fon-cheerleader",
        member_id: "member-fon",
        badge_type: "cheerleader",
        level: 1,
        earned_at: new Date("2026-05-10T08:00:00.000Z"),
        current_streak: 5,
        is_active: true,
      },
    ],
  },
  {
    memberId: "member-may",
    displayName: "คุณเมย์",
    badges: [
      {
        id: "badge-may-consistency",
        member_id: "member-may",
        badge_type: "consistency",
        level: 1,
        earned_at: new Date("2026-05-13T08:00:00.000Z"),
        current_streak: 7,
        is_active: true,
      },
      {
        id: "badge-may-cheerleader",
        member_id: "member-may",
        badge_type: "cheerleader",
        level: 1,
        earned_at: new Date("2026-05-15T08:00:00.000Z"),
        current_streak: 5,
        is_active: true,
      },
    ],
  },
  {
    memberId: "member-blank",
    displayName: "คุณบี",
    badges: [],
  },
];

export const mockMemberActivities: MemberActivity[] = [
  {
    id: "activity-1",
    member_id: "member-prae",
    activity_type: "post",
    target_member_id: null,
    created_at: new Date("2026-05-23T07:10:00.000Z"),
  },
  {
    id: "activity-2",
    member_id: "member-prae",
    activity_type: "reaction",
    target_member_id: "member-anne",
    created_at: new Date("2026-05-23T08:20:00.000Z"),
  },
  {
    id: "activity-3",
    member_id: "member-may",
    activity_type: "comment",
    target_member_id: "member-joy",
    created_at: new Date("2026-05-22T11:40:00.000Z"),
  },
];

