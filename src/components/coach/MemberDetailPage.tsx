import Image from "next/image";
import type {
  FollowUpNote,
  HomeworkActive,
  HomeworkMissed,
  MemberDetailPageData,
  PlanState,
  SummaryActive,
  SummaryMissed,
  TemplateMessage,
  WeekDay,
} from "@/types/coachMemberDetail";
import type { ReactNode } from "react";

const pageClassName = "min-h-screen bg-[#020204] text-[#E3DDF4]";
const shellClassName = "mx-auto w-full max-w-[390px] bg-[#020204]";
const stackClassName = "space-y-4 p-4 pb-8";
const sectionCardClassName =
  "rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0B0A12] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4)]";
const innerCardClassName =
  "rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#12101D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]";
const elevatedCardClassName =
  "rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#191529] shadow-[inset_0_1px_2px_rgba(0,0,0,0.22)]";
const actionPrimaryClassName =
  "group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#62D3FF] via-[#7BA8FF] to-[#A78BFA] px-5 py-3.5 text-[14px] font-medium text-white shadow-[0_4px_16px_rgba(123,168,255,0.3),0_2px_4px_rgba(123,168,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(123,168,255,0.4),0_3px_6px_rgba(123,168,255,0.3)] active:translate-y-0";
const actionSecondaryClassName =
  `${elevatedCardClassName} w-full px-4 py-3 text-[13px] font-medium text-[#E3DDF4] transition-all duration-200 hover:border-[rgba(255,255,255,0.12)] hover:bg-[#07070D]`;

export function MemberDetailPage({ data }: { data: MemberDetailPageData }) {
  const state = data.summary.kind;
  const plan = data.plan[state];

  return (
    <main className={pageClassName}>
      <div className={shellClassName}>
        <div className={stackClassName}>
          <MemberHeader member={data.member} />
          <TodayHealthSummary summary={data.summary} />
          <CoachTodayPlan plan={plan} />
          <HomeworkAndConsistency homework={data.homework} />
          <TemplateMessageSection template={data.template} />
          {data.followUp ? <FollowUpAlert note={data.followUp} /> : null}
        </div>
      </div>
    </main>
  );
}

