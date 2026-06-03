import { ClerkUserProfilePanel } from "@/components/auth/ClerkAuthPanels";
import { requireHealthyJourneyCurrentUser } from "@/lib/auth/server";

export default async function UserProfilePage() {
  await requireHealthyJourneyCurrentUser();

  return <ClerkUserProfilePanel />;
}
