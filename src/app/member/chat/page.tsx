import Link from "next/link";
import { MemberPageShell } from "@/components/layout/MemberPageShell";

const conversations = [
  {
    id: 1,
    role: "coach",
    name: "Coach",
    time: "08:30",
    text: "วันนี้ลองทานโปรตีนให้ครบทุกมื้อ แล้วถ่ายรูปส่งมาได้เลยนะ",
  },
  {
    id: 2,
    role: "member",
    name: "Prae",
    time: "08:41",
    text: "ได้ค่ะ เดี๋ยวหนูส่งมื้อเช้าให้ดูนะคะ",
  },
  {
    id: 3,
    role: "coach",
    name: "Coach",
    time: "08:45",
    text: "ดีมาก ถ้ามีมื้อว่างวันนี้ก็ส่งมาได้เหมือนกัน",
  },
] as const;

export default function MemberChatPage() {
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
      subtitle="พื้นที่พูดคุยระหว่างสมาชิกกับโค้ช ใช้สำหรับส่งข้อความและติดตามการดูแลแบบเป็นกันเอง"
      title="พูดคุยกับโค้ช"
    >
      <div className="flex h-full min-h-[calc(100vh-7.5rem)] justify-center bg-[var(--cream)] lg:items-start lg:p-6">
        <div className="flex h-full min-h-[calc(100vh-7.5rem)] w-full max-w-[520px] flex-col gap-4 overflow-hidden bg-[linear-gradient(180deg,#F8F3E7_0%,#F4EBDD_100%)] px-4 py-4 lg:min-h-0 lg:rounded-[1.75rem] lg:px-5 lg:py-5 lg:shadow-[0_24px_60px_rgba(83,96,56,0.16)]">
          <section className="rounded-[1.5rem] border border-white/70 bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_16px_32px_rgba(83,96,56,0.08)] backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                  Coach chat
                </p>
                <h2 className="mt-2 text-[20px] font-semibold leading-tight text-[var(--charcoal)]">
                  แชทส่วนตัว
                </h2>
              </div>
              <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 text-[12px] font-medium text-[var(--olive)]">
                Online
              </span>
            </div>
          </section>

          <div className="flex-1 space-y-3 overflow-auto rounded-[1.5rem] border border-white/70 bg-[rgba(255,255,255,0.62)] p-4 shadow-[0_16px_32px_rgba(83,96,56,0.08)] backdrop-blur">
            {conversations.map((message) => (
              <div
                className={`flex ${message.role === "member" ? "justify-end" : "justify-start"}`}
                key={message.id}
              >
                <article
                  className={`max-w-[82%] rounded-[1.35rem] px-4 py-3 shadow-[0_12px_24px_rgba(83,96,56,0.08)] ${
                    message.role === "member"
                      ? "rounded-br-md bg-[var(--olive)] text-white"
                      : "rounded-bl-md bg-[var(--warm-white)] text-[var(--charcoal)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">
                      {message.name}
                    </p>
                    <time className="text-[11px] opacity-70">{message.time}</time>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-[15px] leading-7">
                    {message.text}
                  </p>
                </article>
              </div>
            ))}
          </div>

          <section className="rounded-[1.5rem] border border-white/70 bg-[rgba(255,255,255,0.8)] p-4 shadow-[0_16px_32px_rgba(83,96,56,0.08)] backdrop-blur">
            <div className="rounded-[1.2rem] border border-dashed border-[rgba(83,96,56,0.18)] bg-[rgba(255,251,242,0.92)] px-4 py-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--olive)]">
                พิมพ์ข้อความ
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="min-h-[52px] flex-1 rounded-full bg-white px-4 py-3 text-[14px] text-[var(--muted)] shadow-[inset_0_0_0_1px_rgba(83,96,56,0.08)]">
                  พื้นที่พิมพ์ข้อความสำหรับสมาชิกและโค้ช
                </div>
                <button
                  className="rounded-full bg-[var(--olive)] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
                  type="button"
                >
                  ส่ง
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MemberPageShell>
  );
}
