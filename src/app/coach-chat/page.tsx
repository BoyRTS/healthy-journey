import Image from "next/image";
import Link from "next/link";
import {
  coachChatGuides,
  coachChatStats,
  coachChatThread,
} from "@/data/mockCoachChat";

export default function CoachChatPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#11131a] text-[#E7E2F5]">
      <div className="fixed inset-0 z-0">
        <Image
          alt="Coach workspace background"
          className="object-cover opacity-100 brightness-110 contrast-125 saturate-110"
          fill
          priority
          sizes="100vw"
          src="/images/coach-bg.png"
        />
        <div className="absolute inset-0 bg-[rgba(8,9,14,0.08)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col p-3 sm:p-5 lg:p-6">
        <div className="relative flex min-h-[calc(100vh-1.5rem)] flex-col gap-5 overflow-hidden rounded-[2.2rem] border border-[rgba(255,255,255,0.10)] bg-[rgba(18,20,28,0.08)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.16)] backdrop-blur-[1px] sm:p-6 lg:p-7">
          <div className="flex items-center justify-between gap-3">
            <Link
              className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.18)] px-5 py-3 text-sm font-medium text-[#F8F5FF] shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
              href="/coach"
            >
              ← กลับไปหน้า coach
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-[rgba(79,209,255,0.24)] bg-[rgba(10,12,18,0.22)] px-4 py-2 text-sm text-[#E7E2F5] shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4FD1FF] shadow-[0_0_12px_rgba(79,209,255,0.55)]" />
              Coach Workspace
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <header className="rounded-[2rem] border border-[rgba(255,255,255,0.10)] bg-[rgba(18,20,28,0.14)] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:rounded-[2.2rem] sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#D8CCB5] sm:text-sm">
                    HEALTHY JOURNEY
                  </p>
                  <h1 className="mt-2 font-serif text-[2.4rem] font-semibold leading-tight text-[#F8F5FF] sm:mt-3 sm:text-5xl">
                    พื้นที่เตรียมข้อความถึงสมาชิก
                  </h1>
                  <p className="mt-4 text-sm leading-7 text-[#E7E2F5]/84 sm:text-base">
                    สรุปคีย์เมสเสจ อ่านเทมเพลตตัวอย่าง และทบทวนโน้ตก่อนส่งด้วยมือ
                    เพื่อให้โทนคำแนะนำของโค้ชนิ่งและต่อเนื่อง
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 lg:min-w-[320px]">
                  {coachChatStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.35rem] border border-[rgba(255,255,255,0.10)] bg-[rgba(18,20,28,0.14)] p-3.5 shadow-[0_14px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:rounded-[1.5rem] sm:p-4"
                    >
                      <p className="text-[2rem] font-semibold leading-none text-[#FFFFFF]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[12px] leading-5 text-[#E7E2F5]/82">
                        {item.label}
                      </p>
                      <p className="mt-2 text-[10px] leading-4 text-[#A49AB9]">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <section className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {coachChatGuides.map((guide) => (
                <div
                  key={guide.title}
                  className="rounded-[1.35rem] border border-[rgba(255,255,255,0.10)] bg-[rgba(18,20,28,0.14)] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-[#F8F5FF]">{guide.title}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[#E7E2F5]/82">
                    {guide.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4FD1FF] shadow-[0_0_8px_rgba(79,209,255,0.35)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-[2rem] border border-[rgba(255,255,255,0.10)] bg-[rgba(18,20,28,0.14)] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.22em] text-[#A49AB9]">
                    CHAT PREVIEW
                  </p>
                  <h2 className="mt-2 font-serif text-3xl font-semibold text-[#FFFFFF]">
                    บทสนทนาล่าสุด
                  </h2>
                </div>
                <p className="text-sm text-[#A49AB9]">ตรวจทานก่อนส่ง</p>
              </div>

              <div className="space-y-3">
                {coachChatThread.map((message) => {
                  const isRight = message.align === "right";

                  return (
                    <div
                      key={`${message.author}-${message.time}`}
                      className={`flex ${isRight ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-[1.5rem] px-4 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.14)] ring-1 ring-white/10 ${
                          isRight
                            ? "rounded-br-md bg-[rgba(123,168,255,0.16)]"
                            : "rounded-bl-md bg-[rgba(255,253,248,0.08)]"
                        }`}
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#F8F5FF]">
                            {message.author}
                          </p>
                          <p className="text-[11px] text-[#A49AB9]">{message.time}</p>
                        </div>
                        <p className="text-sm leading-7 text-[#E7E2F5]">{message.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[1.4rem] border border-[rgba(167,139,250,0.14)] bg-[rgba(18,20,28,0.22)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold tracking-[0.22em] text-[#A49AB9]">
                      BEFORE SENDING
                    </p>
                    <p className="mt-2 text-sm text-[#E7E2F5]/84">
                      ทบทวนอีกครั้งก่อนคัดลอกข้อความไปส่งให้สมาชิก
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(167,139,250,0.14)] bg-[#191529] px-3 py-1.5 text-xs text-[#E3DDF4]">
                    <span className="h-2 w-2 rounded-full bg-[#A78BFA] shadow-[0_0_10px_rgba(167,139,250,0.45)]" />
                    พร้อมตรวจทาน
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  <button
                    className="w-full rounded-xl bg-gradient-to-r from-[#62D3FF] via-[#7BA8FF] to-[#A78BFA] px-5 py-3.5 text-[14px] font-medium text-white shadow-[0_4px_16px_rgba(123,168,255,0.3),0_2px_4px_rgba(123,168,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(123,168,255,0.4),0_3px_6px_rgba(123,168,255,0.3)]"
                    type="button"
                  >
                    คัดลอกข้อความที่เลือก
                  </button>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      className="rounded-xl bg-[#191529] px-4 py-3 text-[13px] font-medium text-[#E3DDF4] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-200 hover:bg-[#07070D]"
                      type="button"
                    >
                      ดูเทมเพลต
                    </button>
                    <button
                      className="rounded-xl bg-[#191529] px-4 py-3 text-[13px] font-medium text-[#E3DDF4] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-200 hover:bg-[#07070D]"
                      type="button"
                    >
                      เพิ่มโน้ตโค้ช
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <aside className="rounded-[2rem] border border-[rgba(255,255,255,0.10)] bg-[rgba(18,20,28,0.14)] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-6">
              <div className="mb-5">
                <p className="text-xs font-bold tracking-[0.22em] text-[#A49AB9]">
                  COACH NOTES
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#FFFFFF]">
                  สิ่งที่ควรจำก่อนตอบกลับ
                </h2>
              </div>

              <div className="space-y-3">
                <div className="rounded-[1.4rem] border border-[rgba(167,139,250,0.14)] bg-[rgba(18,20,28,0.22)] p-4">
                  <p className="text-sm font-semibold text-[#F8F5FF]">โทนข้อความ</p>
                  <p className="mt-2 text-sm leading-7 text-[#E7E2F5]/84">
                    ใช้คำสั้น ชัด และให้กำลังใจ ไม่เร่ง ไม่ตำหนิ และชวนกลับมาทำทีละ
                    ขั้นตอน
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[rgba(167,139,250,0.14)] bg-[rgba(18,20,28,0.22)] p-4">
                  <p className="text-sm font-semibold text-[#F8F5FF]">สิ่งที่ต้องเช็ก</p>
                  <p className="mt-2 text-sm leading-7 text-[#E7E2F5]/84">
                    ทวนชื่อสมาชิก วันล่าสุดที่ส่งการบ้าน และเทมเพลตที่ใช้ก่อนกด
                    คัดลอกทุกครั้ง
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[rgba(255,111,174,0.18)] bg-[rgba(255,111,174,0.08)] p-4">
                  <p className="text-sm font-semibold text-[#FFC4DC]">จำไว้</p>
                  <p className="mt-2 text-sm leading-7 text-[#E7E2F5]/84">
                    ทุกข้อความต้องถูกเลือกและส่งด้วยมือโดยโค้ช ไม่มีการส่งอัตโนมัติ
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
