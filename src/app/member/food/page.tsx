"use client";

import { useEffect, useState } from "react";
import { compressMealPhoto, type CompressedMealPhoto } from "@/lib/compressMealPhoto";
import type { MealHomeworkSubmission } from "@/types/mealHomework";

type HomeworkStatus = "idle" | "compressing" | "submitting" | "success" | "error";

const mealOptions = ["เช้า", "กลางวัน", "เย็น", "มื้อว่าง"] as const;

export default function MemberFoodPage() {
  const [isHomeworkOpen, setIsHomeworkOpen] = useState(false);
  const [isStickerOpen, setIsStickerOpen] = useState(false);
  const [submissions, setSubmissions] = useState<MealHomeworkSubmission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);

  async function loadSubmissions() {
    setIsLoadingSubmissions(true);
    const response = await fetch("/api/member/meal-homework");

    if (!response.ok) {
      setIsLoadingSubmissions(false);
      return;
    }

    const body = (await response.json()) as { submissions?: MealHomeworkSubmission[] };
    setSubmissions(body.submissions ?? []);
    setIsLoadingSubmissions(false);
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <main className="min-h-screen bg-[#EDE1D0] font-[var(--font-sans-thai)] text-[#3E352B] sm:px-3 sm:py-6">
      <div className="mx-auto flex min-h-screen w-full flex-col overflow-hidden bg-[#DCC9AE] bg-[url('/images/background_food1.png')] bg-[length:100%_auto] bg-center bg-repeat sm:min-h-[calc(100vh-3rem)] sm:max-w-[430px] sm:rounded-[32px] sm:border sm:border-[#E6D0BC] sm:shadow-[0_24px_70px_rgba(82,65,45,0.22)]">
        <div className="relative flex min-h-screen flex-col overflow-hidden sm:min-h-[calc(100vh-3rem)]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,239,224,0.34)_0%,rgba(231,215,191,0.24)_44%,rgba(143,159,126,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,247,232,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(190,132,126,0.14),transparent_32%)]" />

          <div className="relative flex min-h-screen w-full flex-col sm:min-h-[calc(100vh-3rem)]">
            <header className="sticky top-0 z-20 border-b border-[#F8EEDC]/55 bg-[#F5E8D6]/72 px-4 py-3 shadow-[0_10px_30px_rgba(82,65,45,0.08)] backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h1 className="font-[var(--font-serif-thai)] text-[21px] font-semibold leading-tight text-[#3D352B]">
                    ห้องพูดคุยและส่งการบ้าน
                  </h1>
                  <p className="mt-1 text-[12px] font-medium text-[#7B6D5F]">
                    ห้องอาหารของสมาชิก Healthy Journey
                  </p>
                </div>
                <button
                  aria-label="เปิดเมนูห้อง"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#EEE0CA]/80 bg-[#FFF8EC]/65 text-[#536044] backdrop-blur-xl"
                  type="button"
                >
                  <MenuIcon />
                </button>
              </div>
            </header>

            <section className="flex-1 space-y-4 overflow-y-auto px-3 py-4 pb-[190px]">
              <CoachIntroBubble />

              {isLoadingSubmissions ? (
                <StatusBubble text="กำลังโหลดรายการส่งจริงล่าสุด..." />
              ) : null}

              {!isLoadingSubmissions && submissions.length === 0 ? (
                <StatusBubble text="ยังไม่มีรายการส่งจริงในห้องนี้ เมื่อส่งรูปอาหารสำเร็จ รายการจะขึ้นในห้องทันที" />
              ) : null}

              {submissions.map((submission) => (
                <FoodSubmissionBubble key={submission.id} submission={submission} />
              ))}
            </section>

            <footer className="sticky bottom-0 z-20 w-full border-t border-[#F8EEDC]/50 bg-[#F3E3CF]/78 px-3 pb-4 pt-3 shadow-[0_-16px_40px_rgba(82,65,45,0.12)] backdrop-blur-2xl">
              <div className="grid grid-cols-3 gap-2">
                <button
                  className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[22px] bg-[#8F9F7E] px-2.5 py-2.5 text-center text-[12px] font-bold leading-[1.15] text-[#26301E] shadow-[0_8px_18px_rgba(82,65,45,0.12)]"
                  onClick={() => setIsHomeworkOpen(true)}
                  type="button"
                >
                  <MealPhotoIcon className="h-5 w-5 shrink-0" />
                  <span className="max-w-full text-balance">ส่งการบ้าน</span>
                </button>
                <button
                  className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[22px] bg-[#A9C8BE] px-2.5 py-2.5 text-center text-[12px] font-bold leading-[1.15] text-[#1F3530] shadow-[0_8px_18px_rgba(82,65,45,0.12)]"
                  type="button"
                >
                  <DropletIcon className="h-5 w-5 shrink-0" />
                  <span className="max-w-full text-balance">บันทึกน้ำ</span>
                </button>
                <button
                  className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[22px] bg-[#D9A6A3] px-2.5 py-2.5 text-center text-[12px] font-bold leading-[1.15] text-[#3D2524] shadow-[0_8px_18px_rgba(82,65,45,0.12)]"
                  type="button"
                >
                  <CoachMessageIcon className="h-5 w-5 shrink-0" />
                  <span className="max-w-full text-balance">คุยกับโค้ช</span>
                </button>
              </div>

              {isStickerOpen ? <StickerTray /> : null}

              <div className="mt-3 flex items-center gap-2">
                <button
                  aria-label="เปิดสติกเกอร์"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#E8D8C1] bg-[#FFF7EB]/72 text-[#BE847E] backdrop-blur-xl"
                  onClick={() => setIsStickerOpen((current) => !current)}
                  type="button"
                >
                  <SmileIcon className="h-5 w-5" />
                </button>
                <div className="flex min-h-11 flex-1 items-center rounded-full border border-[#E8D8C1] bg-[#FFF7EB]/74 px-4 text-[14px] text-[#9A8A78] backdrop-blur-xl">
                  พูดคุยในห้อง...
                </div>
                <button
                  aria-label="ส่งข้อความ"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8F9F7E] text-[#FFF8EC] shadow-[0_10px_20px_rgba(83,96,68,0.22)]"
                  type="button"
                >
                  <SendIcon />
                </button>
              </div>
            </footer>

            {isHomeworkOpen ? (
              <RealHomeworkSheet
                onClose={() => setIsHomeworkOpen(false)}
                onSubmitted={(submission) => {
                  setSubmissions((current) => [submission, ...current]);
                  setIsHomeworkOpen(false);
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

function CoachIntroBubble() {
  return (
    <article className="ml-8 rounded-[20px] border border-white/30 bg-white/20 px-4 py-3 text-black shadow-[0_8px_32px_0_rgba(0,0,0,0.22)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]">
      <MessageHeader sender="โค้ช" time="วันนี้" tone="coach" />
      <p className="mt-2 text-[14px] leading-7">
        ส่งรูปอาหารของวันนี้ไว้ในห้องนี้ได้เลยนะคะ โค้ชจะใช้ข้อมูลจริงที่ส่งเข้ามาเพื่อติดตามต่อ
      </p>
    </article>
  );
}

function StatusBubble({ text }: { text: string }) {
  return (
    <article className="rounded-[20px] border border-white/30 bg-white/20 px-4 py-4 text-center text-[13px] font-semibold leading-6 text-black shadow-[0_8px_32px_0_rgba(0,0,0,0.22)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]">
      {text}
    </article>
  );
}

function FoodSubmissionBubble({ submission }: { submission: MealHomeworkSubmission }) {
  return (
    <article className="mr-6 rounded-[20px] border border-white/30 bg-white/20 px-4 py-3 text-black shadow-[0_8px_32px_0_rgba(0,0,0,0.22)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]">
      <MessageHeader sender="คุณ" time={formatBangkokDateTime(submission.submitted_at)} tone="member" />
      <div className="mt-3 overflow-hidden rounded-[20px] border border-white/30 bg-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]">
        <div className="p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[15px] font-bold text-black">ส่งการบ้านมื้อ{submission.meal_label}</p>
              <p className="mt-1 text-[12px] font-semibold text-black/75">ส่งให้โค้ชตรวจแล้ว</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/18 text-black">
              <MealPhotoIcon className="h-5 w-5" />
            </div>
          </div>
          {submission.note ? (
            <p className="mt-3 text-[13px] font-medium leading-6 text-black/85">{submission.note}</p>
          ) : null}
        </div>
      </div>
      <Reactions reactions={[{ emoji: "🥗", count: 1 }]} />
    </article>
  );
}

function RealHomeworkSheet({
  onClose,
  onSubmitted,
}: {
  onClose: () => void;
  onSubmitted: (submission: MealHomeworkSubmission) => void;
}) {
  const [compressedPhoto, setCompressedPhoto] = useState<CompressedMealPhoto | null>(null);
  const [mealLabel, setMealLabel] = useState<(typeof mealOptions)[number]>("เช้า");
  const [note, setNote] = useState("");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [status, setStatus] = useState<HomeworkStatus>("idle");
  const [message, setMessage] = useState("");

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setStatus("compressing");
    setMessage("กำลังปรับขนาดรูปก่อนส่ง...");

    try {
      const compressed = await compressMealPhoto(file).catch(() =>
        compressMealPhoto(file, { mimeType: "image/jpeg" }),
      );

      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
      }

      setCompressedPhoto(compressed);
      setPhotoPreviewUrl(URL.createObjectURL(compressed.file));
      setStatus("idle");
      setMessage("รูปพร้อมส่งแล้ว");
    } catch (error) {
      setCompressedPhoto(null);
      setPhotoPreviewUrl("");
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "เตรียมรูปไม่สำเร็จ");
    }
  }

  async function submitHomework() {
    if (!compressedPhoto) {
      setStatus("error");
      setMessage("กรุณาเลือกรูปอาหารก่อนส่ง");
      return;
    }

    setStatus("submitting");
    setMessage("กำลังส่งการบ้านให้โค้ช...");

    const formData = new FormData();
    formData.append("photo", compressedPhoto.file);
    formData.append("mealLabel", mealLabel);
    formData.append("note", note.trim());
    formData.append("imageWidth", String(compressedPhoto.width));
    formData.append("imageHeight", String(compressedPhoto.height));

    const response = await fetch("/api/member/meal-homework", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;

      setStatus("error");
      setMessage(body?.error ?? "ส่งการบ้านไม่สำเร็จ");
      return;
    }

    const body = (await response.json()) as { submission: MealHomeworkSubmission };
    setStatus("success");
    setMessage("ส่งการบ้านสำเร็จแล้ว");
    onSubmitted(body.submission);
  }

  return (
    <div className="absolute inset-0 z-30 flex items-end bg-[#3E352B]/36 px-3 pb-4 backdrop-blur-sm">
      <section className="w-full overflow-hidden rounded-[28px] border border-white/30 bg-white/30 text-[#27231E] shadow-[0_24px_70px_rgba(42,32,22,0.28)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]">
        <div className="border-b border-white/30 bg-[#9E826B] px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-[var(--font-coach-display)] text-[20px] font-semibold leading-tight text-[#FFF8EC]">
                ส่งการบ้านมื้ออาหาร
              </p>
              <p className="mt-1 text-[12px] font-medium text-[#FFF8EC]/82">
                เลือกรูปอาหาร ระบบจะย่อรูปก่อนบันทึก แล้วส่งให้โค้ชตรวจ
              </p>
            </div>
            <button
              aria-label="ปิดหน้าส่งการบ้าน"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/20 text-[#FFF8EC]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="space-y-4 px-4 py-4">
          <label className="flex min-h-44 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-white/55 bg-white/20 text-center backdrop-blur-[10px]">
            <input accept="image/*" className="sr-only" onChange={handlePhotoChange} type="file" />
            {photoPreviewUrl ? (
              <img alt="รูปอาหารที่เตรียมส่ง" className="h-44 w-full object-cover" src={photoPreviewUrl} />
            ) : (
              <span className="flex flex-col items-center px-4 py-5">
                <MealPhotoIcon className="h-9 w-9 text-[#536044]" />
                <span className="mt-3 text-[15px] font-bold text-[#27231E]">เพิ่มรูปอาหาร</span>
                <span className="mt-1 text-[12px] font-semibold text-[#6F6255]">
                  รองรับรูปอาหารทุกมื้อที่ต้องส่งวันนี้
                </span>
              </span>
            )}
          </label>

          {compressedPhoto ? (
            <p className="text-[11px] font-semibold text-[#6F6255]">
              รูปถูกปรับเป็น {compressedPhoto.width}x{compressedPhoto.height}px ·{" "}
              {(compressedPhoto.compressedSize / 1024).toFixed(0)}KB
            </p>
          ) : null}

          <div>
            <p className="mb-2 text-[12px] font-bold text-[#6F6255]">เลือกมื้อ</p>
            <div className="grid grid-cols-4 gap-2">
              {mealOptions.map((meal) => (
                <button
                  key={meal}
                  className={`rounded-full px-3 py-2 text-[12px] font-bold ${
                    mealLabel === meal ? "bg-[#8F9F7E] text-[#26301E]" : "bg-white/30 text-[#6F6255]"
                  }`}
                  onClick={() => setMealLabel(meal)}
                  type="button"
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/30 bg-white/20 px-4 py-3">
            <label className="text-[12px] font-bold text-[#6F6255]" htmlFor="meal-homework-note">
              อยากบอกอะไรกับโค้ช พิมพ์ได้เลยค่ะ
            </label>
            <textarea
              className="mt-2 min-h-20 w-full resize-none rounded-[16px] border border-white/35 bg-white/20 px-3 py-2 text-[14px] font-semibold text-[#27231E] outline-none placeholder:text-[#27231E]/42"
              id="meal-homework-note"
              onChange={(event) => setNote(event.target.value)}
              placeholder="เช่น วันนี้ทานข้าวประมาณครึ่งจาน เพิ่มไข่ต้ม 1 ฟองค่ะ"
              value={note}
            />
          </div>

          {message ? (
            <p
              className={`rounded-[18px] px-4 py-3 text-[12px] font-bold ${
                status === "error"
                  ? "bg-[#BC8F8F]/35 text-[#3E2424]"
                  : status === "success"
                    ? "bg-[#8F9F7E]/35 text-[#26301E]"
                    : "bg-white/20 text-[#6F6255]"
              }`}
            >
              {message}
            </p>
          ) : null}

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <button
              className="rounded-full bg-[#8F9F7E] px-4 py-3 text-[14px] font-bold text-[#26301E] shadow-[0_10px_20px_rgba(83,96,68,0.20)] disabled:cursor-not-allowed disabled:opacity-55"
              disabled={status === "compressing" || status === "submitting" || !compressedPhoto}
              onClick={submitHomework}
              type="button"
            >
              {status === "submitting" ? "กำลังส่ง..." : "ส่งการบ้านให้โค้ช"}
            </button>
            <button
              className="rounded-full border border-white/35 bg-white/20 px-4 py-3 text-[14px] font-bold text-[#27231E]"
              onClick={onClose}
              type="button"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StickerTray() {
  const stickers = [
    { sticker: "🌿", label: "ค่อย ๆ ไป" },
    { sticker: "💧", label: "ดื่มน้ำแล้ว" },
    { sticker: "🥗", label: "มื้อดี" },
    { sticker: "💪", label: "สู้ต่อ" },
    { sticker: "✨", label: "ทำได้ดี" },
    { sticker: "❤️", label: "กำลังใจ" },
  ];

  return (
    <div className="mt-3 rounded-[22px] border border-white/30 bg-white/30 p-3 shadow-[0_12px_28px_rgba(42,32,22,0.14)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]">
      <div className="grid grid-cols-3 gap-2">
        {stickers.map((item) => (
          <button
            key={item.label}
            className="rounded-[18px] border border-white/30 bg-white/20 px-2 py-2 text-center text-[#27231E]"
            type="button"
          >
            <span className="block text-[24px] leading-none">{item.sticker}</span>
            <span className="mt-1 block text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageHeader({
  sender,
  time,
  tone,
}: {
  sender: string;
  time: string;
  tone: "coach" | "member";
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[13px] font-bold text-black">{sender}</p>
      <p className={`text-[11px] font-semibold ${tone === "coach" ? "text-black/78" : "text-black/75"}`}>
        {time}
      </p>
    </div>
  );
}

function Reactions({ reactions }: { reactions: readonly { emoji: string; count: number }[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {reactions.map((reaction) => (
        <span
          key={`${reaction.emoji}-${reaction.count}`}
          className="rounded-[20px] border border-white/30 bg-white/20 px-2.5 py-1 text-[11px] font-bold text-black shadow-[0_8px_32px_0_rgba(0,0,0,0.16)] backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]"
        >
          {reaction.emoji} {reaction.count}
        </span>
      ))}
    </div>
  );
}

function formatBangkokDateTime(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  }).format(new Date(value));
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function MealPhotoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8.5h3l1.4-2h4.2l1.4 2h3A2.5 2.5 0 0 1 19.5 11v5A2.5 2.5 0 0 1 17 18.5H7A2.5 2.5 0 0 1 4.5 16v-5A2.5 2.5 0 0 1 7 8.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.6 13.3a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 0 0-4.8 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.6 7.4c.1-1.8 1.2-3 3.3-3.7.3 2-.6 3.2-2.6 3.8" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.8 7.7c-1.2-1.2-2.6-1.4-4.2-.5.7 1.3 1.9 1.9 3.6 1.6" />
    </svg>
  );
}

function DropletIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3s6 6.2 6 11a6 6 0 1 1-12 0c0-4.8 6-11 6-11Z" />
    </svg>
  );
}

function SmileIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 9h.01M15.5 9h.01M8 14c1 1.4 2.4 2 4 2s3-.6 4-2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function CoachMessageIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7.5A3.5 3.5 0 0 1 8.5 4h7A3.5 3.5 0 0 1 19 7.5v4A3.5 3.5 0 0 1 15.5 15H12l-4.5 3v-3A3.5 3.5 0 0 1 4 11.5v-4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8.5h6M9 11.2h3.5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17.5c1.6.2 2.8 1 3.5 2.5M14 17.5c-1.6.2-2.8 1-3.5 2.5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 14-7-4 14-3-6-7-1Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
