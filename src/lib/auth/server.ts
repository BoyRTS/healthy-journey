import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import type { HealthyJourneyRole } from "@/lib/authRouting";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";
import { upsertMemberProfile } from "@/lib/memberProfiles";

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
  let user = null;

  try {
    user = await currentUser();
  } catch {
    user = null;
  }

  if (!user && process.env.CLERK_SECRET_KEY) {
    let userId: string | null = null;

    try {
      userId = (await auth()).userId;
    } catch {
      userId = null;
    }

    if (!userId) {
      return null;
    }

    const client = await clerkClient();
    const fetchedUser = await client.users.getUser(userId);

    return {
      id: fetchedUser.id,
      publicMetadata: toMetadataRecord(fetchedUser.publicMetadata),
      privateMetadata: toMetadataRecord(fetchedUser.privateMetadata),
      role: fetchedUser.publicMetadata?.role,
    };
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

  const updatedUser = await client.users.updateUserMetadata(userId, {
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

  await upsertMemberProfile({
    avatarUrl: updatedUser.imageUrl || null,
    displayName: profile.nickname,
    phone: profile.phone,
    role: "member",
    userId,
  });
}
