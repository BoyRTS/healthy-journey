# Healthy Journey — Database Requirements v1

## 1. Purpose

This document defines the database requirements for Healthy Journey before writing or changing schema/RLS.

This is not the final SQL schema. It is a product-to-database requirements document that explains what data concepts, relationships, visibility rules, and security constraints the database must support.

Use this file before asking Codex/CC to design migrations, RLS policies, or refactor the existing database.

## 2. Core Database Principles

Healthy Journey must be designed as a multi-team SaaS.

The database must enforce:

```text
- team/workspace separation
- role-based permissions
- member ownership by exactly one coach
- coach hierarchy
- member access periods
- private AI analysis visibility
- room-level permissions
- private chat routing
- subscription status controls
```

Do not design this as one global community without `team_id`.

For MT/organization-based selling, the database must also support `organization_id` so one organization can contain multiple MTs while still preventing cross-organization leakage.

## 3. Most Important Rule: team_id Everywhere

Almost every major table must include `team_id` or be connected to a record that includes `team_id`.

This prevents cross-team data leakage.

If the product uses MT/organization grouping, organization-scoped tables should also include `organization_id` or connect to a parent record that includes it.

Tables likely needing `team_id`:

```text
profiles
coach_profiles
member_profiles
rooms
posts
comments
private_chats
private_messages
member_access_periods
ai_daily_member_insights
meal/food records
exercise records
progress records
room_requests
team_subscriptions
usage_counters
```

Super Admin is the only role that can see across all teams.

Team Admin, Coach, Trainee Coach, and Member must be scoped to their own team.

If organization grouping is enabled:

```text
Super Admin -> can see all organizations and all MTs
Organization / MT Admin -> can see only their own organization and its MTs/teams
Coach -> can see only their own team/downline within the same organization
Member -> can see only their own data
```

For coach hierarchy visibility:

```text
- upper coaches may see aggregate summaries of lower coaches, such as member count and customer-member count
- contact details are restricted by default
- contact details may be visible only for directly attached/near-downline coaches
- contact details may also be visible when the lower coach's subscription is expired/cancelled and follow-up is required
```

## 4. Recommended Core Tables / Concepts

The exact table names can change later, but the system needs these concepts.

```text
teams
profiles
coach_profiles
member_profiles
coach_hierarchy
coach_invites
member_access_periods
rooms
room_permissions
room_requests
posts
comments
post_media
food_submissions
exercise_submissions
progress_submissions
water_logs
private_chats
private_messages
ai_daily_member_insights
team_subscriptions
usage_counters
moderation_actions
questionnaires
questionnaire_responses
lesson_videos
```

## 5. Teams

Teams/workspaces represent each separate Healthy Journey customer/team.

Required concept:

```text
teams
- id
- organization_id
- name
- status
- created_at
- updated_at
- created_by_super_admin_id
```

Possible statuses:

```text
active
grace_period
suspended
closed
```

Rules:

- Each Team Admin belongs to one team.
- Each coach belongs to one team.
- Each member belongs to one team.
- Team Admins cannot see other teams.
- Super Admin can see all teams.

If organizations are used, a team belongs to exactly one organization and cannot move across organizations without Super Admin control.

## 6. Profiles and Roles

Profiles should support main roles and subtypes.

Required concepts:

```text
profiles
- id
- auth_user_id
- organization_id
- team_id
- role
- display_name
- phone
- line_id
- status
- created_at
- updated_at
```

Allowed main roles:

```text
super_admin
team_admin
coach
member
```

Coach subtype:

```text
coach_type = coach / trainee_coach
```

Member private customer label:

```text
member_customer_status = member / customer_member
```

Important:

- `member_customer_status` is private and must not be shown publicly.
- Trainee coach has the same functional permissions as coach after approval.
- Super Admin may not need a normal team_id, or may have special platform scope.

If an account belongs to an organization-level MT, `organization_id` must be stored alongside `team_id` so visibility can be checked at both levels.

## 7. Coach Profiles

Coach-specific information should support approval, hierarchy, subscription/access, and invite links.

Required concepts:

```text
coach_profiles
- profile_id
- team_id
- organization_id
- coach_type
- parent_coach_id
- approved_by_coach_id
- approval_status
- access_status
- invite_code
- invite_url
- qr_code_url
- created_at
- updated_at
```

Approval statuses:

```text
pending
approved
rejected
```

