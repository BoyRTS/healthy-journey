import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";

export type HealthyJourneyRole = "member" | "coach" | "team_admin" | "super_admin";

const roleHomeRoutes: Record<HealthyJourneyRole, string> = {
  member: healthyJourneyAuthRoutes.memberHome,
  coach: healthyJourneyAuthRoutes.coachHome,
  team_admin: healthyJourneyAuthRoutes.adminHome,
  super_admin: healthyJourneyAuthRoutes.adminHome,
};

export function isHealthyJourneyRole(role: unknown): role is HealthyJourneyRole {
  if (
    role === "member" ||
    role === "coach" ||
    role === "team_admin" ||
    role === "super_admin"
  ) {
    return true;
  }

  return false;
}

export function getHomeRouteForRole(role: unknown) {
  if (isHealthyJourneyRole(role)) {
    return roleHomeRoutes[role];
  }

  return healthyJourneyAuthRoutes.memberHome;
}

export function hasCompletedMemberOnboarding(value: unknown) {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "memberOnboardingComplete" in value && value.memberOnboardingComplete === true;
}