function MemberHeader({
  member,
}: {
  member: MemberDetailPageData["member"];
}) {
  return (
    <section className={sectionCardClassName}>
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9B6BFF_0%,#A78BFA_55%,#FF6FAE_100%)] text-2xl font-medium text-white shadow-[0_4px_12px_rgba(155,107,255,0.3)]">
          {member.initial}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="mb-1.5 text-[22px] font-medium leading-tight text-[#F8F5FF]">
            {member.name}
          </h1>
          <p className="mb-2 text-[13px] leading-relaxed text-[#A49AB9]">
            Coach: {member.coachName} · เหลือ {member.daysLeft} วันใน Healthy Journey
          </p>
          <p className="mb-3 text-[13px] leading-relaxed text-[#E3DDF4]">
            โทร: {member.phone}
          </p>
          <div className="inline-flex items-center rounded-full border border-[rgba(167,139,250,0.14)] bg-[#12101D] px-3.5 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#4FD1FF] shadow-[0_0_6px_rgba(79,209,255,0.6)]" />
            <span className="text-[13px] text-[#E3DDF4]">{member.badge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TodayHealthSummary({
  summary,
}: {
  summary: SummaryActive | SummaryMissed;
}) {
  return (
    <section className={sectionCardClassName}>
      <h2 className="mb-5 text-[20px] font-medium leading-tight text-[#F8F5FF]">
        สรุปสุขภาพวันนี้
      </h2>

      {summary.kind === "active" ? (
        <ActiveSummary summary={summary} />
      ) : (
        <MissedSummary summary={summary} />
      )}
    </section>
  );
}

function ActiveSummary({ summary }: { summary: SummaryActive }) {
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(summary.energyKcal / summary.energyTarget.max, 1);
  const progress = circumference * ratio;

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className="relative flex h-[180px] w-[180px] items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#07070D] shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]" />
          <svg
            aria-hidden="true"
            className="relative z-10 block -rotate-90"
            height="180"
            viewBox="0 0 180 180"
            width="180"
          >
            <defs>
              <linearGradient
                id="energyGradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#7BA8FF" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
              <filter id="energyGlow">
                <feGaussianBlur result="blur" stdDeviation="2" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              cx="90"
              cy="90"
              fill="none"
              r={radius}
              stroke="rgba(123, 168, 255, 0.08)"
              strokeWidth="14"
            />
            <circle
              cx="90"
              cy="90"
              fill="none"
              filter="url(#energyGlow)"
              r={radius}
              stroke="url(#energyGradient)"
              strokeLinecap="round"
              strokeWidth="14"
              strokeDasharray={`${progress} ${circumference - progress}`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="mb-1.5 text-[11px] text-[#A49AB9]">
              พลังงานที่รับวันนี้
            </p>
            <p className="mb-1 text-[48px] leading-none text-[#F8F5FF]">
              {summary.energyKcal}
            </p>
            <p className="text-[13px] text-[#A49AB9]">kcal</p>
          </div>
        </div>
      </div>

      <div className="mb-7 space-y-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,111,174,0.3)] bg-[rgba(255,111,174,0.1)] px-4 py-2 text-[13px] text-[#FF6FAE]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6FAE] shadow-[0_0_6px_rgba(255,111,174,0.6)]" />
          {summary.statusLabel}
        </div>
        <p className="text-[13px] leading-relaxed text-[#B7AEE0]">
          {summary.statusNote}
        </p>
        <p className="text-[11px] leading-relaxed text-[#8D83A8]">
          {summary.burnNote}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {summary.macroCharts.map((chart) => (
          <SmallGauge key={chart.label} chart={chart} />
        ))}
      </div>

      <p className="mt-5 rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#191529] p-4 text-[13px] leading-7 text-[#E3DDF4]">
        {summary.insight}
      </p>
    </div>
  );
}

function MissedSummary({ summary }: { summary: SummaryMissed }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-[#A49AB9]">
        {summary.eyebrow}
      </p>
      <div className="mt-2 rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#12101D] p-6 text-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
        <div className="mb-4 text-5xl opacity-20">📊</div>
        <p className="text-[17px] leading-relaxed text-[#F8F5FF]">
          {summary.emptyTitle}
        </p>
        <p className="mx-auto mt-2 max-w-[280px] text-[13px] leading-relaxed text-[#A49AB9]">
          {summary.emptyDescription}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {summary.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(167,139,250,0.14)] bg-[#191529] px-3.5 py-2 text-[12px] text-[#A49AB9]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SmallGauge({ chart }: { chart: SummaryActive["macroCharts"][number] }) {
  const radius = 23;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (chart.value / 100);
  const gradientId = `gradient-${chart.label.toLowerCase()}`;

  return (
    <div className="rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#12101D] p-4 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center">
        <svg aria-hidden="true" height="56" viewBox="0 0 56 56" width="56">
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={chart.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={chart.color} stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx="28"
            cy="28"
            fill="none"
            r={radius}
            stroke="#2A2635"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="28"
            cy="28"
            fill="none"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference - progress}`}
            transform="rotate(-90 28 28)"
          />
          <text
            className="fill-white text-[13px] font-medium"
            dominantBaseline="middle"
            textAnchor="middle"
            x="28"
            y="31"
          >
            {chart.value}%
          </text>
        </svg>
      </div>
      <p className="mt-2 text-center text-[12px] font-medium text-[#E3DDF4]">
        {chart.label}
      </p>
      <p className="mt-1 text-center text-[10px] leading-4 text-[#A49AB9]">
        {chart.status}
      </p>
    </div>
  );
}

function CoachTodayPlan({ plan }: { plan: PlanState }) {
  return (
    <section className={sectionCardClassName}>
      <h2 className="mb-5 text-[20px] font-medium leading-tight text-[#F8F5FF]">
        {plan.title}
      </h2>

      <div className="rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#12101D] p-6 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
        <div className="mb-4 flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
              plan.eyebrow.includes("เริ่มใหม่")
                ? "border-[rgba(167,139,250,0.4)] bg-[rgba(167,139,250,0.15)] text-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.25)]"
                : "border-[rgba(79,209,255,0.4)] bg-[rgba(79,209,255,0.15)] text-[#4FD1FF] shadow-[0_0_12px_rgba(79,209,255,0.25)]"
            }`}
          >
            <span className="text-xl">{plan.eyebrow.includes("เริ่มใหม่") ? "💜" : "✅"}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-2.5 text-[17px] leading-tight text-[#F8F5FF]">
              {plan.eyebrow}
            </h3>
            <p className="text-[13px] leading-relaxed text-[#E3DDF4]">
              {plan.message}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <PrimaryActionButton>{plan.primaryAction}</PrimaryActionButton>
          <SecondaryActionButton>{plan.secondaryAction}</SecondaryActionButton>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={innerCardClassName + " p-4"}>
            <h4 className="text-[17px] font-medium leading-tight text-[#F8F5FF]">
              {plan.praiseTitle}
            </h4>
            <ul className="mt-3 space-y-1 text-[13px] leading-7 text-[#E3DDF4]">
              {plan.praiseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={innerCardClassName + " p-4"}>
            <h4 className="text-[17px] font-medium leading-tight text-[#F8F5FF]">
              {plan.improveTitle}
            </h4>
            <ul className="mt-3 space-y-1 text-[13px] leading-7 text-[#E3DDF4]">
              {plan.improveItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeworkAndConsistency({
  homework,
}: {
  homework: HomeworkActive | HomeworkMissed;
}) {
  return (
    <section className={sectionCardClassName}>
      <h2 className="mb-5 text-[20px] font-medium leading-tight text-[#F8F5FF]">
        {homework.title}
      </h2>

      <div className="rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#12101D] p-4 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
        {homework.kind === "active" ? (
          <ActiveHomework homework={homework} />
        ) : (
          <MissedHomework homework={homework} />
        )}
      </div>
    </section>
  );
}

function ActiveHomework({ homework }: { homework: HomeworkActive }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-[112px] w-[112px] shrink-0 overflow-hidden rounded-[24px] border border-[rgba(167,139,250,0.14)] bg-[#07070D]">
          <Image
            alt={homework.imageAlt}
            className="object-cover object-center"
            fill
            sizes="112px"
            src={homework.imageSrc}
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-[#A49AB9]">
            {homework.eyebrow}
          </p>
          <h3 className="mt-2 text-[17px] leading-tight text-[#F8F5FF]">
            การบ้านล่าสุด
          </h3>
          <p className="mt-1 text-[13px] text-[#A49AB9]">{homework.timeLabel}</p>
          <p className="mt-1 text-[13px] leading-7 text-[#E3DDF4]">
            {homework.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {homework.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[rgba(167,139,250,0.14)] bg-[#191529] px-3 py-1.5 text-[12px] text-[#E3DDF4]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ConsistencyRow weekDays={homework.weekDays} />
    </>
  );
}

function MissedHomework({ homework }: { homework: HomeworkMissed }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-[24px] border border-[rgba(167,139,250,0.14)] bg-[#07070D] text-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#A49AB9]">
              {homework.eyebrow}
            </p>
            <p className="mt-2 text-xs leading-5 text-[#E3DDF4]">
              {homework.emptyDescription}
            </p>
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="text-[17px] leading-tight text-[#F8F5FF]">
            {homework.emptyTitle}
          </h3>
          <p className="mt-1 text-[13px] text-[#A49AB9]">{homework.emptyDescription}</p>
          <p className="mt-1 text-[13px] leading-7 text-[#E3DDF4]">
            {homework.supportText}
          </p>
        </div>
      </div>

      <ConsistencyRow weekDays={homework.weekDays} />
    </>
  );
}

function ConsistencyRow({ weekDays }: { weekDays: readonly WeekDay[] }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-2">
      {weekDays.map((day) => (
        <div key={day.label} className="flex flex-col items-center gap-2">
          <span className="text-[11px] text-[#A49AB9]">{day.label}</span>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium ${
              day.status === "sent"
                ? "border border-[#4FD1FF] bg-[rgba(79,209,255,0.20)] text-[#4FD1FF]"
                : "border border-[rgba(167,139,250,0.14)] bg-[#0B0B12] text-[#A49AB9]"
            }`}
          >
            {day.status === "sent" ? "✓" : "·"}
          </span>
        </div>
      ))}
    </div>
  );
}

function TemplateMessageSection({ template }: { template: TemplateMessage }) {
  return (
    <section className={sectionCardClassName}>
      <h2 className="mb-2 text-[20px] font-medium leading-tight text-[#F8F5FF]">
        {template.title}
      </h2>
      <p className="mb-4 text-xs text-[#A49AB9]">{template.description}</p>

      <div className="relative mb-5 rounded-xl border border-[rgba(167,139,250,0.14)] bg-[#141120] p-6 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-[rgba(167,139,250,0.14)] bg-[#191529]/80 px-2.5 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_6px_rgba(167,139,250,0.6)]" />
          <span className="text-[10px] tracking-wide text-[#A49AB9]">Template</span>
        </div>

        <div className="pr-20">
          <p className="whitespace-pre-line text-[13px] leading-[1.7] text-[#E3DDF4]">
            {template.message}
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        <PrimaryActionButton>{template.primaryAction}</PrimaryActionButton>
        <div className="grid grid-cols-2 gap-2.5">
          {template.secondaryActions.map((action) => (
            <SecondaryActionButton key={action}>{action}</SecondaryActionButton>
          ))}
        </div>
      </div>
    </section>
  );
}

function FollowUpAlert({ note }: { note: FollowUpNote }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[rgba(255,111,174,0.25)] bg-[#0B0A12] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,111,174,0.1)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(255,111,174,0.05)] via-transparent to-[rgba(167,139,250,0.05)]" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[rgba(255,111,174,0.3)] bg-[rgba(255,111,174,0.15)] text-2xl text-[#FF6FAE] shadow-[0_0_16px_rgba(255,111,174,0.2)]">
          !
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 text-[20px] font-medium leading-tight text-[#F8F5FF]">
            {note.title}
          </h2>
          <p className="text-[13px] leading-7 text-[#E3DDF4]">{note.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[rgba(167,139,250,0.14)] bg-[#12101D] px-3 py-1.5 text-[12px] text-[#E3DDF4]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PrimaryActionButton({ children }: { children: ReactNode }) {
  return (
    <button className={actionPrimaryClassName} type="button">
      <span className="flex items-center justify-center gap-2">
        {children}
        <ArrowIcon />
      </span>
    </button>
  );
}

function SecondaryActionButton({ children }: { children: ReactNode }) {
  return (
    <button className={actionSecondaryClassName} type="button">
      {children}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        d="M13 7l5 5m0 0l-5 5m5-5H6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      />
    </svg>
  );
}
