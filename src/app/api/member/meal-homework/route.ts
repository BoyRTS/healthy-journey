import { NextResponse } from "next/server";
import { getHealthyJourneyCurrentUser } from "@/lib/auth/server";
import { getMealHomeworkSubmissions, saveMealHomeworkSubmission } from "@/lib/mealHomework";

const MAX_COMPRESSED_FILE_SIZE = 2_500_000;

export async function GET() {
  try {
    const user = await getHealthyJourneyCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "กรุณาเข้าสู่ระบบก่อนดูรายการส่งอาหาร" },
        { status: 401 },
      );
    }

    const submissions = await getMealHomeworkSubmissions(user.id);

    return NextResponse.json({ submissions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getHealthyJourneyCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "กรุณาเข้าสู่ระบบก่อนส่งการบ้านอาหาร" },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("photo");
    const mealLabel = String(formData.get("mealLabel") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const imageWidth = parseOptionalNumber(formData.get("imageWidth"));
    const imageHeight = parseOptionalNumber(formData.get("imageHeight"));

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "กรุณาเลือกรูปอาหารก่อนส่ง" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "ไฟล์การบ้านอาหารต้องเป็นรูปภาพเท่านั้น" },
        { status: 400 },
      );
    }

    if (file.size > MAX_COMPRESSED_FILE_SIZE) {
      return NextResponse.json(
        { error: "รูปยังมีขนาดใหญ่เกินไป กรุณาเลือกรูปใหม่หรือถ่ายใหม่อีกครั้ง" },
        { status: 400 },
      );
    }

    if (!mealLabel) {
      return NextResponse.json(
        { error: "กรุณาเลือกมื้ออาหาร" },
        { status: 400 },
      );
    }

    const memberName = getMemberDisplayName(user.privateMetadata);
    const submission = await saveMealHomeworkSubmission({
      file,
      imageHeight,
      imageWidth,
      mealLabel,
      memberName,
      memberUserId: user.id,
      note: note || null,
    });

    return NextResponse.json({ submission });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

function parseOptionalNumber(value: FormDataEntryValue | null) {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    return null;
  }

  return Math.round(number);
}

function getMemberDisplayName(privateMetadata: Record<string, unknown>) {
  const profile = privateMetadata.memberHealthProfile;

  if (!profile || typeof profile !== "object") {
    return null;
  }

  const nickname = "nickname" in profile ? profile.nickname : null;

  return typeof nickname === "string" && nickname.trim() ? nickname.trim() : null;
}
