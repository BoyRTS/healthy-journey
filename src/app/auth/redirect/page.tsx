import { redirect } from "next/navigation";
import {
  getHomeRouteForRole,
  hasCompletedMemberOnboarding,
  isHealthyJourneyRole,
} from "@/lib/authRouting";
import { getHealthyJourneyCurrentUser } from "@/lib/auth/server";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";

export const dynamic = "force-dynamic";

export default async function AuthRedirectPage() {
  const user = await getHealthyJourneyCurrentUser();
  const role = user?.publicMetadata?.role;

  if (!user) {
    redirect(healthyJourneyAuthRoutes.signIn);
  }

  if (!isHealthyJourneyRole(role)) {
    redirect(healthyJourneyAuthRoutes.memberOnboarding);
  }

  if (role === "member" && !hasCompletedMemberOnboarding(user.privateMetadata)) {
    redirect(healthyJourneyAuthRoutes.memberOnboarding);
  }

  redirect(getHomeRouteForRole(role));
}
