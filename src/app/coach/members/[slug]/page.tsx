import { notFound } from "next/navigation";
import { MemberDetailPage } from "@/components/coach/MemberDetailPage";
import { getCoachMemberDetailFromMessages } from "@/lib/coachMembers";

type CoachMemberDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CoachMemberDetailRoute({
  params,
}: CoachMemberDetailRouteProps) {
  const { slug } = await params;

  if (["prae", "may"].includes(slug)) {
    notFound();
  }

  const data = await getCoachMemberDetailFromMessages(slug);

  if (!data) {
    notFound();
  }

  return <MemberDetailPage data={data} memberSlug={slug} />;
}
