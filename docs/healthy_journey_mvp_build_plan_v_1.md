# Healthy Journey — MVP Build Plan v1

## 1. Purpose

This document defines the recommended MVP build order for Healthy Journey.

The goal is to avoid broad rewrites, prevent permission/security mistakes, control AI cost, and give Codex/CC a safe phased implementation path.

Do not ask Codex/CC to build everything at once.

## 2. Core Build Principle

Healthy Journey has become a multi-team SaaS with roles, permissions, community rooms, coach hierarchy, member access periods, AI-assisted coaching, private chat, and manual subscription controls.

Because of this, the build must be phased.

Every phase should follow:

```text
git status clean
→ narrow AI task
→ inspect changed files
→ build/lint
→ browser test
→ commit checkpoint
```

## 3. Tool Usage Rules

### 3.1 Codex

Use Codex for:

```text
- narrow code changes
- bug fixes
- file inspection
- small refactors
- tests
- build/lint errors
- SQL helper creation
- git status / commit checkpoint help
```

Codex prompt should be narrow.

Example:

```text
Inspect only these files. Do not edit yet. Report the smallest safe implementation plan.
```

### 3.2 Claude Code / CC

Use CC for:

```text
- larger architecture reading
- implementation planning
- broader codebase understanding
- careful multi-file implementation when needed
```

But still keep scope tight.

### 3.3 Never Let Both Edit Same Files Together

Do not let Codex and CC edit the same file at the same time.

One task should have one editing owner.

The other tool may review, but should not edit concurrently.

## 4. Before Any New Coding

First, inspect current project state.

Recommended command:

```bash
cd herbacoach
git status --short
git log --oneline -5
```

If the folder/project is renamed later, update path accordingly.

Do not start editing if there are unknown uncommitted changes.

## 5. Naming Migration Warning

The official product name is now:

```text
Healthy Journey
```

Do not use the old product name in new documents, prompts, UI, pricing, or code naming recommendations.

However, existing legacy code/folders may still physically contain the old name.

Handle name migration carefully as a separate task.

Do not combine name migration with database/RLS/community feature changes.

## 6. Build Phases Overview

Recommended MVP phases:

```text
Phase 0: Project audit and document placement
Phase 1: Naming cleanup / project language cleanup
Phase 2: Team/workspace foundation
Phase 3: Roles and profile model
Phase 4: Coach hierarchy + invite links/QR
Phase 5: Member onboarding + approval + 30-day access
Phase 6: Room model + room permissions
Phase 7: Healthy Journey community rooms
Phase 8: Member dashboard
Phase 9: Coach dashboard basics
Phase 10: AI daily analysis workflow
Phase 11: Private chat
Phase 12: Team Admin dashboard
Phase 13: Super Admin dashboard + manual subscriptions
Phase 14: Usage counters + pricing plan limits
Phase 15: Hardening, RLS review, tests, polish
```

## 7. Phase 0 — Project Audit and Document Placement

### Goal

Understand current repo state and add the new documentation files as source of truth.

### Tasks

```text
- Check git status
- Check current project structure
- Check existing docs
- Add Healthy Journey docs into project docs folder
- Do not change runtime behavior yet
```

### Files likely involved

```text
docs/PRD.md
docs/ROLES_AND_PERMISSIONS.md
docs/AI_POLICY_AND_COST.md
docs/COMMUNITY_ARCHITECTURE.md
docs/DASHBOARD_SPEC.md
docs/DATABASE_REQUIREMENTS.md
docs/SUBSCRIPTION_AND_PRICING.md
docs/MVP_BUILD_PLAN.md
```

### Done When

```text
- docs exist in repo
- git status reviewed
- docs committed
```

## 8. Phase 1 — Naming Cleanup / Project Language Cleanup

### Goal

Update user-facing text and new docs to use Healthy Journey.

### Warning

Do not rename folders, database tables, environment variables, or package names blindly.

Do not combine with schema/RLS work.

### Tasks

```text
- Search for old product name in UI text
- Replace user-facing old name with Healthy Journey
- Keep legacy technical names temporarily if renaming them could break app
- Document remaining legacy technical references
```

### Done When

```text
- UI/docs no longer use old product name
- app still builds
- no broad file rename unless approved
```

## 9. Phase 2 — Team / Workspace Foundation

### Goal

Add the foundation for multi-team separation.

### Key Requirement

Most major records need `team_id` or must be connected to a team-scoped record.

