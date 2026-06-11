import { supabaseServerRequest } from "@/lib/supabaseServer";
import type { MemberProfile } from "@/types/memberProfile";

type UpsertMemberProfileInput = {
  avatarUrl: string | null;
  displayName: string;
  phone: string | null;
  role: MemberProfile["role"];
  userId: string;
};

export async function upsertMemberProfile(input: UpsertMemberProfileInput) {
  const rows = await supabaseServerRequest<MemberProfile[]>("member_profiles?on_conflict=user_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: {
      user_id: input.userId,
      display_name: input.displayName.trim() || "สมาชิก",
      phone: input.phone?.trim() || null,
      avatar_url: input.avatarUrl,
      avatar_variant: getStableAvatarVariant(input.userId),
      role: input.role,
      status: "active",
      updated_at: new Date().toISOString(),
    },
  });

  return rows[0];
}

function getStableAvatarVariant(userId: string) {
  let hash = 0;

  for (const char of userId) {
    hash = (hash * 31 + char.charCodeAt(0)) % 997;
  }

  return (hash % 6) + 1;
}
