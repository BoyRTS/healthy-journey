export type FoodHomeworkStatus = "draft" | "submitted" | "reviewed";

export type FoodStatCard = {
  label: string;
  value: string;
  note: string;
  tone?: "sage" | "gold" | "beige" | "olive";
};

export type FoodTimelineItem = {
  title: string;
  time: string;
  status: FoodHomeworkStatus;
  note: string;
};

export type MemberFoodPageData = {
  member: {
    name: string;
    coachName: string;
    streakLabel: string;
    memberCode: string;
  };
  stats: readonly FoodStatCard[];
  submission: {
    title: string;
    subtitle: string;
    mealLabel: string;
    mealTime: string;
    moodLabel: string;
    notePlaceholder: string;
    imageAlt: string;
    imageSrc: string;
    actionPrimary: string;
    actionSecondary: string;
  };
  coachSummary: {
    title: string;
    description: string;
    items: readonly string[];
  };
  guidance: {
    title: string;
    items: readonly string[];
  };
  recentActivity: readonly FoodTimelineItem[];
};
