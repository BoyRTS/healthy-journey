# Healthy Journey — Dashboard Spec v1

## 1. Purpose

This document defines the dashboard requirements for each user type in Healthy Journey:

```text
Member Dashboard
Coach Dashboard
Team Admin Dashboard
Super Admin Dashboard
```

The dashboard system must support multi-team separation, role-based visibility, coaching workflows, AI-assisted coaching, member progress tracking, subscription control, and room/community access.

This file is a source of truth for UI planning, product flow, database requirements, permissions, and future Codex/CC implementation prompts.

## 2. Core Dashboard Principles

Healthy Journey dashboards should be:

```text
- clear
- practical
- role-specific
- visually premium
- low-token / database-driven
- not overloaded with raw data
- built for daily coach workflow
- safe for member privacy
```

Do not design one generic dashboard for everyone.

Each role needs different information and actions.

## 3. Global Dashboard Rules

### 3.1 Team Separation

Every dashboard must respect `team_id`.

Users can only see data inside their team unless they are Super Admin.

### 3.2 Subscription / Access Control

Dashboards must respect access status:

```text
Active member → can access member dashboard
Expired member → cannot access dashboard/history/rooms/chat
Active coach → can access coach dashboard
Inactive/expired coach → cannot see member data
Team in grace period → team still works fully
Suspended/closed team → access controlled by Super Admin decision
```

### 3.3 AI Cost Rule

Dashboards must not call AI during page render.

Dashboards should use:

```text
- saved AI insights
- database fields
- rule-based calculations
- cached/previous analysis results
```

Never call AI just because a dashboard page loads.

### 3.4 Visual Design Rule

Dashboards should not feel like raw database tables.

Use:

```text
- cards
- soft colors
- visual progress charts
- circular or semi-circular gauges
- clean section grouping
- clear call-to-action buttons
```

### 3.5 Canonical Member Detail Layout Rule

All member detail pages must use the same canonical layout.
Do not create different page structures for different members.

Prae, May, and all future members must share the same section order:

```text
1. Member Header
2. Today Health Summary
3. Coach Today Plan
4. Homework and Consistency
5. Template Message
6. Follow-up Alert / Coach Note at the bottom
```

Member status must not change the main page layout.

These are data states only, not separate page designs.

Examples of status states that must not redesign the page:

```text
- Active member
- Missed homework
- Low protein
- Low water
- Needs follow-up
- New member
```

Missed homework / urgent follow-up / risk status must not be shown as the main hero at the top of the page.
These alerts belong at the bottom in the Follow-up Alert / Coach Note section.

If a member has no recent meal homework, keep the Today Health Summary section in the same position and show an empty or missing-data state inside that same section.

Do not create a separate `May layout` or `Prae layout`.
Use one Member Detail layout with different data states.

Template Message section remains template-based only.
AI must not generate, rewrite, draft, regenerate, or suggest member-facing messages.

## 4. Member Dashboard

## 4.1 Purpose

The Member Dashboard helps members take daily action, enter Healthy Journey rooms, see their own progress, and contact their coach.

It should feel encouraging, simple, and not overwhelming.

## 4.2 Member Dashboard Main Actions

Member dashboard should include these primary actions:

```text
1. Submit Food Homework
2. Submit Exercise Homework
3. Submit Weekly Progress / Results
4. View My Progress
5. Enter Healthy Journey
6. Talk to Coach
```

Suggested UI labels:

```text
ส่งการบ้านอาหาร
ส่งการบ้านออกกำลังกาย
ส่งผลลัพธ์ประจำสัปดาห์
ผลลัพธ์ของฉัน
เข้า Healthy Journey
พูดคุยกับโค้ช
```

## 4.3 Coach Display

Member should clearly see their assigned coach.

Example:

```text
โค้ชของคุณ: [Coach Name]
```

If the original owner coach is inactive and responsibility has fallen back, the display should show the currently responsible coach according to product decision.

Important:

- The “Talk to Coach” button routes only to the owner/effective responsible coach.
- Members cannot choose another coach.
- Members cannot DM other members.

