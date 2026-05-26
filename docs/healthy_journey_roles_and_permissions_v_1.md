# Healthy Journey — Roles and Permissions v1

## 1. Purpose

This document defines the role hierarchy, permission rules, visibility rules, approval rules, ownership rules, and access fallback logic for Healthy Journey.

This file is a source of truth for product planning, database design, RLS/security rules, dashboard behavior, and future Codex/CC implementation prompts.

## 2. Core Role Model

Healthy Journey uses a multi-team SaaS role model.

Main roles:

```text
Super Admin
Team Admin
Coach
Trainee Coach
Member
```

Business labels:

```text
MT (Millionaire Team) = organization-level team admin group
Organization = one business/account boundary that can contain multiple MTs
```

Member sub-status labels:

```text
Member = has not bought Herbalife yet
Customer Member = has already bought Herbalife
```

Important:

- Member/customer status is a private coaching label.
- Other members must not see this label.
- It is used for coach/Admin segmentation and follow-up only.

## 3. High-Level Hierarchy

```text
Super Admin
└── Organization
    └── MT / Team Admin
        └── Coach
            ├── Trainee Coach
            └── Member / Customer Member
```

Healthy Journey must also support deeper coach hierarchy:

```text
Team Admin
└── Coach A
    ├── Member A1
    ├── Coach B
    │   ├── Member B1
    │   └── Trainee Coach C
    │       └── Member C1
    └── Coach D
        └── Member D1
```

Healthy Journey must also support multiple MTs inside one organization.
MTs in the same organization may see shared organization-level data only if explicitly allowed by permission rules.
MTs in different organizations must not see each other.

## 4. Super Admin

Super Admin is the platform-level owner/operator.

### 4.1 Super Admin Can

- See all teams/workspaces.
- Create/manage Team Admins.
- Create/manage teams.
- View all coaches, trainee coaches, members, rooms, posts, chats, analytics, and system settings.
- Manually update team subscription status and expiration date.
- Approve/create requested rooms from Team Admins.
- Add/edit/remove rooms anywhere in the system.
- Configure room types and permissions.
- Suspend, close, or reactivate teams.
- Send/copy renewal reminder templates to Team Admins.
- Handle fallback responsibility if no responsible coach or Team Admin exists.
- Override permissions when needed for support or platform safety.
- See all organizations and all MTs across the platform.

### 4.2 Super Admin Is The Only Role That Can

- See data across all teams.
- Approve or execute cross-team member movement rules.
- Decide to close or suspend an entire team.
- Approve/create new requested rooms across teams.
- Fully manage the platform structure.

## 5. Team Admin

Team Admin is the MT / organization-level leader who subscribes to Healthy Journey for their own organization/workspace.

### 5.1 Team Admin Can

- See and manage only their own organization and the MTs/teams inside it.
- See coaches, trainee coaches, members, rooms, posts, chats, and analytics inside their own organization scope.
- Manage team-level operations inside the limits approved by Super Admin.
- See organization-level summary analytics.
- See coach/downline performance within their own organization.
- Request new rooms from Super Admin.
- Use standard rooms and features approved for the team.

### 5.2 Team Admin Cannot

- See other organizations.
- See MTs or members from other organizations.
- See chats/posts/analytics from other organizations.
- Create unlimited rooms directly without Super Admin approval.
- Close the entire organization by themselves.
- Move coaches to other organizations.
- Move members to other organizations directly.
- Override Super Admin subscription decisions.

### 5.3 Team Admin Room Requests

Team Admin can request a new room, but Super Admin must approve/create it before it becomes active.

Recommended request fields:

```text
room_name
room_type
purpose/reason
who_can_read
who_can_post
who_can_comment
requested_by_team_admin_id
team_id
status: pending / approved / rejected
```

## 6. Coach

Coach is an approved team member who can own and guide members.

### 6.1 Coach Can

