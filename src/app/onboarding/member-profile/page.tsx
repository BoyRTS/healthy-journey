import { redirect } from "next/navigation";

import { MemberOnboardingFlow } from "@/components/onboarding/MemberOnboardingFlow";
import { healthyJourneyAuthRoutes } from "@/lib/auth/routes";
import {
  requireHealthyJourneyCurrentUser,
  saveHealthyJourneyMemberProfile,
} from "@/lib/auth/server";

async function saveMemberProfile(formData: FormData) {
  "use server";

  const user = await requireHealthyJourneyCurrentUser();

  await saveHealthyJourneyMemberProfile(user.id, user.publicMetadata, user.privateMetadata, {
    nickname: String(formData.get("nickname") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    goal: String(formData.get("goal") ?? "").trim(),
    motivation: String(formData.get("motivation") ?? "").trim(),
    gender: String(formData.get("gender") ?? "").trim(),
    birthYear: String(formData.get("birthYear") ?? "").trim(),
    heightCm: String(formData.get("heightCm") ?? "").trim(),
    weightKg: String(formData.get("weightKg") ?? "").trim(),
    desiredWeightKg: String(formData.get("desiredWeightKg") ?? "").trim(),
    targetDate: String(formData.get("targetDate") ?? "").trim(),
    activityLevel: String(formData.get("activityLevel") ?? "").trim(),
    chronicConditions: String(formData.get("chronicConditions") ?? "").trim(),
    eatingStyle: String(formData.get("eatingStyle") ?? "").trim(),
    allergies: String(formData.get("allergies") ?? "").trim(),
    additiveReactions: String(formData.get("additiveReactions") ?? "").trim(),
  });

  redirect(healthyJourneyAuthRoutes.memberHome);
}

export default async function MemberProfileOnboardingPage() {
  await requireHealthyJourneyCurrentUser();

  return <MemberOnboardingFlow action={saveMemberProfile} />;
}
