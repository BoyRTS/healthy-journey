import Image from "next/image";
import Link from "next/link";
import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { StatCard } from "@/components/ui/StatCard";
import { memberFoodPageData } from "@/data/mockMemberFood";

const activityToneStyles = {
  draft: "bg-[var(--beige-soft)] text-[var(--earth)]",
  submitted: "bg-[rgba(143,159,126,0.18)] text-[var(--olive)]",
  reviewed: "bg-[rgba(203,166,93,0.2)] text-[var(--earth)]",
} as const;

const activityStatusLabels = {
  draft: "ฉบับร่าง",
  submitted: "ส่งแล้ว",
  reviewed: "ตรวจแล้ว",
} as const;

export default function MemberFoodPage() {
  const { member, stats, submission, coachSummary, guidance, recentActivity } = memberFoodPageData;

  return (
    <MemberPageShell
      action={
        <Link
          className="rounded-full bg-[var(--olive)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
          href="/member/profile"
        >
          ดูโปรไฟล์สมาชิก
        </Link>
      }
      backHref="/member"
      backLabel="กลับไปหน้าหลักสมาชิก"
      eyebrow="HEALTHY JOURNEY"
      subtitle="ห้องส่งการบ้านอาหารของสมาชิก ใช้ส่งรูป มื้ออาหาร และหมายเหตุให้โค้ชดูต่อในรอบตรวจ"
      title="ห้องส่งการบ้านอาหาร"
    >
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(203,166,93,0.12),_transparent_32%),radial-gradient(circle_at_85%_20%,_rgba(143,159,126,0.12),_transparent_28%),linear-gradient(180deg,_rgba(255,253,248,0.92)_0%,_rgba(247,239,226,0.96)_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(79,99,70,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(79,99,70,0.08)_1px,transparent_1px)] [background-size:30px_30px]" />

        <div className="relative flex h-full flex-col gap-4 overflow-y-auto p-4 sm:p-5">
          <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-[rgba(255,253,248,0.84)] shadow-[var(--shadow-soft)]">
              <div className="relative h-56 overflow-hidden sm:h-64">
                <Image
                  alt={submission.imageAlt}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  src={submission.imageSrc}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,47,41,0.68)] via-[rgba(45,47,41,0.16)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {member.memberCode}
                    </span>
                    <span className="rounded-full bg-white/18 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {member.streakLabel}
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
                    {submission.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/88 sm:text-base">
                    {submission.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.6rem] border border-[var(--line)] bg-white/78 p-4 shadow-[var(--shadow-card)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-[var(--olive)]">TODAY'S ENTRY</p>
                      <h3 className="mt-2 text-2xl font-semibold text-[var(--olive)]">{submission.mealLabel}</h3>
                    </div>
                    <div className="rounded-full bg-[var(--sage-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--olive)]">
                      {submission.mealTime}
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <span className="mb-2 block text-sm font-semibold text-[var(--charcoal)]">อัปโหลดรูปอาหาร</span>
                      <div className="flex min-h-36 flex-col items-center justify-center rounded-[1.35rem] border border-dashed border-[rgba(79,99,70,0.22)] bg-[linear-gradient(180deg,rgba(255,253,248,0.88),rgba(239,227,211,0.56))] px-4 py-6 text-center">
                        <p className="text-sm font-semibold text-[var(--olive)]">ลากรูปมาวาง หรือแตะเพื่อเลือกไฟล์</p>
                        <p className="mt-2 max-w-sm text-xs leading-6 text-[var(--muted)]">
                          รองรับรูปอาหารที่ถ่ายจากมือถือ เพื่อใช้เป็นหลักฐานการบ้านให้โค้ชดูต่อ
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <span className="mb-2 block text-sm font-semibold text-[var(--charcoal)]">ความรู้สึกหลังมื้อ</span>
                        <div className="rounded-[1.1rem] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--muted)]">
                          {submission.moodLabel}
                        </div>
                      </div>
                      <div>
                        <span className="mb-2 block text-sm font-semibold text-[var(--charcoal)]">เวลาที่ทาน</span>
                        <div className="rounded-[1.1rem] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--muted)]">
                          {submission.mealTime}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="mb-2 block text-sm font-semibold text-[var(--charcoal)]">หมายเหตุจากสมาชิก</span>
                      <div className="min-h-28 rounded-[1.25rem] border border-[var(--line)] bg-white px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                        {submission.notePlaceholder}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      className="rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--olive)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
                      type="button"
                    >
                      {submission.actionPrimary}
                    </button>
                    <button
                      className="rounded-full bg-[var(--olive)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(79,99,70,0.22)] transition hover:-translate-y-0.5"
                      type="button"
                    >
                      {submission.actionSecondary}
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <section className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,253,248,0.84)] p-4 shadow-[var(--shadow-card)]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--olive)]">MEMBER SNAPSHOT</p>
                        <h3 className="mt-2 text-2xl font-semibold text-[var(--olive)]">{member.name}</h3>
                      </div>
                      <span className="rounded-full bg-[var(--beige-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--earth)]">
                        {member.coachName}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      การส่งการบ้านวันนี้จะถูกเก็บไว้ในชุดข้อมูลของสมาชิก เพื่อให้โค้ชดูภาพรวมอาหารและคุยต่อในรอบถัดไป
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                      {stats.map((stat) => (
                        <StatCard key={stat.label} label={stat.note} value={stat.value} tone={stat.tone} />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,253,248,0.84)] p-4 shadow-[var(--shadow-card)]">
                    <p className="text-xs font-semibold tracking-[0.18em] text-[var(--olive)]">COACH VIEW</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--olive)]">{coachSummary.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{coachSummary.description}</p>
                    <div className="mt-4 grid gap-2">
                      {coachSummary.items.map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-[1.15rem] border border-[var(--line)] bg-white px-4 py-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                          <span className="text-sm text-[var(--charcoal)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </article>

            <aside className="grid gap-4">
              <section className="rounded-[2rem] border border-white/70 bg-[rgba(255,253,248,0.84)] p-4 shadow-[var(--shadow-soft)]">
                <p className="text-xs font-semibold tracking-[0.18em] text-[var(--olive)]">GUIDANCE</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--olive)]">{guidance.title}</h3>
                <div className="mt-4 space-y-3">
                  {guidance.items.map((item) => (
                    <div key={item} className="rounded-[1.15rem] border border-[var(--line)] bg-white px-4 py-3">
                      <span className="text-sm leading-6 text-[var(--charcoal)]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/70 bg-[rgba(255,253,248,0.84)] p-4 shadow-[var(--shadow-soft)]">
                <p className="text-xs font-semibold tracking-[0.18em] text-[var(--olive)]">RECENT ACTIVITY</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--olive)]">ประวัติการส่งล่าสุด</h3>
                <div className="mt-4 space-y-3">
                  {recentActivity.map((item) => (
                    <div key={`${item.title}-${item.time}`} className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4 shadow-[0_8px_20px_rgba(70,56,36,0.05)]">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[var(--charcoal)]">{item.title}</p>
                          <p className="mt-1 text-xs text-[var(--muted)]">{item.time}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${activityToneStyles[item.status]}`}>
                          {activityStatusLabels[item.status]}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </section>
        </div>
      </div>
    </MemberPageShell>
  );
}
