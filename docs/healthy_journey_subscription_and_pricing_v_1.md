# Healthy Journey — Subscription and Pricing v1

## 1. Purpose

This document defines the recommended subscription model, setup fee, plan limits, AI usage limits, payment workflow, renewal workflow, and pricing rules for Healthy Journey.

This file is intended to be a product/business source of truth inside the project repository. It should guide future UI, database, Super Admin controls, plan limits, and pricing communication.

## 2. Core Pricing Strategy

Healthy Journey should be sold as a team-based SaaS subscription, not as a simple per-coach app.

The buyer is usually the team leader / Team Admin who wants a system to run their own Healthy Journey workspace.

Recommended positioning:

```text
Healthy Journey is a team health coaching system that helps Team Admins and coaches manage members, run an active community, track progress, and give better private coaching guidance.
```

Do not position the product as only:

```text
- a food-photo app
- a calorie-counting app
- a LINE group replacement
- a simple community board
```

## 3. Recommended Revenue Model

Use:

```text
1. One-time setup fee
2. Monthly team subscription
3. Optional add-ons / overage later
4. Annual plan discount option
```

Do not build separate coach-level subscriptions in v1 unless the business model changes later.

## 3.1 Coach Service Tiers

Healthy Journey may offer two coach service tiers under the same team subscription framework:

```text
1. Premium tier
   - AI analyzes member meal/homework photos
   - AI generates nutrition graphs and coach-only insights
   - AI output is for coach review only

2. Standard tier
   - members submit homework photos
   - the coach reviews the photos manually
   - no deep AI nutrition analysis is shown
```

These tiers must differ by feature access only.
They must not create different member-detail page layouts or different member message rules.

Member-facing messages must remain template-based only in both tiers.
AI must not generate, rewrite, draft, regenerate, or suggest member-facing messages.

## 4. Why Team Subscription First

Team-level pricing is recommended because:

```text
- each Team Admin gets a separate Healthy Journey workspace
- team sizes vary
- the system creates value for the whole team, not only one coach
- easier to sell as a business tool
- easier to manage through Super Admin
- avoids tiny fragmented payments from individual coaches
- gives enough margin for support, hosting, AI cost, and development
```

## 5. Payment System Direction

Healthy Journey v1 should not build a full payment system inside the app.

The user already has a separate subscription/payment system called `leanos`, which handles Stripe QR code payments.

Recommended v1 flow:

```text
Team Admin pays through leanos / Stripe QR
→ Super Admin confirms payment externally
→ Super Admin manually updates subscription status/date in Healthy Journey
```

Do not build automatic Stripe/leano webhook sync in v1 unless explicitly re-approved.

## 6. Recommended Plans

Start with 3 main plans and one custom plan:

```text
Starter Team
Growth Team
Leader Team
Enterprise
```

Growth Team should be the main plan to sell.

Starter should exist for small teams but should not be over-promoted.

## 7. Plan Summary

| Plan | Monthly Price | Setup Fee | Target Customer |
|---|---:|---:|---|
| Starter Team | 990 THB/month | 4,900 THB | Small/pilot teams |
| Growth Team | 1,990 THB/month | 9,900 THB | Serious growing teams |
| Leader Team | 3,990 THB/month | 19,900 THB | Large team leaders |
| Enterprise | Custom | From 39,900 THB | Very large/custom teams |

## 8. Starter Team

Recommended price:

```text
990 THB/month
Setup fee: 4,900 THB
```

Suggested limits:

```text
- up to 3 coaches/trainee coaches total
- up to 50 active members
- 1 team workspace
- standard Healthy Journey rooms
- basic coach dashboard
- basic member dashboard
- AI analysis allowance: 300 member-days/month
```

Best for:

```text
- pilot teams
- small coaching groups
- early testing
- team leaders who want to try before scaling
```

## 9. Growth Team

Recommended price:

```text
1,990 THB/month
Setup fee: 9,900 THB
```

Suggested limits:

```text
- up to 10 coaches/trainee coaches total
- up to 200 active members
- 1 team workspace
- standard Healthy Journey rooms
- coach dashboard
- member dashboard
- Team Admin dashboard
- room request ability
- team/member/customer summary
- AI analysis allowance: 1,200 member-days/month
```

Best for:

```text
- serious Team Admins
- growing health coaching teams
- teams with multiple coaches
- main recommended plan
```

## 10. Leader Team

Recommended price:

```text
3,990 THB/month
Setup fee: 19,900 THB
```

Suggested limits:

```text
- up to 30 coaches/trainee coaches total
- up to 700 active members
- 1 team workspace
- standard Healthy Journey rooms
- advanced team dashboard
- downline/team summary analytics
- room request ability
- priority onboarding/support
- AI analysis allowance: 4,000 member-days/month
```

Best for:

```text
- large team leaders
- established health coaching organizations
- teams with many coaches and members
```

## 11. Enterprise

Recommended price:

```text
Custom monthly price
Setup fee starts from 39,900 THB
```

Use for:

```text
- very large teams
- custom setup
- special training/onboarding
- larger AI usage limits
- special reporting requirements
- custom support needs
```

Enterprise should not be quoted automatically without reviewing scope.

## 12. Setup Fee Strategy

Setup fee is important because Healthy Journey requires team setup, onboarding, room configuration, training, and support.

Do not position setup fee as only “account opening fee.”

Position it as:

```text
team setup + Healthy Journey system configuration + onboarding + initial training
```

## 13. Setup Fee Includes

### Starter Setup — 4,900 THB

Includes:

```text
- create Team Workspace
- configure standard Healthy Journey rooms
- configure Coach Zone 3 rooms
- add Team Admin
- help setup up to 3 coaches/trainee coaches
- one basic onboarding/training session
```

### Growth Setup — 9,900 THB

Includes:

```text
- everything in Starter Setup
- help setup up to 10 coaches/trainee coaches
- configure team templates
- setup basic scripts/follow-up structure
- Team Admin + coach leader training
- help plan member onboarding flow
```

### Leader Setup — 19,900 THB

Includes:

```text
- everything in Growth Setup
- help setup up to 30 coaches/trainee coaches
- support team hierarchy setup
- 2 training/onboarding sessions
- launch planning support
- priority onboarding
```

### Enterprise Setup — from 39,900 THB

Includes custom onboarding based on scope.

## 14. Active Member Definition

An active member should mean:

```text
A member whose Healthy Journey access is currently active and not expired/ended/removed.
```

Recommended active member rule:

```text
member_access_status = active
current date/time is before membership_end_at
```

Do not count expired members as active members for plan limits.

## 15. AI Member-Day Definition

A member-day means:

```text
1 member analyzed by AI for 1 day of food submissions = 1 member-day
```

Examples:

```text
30 members analyzed once per day for 30 days = 900 member-days
100 members analyzed once per day for 30 days = 3,000 member-days
```

Member-day is the recommended unit for AI usage limits and add-ons.

## 16. AI Usage Allowance

Suggested monthly allowance:

```text
Starter Team: 300 member-days/month
Growth Team: 1,200 member-days/month
Leader Team: 4,000 member-days/month
Enterprise: custom
```

This protects margin and prevents uncontrolled token/API cost.

## 17. AI Fair Use Policy

Healthy Journey should not allow unlimited AI usage without tracking.

Rules:

```text
- AI analysis is coach-triggered.
- AI does not run automatically on every post.
- AI does not run on dashboard render.
- AI analyzes one member’s full food day at a time.
- Already-analyzed days should not be analyzed again unless coach explicitly requests re-analysis.
- Usage should be tracked by team/month.
```

If a team exceeds allowance, options include:

```text
- sell AI add-on
- temporarily allow Super Admin override
- warn Super Admin
- stop further analysis until next cycle
```

## 18. Recommended Add-Ons / Overage

Use add-ons later when needed. Do not overbuild billing automation in v1.

Suggested add-ons:

```text
Extra coach seat: +99 THB / coach / month
Extra active members: +199 THB / 50 active members / month
Extra AI analysis: +199 THB / 500 member-days
Additional onboarding/training session: custom or 1,500–3,000 THB/session
Custom room/template setup: custom quote
```

These prices can be adjusted after real usage and cost data is known.

## 19. Annual Plan

Recommended annual offer:

```text
Pay 10 months, use 12 months
```

This improves cash flow and reduces monthly renewal friction.

Example:

```text
Growth Team monthly = 1,990 THB
Annual = 19,900 THB instead of 23,880 THB
```

