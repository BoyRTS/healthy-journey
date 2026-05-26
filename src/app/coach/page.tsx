import Image from "next/image";
import Link from "next/link";
import { coachMembers } from "@/data/mockCoachDashboard";
import { MemberAvatar } from "@/components/coach/MemberAvatar";

export default function CoachDashboardPage() {
  const coachStats = [
    { value: "24", label: "สมาชิกทั้งหมด", icon: "👥", accent: "from-[#7BA8FF] to-[#A78BFA]" },
    { value: "16", label: "ส่งการบ้านวันนี้", icon: "🗒️", accent: "from-[#4FD1FF] to-[#7BA8FF]" },
    { value: "3", label: "ต้องติดตามด่วน", icon: "🕒", accent: "from-[#FF6FAE] to-[#A78BFA]" },
    { value: "12", label: "AI วิเคราะห์แล้ว", icon: "🧠", accent: "from-[#9B6BFF] to-[#4FD1FF]" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#11131a] text-[#E7E2F5]">
      <div className="fixed inset-0 z-0">
        <Image
          alt="Coach dashboard background"
          className="object-cover opacity-100 brightness-110 contrast-125 saturate-110"
          fill
          priority
          sizes="100vw"
          src="/images/coach-bg.png"
        />
        <div className="absolute inset-0 bg-[rgba(8,9,14,0.02)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col p-3 sm:p-5 lg:p-6">
        <div className="relative flex min-h-[calc(100vh-1.5rem)] flex-col gap-4 overflow-hidden rounded-[2.2rem] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.05)] p-3.5 shadow-[0_28px_90px_rgba(0,0,0,0.16)] backdrop-blur-md sm:gap-5 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.18)] px-5 py-3 text-sm font-medium text-[#F8F5FF] shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
              href="/member"
            >
              ← กลับไปหน้า member
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-[rgba(79,209,255,0.24)] bg-[rgba(10,12,18,0.22)] px-4 py-2 text-sm text-[#E7E2F5] shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4FD1FF] shadow-[0_0_12px_rgba(79,209,255,0.55)]" />
              วิเคราะห์วันนี้
            </div>
          </div>

          <div className="grid gap-3.5 lg:grid-cols-[1.2fr_0.95fr]">
            <header className="rounded-[2rem] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.09)] p-3.5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-md sm:rounded-[2.2rem] sm:p-4">
              <div className="flex flex-col gap-4.5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-[#D8CCB5] sm:text-[11px]">HEALTHY JOURNEY</p>
                  <h1 className="mt-2 font-serif text-[2.05rem] font-semibold leading-tight text-[#F8F5FF] sm:mt-2.5 sm:text-5xl">
                    Coach Dashboard
                  </h1>
                </div>
              </div>
            </header>

            <section className="grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-1.5">
              {coachStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1rem] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.09)] p-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:rounded-[1.05rem] sm:p-2"
                >
                  <div className={`mb-2 h-1 w-7 rounded-full bg-gradient-to-r ${item.accent} shadow-[0_0_12px_rgba(255,255,255,0.08)]`} />
                  <div className="mb-0.5 text-base drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]">{item.icon}</div>
                  <p className="text-[1.2rem] font-semibold leading-none text-[#FFFFFF] sm:text-[1.35rem]">{item.value}</p>
                  <p className="mt-0.5 text-[9px] leading-3.5 text-[#E7E2F5]/82 sm:text-[10px]">{item.label}</p>
                </div>
              ))}
            </section>
          </div>

          <section className="rounded-[2rem] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-5">
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-serif text-3xl font-semibold text-[#FFFFFF]">สมาชิกที่ควรดูก่อน</h2>
              <p className="text-sm text-[#A49AB9]">เลื่อนดูสมาชิกเพิ่มเติม</p>
            </div>

            <div className="mt-4 max-h-[32rem] overflow-y-auto pr-1">
              <div className="grid gap-3">
                {coachMembers.map((member) => (
                  <Link
                    key={member.name}
                    className={`group block rounded-[1.6rem] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] p-4 shadow-[0_16px_36px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.24)] hover:bg-[rgba(255,255,255,0.12)]`}
                    href={member.href}
                  >
                    <div className="flex gap-4">
                      <MemberAvatar variant={member.avatarVariant} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-serif text-2xl font-semibold leading-tight text-[#F8F5FF]">
                              {member.name}
                            </p>
                            <p className="mt-1 text-sm text-[#E7E2F5]/86">{member.note}</p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
                              member.tone === "follow_up"
                                ? "border-[rgba(255,111,174,0.24)] bg-[rgba(255,111,174,0.14)] text-[#FFC4DC]"
                                : member.tone === "new"
                                  ? "border-[rgba(79,209,255,0.24)] bg-[rgba(79,209,255,0.14)] text-[#CFF6FF]"
                                  : member.tone === "strong"
                                    ? "border-[rgba(203,166,93,0.24)] bg-[rgba(203,166,93,0.14)] text-[#F7E4BD]"
                                    : "border-[rgba(167,139,250,0.22)] bg-[rgba(123,168,255,0.12)] text-[#DDE8FF]"
                            }`}
                          >
                            {member.status}
                          </span>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-[#B7AEE0]">{member.insight}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-[11px] text-[#E7E2F5]/82">
                            {member.lastUpdate}
                          </span>
                          <span className="rounded-full border border-[rgba(79,209,255,0.16)] bg-[rgba(79,209,255,0.08)] px-2.5 py-1 text-[11px] text-[#CFF6FF]">
                            {member.behaviorTag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <nav className="mt-auto grid grid-cols-5 gap-2 rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(18,20,28,0.14)] p-2 shadow-[0_10px_22px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            {["สมาชิก", "อินไซต์", "หน้าแรก", "ติดตามผล", "ตั้งค่า"].map((label, index) => (
              <Link
                key={label}
                className={`rounded-full px-2 py-2 text-center text-[11px] font-semibold ${
                  index === 0
                    ? "bg-[linear-gradient(135deg,rgba(79,209,255,0.18),rgba(167,139,250,0.18))] text-[#FFFFFF] shadow-[0_0_16px_rgba(79,209,255,0.06)]"
                    : index === 3
                      ? "bg-[rgba(255,111,174,0.14)] text-[#FFC4DC]"
                      : "text-[#E7E2F5]/72"
                }`}
                href={index === 0 ? "/coach" : index === 1 ? "/coach/insights" : index === 3 ? "/coach/follow-up" : index === 4 ? "/coach/settings" : "/coach"}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
