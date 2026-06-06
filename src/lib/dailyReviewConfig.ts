export const DAILY_REVIEW_TIME_ZONE = "Asia/Bangkok";
export const DEFAULT_DAILY_REVIEW_CUTOFF = "21:00";
export const DAILY_REVIEW_RESET_TIME = "00:00";

export type DailyReviewConfig = {
  timeZone: typeof DAILY_REVIEW_TIME_ZONE;
  cutoffTime: string;
  resetTime: typeof DAILY_REVIEW_RESET_TIME;
};

export const dailyReviewConfig: DailyReviewConfig = {
  timeZone: DAILY_REVIEW_TIME_ZONE,
  cutoffTime: DEFAULT_DAILY_REVIEW_CUTOFF,
  resetTime: DAILY_REVIEW_RESET_TIME,
};

export function getDailyReviewLabel(config: DailyReviewConfig = dailyReviewConfig) {
  return `${config.cutoffTime} (${config.timeZone})`;
}