### Tasks

```text
- Inspect current schema
- Plan teams/workspaces table
- Add team_id where needed in small migrations
- Add seed/test team if needed
- Update queries to respect team_id
- Do not touch unrelated UI yet
```

### Security Warning

This phase affects RLS/security. Use read-only diagnostics first.

### Done When

```text
- team records exist
- users can be scoped to a team
- existing app still works for one team
- no cross-team leakage in basic tests
```

## 10. Phase 3 — Roles and Profile Model

### Goal

Support role/subrole structure.

### Required roles

```text
super_admin
team_admin
coach
member
```

### Required subtypes/labels

```text
coach_type: coach / trainee_coach
member_customer_status: member / customer_member
```

### Tasks

```text
- Inspect current profiles table
- Add missing role/subrole fields carefully
- Update auth/profile creation flow
- Add permission helpers
- Keep UI simple first
```

### Done When

```text
- each user has role and team scope
- coach/member labels can be stored
- member customer label remains private
```

## 11. Phase 4 — Coach Hierarchy + Invite Links/QR

### Goal

Support coach ownership and coach-specific member registration.

### Tasks

```text
- Add parent_coach_id or hierarchy table
- Add coach invite code/link model
- Generate unique invite code per coach/approved trainee coach
- Store QR code data or generate QR from invite URL
- Ensure invite registration sets team_id and owner_coach_id
```

### Done When

```text
- coach has unique signup link
- approved trainee coach can have own link
- member signup through link assigns correct team and owner coach
```

## 12. Phase 5 — Member Onboarding + Approval + 30-Day Access

### Goal

Member must request access and be approved by coach before entering Healthy Journey.

### Tasks

```text
- Build onboarding fields: contact, goal, age/weight/height
- Build initial health assessment questionnaire
- Store pending member request
- Coach sees pending cards
- Coach approves/rejects
- Approval starts 30-day access
- Rejection does not permanently block member
```

### Done When

```text
- member cannot enter Healthy Journey before approval
- approval starts access period
- expired member loses access to everything
- renewed member regains previous data
```

## 13. Phase 6 — Room Model + Room Permissions

### Goal

Replace hardcoded room logic with team-scoped room model and permissions.

### Tasks

```text
- Create rooms table/concept
- Create room permissions
- Support read/post/comment/manage permissions
- Seed standard rooms per team
- Ensure room visibility respects team_id and member access
```

### Standard rooms

```text
Food Homework Room
Exercise Area rooms
Results / Progress Room
Knowledge Room
Coach-only rooms
```

### Done When

```text
- rooms are team-scoped
- permissions are role-based
- members cannot see coach-only rooms
- expired members cannot see rooms
```

## 14. Phase 7 — Healthy Journey Community Rooms

### Goal

Build usable public/team community rooms.

### Tasks

```text
- Food homework posts/comments
- Exercise homework posts/comments
- Results/progress posts
- Knowledge read-only rooms
- Coach-only rooms
- Basic moderation: hide/remove post/comment
```

### Done When

```text
- active members can post in allowed rooms
- members can see public posts in own team
- members cannot see other teams
- members cannot open full profiles of others
- results room posts publish immediately
```

## 15. Phase 8 — Member Dashboard

### Goal

Create member dashboard aligned with Healthy Journey v1.

### Required actions

```text
Submit Food Homework
Submit Exercise Homework
Submit Weekly Progress
View My Progress
Enter Healthy Journey
Talk to Coach
```

### Tasks

```text
- Add coach display
- Add dashboard action cards
- Add progress visual sections
- Add expiration handling
- Do not show private AI analysis automatically
```

### Done When

```text
- active member can use dashboard
- expired member cannot access dashboard
- progress is visual, not raw tables
- Talk to Coach routes to responsible coach
```

## 16. Phase 9 — Coach Dashboard Basics

### Goal

Create the daily coach operating dashboard.

### Tasks

```text
- Pending member request cards
- Member priority cards
- Member detail page
- Membership controls
- Basic coach alerts/status
- Saved insight display area
```

### Card colors

```text
red = urgent
yellow = needs follow-up
blue = new member
green = normal
```

### Done When

```text
- coach sees only allowed members
- member cards sorted by priority
- member detail shows history/graphs
- coach can approve/renew/end membership
```

## 17. Phase 10 — AI Daily Analysis Workflow

### Goal

Add controlled, coach-triggered daily food analysis.

