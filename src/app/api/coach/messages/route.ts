import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sendCoachMemberMessage } from "@/lib/messages";
import type { MessageGraphSnapshot } from "@/types/messages";

type SendMessageBody = {
  memberSlug?: string;
  memberName?: string;
  message?: string;
  graphSnapshot?: MessageGraphSnapshot | null;
};

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    const coachUserId = userId ?? (
      process.env.NODE_ENV === "development" ? "local-demo-coach" : null
    );

    if (!coachUserId) {
      return NextResponse.json(
        { error: "ต้องเข้าสู่ระบบโค้ชก่อนส่งข้อความ" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as SendMessageBody;

    if (!body.memberSlug || !body.memberName || !body.message) {
      return NextResponse.json(
        { error: "ข้อมูลข้อความไม่ครบ" },
        { status: 400 },
      );
    }

    const message = await sendCoachMemberMessage({
      memberSlug: body.memberSlug,
      memberName: body.memberName,
      coachUserId,
      message: body.message,
      graphSnapshot: body.graphSnapshot ?? null,
    });

    return NextResponse.json({ message });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
