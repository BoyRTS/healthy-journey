export type MealHomeworkSubmission = {
  id: string;
  member_user_id: string;
  member_name: string | null;
  meal_label: string;
  note: string | null;
  storage_bucket: string;
  storage_path: string;
  original_file_name: string | null;
  mime_type: string;
  file_size: number;
  image_width: number | null;
  image_height: number | null;
  submitted_at: string;
  product_timezone: "Asia/Bangkok";
  status: "submitted" | "queued_for_review" | "reviewed";
};
