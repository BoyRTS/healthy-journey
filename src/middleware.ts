import { healthyJourneyMiddleware } from "@/lib/auth/middleware";

export default healthyJourneyMiddleware;

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
