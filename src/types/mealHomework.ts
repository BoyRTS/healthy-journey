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

export type CommunityMealHomeworkSubmission = MealHomeworkSubmission & {
  is_current_member: boolean;
  member_profile: {
    avatar_url: string | null;
    avatar_variant: number;
    display_name: string;
    role: "member" | "coach";
  } | null;
  photo_url: string | null;
};
