import type { CoachMemberMessage, MessageGraphSnapshot } from "@/types/messages";
import { supabaseServerRequest } from "@/lib/supabaseServer";

type SendCoachMessageInput = {
  memberSlug: string;
  memberName: string;
  coachUserId: string;
  message: string;
  graphSnapshot: MessageGraphSnapshot | null;
};

export async function sendCoachMemberMessage(input: SendCoachMessageInput) {
  const rows = await supabaseServerRequest<CoachMemberMessage[]>("coach_member_messages", {
    method: "POST",
    body: {
      member_slug: input.memberSlug,
      member_name: input.memberName,
      coach_user_id: input.coachUserId,
      message: input.message,
      graph_snapshot: input.graphSnapshot,
    },
  });

  return rows[0];
}

export async function getMemberMessages(memberSlug: string) {
  const query = `?member_slug=eq.${encodeURIComponent(memberSlug)}&order=created_at.desc`;

  return supabaseServerRequest<CoachMemberMessage[]>("coach_member_messages", {
    query,
  });
}
