import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import type { HealthyJourneyRole } from "@/lib/authRouting";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";

type AuthMetadata = Record<string, unknown>;

export type HealthyJourneyAuthUser = {
  id: string;
  publicMetadata: AuthMetadata;
  privateMetadata: AuthMetadata;
  role: unknown;
};

export type MemberHealthProfile = {
  nickname: string;
  phone: string;
  goal: string;
  motivation: string;
  gender: string;
  birthYear: string;
  heightCm: string;
  weightKg: string;
  desiredWeightKg: string;
  targetDate: string;
  activityLevel: string;
  chronicConditions: string;
  eatingStyle: string;
  allergies: string;
  additiveReactions: string;
};

function toMetadataRecord(value: unknown): AuthMetadata {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as AuthMetadata;
}

export async function getHealthyJourneyCurrentUser(): Promise<HealthyJourneyAuthUser | null> {
  let user;

  try {
    user = await currentUser();
  } catch {
    return null;
  }

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    publicMetadata: toMetadataRecord(user.publicMetadata),
    privateMetadata: toMetadataRecord(user.privateMetadata),
    role: user.publicMetadata?.role,
  };
}

export async function requireHealthyJourneyCurrentUser() {
  const user = await getHealthyJourneyCurrentUser();

  if (!user) {
    redirect(healthyJourneyAuthRoutes.signIn);
  }

  return user;
}

export async function ensureHealthyJourneyRole(
  userId: string,
  publicMetadata: AuthMetadata,
  role: HealthyJourneyRole,
) {
  if (!process.env.CLERK_SECRET_KEY) {
    return;
  }

  const client = await clerkClient();

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...publicMetadata,
      role,
    },
  });
}

export async function saveHealthyJourneyMemberProfile(
  userId: string,
  publicMetadata: AuthMetadata,
  privateMetadata: AuthMetadata,
  profile: MemberHealthProfile,
) {
  if (!process.env.CLERK_SECRET_KEY) {
    return;
  }

  const client = await clerkClient();

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...publicMetadata,
      role: "member",
    },
    privateMetadata: {
      ...privateMetadata,
      memberOnboardingComplete: true,
      memberHealthProfile: profile,
    },
  });
}
