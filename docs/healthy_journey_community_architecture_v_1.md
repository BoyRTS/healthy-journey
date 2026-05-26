# Healthy Journey — Community Architecture v1

## 1. Purpose

This document defines the Healthy Journey community structure, room architecture, room types, room permissions, team/workspace separation, and public/private visibility rules.

This file is a source of truth for product planning, UI design, database design, RLS/security rules, and future Codex/CC implementation prompts.

## 2. Core Community Concept

Healthy Journey is a permanent health community inside each team/workspace.

It is not a 30-day cohort room anymore.

The community itself stays active long-term, while each member has their own individual 30-day access period.

```text
Community = permanent per team
Member access = individual 30-day period
```

## 3. Multi-Team Community Model

Healthy Journey must be separated by team/workspace.

Each Team Admin has their own Healthy Journey community for their team.

```text
Team A
└── Healthy Journey A
    ├── Food Homework Room
    ├── Exercise Area
    ├── Results Room
    ├── Knowledge Rooms
    └── Coach-Only Rooms

Team B
└── Healthy Journey B
    ├── Food Homework Room
    ├── Exercise Area
    ├── Results Room
    ├── Knowledge Rooms
    └── Coach-Only Rooms
```

Important rules:

- Members from Team A must not see Team B rooms/posts/comments.
- Team Admin A must not see Team B data.
- Coaches belong to one team only.
- Members belong to one team only.
- Super Admin can see/manage all teams.

## 4. Community Goals

Healthy Journey rooms should create:

```text
- accountability
- daily activity
- health motivation
- social proof
- warm encouragement
- coach visibility
- member consistency
- trust before selling
```

The community should not feel like:

```text
- a strict diet punishment group
- a public calorie-judgment space
- a hard-selling product room
- a confusing chat dump
- a generic social network
```

## 5. Core Rooms in v1

Healthy Journey v1 should include these major sections:

```text
1. Food Homework Room
2. Exercise Area
3. Results / Progress Room
4. Health / Nutrition / Longevity Knowledge Room
5. Coach-Only Area
```

Admin can create additional rooms later through approved room management rules.

## 6. Room Type System

Rooms should have a configurable type.

Recommended v1 room types:

```text
post_comment_room
read_only_room
video_lesson_room
homework_submission_room
results_progress_room
questionnaire_room
coach_only_room
```

Each room type should control default behavior, but Admin/Super Admin should still be able to configure permissions.

## 7. Room Permission Model

Room permissions must separate:

```text
who_can_read
who_can_post
who_can_comment
who_can_manage
```

Example roles:

```text
Super Admin
Team Admin
Coach
Trainee Coach
Member
```

Important:

- Read permission and post permission are not the same.
- Some rooms may allow everyone to read but only Admin to post.
- Some rooms may allow members to post/comment.
- Coach-only rooms must be hidden from members.

## 8. Public vs Private Information

### 8.1 Public Inside Team Rooms

Members in the same team may see:

```text
- public posts in allowed rooms
- food homework posts
- exercise homework posts
- results/progress posts
- comments/support messages
- member nickname/name shown on posts
```

### 8.2 Not Public

Members must not see:

```text
- other members’ private profiles
- other members’ coach owner
- other members’ customer/member label
- private AI food analysis
- private coaching notes
- private chat messages
- member expiration status
- team business analytics
```

## 9. Food Homework Room

### 9.1 Purpose

The food homework room is expected to be the most active room.

It is for:

```text
- posting food/shake photos
- daily accountability
- casual health discussion
- encouragement
- soft social proof
- natural curiosity around healthy habits/products
```

### 9.2 Who Can See

All active members, coaches, Team Admin, and Super Admin within the same team can view food homework posts.

### 9.3 Who Can Post

Active members, coaches, and Admin-level users can post depending on configured room permissions.

Default v1:

```text
Members: post allowed
Coaches: post allowed
Trainee Coaches: post allowed if approved
Team Admin: post allowed
Super Admin: post/manage allowed
```

### 9.4 What Members Can Post

Members can post:

```text
- food photos
- shake photos
- meal captions
- casual notes about meals
- questions or comments related to food
```

### 9.5 Comments

Comments should be supportive and community-oriented.

Members can encourage and casually recommend things to each other.

Corrective coaching should not happen publicly.

### 9.6 AI in Food Room