Access statuses:

```text
active
inactive
expired
suspended
```

Rules:

- Approved trainee coach has own invite link/QR code.
- Trainee coach belongs under the coach who approved them.
- Coach cannot transfer teams.
- Coach belongs to exactly one team.

## 8. Coach Hierarchy

The system must support coach hierarchy/downline visibility.

Options:

### Option A: parent_coach_id on coach_profiles

Simple for v1:

```text
coach_profiles.parent_coach_id
```

### Option B: separate coach_hierarchy table

More flexible:

```text
coach_hierarchy
- team_id
- coach_id
- parent_coach_id
- depth
- created_at
```

Recommendation:

Start simple, but design so recursive hierarchy queries are possible.

Rules:

- Direct downline may have detailed visibility.
- Deeper downline should show mostly aggregate data.
- Use team_id to prevent cross-team hierarchy.

## 9. Member Profiles

Member-specific information should support ownership, onboarding, health assessment, and access status.

Required concepts:

```text
member_profiles
- profile_id
- team_id
- owner_coach_id
- current_responsible_coach_id (optional cached value)
- health_goal
- age
- weight
- height
- member_customer_status
- onboarding_status
- access_status
- created_at
- updated_at
```

Important:

- Each member has exactly one owner_coach_id.
- owner_coach_id should not change casually.
- current_responsible_coach_id may be calculated instead of stored.
- Member cannot belong to multiple teams.
- If member joins another team, they must create a new account.

## 10. Owner Coach vs Responsible Coach

The database/design must distinguish:

```text
owner_coach_id = original coach owner / attribution
responsible_coach_id = current effective responsible coach
```

If owner coach is active:

```text
responsible_coach_id = owner_coach_id
```

If owner coach is inactive/expired:

```text
responsible_coach_id = next active upper coach in same team
```

If no active upper coach:

```text
responsible_coach_id = Team Admin or Super Admin fallback
```

When owner coach becomes active again:

```text
responsibility returns automatically to owner_coach_id
```

Implementation options:

```text
Option A: calculate responsible coach dynamically
Option B: cache current_responsible_coach_id and update on status changes
```

Recommendation:

For correctness, preserve owner_coach_id and compute responsible access carefully. If caching, ensure it updates correctly when coach status changes.

## 11. Coach Invites

Each coach/approved trainee coach should have a unique invite link and QR code.

Required concepts:

```text
coach_invites
- id
- team_id
- coach_id
- invite_code
- invite_url
- qr_code_url
- is_active
- created_at
- updated_at
```

Rules:

- New member registration through invite link sets team_id and owner_coach_id.
- Members should not register without a coach owner in normal flow.

## 12. Member Access Periods

Member access is 30 days from coach approval.

Required concepts:

```text
member_access_periods
- id
- team_id
- member_id
- owner_coach_id
- approved_by_profile_id
- start_at
- end_at
- status
- created_at
- updated_at
```

Statuses:

```text
pending
active
expired
renewed
ended
rejected
```

Rules:

- 30-day period starts from coach approval date/time.
- Expired member cannot access anything.
- Renewed member regains access to existing data.
- Expired status is visible only to responsible coach/Admin roles.

## 13. Onboarding and Health Assessment

Before approval, member must submit:

```text
- name/contact info
- phone
- LINE
- health goal
- age/weight/height
- initial health/body assessment questionnaire
```

Required concepts:

```text
questionnaires
questionnaire_responses
```

Possible fields:

```text
questionnaire_responses
- id
- team_id
- member_id
- questionnaire_type
- answers_json
- submitted_at
```

Questionnaire types:

```text
initial_health_assessment
exercise_level_assessment
```

Coach uses answers to approve member and choose exercise level.

## 14. Rooms

Rooms are team-scoped and permission-based.

Required concepts:

```text
rooms
- id
- team_id
- name
- room_type
- section
- status
- sort_order
- created_by_profile_id
- created_at
- updated_at
```

Room types:

```text
post_comment_room
read_only_room
video_lesson_room
homework_submission_room
results_progress_room
questionnaire_room
coach_only_room
```

Sections:

```text
food
exercise
results
knowledge
coach_only
custom
```

Rules:

- Super Admin can create/manage any room.
- Team Admin requests rooms; Super Admin approves/creates in v1.
- Coaches/members cannot create rooms in v1.

## 15. Room Permissions

Room permissions must separate read/post/comment/manage.