- Own members who register through their invite link/QR code.
- See members they personally own.
- See members and activity under their downline based on hierarchy depth rules.
- See aggregate summary data for coaches under them, such as member count and customer-member count.
- See contact details for lower coaches only when they are directly attached/near-downline, or when the lower coach's subscription is expired/cancelled and follow-up access is required.
- Approve trainee coaches under them.
- Approve member requests to enter Healthy Journey.
- Reject member requests without needing to provide a reason.
- Renew or end member access for members under their responsibility.
- View private AI coaching insights for their members.
- View member food, water, exercise, progress, and assessment data.
- Send private in-app messages to members under their responsibility.
- Use AI-generated message drafts after reviewing them.
- Change a member’s private status label between Member and Customer Member.
- Participate in coach-only rooms if permitted.

### 6.2 Coach Cannot

- See other teams.
- Transfer themselves to another team.
- Belong to multiple teams.
- See member data if their own access/subscription status is inactive or expired.
- Send messages to members they are not responsible for, except through approved fallback/responsibility rules.
- Create rooms freely unless permitted by Super Admin/team rules.
- See hidden/private platform data outside their team hierarchy permissions.
- See full contact details for the entire downline by default.

## 7. Trainee Coach

A trainee coach must be approved by a coach.

After approval, a trainee coach has the same functional permissions as a coach.

### 7.1 Trainee Coach Lifecycle

```text
Trainee applies/registers
→ Coach reviews/approves
→ Trainee becomes approved
→ Trainee gets coach-level functional permissions
→ Trainee receives own invite link/QR code
→ Trainee can own members directly
```

### 7.2 Trainee Coach Rules

- The approving coach becomes the trainee coach’s parent/mentor in the hierarchy.
- After approval, trainee coach can use the system like a coach.
- Trainee coach belongs to exactly one team.
- Trainee coach cannot transfer teams.
- Trainee coach access is still subject to team/subscription/access rules.

## 8. Member

A member is a user who enters Healthy Journey under one owner coach.

### 8.1 Member Can

- Register through a coach-specific invite link or QR code.
- Complete onboarding and health assessment.
- Request access to Healthy Journey.
- Enter Healthy Journey after coach approval.
- Post in allowed rooms within their team.
- Submit food homework.
- Submit exercise homework.
- Submit weekly progress/results.
- View their own dashboard and progress while active.
- See public posts in their team’s Healthy Journey rooms.
- Comment/support others in rooms where comments are allowed.
- Use private chat with their responsible coach.

### 8.2 Member Cannot

- Belong to multiple teams at once.
- See other teams.
- See private AI nutrition analysis unless coach sends/approves advice.
- See other members’ private profiles.
- See which coach owns another member.
- See whether another member is a Customer Member or not.
- Direct message other members.
- Access anything after membership expires and is not renewed.
- Post in read-only/Admin-only rooms.

## 9. Customer Member Label

Customer Member means the member has already bought Herbalife.

This is not a separate public role. It is a private label/status.

### 9.1 Who Can See This Label

- Owner coach / responsible coach
- Relevant upper coach/mentor according to hierarchy visibility rules
- Team Admin where appropriate
- Super Admin

### 9.2 Who Cannot See This Label

- Other members
- Public Healthy Journey rooms
- Member profile displays seen by other members

### 9.3 Who Can Change This Label

- The owner coach / responsible coach in the normal workflow
- Super Admin can override due to full system access

## 10. Team Membership Rules

### 10.1 Coaches

- Coach belongs to exactly one team.
- Coach cannot transfer teams.
- Coach cannot belong to multiple teams.

### 10.2 Members

- Member belongs to exactly one team.
- Member cannot belong to multiple teams.
- Member can join a new team only by explicitly applying/registering again.
- Joining another team requires a new account.
- Old data stays with the old team and does not follow.

### 10.3 Cross-Team Movement

Super Admin is the only role that can control cross-team member movement rules.

However, the preferred rule is:

```text
New team = new account
Old account/data = stays with old team
```

Coaches cannot transfer teams under any condition in v1.

## 11. Invite Link and QR Code Rules

Each coach and approved trainee coach should have:

```text
unique_invite_code
unique_invite_url
unique_qr_code
```

When a member registers through a coach link/QR:

```text
member.team_id = coach.team_id
member.owner_coach_id = coach.id
member.status = pending_approval
```

