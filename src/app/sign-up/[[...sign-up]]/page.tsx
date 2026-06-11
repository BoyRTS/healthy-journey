import { ClerkSignUpPanel } from "@/components/auth/ClerkAuthPanels";
import {
  getHomeRouteForRole,
  hasCompletedMemberOnboarding,
  isHealthyJourneyRole,
} from "@/lib/authRouting";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";
import { getHealthyJourneyCurrentUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const user = await getHealthyJourneyCurrentUser();
  const role = user?.publicMetadata?.role;

  if (user && !isHealthyJourneyRole(role)) {
    redirect(healthyJourneyAuthRoutes.memberOnboarding);
  }

  if (user && role === "member" && !hasCompletedMemberOnboarding(user.privateMetadata)) {
    redirect(healthyJourneyAuthRoutes.memberOnboarding);
  }

  if (user) {
    redirect(getHomeRouteForRole(role));
  }

  return <ClerkSignUpPanel />;
}
