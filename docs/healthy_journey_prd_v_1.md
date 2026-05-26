# Healthy Journey — Product Requirements Document (PRD) v1

## 1. Product Name

**Healthy Journey**

Use this English name only across product documents, UI, prompts, pricing, code naming recommendations, and future explanations.

## 2. Product Vision

Healthy Journey is a multi-team health coaching SaaS platform designed for health coaching teams, team leaders, coaches, trainee coaches, and members.

The product helps teams run a warm, active, supportive health community while giving coaches the tools to personally guide members using daily homework, progress tracking, private coaching insights, and AI-assisted food analysis.

Healthy Journey is not just a food-photo app. It is a system for running a health journey community, supporting members consistently, helping coaches manage many members efficiently, and helping teams convert health-interest members into long-term customers through ethical support, accountability, and trust.

## 3. Core Positioning

Healthy Journey should be positioned as:

> A team-based health coaching and community system that helps coaches support members, track progress, and build an active health journey community.

It should not be positioned as:

- A calorie-counting app only
- A generic social network
- A public diet challenge
- A hard-selling product platform
- A simple chat group replacement

## 4. Target Users

### 4.1 Super Admin

The platform owner/operator. Super Admin controls the entire system, all teams, subscriptions, rooms, permissions, and high-level settings.

### 4.2 Team Admin

A team leader who subscribes to Healthy Journey for their own team/workspace. Each Team Admin manages only their own team.

### 4.3 Coach

A coach inside one team. A coach can own members, approve trainee coaches, approve member access, view coach dashboard data, send private messages, and guide members.

### 4.4 Trainee Coach

A coach-in-training who must be approved by a coach. After approval, a trainee coach has the same functional permissions as a coach.

### 4.5 Member

A member who has not yet bought Herbalife. This status is a private label visible only to the responsible coach/Admin.

### 4.6 Customer Member

A member who has already bought Herbalife. This status is also a private label visible only to the responsible coach/Admin.

## 5. Role Structure

Healthy Journey has the following role hierarchy:

```text
Super Admin
└── Team Admin
    └── Coach
        ├── Trainee Coach
        └── Member / Customer Member
```

Important rules:

- Super Admin can see and manage everything.
- Team Admin can see and manage only their own team/workspace.
- Coaches belong to exactly one team.
- Members belong to exactly one team.
- Coaches cannot transfer teams.
- Members can join a new team only by creating a new account and explicitly applying/registering again.
- Old member data stays with the original team and does not follow to the new team.

## 6. Team / Workspace Model

Healthy Journey must be designed as a multi-team SaaS.

Each team has its own separate Healthy Journey community/workspace.

```text
Super Admin
├── Team A Healthy Journey
│   ├── Team Admin A
│   ├── Coaches A
│   ├── Members A
│   └── Rooms / Posts / Chats / Analytics A
│
└── Team B Healthy Journey
    ├── Team Admin B
    ├── Coaches B
    ├── Members B
    └── Rooms / Posts / Chats / Analytics B
```

Team Admins must never see data from other teams.

Cross-team visibility is reserved for Super Admin only.

## 7. Member Ownership

Each member must have exactly one primary owner coach.

Rules:

- Members register through a coach-specific invite link or QR code.
- The system automatically assigns the member to that coach.
- The member’s private chat routes to the owner coach.
- The member is not shared across multiple coaches.
- Upper-level coaches may see summary or direct-team data based on hierarchy permissions, but the real owner coach remains one person.

Recommended data concept:

```text
member.owner_coach_id
member.team_id
```

## 8. Coach Hierarchy

Healthy Journey must support a coach hierarchy similar to a downline/team structure.

Rules:

- Some coaches can be under other coaches.
- A trainee coach belongs under the coach who approved them.
- Higher-level coaches can see data based on hierarchy depth.
- Direct team visibility can be detailed.
- Deeper downline visibility should primarily be aggregate/summary data.

