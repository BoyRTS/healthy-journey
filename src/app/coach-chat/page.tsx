import Link from "next/link";
import { CoachBottomNav, CoachThemeShell, coachTheme } from "@/components/layout/CoachThemeShell";
import {
  coachChatGuides,
  coachChatStats,
  coachChatTemplates,
  coachChatThread,
  sendChecklist,
} from "@/data/mockCoachChat";

export default function CoachChatPage() {
  const selectedTemplate = coachChatTemplates[0];

  return (
    <CoachThemeShell>
      <section className={coachTheme.section}>
        <div className="flex items-center justify-between gap-3">
          <Link className={`${coachTheme.secondaryAction} px-3.5 py-2`} href="/coach" aria-label="กลับหน้า coach">
            กลับ
          </Link>
          <span className={`${coachTheme.displayFont} rounded-full border border-[#00FFFF] bg-[#00FFFF] px-3 py-1.5 text-[11px] font-semibold text-black`}>
            Manual prep
          </span>
        </div>

        <div className="mt-6">
          <p className={`${coachTheme.displayFont} text-xs uppercase tracking-[0.18em] text-[#00FFFF]`}>
            Coach workspace
          </p>
          <h1 className={`${coachTheme.displayFont} mt-2 text-[22px] font-semibold leading-tight text-white`}>
            เตรียมข้อความก่อนส่ง
          </h1>
          <p className="mt-3 text-[13px] leading-7 text-[#D4D4D4]">
            พื้นที่สำหรับโค้ชอ่านบริบท เลือก template และตรวจข้อความด้วยตัวเองก่อนส่งให้สมาชิก
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {coachChatStats.map((item, index) => {
          const styles = ["border-[#FF33CC] bg-[#FF33CC]", "border-[#CC99FF] bg-[#CC99FF]", "border-[#00FFFF] bg-[#00FFFF]"];
          return (
            <div key={item.label} className={`rounded-[18px] border p-3 ${styles[index]}`}>
              <p className={`${coachTheme.displayFont} text-[24px] font-semibold leading-none text-black`}>{item.value}</p>
              <p className="mt-2 text-[11px] leading-4 text-[#1F1F1F]">{item.label}</p>
            </div>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00FFFF]`}>
              Member thread
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold text-white`}>บทสนทนาล่าสุด</h2>
          </div>
          <span className={`${coachTheme.displayFont} rounded-full bg-[#00FFFF] px-3 py-1.5 text-[11px] font-semibold text-black`}>
            Review only
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {coachChatThread.map((message) => {
            const isCoach = message.align === "right";
            return (
              <div key={`${message.author}-${message.time}`} className={`flex ${isCoach ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-[20px] border p-4 ${isCoach ? "border-[#00FFFF] bg-[#00FFFF]" : "border-[#CC99FF] bg-[#CC99FF]"}`}>
                  <div className="mb-1 flex items-center gap-2">
                    <p className={`${coachTheme.displayFont} text-[12px] font-semibold text-black`}>{message.author}</p>
                    <p className="text-[11px] text-[#2F2F2F]">{message.time}</p>
                  </div>
                  <p className="text-[13px] leading-7 text-[#111111]">{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00FFFF]`}>
              Template library
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold text-white`}>เลือกข้อความ preset</h2>
          </div>
          <span className="text-[11px] text-[#D4D4D4]">3 templates</span>
        </div>

        <div className="mt-5 space-y-3">
          {coachChatTemplates.map((template, index) => {
            const styles = ["border-[#FF33CC] bg-[#FF33CC]", "border-[#CC99FF] bg-[#CC99FF]", "border-[#00FFFF] bg-[#00FFFF]"];
            return (
              <div key={template.name} className={`rounded-[20px] border p-4 ${styles[index]}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`${coachTheme.displayFont} text-[14px] font-semibold text-black`}>{template.name}</p>
                    <p className="mt-1 text-[11px] text-[#2A2A2A]">{template.tone}</p>
                  </div>
                  <span className={`${coachTheme.displayFont} rounded-full border border-[#2A2A2A] bg-[#181818] px-2.5 py-1 text-[10px] font-semibold text-white`}>
                    {template.status}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-7 text-[#111111]">{template.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={coachTheme.section}>
        <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00FFFF]`}>
          Selected message
        </p>
        <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold text-white`}>ตรวจรอบสุดท้าย</h2>

        <div className="mt-4 rounded-[20px] border border-[#00FFFF] bg-[#00FFFF] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] text-[#2A2A2A]">{selectedTemplate.name}</p>
            <span className={`${coachTheme.displayFont} rounded-full bg-[#181818] px-2.5 py-1 text-[10px] font-semibold text-white`}>
              preset
            </span>
          </div>
          <p className="mt-3 text-[14px] leading-7 text-[#0D0D0D]">{selectedTemplate.body}</p>
        </div>

        <div className="mt-4 space-y-2.5">
          {sendChecklist.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-[18px] border border-[#CC99FF] bg-[#CC99FF] px-4 py-3">
              <span className={`${coachTheme.displayFont} mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00FFFF] text-[11px] font-semibold text-black`}>
                ✓
              </span>
              <span className="text-[13px] leading-6 text-[#111111]">{item}</span>
            </div>
          ))}
        </div>

        <button className={`${coachTheme.primaryAction} mt-5 w-full`} type="button">
          คัดลอกข้อความที่เลือก
        </button>
        <p className="mt-3 text-center text-[11px] leading-5 text-[#A3A3A3]">
          Prototype นี้ยังไม่ส่งข้อความจริง และไม่มีการใช้ AI สร้างข้อความถึงสมาชิก
        </p>
      </section>

      <section className="grid gap-3">
        {coachChatGuides.map((guide) => (
          <div key={guide.title} className="rounded-[20px] border border-[#CC99FF] bg-[#CC99FF] p-4">
            <p className={`${coachTheme.displayFont} text-[14px] font-semibold text-black`}>{guide.title}</p>
            <div className="mt-3 space-y-2">
              {guide.items.map((item) => (
                <div key={item} className="flex gap-2 text-[13px] leading-6 text-[#1A1A1A]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#050505]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CoachBottomNav activeHref="/coach-chat" />
    </CoachThemeShell>
  );
}