### Tasks

```text
- Create AI daily insight table
- Add Analyze Today button
- Select eligible members under coach responsibility
- Include only members who submitted food today
- Skip already analyzed members
- Analyze one member’s full food day per AI call
- Save results
- Show results only in coach dashboard
- Add suggested message draft
```

### Critical Rules

```text
- no AI on page render
- no AI on every post
- no AI public comments
- no AI direct member messaging
- save and reuse results
```

### Done When

```text
- coach can run analysis manually
- results save to database
- member does not see private AI fields
- dashboard uses saved results
```

## 18. Phase 11 — Private Chat

### Goal

Build in-app private chat between member and responsible coach.

### Tasks

```text
- Create private chat model
- Member can message responsible coach
- Coach can message responsible members
- Suggested AI draft can be sent by coach manually
- Fallback routing when owner coach inactive
```

### Done When

```text
- member cannot DM other members
- chat is private
- route follows responsible coach logic
- AI never sends automatically
```

## 19. Phase 12 — Team Admin Dashboard

### Goal

Give Team Admin control over own team without cross-team visibility.

### Tasks

```text
- Team overview
- Coach/member summary
- Team analytics
- Room request form
- Team subscription status display if allowed
```

### Done When

```text
- Team Admin sees own team only
- Team Admin cannot see other teams
- Team Admin can request rooms
```

## 20. Phase 13 — Super Admin Dashboard + Manual Subscriptions

### Goal

Give Super Admin platform-level control.

### Tasks

```text
- All teams overview
- Manual subscription status update
- Set/extend current_period_end
- Grace/suspend/close controls
- Room request approval queue
- Copyable renewal reminder templates
```

### Done When

```text
- Super Admin can manage all teams
- subscription status controls access
- payment remains external via leanos/Stripe QR
- no webhook required in v1
```

## 21. Phase 14 — Usage Counters + Pricing Plan Limits

### Goal

Prepare for pricing/AI cost control.

### Tasks

```text
- Track AI member-days by team/month
- Track reanalysis count
- Add plan/limit display
- Show usage to Super Admin
- Optional manual overage notes
```

### Done When

```text
- AI usage visible by team
- usage can be compared against plan allowance
- no unlimited untracked AI
```

## 22. Phase 15 — Hardening, RLS Review, Tests, Polish

### Goal

Make the MVP safer and more reliable.

### Tasks

```text
- RLS/security review
- cross-team leakage tests
- expired member access tests
- inactive coach fallback tests
- AI privacy tests
- dashboard UI polish
- mobile responsive check
- performance review
```

### Done When

```text
- no known cross-team leakage
- member privacy rules pass
- AI private fields not visible publicly
- dashboards usable on mobile
- build/lint clean
```

## 23. Suggested First Codex Prompt

Use this before any implementation:

```text
You are working on the Healthy Journey project.
Do not edit files yet.
Inspect the current repository structure and report:
1. current git status
2. existing docs files
3. existing database/schema files
4. existing auth/profile/role logic
5. existing community/post/dashboard files
6. any remaining legacy product-name references
7. the safest first implementation step

Keep the report concise.
Do not change any files.
```

## 24. Suggested First Implementation Task

After inspection, the first safe implementation task is usually:

```text
Add the Healthy Journey documentation files into the repo under /docs and commit them.
```

Do not start schema/RLS changes until the docs are committed and the current codebase is inspected.

## 25. Do Not Do These Early

Avoid doing these before foundation is ready:

```text
- rewrite all database schema in one pass
- rewrite all dashboards at once
- add AI automation before permissions are clear
- add private chat before owner/responsible coach logic
- add Stripe/leano automation in v1
- rename technical folders/packages without checking impact
- change RLS and UI in the same task
- use AI calls inside dashboard render
```

## 26. MVP Definition

Healthy Journey MVP should be considered ready when:

```text
- teams are separated
- roles work
- members can register through coach links
- coaches can approve members
- active members can use Healthy Journey rooms
- expired members are blocked
- coaches can see member cards/detail
- AI analysis runs only when coach triggers it
- private insights stay private
- private chat works between member and responsible coach
- Team Admin manages own team only
- Super Admin manages teams/subscriptions manually
```

## 27. Final Recommendation

Move slowly and checkpoint often.

This product touches health data, private coaching data, team business data, AI cost, and multi-team permissions.

A slow, phased build is faster than fixing a broken broad rewrite later.