Recommended data concepts:

```text
coach.parent_coach_id
coach.approved_by_coach_id
coach.approval_status
coach.team_id
```

## 9. Subscription and Responsibility Fallback

### 9.1 Team Subscription

Healthy Journey v1 should use team-level subscriptions.

Payments are handled outside Healthy Journey through the existing leanos system using Stripe QR code. In v1, Super Admin manually updates team subscription status in Healthy Journey after confirming payment.

Recommended team subscription statuses:

```text
active
grace_period
expired
suspended
closed
```

### 9.2 Coach Access

If a coach loses access or subscription-related rights:

- The coach cannot see member data.
- The coach cannot chat with members.
- The coach cannot approve renewals.
- Member care falls back to the next active upper coach in the same team.
- If no upper coach exists, responsibility falls to Team Admin or Super Admin depending on the team structure.
- When the coach becomes active again, responsibility and chat routing should automatically return to the original owner coach.

Important design concept:

```text
owner_coach_id = original owner coach, preserved
responsible_coach_id = current effective responsible coach, calculated from active status/hierarchy
```

Do not permanently move owner_coach_id just because a coach temporarily loses access.

## 10. Member Access Lifecycle

Members must request access before entering Healthy Journey.

Before approval, members must complete:

1. Basic contact information
   - Name
   - Phone
   - LINE
2. Health goal
3. Age / weight / height
4. Initial health/body assessment questionnaire

After submission:

- The responsible coach sees a pending request card.
- The card shows name, health goal, age/weight/height, and pending status.
- The coach can view full details.
- The coach can approve or reject.

If approved:

- The member enters Healthy Journey.
- The 30-day access period starts from the approval date/time.

If rejected:

- The member is not permanently blocked.
- The member can apply again later.
- The coach does not need to provide a reason.

### 10.1 Member Expiration

If a member’s 30-day access expires and is not renewed:

- The member cannot access anything.
- The member cannot access dashboard, progress history, Healthy Journey, homework rooms, or private chat.
- The member should see a clear message asking them to contact their coach.

If renewed:

- The member regains access to previous data/history/progress.
- The member does not start from a blank account.

The coach dashboard must include actions such as:

- Renew member access
- End membership
- Remove/expire access

Only the responsible coach and Admin-level users should see member expiration status.

## 11. Healthy Journey Community Architecture

Healthy Journey is no longer a cohort-based 30-day group.

It is a permanent team community where members have individual 30-day access periods.

Core rooms/sections:

1. Food homework room
2. Exercise area
3. Results/progress room
4. Health/nutrition/longevity knowledge room
5. Coach-only area

Members within the same team can see public posts in their team’s Healthy Journey.

Members from different teams must not see each other’s community content.

## 12. Food Homework Room

Purpose:

- Daily food/shake photo submission
- Accountability
- Community energy
- Encouragement
- Natural social proof

Rules:

- Members can post food photos and captions.
- Members can comment/support each other.
- Everyone in the same team can see everyone’s food homework posts.
- Members cannot open full profiles of other members.
- Members do not see private AI nutrition analysis.
- AI must not comment publicly.
- Corrective coaching must happen privately through the coach.

## 13. Exercise Area

Exercise area should contain:

### 13.1 Exercise Assessment Questionnaire

Members complete a questionnaire to help determine the suitable exercise level.

The coach reviews the answers, chooses the member’s recommended level, and gives guidance.

AI does not decide the level automatically.

### 13.2 Exercise Teaching Rooms

Level 1, Level 2, and Level 3 teaching rooms.

Rules:

- Read-only content library.
- Contains video clips and instructional text only.
- Members cannot post.
- Members can view all levels.
- The coach-recommended level appears as a small badge, not a large banner.

### 13.3 Exercise Homework Room

Rules:

- Members and coaches can post short photos/videos.
- Members can post steps, exercise type, duration, and feelings after exercise.
- Comments are allowed.
- Coaches/Admin can post challenges.

