export type MemberProfile = {
  user_id: string;
  display_name: string;
  phone: string | null;
  avatar_url: string | null;
  avatar_variant: number;
  role: "member" | "coach";
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};