Members should not register without a coach owner.

## 12. Member Approval Rules

Before entering Healthy Journey, a member must complete:

1. Basic contact information
2. Health goal
3. Age / weight / height
4. Initial health/body assessment questionnaire

Then:

```text
member submits request
→ coach sees pending request card
→ coach can view details
→ coach approves or rejects
```

If approved:

```text
membership_start = approval datetime
membership_end = approval datetime + 30 days
member_access_status = active
```

If rejected:

```text
member_access_status = rejected/not_approved
member can apply again later
reason is not required
```

## 13. Member Access and Expiration

### 13.1 Active Member

Active member can:

- Access dashboard.
- Access Healthy Journey rooms.
- Submit homework.
- View own progress.
- Use private chat.

### 13.2 Expired Member

Expired member cannot access anything.

They cannot:

- Access dashboard.
- View old progress.
- View Healthy Journey.
- Submit homework.
- Use private chat.

They should see a clear message asking them to contact their coach.

### 13.3 Renewal

If renewed/reactivated:

- Member regains access to previous data.
- Member history remains intact.
- New 30-day access period starts from coach approval/renewal date.

### 13.4 Who Can End/Renew Member Access

- Responsible coach
- Team Admin where appropriate
- Super Admin

Member expiration status should not be public.

## 14. Coach Access and Fallback Responsibility

Coach access may become inactive/expired.

If a coach loses access:

```text
coach cannot see member data
coach cannot send private messages
coach cannot approve renewals
coach cannot manage members
```

But members under that coach should not automatically lose their own remaining access.

Responsibility fallback:

```text
Original owner coach active
→ owner coach is responsible

Original owner coach inactive/expired
→ next active upper coach/mentor in same team becomes responsible

No active upper coach/mentor
→ Team Admin becomes responsible

No suitable Team Admin/responsible person
→ Super Admin handles it
```

When the original owner coach becomes active again:

```text
responsibility and chat routing return automatically to original owner coach
```

Important:

Do not permanently change `owner_coach_id` for temporary fallback.

Use logic like:

```text
owner_coach_id = original owner
responsible_coach_id = currently effective responsible person
```

## 15. Coach Hierarchy Visibility

Higher-level coaches/mentors should have visibility based on hierarchy depth.

### 15.1 Direct Team

For direct downline/team:

- Can see member lists.
- Can see more detailed information.
- Can support and guide direct coaches.

### 15.2 Deeper Downline

For deeper levels:

- Show primarily aggregate/summary data.
- Example: number of Customer Members vs Members.
- Avoid exposing full private data unnecessarily.

This balances team management with privacy.

## 16. Public Healthy Journey Visibility

Within the same team/workspace:

- Members can see public room posts from all members in that team.
- Food homework room should be lively and shared.
- Results/progress room should show shared progress posts for motivation.

Members must not see:

- Other members’ full private profiles.
- Coach ownership labels on posts.
- Customer Member status.
- Private AI nutrition analysis.
- Private coach notes.
- Private chat messages.

## 17. Private Chat Permissions

Private chat is in-app and two-way.

Rules:

- Member chats with owner/responsible coach only.
- Coach chats only with members under responsibility.
- If owner coach loses access, chat routes to fallback responsible coach/admin.
- If owner coach returns, chat routes back automatically.
- Members cannot DM other members.
- AI cannot send messages automatically.
- AI-generated message drafts require coach approval/send action.

## 18. Room Permissions

Rooms must separate:

```text
who_can_read
who_can_post
who_can_comment
```

Permissions should be configurable by role.

Example patterns:

### 18.1 Food Homework Room

```text
read: members/coaches/team admin/admin in same team
post: members/coaches/admin depending on setting
comment: members/coaches/admin depending on setting
```

### 18.2 Knowledge Room

```text
read: all active users in team
post: Admin only by default
comment: disabled or Admin-configurable
```

### 18.3 Exercise Teaching Room

```text
read: all active members/coaches in team
post: Admin only
comment: disabled
```

### 18.4 Coach-Only Room