AI must not:

```text
- comment publicly
- judge food publicly
- show calories publicly
- show protein/carbs/fat publicly
- show risk flags publicly
```

AI analysis goes only to the responsible coach/Admin as private coaching intelligence.

## 10. Exercise Area

Exercise Area should be a structured section with multiple subrooms.

### 10.1 Exercise Assessment Questionnaire

Type:

```text
questionnaire_room
```

Purpose:

```text
- collect exercise readiness/context
- help coach understand member fitness level
- support coach decision for recommended level
```

Rules:

- Member completes questionnaire.
- Coach reviews answers.
- Coach chooses recommended Level 1/2/3.
- AI does not decide exercise level in v1.

### 10.2 Exercise Teaching Rooms

There should be teaching rooms for:

```text
Level 1
Level 2
Level 3
```

Type:

```text
video_lesson_room / read_only_room
```

Rules:

- These rooms are content libraries.
- They contain only video clips and instructional text.
- Members cannot create posts.
- Comments should be disabled by default.
- Members can view all levels.
- Coach-recommended level appears as a small badge.

Recommended UI example:

```text
Level 1  [แนะนำสำหรับคุณ]
Level 2
Level 3
```

The badge should guide, not restrict.

### 10.3 Exercise Homework Room

Type:

```text
homework_submission_room / post_comment_room
```

Purpose:

```text
- exercise accountability
- member activity sharing
- short proof of movement
- encouragement
```

Members can post:

```text
- exercise photos
- short exercise videos
- step count
- exercise type such as walking, weight training, yoga
- duration
- feelings after exercise
```

Coaches/Admin can post:

```text
- examples
- challenges
- encouragement
- short guidance
```

Comments are allowed.

### 10.4 General Exercise Knowledge Room

Type:

```text
read_only_room
```

Rules:

- Admin-post only by default.
- Coaches, trainee coaches, and members can view.
- Members cannot post.
- Coaches cannot post unless Admin changes permissions later.

## 11. Results / Progress Room

### 11.1 Purpose

The results room exists to create:

```text
- encouragement
- proof
- motivation
- social proof
- identity reinforcement
- belief that progress is possible
```

### 11.2 Who Can See

All active members in the same team can see shared results/progress posts.

### 11.3 Who Can Post

Active members can post immediately.

No pre-approval required in v1.

Coaches/Admin can hide/remove inappropriate posts afterward.

### 11.4 What Members Can Post

Members can post:

```text
- before/after photos
- weight changes
- waist/hips/arms/thighs measurements
- body scan/scale photos
- better sleep/energy/clothes fitting better
- written reviews
- experience stories
```

### 11.5 Important Privacy Rule

Members can see what others intentionally share in the results room.

They cannot open full private profiles or view all private progress data of other members.

## 12. Health / Nutrition / Longevity Knowledge Room

Type:

```text
read_only_room
```

Purpose:

```text
- education
- trusted knowledge
- healthy habits
- nutrition guidance
- longevity concepts
- brand authority
```

Default rules:

```text
Admin can post
All active users in team can read
Members cannot post
Coaches cannot post unless permission changes later
```

This protects content quality.

## 13. Coach-Only Area

Coach-only area is for internal team/coach communication.

Members must not see these rooms.

v1 should include 3 rooms:

```text
1. Coach Announcements
2. Coach Discussion / Q&A
3. Script and Member-Care Technique Library
```

### 13.1 Coach Announcements

Purpose:

```text
- important updates
- platform/team announcements
- operating instructions
```

Default permission:

```text
read: Admin + Team Admin + Coach + approved Trainee Coach
post: Admin / Team Admin depending on configuration
comment: configurable
```

### 13.2 Coach Discussion / Q&A

Purpose:

```text
- coach questions
- member-care discussion
- sharing challenges
- practical support
```

Default permission:

```text
read: Admin + Team Admin + Coach + approved Trainee Coach
post/comment: Coach roles depending on configuration
member access: none
```

### 13.3 Script and Member-Care Technique Library

Purpose:

```text
- follow-up scripts
- objection handling
- coaching message examples
- best practices
```

Default permission:

```text
read: Admin + Team Admin + Coach + approved Trainee Coach
post: Admin/Team Admin/selected coach roles depending on configuration
member access: none
```

### 13.4 Out of Scope