Required concepts:

```text
room_permissions
- id
- room_id
- team_id
- role
- can_read
- can_post
- can_comment
- can_manage
```

Rules:

- A room may allow everyone to read but only Admin to post.
- Coach-only rooms must be hidden from members.
- Permissions must respect team_id.

## 16. Room Requests

Team Admin can request new rooms.

Required concepts:

```text
room_requests
- id
- team_id
- requested_by_profile_id
- room_name
- room_type
- purpose
- proposed_permissions_json
- status
- reviewed_by_super_admin_id
- reviewed_at
- created_room_id
- created_at
```

Statuses:

```text
pending
approved
rejected
```

Rules:

- Room does not become active until Super Admin approves/creates.
- Prevent uncontrolled room creation.

## 17. Posts and Comments

Posts are team-scoped and room-scoped.

Required concepts:

```text
posts
- id
- team_id
- room_id
- author_profile_id
- post_type
- content_text
- visibility_status
- created_at
- updated_at
```

Post types:

```text
food_homework
exercise_homework
progress_result
general_post
lesson_content
announcement
```

Comments:

```text
comments
- id
- team_id
- room_id
- post_id
- author_profile_id
- content_text
- visibility_status
- created_at
- updated_at
```

Rules:

- Members can see posts only within their active team and allowed rooms.
- Members cannot see hidden/deleted content.
- Members cannot see posts from other teams.

## 18. Post Media

Photos/videos should be stored as media records linked to posts.

Required concepts:

```text
post_media
- id
- team_id
- post_id
- media_type
- storage_url
- external_url
- thumbnail_url
- metadata_json
- created_at
```

Media types:

```text
image
video
external_video
```

Video direction:

- MVP/testing: YouTube Unlisted external_url.
- Real launch: consider Vimeo.
- Do not store large videos directly on Vercel/app server.

## 19. Food Submissions

Food homework posts may need structured food data for AI analysis and charts.

Required concepts:

```text
food_submissions
- id
- team_id
- member_id
- post_id
- caption
- submitted_at
- meal_label
- created_at
```

Important:

- Use submitted_at/created_at with Bangkok date logic for daily analysis.
- Avoid relying on free-text meal_time for date logic.

## 20. AI Daily Member Insights

AI results must be saved and reused.

Required concepts:

```text
ai_daily_member_insights
- id
- team_id
- member_id
- responsible_coach_id
- analysis_date
- source_food_submission_ids
- summary
- estimated_calories
- estimated_protein
- estimated_carbs
- estimated_fat
- protein_status
- meal_quality_score
- risk_flags
- positive_notes
- coaching_recommendation
- suggested_message
- priority_status
- model_used
- token_estimate
- cost_estimate
- created_at
```

Rules:

- One analysis per member per day by default.
- Do not expose to members automatically.
- Coach dashboard can show it.
- Dashboard must not call AI again if insight already exists.

## 21. Water Logs

Water intake should support member and coach charts.

Required concepts:

```text
water_logs
- id
- team_id
- member_id
- amount_ml
- logged_date
- created_at
```

## 22. Exercise Records

Exercise posts and structured tracking should support charts.

Required concepts:

```text
exercise_submissions
- id
- team_id
- member_id
- post_id
- exercise_type
- duration_minutes
- steps
- feeling_text
- submitted_at
- created_at
```

## 23. Exercise Level Assignment

Coach assigns exercise level after questionnaire.

Required concepts:

```text
member_exercise_levels
- id
- team_id
- member_id
- assigned_level
- assigned_by_coach_id
- assigned_at
- note
```

Allowed levels:

```text
level_1
level_2
level_3
```

Rules:

- Members can view all levels.
- Recommended level appears as small badge.
- AI does not decide level in v1.

## 24. Lesson Videos

Exercise teaching rooms and knowledge rooms need lesson content.

Required concepts:

```text
lesson_videos
- id
- team_id
- room_id
- title
- description
- provider
- external_video_url
- external_video_id
- thumbnail_url
- sort_order
- created_by_profile_id
- created_at
```

Providers:

```text
youtube
vimeo
cloudflare_stream
mux
other
```

## 25. Progress / Results Submissions

Members submit weekly results/progress.

Required concepts:

```text
progress_submissions
- id
- team_id
- member_id
- post_id
- weight
- waist
- hips
- arm
- thigh
- body_scan_url
- before_after_media_ids
- feeling_text
- submitted_at
- created_at
```

