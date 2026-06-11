export { healthyJourneyMiddleware as default } from "@/lib/auth/middleware";

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/:path*", "/trpc/:path*"],
};
