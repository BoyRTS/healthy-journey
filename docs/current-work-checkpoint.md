# Healthy Journey Current Work Checkpoint

Last saved: 2026-06-12 Asia/Bangkok

## Current User Intent

Continue building the real production MVP flow for `/member/food`.

The correct product meaning of `/member/food`:
- It is a shared food room for all members and coaches.
- Everyone can see the same room.
- Members send meal photos for each meal and snacks into this shared room.
- The system must still track which member submitted each photo.
- At 21:00 Asia/Bangkok, AI may batch-analyze each member's submitted meal photos for that day only.
- Water tracking is separate and deterministic only; no AI for water.
- Coach reviews processed graphs/details before sending any message.
- AI must not write, draft, rewrite, or send member-facing messages.

## Highest Priority Product Rules

- Do not spend AI tokens except for daily meal-photo evaluation batch.
- Do not add AI analysis now unless explicitly requested.
- Do not use AI for chat, messages, dashboard, water, summaries, or recommendations.
- Keep scope narrow and do one production slice at a time.
- Do not touch `/coach/members/*` visual theme.
- Do not change `/member/food` UI theme unless explicitly asked.

## Completed In This Session

### Member Profile Storage

Added `member_profiles` as the source of truth for member display data.

Files:
- `src/lib/memberProfiles.ts`
- `src/types/memberProfile.ts`
- `src/lib/auth/server.ts`
- `src/lib/supabaseServer.ts`
- `supabase/migrations/20260612102000_create_member_profiles.sql`
- `docs/supabase-member-profiles.sql`

Behavior:
- Onboarding saves member profile data to Clerk metadata and Supabase `member_profiles`.
- Stored fields include `user_id`, `display_name`, `phone`, `avatar_url`, `avatar_variant`, `role`, `status`.
- Added lazy sync from Clerk to `member_profiles` when a member opens or posts in `/member/food`.

Database:
- Ran `supabase db push`.
- Confirmed `member_profiles` exists and responds with status `200`.
- Table was empty at last check because no member had completed onboarding after this change yet.

Commit:
- `bdcbfb0 Add member profile storage`

### Food Room Changed Toward Shared Room

Changed `/member/food` backend from private submissions to community submissions.

Files:
- `src/lib/mealHomework.ts`
- `src/types/mealHomework.ts`
- `src/app/api/member/meal-homework/route.ts`
- `src/app/member/food/page.tsx`
- `src/lib/supabaseServer.ts`

Behavior:
- `GET /api/member/meal-homework` now requires login and returns recent shared food submissions, not just current user's own submissions.
- Query returns latest 50 submissions.
- Each submission is enriched with:
  - `member_profile`
  - `is_current_member`
  - signed private storage `photo_url`
- `POST /api/member/meal-homework` still requires login and saves resized/compressed image.
- The response is enriched so the new post can show immediately in the room.
- `/member/food` displays:
  - current user's posts on the right
  - other members' posts on the left
  - member display name
  - avatar image if available, otherwise initial
  - actual food image via signed URL

Commit:
- `214c0e3 Make food room show community submissions`

### Deployment

Pushed to `main`.

Production:
- `https://healthy-journey-nu.vercel.app`

Latest checked deployment:
- `https://healthy-journey-qjhaql1gq-boyrts-gmailcoms-projects.vercel.app`
- Status: Ready
- Alias confirmed pointing to latest deployment.

Build:
- `npm.cmd run build` passed.

Production API check:
- Unauthenticated `GET /api/member/meal-homework` returned `401` with:
  - `{"error":"กรุณาเข้าสู่ระบบก่อนดูห้องอาหาร"}`
- Vercel logs showed no errors after deploy.

## Registration / Onboarding Check

Checked production:
- `/sign-up` returned `200`.
- `/onboarding/member-profile` returned `404` when signed out because Clerk protects the route; this is expected from CLI without session.
- `sign-up` code uses Clerk `fallbackRedirectUrl` to `/onboarding/member-profile`.
- New signed-in users without role/onboarding should be routed to onboarding.
- `member_profiles` table responds correctly from Supabase.

Cannot fully verify without real Clerk OTP/session:
- Complete phone sign-up.
- Complete onboarding.
- Confirm row created in `member_profiles`.
- Confirm `/member/food` shows name/avatar after submitting a real photo.

## Important Current Caveats

- Need real browser/session test by user or browser session with login to verify end-to-end sign-up.
- Existing users who completed onboarding before `member_profiles` existed will be lazy-synced when opening or posting in `/member/food`, if Clerk metadata contains `memberHealthProfile`.
- `member_profiles` currently starts empty until someone completes onboarding or lazy-sync triggers.
- No AI batch job exists yet.
- No water tracking production flow exists yet.
- No coach graph/review screen for daily meal analysis exists yet.
- Chat text input at bottom of `/member/food` is still UI only, not real chat messaging.

## Next Step When User Types `start`

Do not ask what to do.

Continue from here:
1. Verify current git status and production state.
2. Test or guide exact sign-up/onboarding flow if a real session is available.
3. If needed, fix sign-up/onboarding so new members reliably create `member_profiles`.
4. Then continue the next production slice for `/member/food` shared room:
   - ensure submitted food posts from all users appear in the shared room
   - ensure names/avatar display correctly
   - preserve current UI theme unless user explicitly requests design changes
5. Do not implement AI batch, water, graph, or coach review until explicitly requested.

## Commands Known To Work In This Session

- `npm.cmd run build`
- `supabase.cmd db push`
- `vercel.cmd ls`
- `vercel.cmd inspect`
- `vercel.cmd logs`
- `git status`
- `git add`
- `git commit`
- `git push origin main`

Note: If Vercel CLI is unavailable in a future session, use Git push deployment and ask user to install Vercel CLI only if logs/inspect/deploy are needed.