### 13.4 General Exercise Knowledge Room

Rules:

- Admin-post only.
- Coaches, trainee coaches, and members can view.
- Non-Admin roles cannot post unless permissions change later.

## 14. Results / Progress Room

Purpose:

- Encouragement
- Motivation
- Social proof
- Celebration of progress

Members can post:

- Before/after photos
- Weight changes
- Body measurements
- Waist/hips/arms/thighs progress
- Body scan/scale photos
- Better sleep/energy/clothes fitting better
- Written reviews/experience stories

Rules:

- Posts publish immediately.
- No pre-approval required.
- Coaches/Admin can hide/remove inappropriate posts.
- Members can see shared results posts from others.
- Members still cannot open full private profiles of others.

## 15. Knowledge Rooms

Health, nutrition, longevity, and general exercise knowledge rooms are Admin-post only by default.

Rules:

- Admin creates and posts content.
- Coaches, trainee coaches, and members can read.
- Other roles cannot post unless the room permission settings allow it.

## 16. Room Management

### 16.1 Super Admin

Super Admin can create/manage rooms anywhere across the entire system.

### 16.2 Team Admin

Team Admins should not be allowed to create unlimited rooms freely.

Recommended v1 flow:

```text
Team Admin requests a new room
→ Super Admin reviews
→ Super Admin approves/creates or rejects
```

This prevents room overload and protects the product structure.

### 16.3 Room Types

Admin should be able to create/select room types:

- Post/comment room
- Read-only room
- Video/lesson room
- Homework submission room
- Results/progress room
- Questionnaire room

### 16.4 Room Permissions

Each room should support separate permissions for:

- Who can read/view
- Who can post/comment

Permissions should be configurable by role.

## 17. Coach-Only Area

v1 should include shared coach-only rooms, not team/downline-specific coach rooms.

Initial coach-only rooms:

1. Coach announcements
2. Coach discussion/Q&A
3. Script and member-care technique library

Rules:

- Members cannot see coach-only rooms.
- Admin, coaches, and approved trainee coaches can access depending on permission configuration.
- Team-specific coach rooms are out of scope for v1 due to complexity.

## 18. Member Dashboard

Member dashboard should include main actions:

1. Submit food homework
2. Submit exercise homework
3. Submit weekly results/progress
4. View own progress/results
5. Enter Healthy Journey
6. Talk to coach

Members should see their assigned coach clearly, for example:

```text
โค้ชของคุณ: [coach name]
```

The “Talk to coach” button routes only to the owner/effective responsible coach.

### 18.1 Member Progress View

Members should see progress visually, not as raw data tables.

Recommended visuals:

- Weight trend graph
- Body measurement trends
- Protein per day graph
- Water intake per day graph
- Homework consistency/streak
- Exercise frequency
- Before/after photo gallery

Important rule:

Today’s AI food insight should not be shown to the member until the coach sends/advises/approves a message.

## 19. Coach Dashboard

Coach dashboard should show member cards for members under the coach’s responsibility.

Member cards should be color-coded:

- Green = normal/good consistency
- Yellow = needs follow-up / early risk
- Red = urgent follow-up / concerning pattern
- Blue = new member/recently started

Cards should be visually premium, soft, and attractive.

Sorting order:

1. Red
2. Yellow
3. Blue
4. Green

Each member card/detail should include:

- Latest AI insight at the top
- Food history
- Water intake
- Exercise history
- Weekly progress/results
- Measurements and weight trends
- Body assessment data
- Private notes or coaching context if added later
- Suggested message draft from AI
- Button to send private message
- Membership renewal/expiration controls

Data should be shown with attractive charts and visual summaries such as:

- Semi-circle gauges
- Circular charts
- Progress graphs
- Consistency indicators

## 20. Private Chat

Healthy Journey v1 should include in-app private chat.

Rules:

- Coach and member can message each other.
- Chat is two-way.
- Members can chat only with their owner/effective responsible coach.
- If owner coach loses access, chat routes to the next responsible upper coach or Admin.
- If the owner coach returns to active status, routing returns automatically.
- AI may draft messages for coaches but must not send automatically.

## 21. AI Policy

AI behavior must follow strict rules.

AI must never:

- Post publicly
- Comment publicly
- Send messages directly to members
- Give member-facing advice automatically
- Expose private analysis in public rooms

AI may:

- Analyze food submissions when triggered by a coach
- Produce private insights for the responsible coach
- Suggest message drafts for the coach to review
- Help coaches prioritize members

Coach must approve/send any member-facing advice.

## 22. AI Cost Control

Healthy Journey must minimize AI/token usage.

Core rules:

- No AI call on dashboard render.
- No AI call for charts.
- No AI call for rule-based status colors if data is already available.
- No AI call for every public post.
- AI food analysis should be coach-triggered, not automatic per post.
- The preferred flow is one analysis per member per day, combining all food submissions from that day.
- Skip members who submitted no food that day.
- Skip members already analyzed that day unless coach explicitly requests re-analysis.
- Save AI results in the database and reuse them.

Recommended evening workflow:

```text
Members submit food throughout the day
→ System stores posts/photos
→ Coach clicks “Analyze Today”
→ System finds all responsible members who submitted food today
→ AI analyzes each member’s full day of food together
→ Save results
→ Dashboard updates insight/status/draft message
```

## 23. Subscription and Pricing Direction

Healthy Journey should use team-level subscription pricing.

Recommended initial packages:

- Starter Team
- Growth Team
- Leader Team
- Enterprise

Pricing and details should be maintained in a separate pricing document.

Payment flow in v1:

```text
Team pays through leanos / Stripe QR
→ Super Admin confirms payment
→ Super Admin manually extends team subscription in Healthy Journey
```

No automatic payment/webhook integration is required in v1.

## 24. Video Hosting Direction

For MVP/testing:

- Use YouTube Unlisted for video lessons.
- Store only video metadata and URLs in Healthy Journey.

For real launch:

- Consider Vimeo for a more premium/private course-video experience.

For larger scale:

- Consider Cloudflare Stream or Mux if platform-level video hosting and usage control are needed.

Do not store large video files directly on the app server/Vercel.

## 25. Out of Scope for v1

The following should not be built in v1 unless explicitly re-approved:

- Automatic LINE/Messenger/email sending
- Automatic AI posting/commenting
- Team-specific coach rooms by downline
- Automatic Stripe/leano webhook sync
- Complex video platform infrastructure
- Cross-team coach transfer
- Members belonging to multiple teams
- AI deciding exercise level automatically
- Public display of member customer status
- Public display of coach ownership on posts
- Public nutrition scoring/comments from AI

## 26. Success Criteria for v1

Healthy Journey v1 is successful if:

- Each team has its own separate Healthy Journey workspace.
- Team Admins cannot see other teams.
- Coaches can onboard and manage members.
- Members can submit food, exercise, and progress posts.
- Healthy Journey rooms are active and easy to use.
- Coaches can see member priority cards and private insights.
- AI usage is controlled and does not run unnecessarily.
- Members do not see private AI analysis unless a coach sends advice.
- Super Admin can manage teams and subscriptions manually.
- The system supports future growth without needing to rebuild the core architecture.

## 27. Recommended Next Documents

After this PRD, create the following files:

1. `ROLES_AND_PERMISSIONS.md`
2. `COMMUNITY_ARCHITECTURE.md`
3. `AI_POLICY_AND_COST.md`
4. `DASHBOARD_SPEC.md`
5. `DATABASE_REQUIREMENTS.md`
6. `SUBSCRIPTION_AND_PRICING.md`
7. `MVP_BUILD_PLAN.md`

These documents should be used as the source of truth before asking Codex/CC to modify the existing project.