## 4.4 Member Progress View

Member progress must be visual, not raw data-heavy.

Recommended visual sections:

```text
- weight trend graph
- body measurement trend graph
- waist/hips/arms/thighs progress
- protein per day graph
- water intake per day graph
- exercise frequency per week
- homework consistency / streak
- before/after photo gallery
```

## 4.5 Member Food Data Visibility

Members can see their own historical progress, but today’s AI insight should not be shown automatically before the coach sends/approves advice.

Member should not automatically see:

```text
- today’s AI food criticism
- today’s calories/protein judgment before coach advice
- meal quality score
- risk flags
- coach-only recommendation
```

Members may see coach-sent advice through private chat.

## 4.6 Member Room Access

Active members can access allowed rooms inside their team’s Healthy Journey.

Member can access:

```text
- Food Homework Room
- Exercise Area
- Results / Progress Room
- Knowledge Rooms they are allowed to read
```

Member cannot access:

```text
- Coach-only rooms
- Other teams’ rooms
- Admin dashboards
- Coach dashboards
```

## 4.7 Expired Member Dashboard

If member access is expired and not renewed:

- They cannot see dashboard.
- They cannot see own progress history.
- They cannot access Healthy Journey rooms.
- They cannot chat.

Show a clear message:

```text
สมาชิกภาพของคุณหมดอายุแล้ว
กรุณาติดต่อโค้ชผู้ดูแลเพื่อดำเนินการต่ออายุ
```

Do not show private data until access is renewed.

## 5. Coach Dashboard

## 5.1 Purpose

Coach Dashboard is the daily operating center for coaches.

It should help coaches quickly know:

```text
- who needs attention
- who submitted today
- who needs follow-up
- who is new
- who is doing well
- what advice to send
- who is waiting for approval
```

Coach Dashboard must save time for coaches with many members.

## 5.2 Coach Dashboard Main Sections

Recommended sections:

```text
1. Pending Member Requests
2. Analyze Today Button / AI Analysis Status
3. Member Priority Cards
4. Private Message / Follow-up Area
5. Coach Alerts
6. Team/Downline Summary if applicable
7. Coach-only Rooms Access
```

## 5.3 Pending Member Requests

Coach should see member requests waiting for approval.

Card should show:

```text
- name
- health goal
- age / weight / height
- pending status
- view details button
- approve button
- reject button
```

Approval rules:

```text
approve → starts 30-day access period
reject → member can apply again later
reject reason → not required
```

## 5.4 Analyze Today Workflow

Coach dashboard should include an explicit button:

```text
วิเคราะห์วันนี้
```

When clicked:

```text
- find members under coach’s current responsibility
- include only members who submitted food today
- skip members with no food submissions
- skip members already analyzed today unless re-analysis is requested
- analyze each eligible member once for the full day
- save AI results to database
- update member cards/insights
```

Dashboard must show status such as:

```text
ยังไม่ได้วิเคราะห์วันนี้
มีสมาชิก 8 คนรอวิเคราะห์
วิเคราะห์แล้ววันนี้
วิเคราะห์บางส่วนแล้ว
```

## 5.5 Member Priority Cards

Coach dashboard should show member cards sorted by priority.

Sort order:

```text
1. Red
2. Yellow
3. Blue
4. Green
```

Color meanings:

```text
Red = urgent follow-up / concerning pattern
Yellow = needs follow-up / early risk
Blue = new member / recently started
Green = normal / good consistency
```

Color style should be premium and soft, not harsh.

Suggested design direction:

```text
Green = soft sage / wellness green
Yellow = warm amber / soft gold
Red = soft coral / muted rose
Blue = calm sky / soft blue
Background = warm white / cream
```

## 5.6 Member Card Content

Each member card should show concise information:

```text
- member name
- status color
- active/expired status if relevant
- days remaining in membership
- latest submission status
- latest AI insight summary if analyzed
- protein/water/exercise quick indicators if available
- button: view details
- button: send message
```

Do not overload the card with full history.

## 5.7 Coach Member Detail Page

Clicking a member card opens a detailed member view.

Top section should show:

```text
- latest AI insight
- priority status
- suggested message draft
- send private message button
```

Then show member data:

```text
- food history by day
- saved AI food analysis history
- water intake history
- exercise history
- weekly progress/results
- weight trend
- measurement trend
- before/after photos
- initial body assessment
- membership status and dates
- private notes if added later
```

## 5.8 Visual Data in Coach Member Detail

Coach should see visual summaries, not only raw rows.

Recommended visuals:

```text
- semi-circle gauge for protein target
- circular gauge for water intake
- progress graph for weight
- progress graph for waist/body measurements
- consistency chart
- exercise frequency chart
- weekly progress cards
```

## 5.9 Suggested Message Draft

After AI analysis, member detail should show suggested message text.

Rules:

```text
- AI draft only
- coach must review before sending
- coach can edit if editing feature exists
- AI must not send automatically
```

Buttons:

```text
คัดลอกข้อความ
ส่งข้อความหาสมาชิก
แก้ไขก่อนส่ง (optional)
```

## 5.10 Private Message Action

The “send message” action should open/send through in-app private chat.

Rules:

- Message goes only to that member.
- It does not post publicly.
- AI cannot send automatically.
- Coach initiates the send.

## 5.11 Member Access Controls

Coach should have controls for members under responsibility:

```text
- approve access
- renew access
- end membership
- view expiration date
- view days remaining
```

Ending membership should require confirmation.

Expired status should be private.

## 5.12 Coach Visibility Scope

Coach sees:

```text
- own members
- fallback responsibility members
- direct team/downline data according to permission rules
```

Coach does not see:

```text
- other teams
- members outside hierarchy/responsibility
- member data if coach access is inactive/expired
```

## 6. Team Admin Dashboard

## 6.1 Purpose

Team Admin Dashboard helps a team leader manage their own Healthy Journey workspace and team performance.

Team Admin sees only their own team.

## 6.2 Team Admin Main Sections

Recommended sections:

```text
1. Team Overview
2. Coaches / Trainee Coaches
3. Members Summary
4. Healthy Journey Rooms
5. Room Requests
6. Subscription Status
7. Team Analytics
8. Coach-only Area Access
```

## 6.3 Team Overview

Show key team metrics:

```text
- active members
- expired members
- pending member requests
- active coaches
- trainee coaches pending/approved
- food posts today
- exercise posts today
- progress posts this week
- AI member-days used this month
```

## 6.4 Coach and Team Visibility

Team Admin can see own team only.

Team Admin can see:

```text
- coaches in team
- trainee coaches in team
- members in team
- rooms in team
- analytics in team
```

Team Admin cannot see other teams.

## 6.5 Member/Customer Label Summary

Team Admin and appropriate upper coaches should see private aggregate counts:

```text
- how many Members have not bought Herbalife yet
- how many Customer Members have already bought Herbalife
```

This should be private analytics, not public ranking.

## 6.6 Room Requests

Team Admin should be able to request new rooms.

Request form fields:

```text
- room name
- room type
- purpose/reason
- who can read
- who can post
- who can comment
```

Request status:

```text
pending
approved
rejected
```

Super Admin approves/creates the room.

Team Admin should not create unlimited active rooms directly in v1.

## 6.7 Subscription Status

Team Admin may see their team subscription status depending on business decision.

Potential display:

```text
active
grace period
expired
suspended
closed
current period end
```

During grace period, team can still use the system fully.

Super Admin decides when to send reminders or close/suspend.

## 7. Super Admin Dashboard

## 7.1 Purpose

Super Admin Dashboard is the platform control center.

Super Admin controls all teams, subscriptions, rooms, requests, and platform-level configuration.

## 7.2 Super Admin Main Sections

Recommended sections:

```text
1. All Teams Overview
2. Team Subscription Management
3. Team Admin Management
4. Room Request Queue
5. Platform Room Templates
6. Usage / AI Cost Monitoring
7. Team Health / Activity Analytics
8. Renewal Reminder Templates
9. Support / Override Tools
```

## 7.3 All Teams Overview

Show every team with summary metrics:

```text
- team name
- Team Admin
- subscription status
- current period end
- grace period status
- active members
- active coaches
- AI usage this month
- room request count
- latest activity
```

## 7.4 Team Subscription Management

Super Admin can manually update:

```text
- subscription status
- subscription expiration date
- grace period status
- suspended/closed status
```

Payment is confirmed externally through leanos / Stripe QR.

Healthy Journey v1 does not need automatic Stripe webhook integration.

## 7.5 Renewal Reminder Templates

Super Admin should have copyable templates:

```text
1. polite reminder before expiration
2. reminder during grace period
3. final reminder before suspension/closure consideration
```

v1 does not send automatically.

Super Admin copies and sends manually through desired external channel.

## 7.6 Room Request Queue

Super Admin sees room requests from Team Admins.

Actions:

```text
- view request
- approve/create room
- reject request
- edit details before approval if needed
```

## 7.7 Usage / AI Cost Monitoring

Super Admin should see AI usage by team.

Recommended metrics:

```text
- AI member-days used this month
- re-analysis count
- estimated token usage
- estimated cost
- plan allowance
- overage risk
```

This protects margin and prevents uncontrolled AI costs.

## 7.8 Platform Controls

Super Admin can:

```text
- manage teams
- manage Team Admins
- manage room templates
- manage platform-level settings
- override permissions if needed
- suspend/close/reactivate teams
```

## 8. Dashboard Data Rules

## 8.1 Data Should Be Saved and Reused

Dashboards should read from database.

Do not calculate expensive or AI-based insights repeatedly.

## 8.2 Daily AI Insight

Daily AI analysis should be saved in a table such as:

```text
ai_daily_member_insights
```

Dashboards use saved insight.

## 8.3 Graph Data

Graphs should use saved historical records:

```text
meals / daily_food_logs
water_logs
exercise_logs
progress_measurements
member_access_periods
ai_daily_member_insights
```

## 9. Notifications and Alerts in Dashboard

v1 should include dashboard-based notifications, not external sending by default.

Examples:

```text
- pending member requests
- members needing analysis today
- members requiring follow-up
- expired/expiring members
- room requests pending Super Admin approval
- teams in grace period
```

Avoid building email/LINE/Messenger integration in v1 unless explicitly approved later.

## 10. Visual Style Direction

Healthy Journey should feel:

```text
- warm
- premium
- wellness-focused
- calm
- clean
- supportive
```

Avoid:

```text
- harsh admin table-only UI
- ugly bright default colors
- medical-clinic coldness
- gamified casino look
- cluttered dashboards
```

## 11. v1 Must-Have Dashboard Features

### Member Dashboard

```text
- action buttons for food/exercise/progress
- own progress visual section
- coach display
- talk to coach button
- Healthy Journey access
- expiration handling
```

### Coach Dashboard

```text
- pending member requests
- Analyze Today button
- member priority cards
- member detail page
- saved AI insight display
- suggested message draft
- private message button
- member access controls
```

### Team Admin Dashboard

```text
- team overview
- coach/member summary
- room request form
- own team analytics
- subscription status display
```

### Super Admin Dashboard

```text
- all teams overview
- subscription manual management
- room request approval
- AI usage monitoring
- renewal reminder copy templates
```

## 12. v1 Should Not Include

Do not build in v1 unless explicitly re-approved:

```text
- automatic external LINE/Messenger/email messages
- AI running on dashboard render
- public AI comments
- member-to-member private chat
- cross-team dashboards for Team Admins
- unlimited Team Admin room creation
- coach transfer between teams
- complex real-time analytics if simple database refresh is enough
```

## 13. Implementation Warning

Do not build all dashboards at once.

Recommended build order:

```text
1. Member dashboard access/status cleanup
2. Coach dashboard member card structure
3. Coach member detail page
4. Pending member request cards
5. Analyze Today button shell and saved result display
6. Team Admin overview
7. Room request form
8. Super Admin teams overview
9. Manual subscription controls
10. AI usage monitoring
```

Each step should be scoped, tested, and committed before moving to the next.
