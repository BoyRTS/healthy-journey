import { supabaseServerRequest, uploadSupabaseStorageObject } from "@/lib/supabaseServer";
import type { MealHomeworkSubmission } from "@/types/mealHomework";

const MEAL_HOMEWORK_BUCKET = "meal-homework-photos";
const PRODUCT_TIMEZONE = "Asia/Bangkok";

type SaveMealHomeworkInput = {
  file: File;
  imageHeight: number | null;
  imageWidth: number | null;
  mealLabel: string;
  memberName: string | null;
  memberUserId: string;
  note: string | null;
};

export async function saveMealHomeworkSubmission(input: SaveMealHomeworkInput) {
  const submittedAt = new Date();
  const objectPath = createMealHomeworkPath({
    fileName: input.file.name,
    memberUserId: input.memberUserId,
    submittedAt,
  });

  await uploadSupabaseStorageObject({
    body: await input.file.arrayBuffer(),
    bucket: MEAL_HOMEWORK_BUCKET,
    contentType: input.file.type,
    objectPath,
  });

  const rows = await supabaseServerRequest<MealHomeworkSubmission[]>(
    "meal_homework_submissions",
    {
      method: "POST",
      body: {
        member_user_id: input.memberUserId,
        member_name: input.memberName,
        meal_label: input.mealLabel,
        note: input.note,
        storage_bucket: MEAL_HOMEWORK_BUCKET,
        storage_path: objectPath,
        original_file_name: input.file.name,
        mime_type: input.file.type,
        file_size: input.file.size,
        image_width: input.imageWidth,
        image_height: input.imageHeight,
        product_timezone: PRODUCT_TIMEZONE,
        status: "submitted",
      },
    },
  );

  return rows[0];
}

function createMealHomeworkPath({
  fileName,
  memberUserId,
  submittedAt,
}: {
  fileName: string;
  memberUserId: string;
  submittedAt: Date;
}) {
  const safeUserId = memberUserId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const datePart = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: PRODUCT_TIMEZONE,
    year: "numeric",
  }).format(submittedAt);
  const extension = getSafeExtension(fileName);
  const randomPart = crypto.randomUUID();

  return `${safeUserId}/${datePart}/${randomPart}.${extension}`;
}

function getSafeExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension === "webp" || extension === "jpg" || extension === "jpeg" || extension === "png") {
    return extension === "jpeg" ? "jpg" : extension;
  }

  return "webp";
}
