export type MessageGraphSnapshot = {
  kind: "active" | "missed";
  title: string;
  primaryMetric: string;
  secondaryMetric: string;
  note: string;
  tags: string[];
  chartItems?: {
    label: string;
    value: number;
    color: string;
  }[];
};

export type CoachMemberMessage = {
  id: string;
  member_slug: string;
  member_name: string;
  coach_user_id: string;
  message: string;
  graph_snapshot: MessageGraphSnapshot | null;
  status: "sent" | "read";
  created_at: string;
};