```text
read: Admin + Coach + approved Trainee Coach
post/comment: configured by Admin
member access: none
```

## 19. Room Creation Permissions

### 19.1 Super Admin

Can create/add/manage any room anywhere.

### 19.2 Team Admin

Can request new rooms.

Recommended v1:

```text
Team Admin submits request
→ Super Admin reviews
→ Super Admin approves/creates or rejects
```

Team Admin should not create unlimited active rooms directly in v1.

### 19.3 Coach and Lower Roles

Cannot create rooms unless permissions change later.

## 20. AI Permissions and Restrictions

AI is not a public actor.

AI must never:

- Post in rooms.
- Comment in rooms.
- Send messages directly to members.
- Display corrective nutrition advice publicly.
- Show private analysis to members automatically.

AI can only provide private intelligence to coaches/Admin.

Coach/Admin decides what to send to members.

## 21. Subscription Permissions

### 21.1 Team Subscription

Team subscription controls whether a team can operate.

During grace period:

- Team can still use the system fully.
- Super Admin decides when to send reminder.
- Super Admin decides whether to suspend/close later.

### 21.2 Team Closure/Suspension

Only Super Admin can suspend or close a team.

Team Admins/coaches cannot close an entire team.

### 21.3 Renewal Reminder

In v1:

- No automatic email/LINE/Messenger sending.
- Super Admin gets copyable renewal message templates.
- Super Admin manually sends through external channel.

## 22. Dashboard Permission Summary

### 22.1 Member Dashboard

Member sees:

- Own progress.
- Own active status if relevant.
- Own coach name.
- Allowed rooms.
- Own homework/history while active.

Member does not see:

- Private AI analysis unless coach sends advice.
- Other member profiles.
- Other teams.
- Coach-only rooms.

### 22.2 Coach Dashboard

Coach sees:

- Own members.
- Responsible fallback members if applicable.
- Pending member requests.
- Member priority cards.
- AI insights for responsible members.
- Private chat for responsible members.
- Direct downline details based on hierarchy rules.

Coach does not see:

- Other teams.
- Members outside permission scope.
- Data after coach access expires.

### 22.3 Team Admin Dashboard

Team Admin sees:

- Own team summary.
- Coaches and members in own team.
- Team-level analytics.
- Subscription/grace indicators for own team if allowed.
- Room request tools.

Team Admin does not see:

- Other teams.
- Super Admin platform controls.

### 22.4 Super Admin Dashboard

Super Admin sees everything and controls platform-level operations.

## 23. Security and RLS Notes

Any implementation must treat the following as security-critical:

```text
team_id
owner_coach_id
parent_coach_id
responsible_coach logic
room permissions
member active/expired status
subscription/team status
private chat participants
AI private analysis visibility
```

Before making database/RLS changes:

- Use narrow scoped tasks.
- Run read-only diagnostics first.
- Do not mix schema/RLS/security changes with UI changes.
- Do not let Codex/CC broadly refactor permission logic without explicit approval.

## 24. Out of Scope for v1

Do not build unless re-approved:

- Cross-team coach transfer.
- Member belonging to multiple teams.
- Public coach ownership on member posts.
- Public customer/member status.
- Automatic AI messaging.
- Automatic external LINE/Messenger/email sending.
- Unlimited Team Admin room creation.
- Team-specific coach rooms by downline.

## 25. Recommended Data Concepts

These are not final schema, but important concepts for database planning:

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
posts
comments
private_chats
private_messages
ai_daily_member_insights
team_subscriptions
room_requests
```

Key fields likely needed:

```text
team_id
role
coach_type
member_status_label
owner_coach_id
parent_coach_id
approved_by_coach_id
approval_status
access_status
membership_start_at
membership_end_at
subscription_status
current_period_end
```

## 26. Implementation Warning

Do not start coding this full permission model in one task.

Build in phases:

1. Team/workspace foundation
2. Role/subrole foundation
3. Coach/member ownership
4. Member onboarding/approval
5. Room permissions
6. Private chat permissions
7. Coach hierarchy visibility
8. Subscription/fallback logic

Each phase should have tests and a git checkpoint before moving forward.