Setup fee is still separate unless used as a launch offer.

## 20. Launch Offer

For early customers, discount setup fee or include extra onboarding rather than deeply discounting monthly subscription.

Recommended launch offers:

### Founder Team Offer

```text
Setup 4,900 THB
Get Growth Team for first month
Then 1,990 THB/month
Limited to first 10 teams
```

### Launch Partner Offer

```text
Setup 9,900 THB
First 30 days included
Then 1,990 THB/month
```

Avoid free-for-all usage. Teams that pay setup are more likely to take onboarding seriously.

## 21. Team Subscription Statuses

Healthy Journey should store team subscription status manually in v1.

Statuses:

```text
active
grace_period
expired
suspended
closed
```

## 22. Grace Period Rules

If a Team Admin does not renew:

```text
- team enters grace period
- team can still use the system fully during grace period
- Super Admin decides when to remind
- Super Admin decides whether/when to suspend or close
- Team Admin/coaches cannot close the whole team themselves
```

Recommended grace period duration can be decided later, but a common starting point is:

```text
7–14 days
```

Do not hard-code final grace period until business decision is confirmed.

## 23. Renewal Reminder Workflow

v1 should not send renewal reminders automatically.

Instead:

```text
Super Admin sees team nearing expiration / in grace period
→ Super Admin clicks copy reminder template
→ Super Admin sends manually through external channel
```

Templates needed:

```text
1. polite reminder before expiration
2. reminder during grace period
3. final reminder before Super Admin considers suspension/closure
```

## 24. Manual Subscription Management

Super Admin dashboard should allow:

```text
- set team subscription status
- set/extend current_period_end
- mark grace_period
- suspend team
- close team
- reactivate team
- add internal notes
```

Payment confirmation happens outside Healthy Journey through leanos/Stripe QR.

## 25. Plan Limit Enforcement

Plan limits should eventually control:

```text
- max coaches/trainee coaches
- max active members
- AI member-day allowance
- room request limits if needed
- video/content limits if needed
```

In early v1, some limits may be displayed/manual rather than fully automated, but the database should be designed to support enforcement.

## 26. Room Control and Pricing

Team Admins should not be allowed to create unlimited rooms freely.

Recommended v1:

```text
Team Admin submits room request
→ Super Admin reviews
→ Super Admin approves/creates or rejects
```

This prevents:

```text
- too many rooms
- confusing UX
- messy team structure
- higher support burden
```

Room limits can become part of pricing later.

## 27. Video Hosting Cost Direction

MVP/testing:

```text
Use YouTube Unlisted
```

Real launch:

```text
Consider Vimeo for premium/private video delivery
```

Scale later:

```text
Consider Cloudflare Stream or Mux if platform-level video hosting is needed
```

Do not store large videos directly on Vercel/app server.

## 28. What Not To Build in v1

Do not build unless explicitly re-approved:

```text
- full Stripe/leano webhook automation
- automatic invoice system inside Healthy Journey
- per-coach individual subscriptions
- fully automated overage billing
- unlimited AI usage
- automatic external renewal messages
- complex enterprise contract management
```

## 29. Recommended Database Concepts

Pricing/subscription features likely need:

```text
plans
plan_limits
team_subscriptions
usage_counters
subscription_notes
room_requests
```

Possible fields:

```text
team_subscriptions.team_id
team_subscriptions.plan_name
team_subscriptions.status
team_subscriptions.current_period_start
team_subscriptions.current_period_end
team_subscriptions.grace_period_started_at
team_subscriptions.manually_updated_by_super_admin_id
usage_counters.ai_member_days_used
usage_counters.estimated_cost
```

## 30. Recommended v1 Implementation Order

Do not build all pricing automation at once.

Recommended order:

```text
1. Add manual team subscription status fields
2. Add Super Admin ability to update status/end date
3. Add team access check based on status
4. Add copyable renewal reminder templates
5. Add AI usage counter
6. Add plan display/limits
7. Add optional add-on/overage tracking later
```

## 31. Final Recommendation

For v1, Healthy Journey should use:

```text
- team-level subscription
- one-time setup fee
- manual payment confirmation through leanos/Stripe QR
- manual Super Admin subscription updates
- AI member-day allowance per plan
- room request approval by Super Admin