Rules:

- Results room posts are public within team if member posts them.
- Private progress charts use member’s own data.
- Other members cannot open full private profile.

## 26. Private Chat

Private chat must support coach/member direct conversation.

Required concepts:

```text
private_chats
- id
- team_id
- member_id
- owner_coach_id
- current_responsible_profile_id
- status
- created_at
- updated_at
```

Messages:

```text
private_messages
- id
- team_id
- chat_id
- sender_profile_id
- receiver_profile_id
- content_text
- source_type
- created_at
- read_at
```

Source types:

```text
manual
ai_draft_sent_by_coach
system_notice
```

Rules:

- Member cannot DM other members.
- Coach can message only responsible members.
- AI cannot send messages automatically.
- If owner coach inactive, route to fallback responsible coach/Admin.
- If owner coach active again, route returns.

## 27. Team Subscriptions

Payment is external through leanos/Stripe QR in v1.

Healthy Journey stores manual subscription status.

Required concepts:

```text
team_subscriptions
- id
- team_id
- plan_name
- status
- current_period_start
- current_period_end
- grace_period_started_at
- manually_updated_by_super_admin_id
- notes
- created_at
- updated_at
```

Statuses:

```text
active
grace_period
expired
suspended
closed
```

Rules:

- Super Admin manually updates after payment confirmation.
- Team works fully during grace period.
- Only Super Admin can suspend/close a team.

## 28. Usage Counters

Need usage tracking for AI cost and plan limits.

Required concepts:

```text
usage_counters
- id
- team_id
- month
- ai_member_days_used
- ai_reanalysis_count
- estimated_tokens
- estimated_cost
- created_at
- updated_at
```

Rules:

- One member analyzed for one day = one member-day.
- Do not allow unlimited AI without tracking.

## 29. Moderation Actions

Public rooms need moderation.

Required concepts:

```text
moderation_actions
- id
- team_id
- target_type
- target_id
- action_type
- reason
- performed_by_profile_id
- created_at
```

Target types:

```text
post
comment
media
```

Action types:

```text
hide
unhide
delete
restore
```

Rules:

- Results posts publish immediately.
- Coach/Admin can hide/remove inappropriate content.

## 30. Critical RLS / Security Requirements

RLS must enforce:

```text
- users only see data in their team
- Super Admin can see all teams
- Team Admin sees only own team
- Coach sees only allowed members/hierarchy scope
- Member sees only own dashboard data and allowed public room content
- Member cannot see private AI insights
- Member cannot see private chats not involving them
- Member cannot see coach-only rooms
- Expired member cannot access anything
- Inactive/expired coach cannot see member data
```

Security-sensitive fields:

```text
team_id
role
owner_coach_id
parent_coach_id
access_status
membership_end_at
room permissions
subscription status
AI insight visibility
private chat participants
```

## 31. Migration Warning From Existing Project

If existing code/database still uses older concepts such as cohort-based visibility, be careful.

New architecture:

```text
permanent Healthy Journey community per team
member-level 30-day access period
room-based sections
team_id separation
```

Do not keep old cohort logic as the main visibility model unless intentionally migrating it.

## 32. Recommended Implementation Phases

Do not implement all database changes in one migration.

Recommended phases:

```text
Phase 1: teams + profiles + roles
Phase 2: coach hierarchy + invites + member ownership
Phase 3: member access periods + onboarding requests
Phase 4: rooms + room permissions
Phase 5: posts/comments/media
Phase 6: food/exercise/progress structured records
Phase 7: private chat
Phase 8: AI daily insights + usage counters
Phase 9: team subscriptions
Phase 10: moderation + room requests
```

Each phase should have:

```text
- schema migration
- RLS review
- seed/test data if needed
- build/lint
- browser verification
- git checkpoint
```

## 33. Do Not Do Yet Without Separate Approval

Do not implement these automatically in v1:

```text
- automatic Stripe/leano webhook sync
- automatic AI scheduled jobs
- cross-team member data transfer
- coach team transfer
- unlimited Team Admin room creation
- member-to-member DM
- public AI analysis
- complex video storage infrastructure
```

## 34. Final Database Principle

The database must protect the product’s trust.

If data from one team leaks to another team, or if members see private AI/coach data, the product fails.

Prioritize clear team separation, strict permissions, and saved AI results before adding advanced features.