Do not build separate coach rooms by downline/team hierarchy in v1.

Reason:

```text
- increases database complexity
- increases permission/RLS complexity
- increases notification complexity
- increases UI complexity
- not necessary for MVP
```

## 14. Admin Room Management

### 14.1 Super Admin

Super Admin can:

```text
- create rooms anywhere
- edit rooms anywhere
- remove/disable rooms anywhere
- configure room type
- configure read/post/comment/manage permissions
- approve/reject room requests
```

### 14.2 Team Admin

Team Admin should not be able to create unlimited active rooms directly in v1.

Recommended v1 flow:

```text
Team Admin requests room
→ Super Admin reviews
→ Super Admin approves/creates or rejects
```

Room request should include:

```text
team_id
requested_by
room_name
room_type
purpose
who_can_read
who_can_post
who_can_comment
status
created_at
reviewed_by
reviewed_at
```

### 14.3 Coach and Lower Roles

Coaches, trainee coaches, and members cannot create rooms in v1.

## 15. Room Moderation

Coach/Admin moderation should exist for public rooms.

Recommended moderation actions:

```text
hide post
unhide post
delete post if needed
hide comment
delete comment if needed
```

Results room posts should publish immediately, but coaches/Admin can hide/remove inappropriate content afterward.

Food and exercise rooms should also allow moderation.

## 16. Member Profile Visibility

Members cannot open full profiles of other members.

Allowed:

```text
- see post author display name/nickname
- see content the author posts publicly in rooms
- see shared results post content
```

Not allowed:

```text
- open full health profile
- view full progress charts
- view private assessments
- view coach owner
- view customer label
- view AI insight
- view private chat
```

## 17. Coach Ownership Visibility

Public posts should not show which coach owns the poster.

Do not show:

```text
ดูแลโดยโค้ช...
Coach: ...
Owner coach: ...
```

Coach ownership is private dashboard/permission data only.

## 18. Member Customer Label Visibility

The label “Member” vs “Customer Member” is private.

Do not show it in public rooms.

Visible only to:

```text
responsible coach
appropriate upper coach/mentor based on visibility rules
Team Admin where appropriate
Super Admin
```

## 19. Expired Member Access

If a member expires and is not renewed:

```text
- cannot access any room
- cannot read old posts
- cannot view own dashboard/history
- cannot post/comment
- cannot chat
```

They should see an expiration message and contact coach instruction.

## 20. Video Content Hosting

MVP/testing:

```text
Use YouTube Unlisted
Store only video URL/video ID and metadata
```

Real launch:

```text
Consider Vimeo for premium/private video delivery
```

Scale later:

```text
Consider Cloudflare Stream or Mux
```

Do not store large videos directly on Vercel/app server.

## 21. Recommended Data Concepts

Not final schema, but community architecture will likely require:

```text
teams
rooms
room_types
room_permissions
room_requests
posts
comments
post_media
questionnaires
questionnaire_responses
lesson_videos
member_progress_posts
moderation_actions
```

Important fields:

```text
team_id
room_id
room_type
visibility_status
who_can_read
who_can_post
who_can_comment
created_by
approved_by
is_hidden
is_deleted
```

## 22. v1 Must-Have Community Features

v1 should include:

```text
- Team-separated Healthy Journey community
- Food homework room
- Exercise assessment questionnaire
- Exercise teaching rooms Level 1/2/3
- Exercise homework room
- Results/progress room
- Health/nutrition/longevity knowledge room
- Coach-only area with 3 rooms
- Room permission model
- Room request flow for Team Admin
- Public post/comment basics
- Hide/remove moderation controls
```

## 23. v1 Should Not Include

Do not include in v1 unless explicitly re-approved:

```text
- cross-team rooms
- global community shared by all teams
- member-to-member DMs
- public AI comments
- public nutrition analysis
- coach ownership labels on posts
- customer label shown publicly
- team/downline-specific coach rooms
- unlimited Team Admin room creation
- complex video hosting platform
```

## 24. Implementation Warning

Community architecture touches permissions and RLS.

Do not implement all at once.

Recommended build order:

```text
1. team_id separation
2. room model
3. room permissions
4. basic food posts/comments
5. results room
6. exercise rooms
7. knowledge rooms
8. coach-only rooms
9. room request flow
10. moderation controls
```

Each step should be scoped, tested, and committed before moving to the next.

