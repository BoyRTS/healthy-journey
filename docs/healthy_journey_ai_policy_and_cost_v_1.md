# Healthy Journey — AI Policy and Cost Control v1

## 1. Purpose

This document defines how AI is allowed to work inside Healthy Journey, where AI must not be used, how to minimize token/API cost, and how to keep all AI output under coach/Admin control.

This file is a source of truth for product planning, coding, API design, database design, cost control, and future Codex/CC implementation prompts.

## 2. Core AI Principle

AI in Healthy Journey is a private assistant for coaches and Admins.

AI is not a public actor.
AI is not a coach replacement.
AI must never communicate directly with members without coach/Admin action.

The coach remains the human decision-maker.

### Healthy Journey — AI Token Policy / Message Template Rule

AI token usage is allowed only for analyzing member meal/homework images.
AI analysis must be triggered manually by Coach/Admin after 18:00 only.
AI must run at most once per member per day.
If a member did not submit a meal homework photo, AI must not run for that member.
All submitted meal photos must be queued for the coach to review; analysis happens later in one evening batch, not immediately on upload.
AI is forbidden from member-facing message writing.
No AI-generated member messages.

## 3. Non-Negotiable AI Rules

AI must never:

```text
- Post publicly in any room
- Comment publicly in any room
- Send private messages directly to members by itself
- Give corrective advice directly to members automatically
- Show nutrition criticism publicly
- Expose private analysis to other members
- Run automatically on every post
- Run automatically every time a dashboard page loads
- Re-analyze the same data repeatedly without explicit action
```

AI may only provide private coaching intelligence to:

```text
- Responsible coach
- Team Admin where appropriate
- Super Admin
```

## 4. AI Output Visibility

### 4.1 Member Visibility

Members must not automatically see AI analysis.

Members should not see:

```text
- calories estimated by AI for today before coach advice
- protein/carbs/fat analysis before coach advice
- meal quality score
- protein status
- risk flags
- corrective notes
- AI concern labels
- private coaching suggestions
```

Members may later see advice only when a coach intentionally sends or approves a message.

### 4.2 Coach Visibility

Coaches may see AI analysis for members under their responsibility.

Coach dashboard may show:

```text
- latest AI insight
- food summary
- estimated calories
- estimated protein
- estimated carbs/fat if needed
- missing vegetables/fiber notes
- low protein notes
- high sugar / oily / refined carb flags
- recommended coaching direction
- selected message template
- priority color/status
```

### 4.3 Public Room Visibility

Public Healthy Journey rooms must not show AI nutrition analysis.

Public rooms show:

```text
- post author nickname/name
- photo/video/content
- caption
- time
- comments/support
```

Public rooms do not show:

```text
- calories
- protein
- carbs
- fat
- quality score
- risk flags
- AI warnings
- coach-only notes
```

## 5. When AI Should Run

AI should run only through explicit analysis workflows.

Recommended v1 workflow:

```text
Members post food during the day
→ System stores food posts/photos normally
→ Coach reviews submitted photos during the day
→ After 18:00, Coach clicks “Analyze Today”
→ System analyzes only members who submitted food today
→ Skip members with no food submissions today
→ Analyze each included member once for the whole day
→ AI produces one daily summary per member
→ Results are saved to database
→ Dashboard uses saved results only
```

## 6. When AI Should Not Run

AI should not run for:

```text
- rendering member dashboard
- rendering coach dashboard
- rendering charts/graphs
- calculating streaks
- calculating progress trends
- checking if homework was submitted
- checking if membership expired
- checking if a member is active
- sorting red/yellow/blue/green cards when rules can use saved data
- displaying old AI insights
- opening a member detail page if results already exist
- every comment or post creation
```

All of the above should be rule-based and database-driven.

## 7. Food Analysis Policy

### 7.1 Preferred Unit of Analysis

Use one AI analysis per member per day.

Do not use one AI call per photo or per meal unless explicitly required later.

Preferred:

```text
1 member + all food submissions today = 1 AI analysis
```

Avoid:

```text
1 photo = 1 AI analysis
1 meal = 1 AI analysis
open dashboard = 1 AI analysis
```

### 7.2 Why Daily Member Analysis Is Preferred

It is better because:

```text
- lower token cost
- fewer API calls
- easier for coaches to review
- better daily summary context
- avoids overwhelming coaches with per-meal noise
- easier for the coach to pick one useful preset message
```

### 7.3 Who Gets Analyzed

When coach clicks “Analyze Today” after 18:00, the system should:

```text
1. Find members under the coach’s current responsibility
2. Include only members who submitted food today
3. Skip members with no food submissions today
4. Skip members already analyzed today unless coach explicitly requests re-analysis
5. Analyze each included member once for the whole day
```

### 7.4 Re-Analysis Rule

Default behavior:

```text
Do not re-analyze a member if today’s analysis already exists.
```

Optional advanced action:

```text
Coach clicks “Re-analyze” manually
→ system may run AI again
→ old result should be replaced or versioned depending on future design
```

## 8. AI Output Fields

Recommended saved fields for daily member food insight:

```text
member_id
team_id
coach_id / responsible_coach_id
analysis_date
summary
estimated_calories
estimated_protein
estimated_carbs
estimated_fat
protein_status
meal_quality_score
risk_flags
positive_notes
coaching_recommendation
selected_message_template_id
priority_status
created_at
created_by_action
model_used
```

### 8.1 meal_quality_score

Use 1–5 scale:

```text
1 = very weak
2 = weak
3 = acceptable
4 = good
5 = strong
```

### 8.2 protein_status

Allowed values:

```text
low
moderate
good
```

### 8.3 risk_flags

Allowed values should be controlled and simple.

Suggested v1 values:

```text
low_protein
high_sugar
fried_or_oily
mostly_refined_carbs
low_fiber
sugary_drink
large_portion
unclear_photo
not_enough_food_data
```

### 8.4 priority_status

Suggested values:

```text
green = normal/good consistency
yellow = needs follow-up or early risk
red = urgent follow-up or concerning pattern
blue = new member/recently started
```

Note: blue may be calculated outside AI based on member start date.

## 9. Member Message Rule

AI is forbidden from generating, rewriting, drafting, regenerating, or suggesting member-facing messages.

Messages sent to members must come only from:

```text
- default system templates
- preset messages
- rule-based messages
- templates created or customized by Admin/Coach
```

Rules:

```text
- AI token usage is allowed only for analyzing member meal/homework images.
- Admin can add, edit, remove, or customize message templates later.
- Coach/Admin is responsible for choosing what message should be sent to each member each day.
- AI must not decide what message to send to a member.
- Coach/Admin must review and send messages manually.
- Any Thai message that starts with `สวัสดี` must always include `ค่ะ` immediately after it.
- The system must stay lean.
- Do not spend AI tokens on any task outside meal-photo analysis unless the project owner explicitly changes this policy later.
- No AI-generated member messages.
```

Correct example:

```text
สวัสดีค่ะคุณแพร
```

Incorrect example:

```text
สวัสดีคุณแพร
```

## 10. Member Dashboard and Charts

Member charts should not call AI.

All charts should use saved database data.

Examples:

```text
- weight trend
- body measurement trend
- protein per day
- water intake per day
- exercise frequency
- homework streak
- progress photos
```

If data came from AI, use the saved result already stored in the database.

Never call AI just to draw a graph.

## 11. Coach Dashboard and Member Cards

Coach dashboard should use saved data and rule-based logic whenever possible.

Member card colors should be calculated from saved fields such as:

```text
- latest AI priority_status
- missed homework count
- membership age
- last submission date
- protein_status
- meal_quality_score
- risk_flags
```

Do not call AI every time the coach dashboard opens.

Sorting should be rule-based:

```text
red first
yellow second
blue third
green last
```

## 12. Exercise Level Policy

AI should not decide exercise level in v1.

Flow:

```text
Member completes exercise assessment questionnaire
→ Coach reviews answers
→ Coach selects recommended level
→ Member sees badge for recommended level
```

AI may be considered later for summarizing questionnaire answers, but not for final decision-making in v1.

## 13. Progress / Results Policy

AI is not needed for normal progress tracking.

Do not use AI for:

```text
- weight trend
- measurement trend
- before/after gallery
- weekly progress chart
- streak count
- exercise count
```

These should be database-driven.

AI may later be used to help coaches summarize long-term patterns, but this is out of scope for v1 unless explicitly approved.

## 14. Token Cost Control Rules

### 14.1 Hard Rules

```text
- No AI API call from page render.
- No AI API call from chart render.
- No AI API call from public room post creation by default.
- No AI API call from comment creation.
- No AI API call from private chat send.
- No AI API call to generate, rewrite, draft, regenerate, or suggest member-facing messages.
- Save all AI results to database.
- Reuse saved AI results.
```

### 14.2 Batch Strategy

Use coach-triggered batch analysis:

```text
Coach clicks once
→ system processes all eligible members
→ results saved
```

This is better than many small calls throughout the day.

### 14.3 Skip Strategy

Skip AI when:

```text
- no food submitted
- already analyzed today
- image is missing/unreadable and no text exists
- user is expired/inactive
- coach/team is not allowed to run analysis
```

### 14.4 Usage Tracking

Track usage by team.

Recommended counters:

```text
team_id
month
ai_member_days_used
ai_reanalysis_count
ai_tokens_estimated
ai_cost_estimated
```

This enables plan limits and fair-use enforcement later.

## 15. Member-Day Definition

A member-day means:

```text
1 member analyzed by AI for 1 day of food submissions = 1 member-day
```

Examples:

```text
30 members analyzed once per day for 30 days = 900 member-days
100 members analyzed once per day for 30 days = 3,000 member-days
```

Member-day is the recommended pricing/usage unit for AI analysis.

## 16. Fair Use Policy Direction

Each team plan should include a monthly AI member-day allowance.

Example direction:

```text
Starter = limited AI member-days
Growth = higher allowance
Leader = much higher allowance
Enterprise = custom
```

If a team exceeds allowance:

Options:

```text
- allow paid add-on
- limit analysis until next cycle
- warn Super Admin
- allow temporary override by Super Admin
```

Do not allow unlimited AI without usage tracking.

## 17. Health and Safety Boundaries

AI suggestions should be general coaching support, not medical diagnosis.

AI should avoid:

```text
- diagnosing disease
- prescribing treatment
- making guaranteed health claims
- telling members to stop medication
- giving extreme calorie restriction advice
- encouraging shame or guilt
```

AI should suggest safe, general improvements:

```text
- add protein
- add vegetables
- drink more water
- reduce sugary drinks
- balance meals
- continue consistently
- ask coach for personalized guidance
```

If health risk appears serious, AI should recommend that the coach encourage the member to seek qualified medical advice.

## 18. AI Prompt Requirements

When asking AI to analyze food, the prompt should include only necessary context.

Useful context:

```text
member goal
age/weight/height if relevant
known restrictions from questionnaire
food submissions for the day
captions/text from member
previous body assessment summary if needed
```

Avoid sending unnecessary context:

```text
full chat history
all previous meals forever
large unneeded profile data
other members’ data
public comments not relevant to food analysis
```

## 19. Data Privacy Rules

AI analysis should only include the relevant member’s data.

Do not send:

```text
- data from other members
- unrelated private chats
- team-level private business data
- API keys
- payment data
```

## 20. Manual vs Automatic AI

v1 should prefer manual/coach-triggered AI.

Allowed:

```text
Coach clicks “Analyze Today”
Coach clicks “Re-analyze” if needed
```

Coach/Admin selects any member-facing message template manually. AI does not draft member messages.

Not allowed by default:

```text
AI analyzes every post automatically
AI messages member automatically
AI writes member-facing messages
AI comments automatically
AI runs scheduled jobs without coach/Admin action
```

Future scheduled AI can be considered later only if cost, safety, and approval flows are clear.

## 21. Recommended MVP AI Features

v1 should include only these AI features first:

1. Coach-triggered daily food analysis
2. Daily member insight saved to database
3. Priority status for coach dashboard

Do not build any AI member-message drafting or rewriting feature in v1.
Do not build extra AI features until these are stable.

## 22. Out of Scope for v1

Do not build in v1 unless explicitly re-approved:

```text
- AI public comments
- AI direct member messaging
- AI-generated member messages
- AI-generated member message drafts
- AI auto-coaching without coach approval
- AI exercise level decision
- AI weekly full report generation for every member automatically
- AI chat assistant for members
- AI analysis on every dashboard view
- AI analysis for every single photo immediately after upload
- AI-generated public leaderboard
```

## 23. Implementation Warning

Before implementing AI features:

1. Confirm database fields for saved analysis.
2. Confirm no member-facing UI exposes private fields.
3. Confirm AI is not called during page render.
4. Confirm usage counters exist or are planned.
5. Confirm coach-triggered workflow is protected by permissions.
6. Confirm duplicate same-day analysis is avoided.
7. Confirm member access/team subscription status is checked before analysis.

## 24. Recommended Build Order

AI-related build order should be:

```text
1. Store food posts without AI
2. Create daily analysis table
3. Build coach-triggered Analyze Today action
4. Analyze only eligible members
5. Save results
6. Show results only in coach dashboard
7. Add coach-selected message templates
8. Add usage counters
9. Add optional re-analysis button
```

Do not start with automatic analysis.

## 25. Final Principle

Healthy Journey should use AI to save coach time, not replace the coach.

AI should make the coach smarter, faster, and more prepared.

The member should feel cared for by a real coach, not judged by a machine.
