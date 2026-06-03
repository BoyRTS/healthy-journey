export type WeekDayStatus = "sent" | "missed";

export type WeekDay = {
  label: string;
  status: WeekDayStatus;
};

export type MacroChart = {
  label: string;
  value: number;
  status: string;
  color: string;
};

export type SummaryActive = {
  kind: "active";
  energyKcal: number;
  energyTarget: {
    min: number;
    max: number;
  };
  energyBurn: number;
  statusLabel: string;
  statusNote: string;
  burnNote: string;
  macroCharts: readonly MacroChart[];
  insight: string;
};

export type SummaryMissed = {
  kind: "missed";
  eyebrow: string;
  title: string;
  emptyTitle: string;
  emptyDescription: string;
  tags: readonly string[];
};

export type HomeworkActive = {
  kind: "active";
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  timeLabel: string;
  description: string;
  tags: readonly string[];
  weekDays: readonly WeekDay[];
};

export type HomeworkMissed = {
  kind: "missed";
  eyebrow: string;
  title: string;
  emptyTitle: string;
  emptyDescription: string;
  supportText: string;
  weekDays: readonly WeekDay[];
};

export type PlanState = {
  eyebrow: string;
  title: string;
  message: string;
  primaryAction: string;
  secondaryAction: string;
  praiseTitle: string;
  praiseItems: readonly string[];
  improveTitle: string;
  improveItems: readonly string[];
};

export type TemplateMessage = {
  title: string;
  description: string;
  message: string;
  primaryAction: string;
  secondaryActions: [string, string];
};

export type FollowUpNote = {
  title: string;
  message: string;
  tags: readonly string[];
};

export type MemberDetailPageData = {
  member: {
    name: string;
    initial: string;
    imageSrc?: string;
    imageAlt?: string;
    coachName: string;
    daysLeft: number;
    phone: string;
    badge: string;
  };
  summary: SummaryActive | SummaryMissed;
  plan: {
    active: PlanState;
    missed: PlanState;
  };
  homework: HomeworkActive | HomeworkMissed;
  template: TemplateMessage;
  followUp?: FollowUpNote;
};
