# Healthy Journey — Codex Instructions

## Highest Priority Rule - AI Token Usage

This is the highest-priority rule in the project and overrides any product, UX, architecture, or implementation idea that conflicts with it.

In the real running system, Healthy Journey must not spend AI tokens on any task except meal-photo evaluation from member homework submissions.

Allowed AI token usage only:
- Analyze member-submitted meal homework photos.
- Include all submitted meal photos for the day, even if there are more than 3 meals.
- Evaluate the day's submitted meal photos together in one batch only.
- Run only at 19:00 by default.
- The evaluation time may be adjusted later by the project owner depending on product strategy.
- Run at most once per member per day.
- Run only when the member submitted meal homework photos.
- Run only for coach/admin review, not direct member-facing output.

Forbidden AI token usage:
- Do not use AI for chat replies.
- Do not use AI to generate, rewrite, draft, regenerate, or suggest messages to members.
- Do not use AI on dashboard render.
- Do not use AI for community feed analysis.
- Do not use AI for notifications, summaries, recommendations, onboarding, scoring, coaching plans, admin copy, or any other product feature unless the project owner explicitly changes this rule later.
- Do not design any flow that silently spends AI tokens outside the allowed meal-photo evaluation batch.

If any requested feature, architecture, package, integration, or UX flow would require AI token usage outside this rule, Codex must warn the project owner immediately before implementing it.

Cost control is a product requirement, not an optimization. Every design decision must assume AI token usage is forbidden unless it fits the allowed meal-photo evaluation rule above.

### Meal Photo Evaluation Model Policy

Use `gpt-5.4` as the primary model for the 19:00 meal-photo evaluation batch.

Use image `detail: high` only when photos are small, unclear, or food details are difficult to see. Do not default every image to higher-cost detail if normal detail is enough.

The evaluation output must be short structured JSON, for example:
- `calories_range`
- `protein_estimate`
- `carb_estimate`
- `fat_estimate`
- `confidence`
- `coach_review_note`

If confidence is low, show that the item needs coach review. Do not automatically call AI again.

Use `gpt-5.5` only as a fallback when explicitly approved by the project owner, such as during a pilot comparison for quality evaluation. `gpt-5.5` must not be the default production model.

Do not promise that AI can accurately analyze nutrition from food photos alone. Product copy and coach-facing UI should use cautious wording such as "rough estimate" or "helps the coach understand trends" because food-photo nutrition estimates can be wrong when oil, sauces, hidden rice, portion size, or lack of scale references are involved.

---

## Product Name

The product name is **Healthy Journey**.

Do not use any old project/product name anywhere in:
- UI text
- file names
- docs
- comments
- prompts
- branding
- route labels

Only mention old names if inspecting legacy code for migration later.

---

## Registration and Login Rule

The public `/sign-up` flow is for members only. Every user who signs up through this route must become a `member`.

Coach registration must use a separate future route and must not share the public member sign-up flow.

Member authentication should use phone number + password. Do not require email for member registration because some Thai users may not have or regularly use email.

If a signed-in member opens the app again and still has an active session, they should pass through to the app without being asked to log in again.

---

## Current Build Mode

We are building a **3-day presentable frontend prototype**.

This is not production yet.

Main goal:
- Make the product look premium, modern, friendly, and believable.
- Use mock data only.
- Build a clean frontend foundation that can later become production.

Do not build full backend systems during prototype work.

---

## Tech Direction

Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Clean reusable components
- Mock data separated from UI
- Future-production-friendly structure

Preferred folders:
- src/app
- src/components
- src/components/layout
- src/components/ui
- src/components/cards
- src/components/dashboard
- src/components/community
- src/components/coach
- src/data
- src/types
- src/lib

---

## Design Direction

Healthy Journey must feel like a premium wellness SaaS.

Use:
- soft cream
- warm white
- sage
- beige
- soft gold
- muted coral
- calm blue
- charcoal

Avoid:
- ugly hard green
- Bootstrap admin look
- generic dashboard UI
- cramped spacing
- flat boring cards

UI should be:
- friendly
- modern
- premium
- warm
- clean
- Thai-friendly
- image-led where useful

Use rounded cards, soft shadows, generous spacing, and clear visual hierarchy.

---

## Coach Members Theme Lock

The `/coach/members/*` pages are visually locked.

Do not change any colors, card colors, chart colors, badges, buttons, borders, shadows, backgrounds, typography theme, spacing theme, or overall visual theme on `/coach/members/*` unless the project owner explicitly asks to unlock and change this page.

Before changing any visual/theme detail on `/coach/members/*`, Codex must ask for confirmation twice and receive clear approval both times.

This lock includes:
- `src/components/coach/MemberDetailPage.tsx`
- Any data, component, style, or layout change that would visually affect `/coach/members/may`
- Any data, component, style, or layout change that would visually affect `/coach/members/prae`
- Any future route under `/coach/members/*`

Content-only fixes that do not affect color/theme may still be discussed, but Codex must be careful not to alter the locked visual direction.

---

## Prototype Scope

Prioritize these pages:

1. Landing / Home
2. Member Dashboard
3. Healthy Journey Community
4. Coach Dashboard
5. Coach Member Detail

Optional only if time remains:
- Team Admin mock page
- Super Admin mock page

---

## Mock Data Rule

Use mock data only during the prototype.

Keep mock data in files such as:
- src/data/mockMembers.ts
- src/data/mockPosts.ts
- src/data/mockRooms.ts
- src/data/mockInsights.ts
- src/data/mockTeam.ts

Do not hardcode large mock objects directly inside page components.

Keep types in src/types.

The mock layer should be easy to replace with Supabase later.

---

## Hard Do-Not-Build Rules

During prototype work, do not add:

- Supabase
- database schema
- RLS
- authentication
- payment
- Stripe
- leanos integration
- real AI API calls
- upload functionality
- realtime chat
- notification system
- production permission logic
- broad backend architecture

AI insight should be mock data only.

---

## AI Policy for Prototype

AI is a coach assistant, not a member-facing bot.

Do not show nutrition analysis publicly in the community feed.

Mock AI insight may appear only in:
- Coach Dashboard
- Coach Member Detail

The coach must review any suggested message before sending.

Do not create automatic AI-to-member messaging.

## Healthy Journey — Canonical Member Detail Layout Rule

1. All member detail pages must use the same canonical layout.
   Do not create different page structures for different members.
2. Prae, May, and all future members must share the same section order:
   - Member Header
   - Today Health Summary
   - Coach Today Plan
   - Homework and Consistency
   - Template Message
   - Follow-up Alert / Coach Note at the bottom
3. Member status must not change the main page layout.
   These are data states only, not separate page designs.
4. Missed homework / urgent follow-up / risk status must not be shown as the main hero at the top of the page.
   These alerts belong at the bottom in the Follow-up Alert / Coach Note section.
5. Status is used to help the coach decide which template message to send.
   Status must not redesign or reorder the page.
6. If a member has no recent meal homework, keep the Today Health Summary section in the same position and show an empty/missing-data state inside that same section.
7. Do not create a separate `May layout` or `Prae layout`.
   Use one Member Detail layout with different data states.
8. Template Message section remains template-based only.
   AI must not generate, rewrite, draft, regenerate, or suggest member-facing messages.

## Healthy Journey — AI Token Policy / Message Template Rule

If live AI token usage is ever enabled, it is allowed only for analyzing member meal/homework images.

1. AI token usage is allowed only for analyzing meal photos submitted by members as homework.
2. AI analysis must be triggered manually by Coach/Admin after 18:00 only.
3. AI must run at most once per member per day.
4. If a member did not submit a meal homework photo, AI must not run for that member.
5. All submitted meal photos must be queued for the coach to review; analysis happens later in one evening batch, not immediately on upload.
6. AI must not be used for member-facing message writing.
   AI is forbidden from:
   - generating messages to members
   - rewriting messages to members
   - drafting messages to members
   - regenerating messages to members
   - suggesting new wording for messages to members
7. Messages sent to members must come only from:
   - default system templates
   - preset messages
   - rule-based messages
   - templates created or customized by Admin/Coach
8. Admin can add, edit, remove, or customize message templates later.
9. Coach/Admin is responsible for choosing what message should be sent to each member each day.
10. AI must not decide what message to send to a member.
11. Coach/Admin must review and send messages manually.
12. Any Thai message that starts with `สวัสดี` must always include `ค่ะ` immediately after it.
   Correct example: `สวัสดีค่ะคุณแพร`
   Incorrect example: `สวัสดีคุณแพร`
13. The system must stay lean:
   Do not spend AI tokens on any task outside meal-photo analysis unless the project owner explicitly changes this policy later.

No AI-generated member messages.

---

## Coding Rules

Work one task at a time.

Member and coach themes must be different. Only the font system should be shared between them.

After every change, explicitly tell the user which page or route they should check to verify the result.

Before editing:
- Inspect only the smallest relevant files.
- Do not scan the whole repo unless explicitly asked.
- Do not refactor unrelated code.
- Do not touch files outside the requested scope.

After editing:
- Run build/lint/typecheck if available.
- Report only:
  1. Files changed
  2. What changed
  3. Build/lint/typecheck result
  4. Any blocker

Keep responses concise.

---

## Token Efficiency Rules

Use low-token behavior by default.

Avoid:
- long explanations
- broad repo inspection
- unnecessary file reads
- rewriting files that do not need changes
- implementing multiple features in one task
- speculative architecture work

Prefer:
- small patches
- narrow scope
- clear file list
- minimal output

---

## Git Workflow

Recommended workflow:

1. Check current state.
2. Make one narrow change.
3. Run build/lint/typecheck if available.
4. Report result.
5. Stop and wait for approval.

Do not continue to the next feature automatically.

Use checkpoint commits after meaningful milestones.

---

## Presentation Priority

For the 3-day prototype, presentation quality matters more than backend completeness.

Prioritize:
- polished UI
- clear demo flow
- believable dashboards
- premium visual design
- smooth navigation
- clean mock data

Do not sacrifice UI quality by trying to build production backend too early.

