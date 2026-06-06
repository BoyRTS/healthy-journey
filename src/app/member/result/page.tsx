import Link from "next/link";
import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { getHealthyJourneyCurrentUser, type MemberHealthProfile } from "@/lib/auth/server";

function getMemberHealthProfile(value: unknown): Partial<MemberHealthProfile> {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as Partial<MemberHealthProfile>;
}

function toNumber(value: string | undefined) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function getProgressPercent(currentWeight: number | null, targetWeight: number | null) {
  if (!currentWeight || !targetWeight || currentWeight <= targetWeight) {
    return currentWeight && targetWeight && currentWeight <= targetWeight ? 100 : 0;
  }

  return 0;
}

function getDaysToTarget(targetDate: string | undefined) {
  if (!targetDate) return null;
  const target = new Date(`${targetDate}T00:00:00+07:00`);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default async function MemberResultPage() {
  const user = await getHealthyJourneyCurrentUser();
  const profile = getMemberHealthProfile(user?.privateMetadata.memberHealthProfile);
  const currentWeight = toNumber(profile.weightKg);
  const targetWeight = toNumber(profile.desiredWeightKg);
  const progressPercent = getProgressPercent(currentWeight, targetWeight);
  const daysToTarget = getDaysToTarget(profile.targetDate);
  const targetChange =
    currentWeight && targetWeight ? Math.max(0, currentWeight - targetWeight) : null;
  const nickname = profile.nickname?.trim() || "สมาชิก";

  const resultCards = [
    {
      label: "น้ำหนักปัจจุบัน",
      value: currentWeight ? `${currentWeight} kg` : "รอข้อมูล",
      note: "จากข้อมูล onboarding ล่าสุด",
    },
    {
      label: "เป้าหมาย",
      value: targetWeight ? `${targetWeight} kg` : "รอข้อมูล",
      note: targetChange ? `ต้องลดอีก ${targetChange} kg` : "กรอกเป้าหมายเพื่อคำนวณผลลัพธ์",
    },
    {
      label: "เวลาถึงเป้าหมาย",
      value: daysToTarget === null ? "รอข้อมูล" : `${daysToTarget} วัน`,
      note: profile.targetDate || "ยังไม่ได้ตั้งวันที่เป้าหมาย",
    },
  ];

  return (
    <MemberPageShell
      action={
        <Link
          className="rounded-full bg-[var(--olive)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
          href="/member"
        >
          กลับหน้าหลัก
        </Link>
      }
      backHref="/member"
      backLabel="กลับหน้าหลัก"
      eyebrow="HEALTHY JOURNEY"
      subtitle="ผลลัพธ์ส่วนตัวจากข้อมูลที่สมาชิกกรอกไว้ในระบบ"
      title="ผลลัพธ์ของฉัน"
    >
      <div className="h-full overflow-auto bg-[var(--cream)] p-5 sm:p-7">
        <section className="rounded-[1.75rem] bg-[linear-gradient(135deg,#fffaf0,#edf3e4)] p-6 ring-1 ring-[rgba(203,166,93,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
            Personal result
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--olive)]">
            {nickname}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {user
              ? "หน้านี้แสดงผลลัพธ์แบบคำนวณตรงจากข้อมูลสมาชิก ไม่มีการใช้ AI และไม่มีข้อมูล mock"
              : "เข้าสู่ระบบเพื่อดูผลลัพธ์ส่วนตัวจากข้อมูล onboarding ของคุณ"}
          </p>
          {!user ? (
            <Link
              className="mt-5 inline-flex rounded-full bg-[var(--olive)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
              href="/sign-in"
            >
              เข้าสู่ระบบ
            </Link>
          ) : null}
        </section>

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          {resultCards.map((item) => (
            <article
              className="rounded-[1.35rem] bg-[var(--warm-white)] p-4 shadow-[0_14px_34px_rgba(83,96,56,0.10)] ring-1 ring-[var(--line)]"
              key={item.label}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--olive)]">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-[var(--charcoal)]">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {item.note}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-[1.5rem] bg-[var(--warm-white)] p-5 shadow-[0_14px_34px_rgba(83,96,56,0.10)] ring-1 ring-[var(--line)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--olive)]">
                Progress
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[var(--charcoal)]">
                {progressPercent}% ถึงเป้าหมาย
              </h3>
            </div>
            <span className="rounded-full bg-[var(--sage-soft)] px-4 py-2 text-sm font-semibold text-[var(--olive)]">
              Deterministic
            </span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[rgba(83,96,56,0.12)]">
            <div
              className="h-full rounded-full bg-[var(--olive)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            ระบบจะแสดงความคืบหน้าจริงเมื่อมีข้อมูลน้ำหนักและเป้าหมายครบจาก onboarding
          </p>
        </section>
      </div>
    </MemberPageShell>
  );
}
