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

const pageClassName = "min-h-screen bg-[#1C1C1E] text-white";
const shellClassName = "mx-auto w-full max-w-[390px] bg-[#1C1C1E]";
const stackClassName = "space-y-4 px-3 py-2 pb-8";
const sectionCardClassName =
  "rounded-[22px] border border-[#343434] bg-[#202020] p-6 shadow-none";
const innerCardClassName =
  "rounded-[16px] border border-[#343434] bg-[#2B2B2E] shadow-none";
const elevatedCardClassName =
  "rounded-[16px] border border-[#343434] bg-[#2B2B2E] shadow-none";
const actionPrimaryClassName =
  "group inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#64FFDA] px-5 py-4 text-[14px] font-semibold text-[#121212] shadow-none transition-all duration-200 hover:bg-[#7CFFE2] active:translate-y-0";
const actionSecondaryClassName =
  "w-full rounded-[14px] border border-[#343434] bg-[#2B2B2E] px-4 py-4 text-[13px] font-semibold text-white shadow-none transition-all duration-200 hover:border-[#4A4A4A] hover:bg-[#303033]";

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
      <div className="flex items-center gap-4">
        {member.imageSrc ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[18px] border border-[#343434] bg-[#2B2B2E] shadow-none">
            <Image
              alt={member.imageAlt ?? member.name}
              className="object-cover object-center"
              fill
              sizes="64px"
              src={member.imageSrc}
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[18px] bg-[#2B2B2E] text-4xl font-medium text-[#64FFDA] shadow-none">
            {member.initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="mb-1.5 text-[22px] font-semibold leading-tight text-[#F6F3EA]">
            {member.name}
          </h1>
          <p className="mb-2 text-[13px] leading-relaxed text-[#B8B2A7]">
            Coach: {member.coachName} · เหลือ {member.daysLeft} วันใน Healthy Journey
          </p>
          <p className="mb-3 text-[13px] leading-relaxed text-[#F6F3EA]">
            โทร: {member.phone}
          </p>
          <div className="inline-flex items-center rounded-lg bg-[#332B3F] px-3 py-1">
            <span className="text-[13px] font-medium text-[#B388FF]">{member.badge}</span>
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
      <h2 className="mb-5 text-[20px] font-medium leading-tight text-[#F6F3EA]">
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
  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(summary.energyKcal / summary.energyTarget.max, 1);
  const progress = circumference * ratio;

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <div className="relative flex h-[230px] w-[230px] items-center justify-center">
          <svg
            aria-hidden="true"
            className="relative z-10 block -rotate-90"
            height="230"
            viewBox="0 0 230 230"
            width="230"
          >
            <defs>
              <linearGradient
                id="energyGradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#D9F4FF" />
                <stop offset="55%" stopColor="#A8D1E7" />
                <stop offset="100%" stopColor="#69D8FF" />
              </linearGradient>
            </defs>
            <circle
              cx="115"
              cy="115"
              fill="none"
              r={radius}
              stroke="#233845"
              strokeWidth="24"
            />
            <circle
              cx="115"
              cy="115"
              fill="none"
              r={radius}
              stroke="url(#energyGradient)"
              strokeLinecap="round"
              strokeWidth="24"
              strokeDasharray={`${progress} ${circumference - progress}`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="mb-1.5 text-[12px] font-medium text-[#A0A0A5]">
              พลังงานที่รับวันนี้
            </p>
            <p className="mb-1 text-[58px] font-bold leading-none text-[#F6F3EA]">
              {summary.energyKcal}
            </p>
            <p className="text-[16px] text-[#B8B2A7]">kcal</p>
          </div>
        </div>
      </div>

      <div className="mb-5 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF9100] bg-transparent px-4 py-2 text-[13px] font-medium text-[#FF9100]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />
          {summary.statusLabel}
        </div>
        <div className="space-y-2 text-left text-[13px] leading-relaxed">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#B8B2A7]">เป้าหมายวันนี้</span>
            <span className="font-semibold text-[#F6F3EA]">
              {summary.energyTarget.max.toLocaleString()} kcal
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#B8B2A7]">อัตราความสำเร็จเป้า</span>
            <span className="font-semibold text-[#64FFDA]">
              {Math.round(ratio * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {summary.macroCharts.map((chart) => (
          <SmallGauge key={chart.label} chart={chart} />
        ))}
      </div>

      <p className="mt-5 rounded-[16px] border border-[#343434] bg-[#2B2B2E] p-4 text-[13px] leading-7 text-white">
        {summary.insight}
      </p>
    </div>
  );
}

function MissedSummary({ summary }: { summary: SummaryMissed }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-[#B8B2A7]">
        {summary.eyebrow}
      </p>
      <div className="mt-2 rounded-[16px] border border-[#343434] bg-[#2B2B2E] p-6 text-center shadow-none">
        <div className="mb-4 text-5xl opacity-20">📊</div>
        <p className="text-[17px] leading-relaxed text-[#F6F3EA]">
          {summary.emptyTitle}
        </p>
        <p className="mx-auto mt-2 max-w-[280px] text-[13px] leading-relaxed text-[#B8B2A7]">
          {summary.emptyDescription}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {summary.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#B388FF] bg-[#2B2B2E] px-3.5 py-2 text-[12px] text-white"
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
  const progressColor =
    chart.label === "Protein"
      ? "#64FFDA"
      : chart.label === "Fiber"
        ? "#B388FF"
        : "#FF66CC";

  return (
    <div className="rounded-[14px] border border-[#343434] bg-[#2B2B2E] p-3.5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center">
        <svg aria-hidden="true" height="64" viewBox="0 0 56 56" width="64">
          <circle
            cx="28"
            cy="28"
            fill="none"
            r={radius}
            stroke="#252528"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="28"
            cy="28"
            fill="none"
            r={radius}
            stroke={progressColor}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference - progress}`}
            transform="rotate(-90 28 28)"
          />
          <text
            className="fill-white text-[13px] font-bold"
            dominantBaseline="middle"
            textAnchor="middle"
            x="28"
            y="31"
          >
            {chart.value}%
          </text>
        </svg>
      </div>
      <p className="mt-3 text-center text-[12px] font-medium text-[#B8B2A7]">
        {chart.label}
      </p>
      <p className="mt-1 text-center text-[10px] leading-4 text-[#8E8E93]">
        {chart.status}
      </p>
    </div>
  );
}

function CoachTodayPlan({ plan }: { plan: PlanState }) {
  return (
    <section className={sectionCardClassName}>
      <h2 className="mb-5 text-[20px] font-medium leading-tight text-[#F6F3EA]">
        {plan.title}
      </h2>

      <div className="rounded-[16px] border border-[#343434] bg-[#2B2B2E] p-5 shadow-none">
        <div className="mb-4 flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
              plan.eyebrow.includes("เริ่มใหม่")
                ? "border-[#64FFDA] bg-[#243B36] text-[#64FFDA] shadow-none"
                : "border-[#64FFDA] bg-[#243B36] text-[#64FFDA] shadow-none"
            }`}
          >
            <span className="text-xl">{plan.eyebrow.includes("เริ่มใหม่") ? "💜" : "✅"}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-2.5 text-[17px] leading-tight text-[#F6F3EA]">
              {plan.eyebrow}
            </h3>
            <p className="text-[13px] leading-relaxed text-[#F6F3EA]">
              {plan.message}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <PrimaryActionButton>{plan.primaryAction}</PrimaryActionButton>
          <SecondaryActionButton>{plan.secondaryAction}</SecondaryActionButton>
        </div>

        <div className="mt-5 space-y-3">
          <PlanInsightList
            accent="mint"
            items={plan.praiseItems}
            title={plan.praiseTitle}
          />
          <PlanInsightList
            accent="pink"
            items={plan.improveItems}
            title={plan.improveTitle}
          />
        </div>
      </div>
    </section>
  );
}

function PlanInsightList({
  accent,
  items,
  title,
}: {
  accent: "mint" | "pink";
  items: readonly string[];
  title: string;
}) {
  const accentClassName =
    accent === "mint"
      ? "border-[#7DD3A8] bg-[#14271E] text-[#C8F5DC]"
      : "border-[#FF66CC] bg-[#332A35] text-white";

  return (
    <div className={innerCardClassName + " p-4"}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-[17px] font-medium leading-tight text-[#F6F3EA]">
          {title}
        </h4>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] ${accentClassName}`}
        >
          {items.length} ข้อ
        </span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-3 rounded-[14px] border border-[#343434] bg-[#2B2B2E] p-3 text-[13px] leading-6 text-[#F6F3EA]"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium ${accentClassName}`}
            >
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HomeworkAndConsistency({
  homework,
}: {
  homework: HomeworkActive | HomeworkMissed;
}) {
  return (
    <section className={sectionCardClassName}>
      <h2 className="mb-5 text-[20px] font-medium leading-tight text-[#F6F3EA]">
        {homework.title}
      </h2>

      <div className="rounded-[16px] border border-[#343434] bg-[#2B2B2E] p-4 shadow-none">
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
        <div className="relative h-[112px] w-[112px] shrink-0 overflow-hidden rounded-[24px] border border-[#343434] bg-[#2B2B2E]">
          <Image
            alt={homework.imageAlt}
            className="object-cover object-center"
            fill
            sizes="112px"
            src={homework.imageSrc}
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-[#B8B2A7]">
            {homework.eyebrow}
          </p>
          <h3 className="mt-2 text-[17px] leading-tight text-[#F6F3EA]">
            การบ้านล่าสุด
          </h3>
          <p className="mt-1 text-[13px] text-[#B8B2A7]">{homework.timeLabel}</p>
          <p className="mt-1 text-[13px] leading-7 text-[#F6F3EA]">
            {homework.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {homework.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[#343434] bg-[#29292C] px-3 py-1.5 text-[12px] text-[#B8B2A7]"
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
        <div className="flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-[24px] border border-[#343434] bg-[#2B2B2E] text-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#B8B2A7]">
              {homework.eyebrow}
            </p>
            <p className="mt-2 text-xs leading-5 text-[#F6F3EA]">
              {homework.emptyDescription}
            </p>
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="text-[17px] leading-tight text-[#F6F3EA]">
            {homework.emptyTitle}
          </h3>
          <p className="mt-1 text-[13px] text-[#B8B2A7]">{homework.emptyDescription}</p>
          <p className="mt-1 text-[13px] leading-7 text-[#F6F3EA]">
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
          <span className="text-[11px] text-[#B8B2A7]">{day.label}</span>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium ${
              day.status === "sent"
                ? "border border-[#7DD3A8] bg-[#14271E] text-[#C8F5DC]"
                : "border border-[#343434] bg-[#29292C] text-[#B8B2A7]"
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
      <h2 className="mb-2 text-[20px] font-medium leading-tight text-[#F6F3EA]">
        {template.title}
      </h2>
      <p className="mb-4 text-xs text-[#B8B2A7]">{template.description}</p>

      <div className="relative mb-5 rounded-[16px] border border-[#343434] bg-[#2B2B2E] p-6 shadow-none">
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-[#B388FF] bg-[#332B3F] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B388FF]" />
          <span className="text-[10px] tracking-wide text-white">Template</span>
        </div>

        <div className="pr-20">
          <p className="whitespace-pre-line text-[13px] leading-[1.7] text-[#F6F3EA]">
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
    <section className="relative overflow-hidden rounded-[22px] border border-[#343434] bg-[#202020] p-6 shadow-none">
      <div className="pointer-events-none absolute inset-0 bg-transparent" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF9100] bg-[#2B2B2E] text-2xl text-[#FF9100] shadow-none">
          !
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 text-[20px] font-medium leading-tight text-[#F6F3EA]">
            {note.title}
          </h2>
          <p className="text-[13px] leading-7 text-[#F6F3EA]">{note.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[#343434] bg-[#2B2B2E] px-3 py-1.5 text-[12px] text-white"
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
