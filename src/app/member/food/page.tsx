"use client";

import { useState } from "react";
import { compressMealPhoto, type CompressedMealPhoto } from "@/lib/compressMealPhoto";

const chatMessages = [
  {
    id: "m1",
    sender: "แพร",
    time: "08:12",
    type: "text",
    body: "เช้านี้เริ่มเบา ๆ ก่อนนะคะ วันนี้อยากดื่มน้ำให้ครบด้วย",
    reactions: [
      { emoji: "❤️", count: 4 },
      { emoji: "👍", count: 2 },
    ],
    tone: "member",
  },
  {
    id: "m2",
    sender: "เมย์",
    time: "08:24",
    type: "food",
    mealName: "ข้าว ไข่ต้ม และผักลวก",
    mealTime: "เช้า",
    imageSrc: "/images/prae-lunch.webp",
    reactions: [
      { emoji: "🥗", count: 5 },
      { emoji: "❤️", count: 3 },
    ],
    tone: "member",
  },
  {
    id: "m3",
    sender: "โค้ชดาว",
    time: "08:31",
    type: "text",
    body: "ดูอบอุ่นมากค่ะ ใครมีมื้อเช้าแล้วแวะมาแชร์กันได้เลยนะ",
    reactions: [
      { emoji: "😊", count: 6 },
      { emoji: "❤️", count: 4 },
    ],
    tone: "coach",
  },
  {
    id: "m4",
    sender: "บีม",
    time: "09:05",
    type: "water",
    amount: "1.2L",
    goal: "2L",
    progress: 60,
    reactions: [
      { emoji: "💧", count: 7 },
      { emoji: "👍", count: 3 },
    ],
    tone: "member",
  },
  {
    id: "m6",
    sender: "นุ่น",
    time: "09:22",
    type: "sticker",
    sticker: "🌿",
    label: "วันนี้ไปต่อแบบนุ่ม ๆ",
    reactions: [
      { emoji: "😂", count: 2 },
      { emoji: "❤️", count: 5 },
    ],
    tone: "member",
  },
] as const;

const roomActions = [
  {
    id: "homework",
    label: "ส่งการบ้าน",
    icon: MealPhotoIcon,
    className: "bg-[#8F9F7E] text-[#26301E]",
  },
  {
    id: "water",
    label: "บันทึกน้ำ",
    icon: DropletIcon,
    className: "bg-[#A9C8BE] text-[#1F3530]",
  },
  {
    id: "coach-message",
    label: "คุยกับโค้ช",
    icon: CoachMessageIcon,
    className: "bg-[#D9A6A3] text-[#3D2524]",
  },
] as const;

export default function MemberFoodPage() {
  const [isHomeworkOpen, setIsHomeworkOpen] = useState(false);
  const [isWaterOpen, setIsWaterOpen] = useState(false);
  const [isStickerOpen, setIsStickerOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#EDE1D0] font-[var(--font-sans-thai)] text-[#3E352B] sm:px-3 sm:py-6">
      <div className="mx-auto flex min-h-screen w-full flex-col overflow-hidden bg-[#DCC9AE] bg-[url('/images/background_food1.png')] bg-[length:100%_auto] bg-center bg-repeat sm:min-h-[calc(100vh-3rem)] sm:max-w-[430px] sm:rounded-[32px] sm:border sm:border-[#E6D0BC] sm:shadow-[0_24px_70px_rgba(82,65,45,0.22)]">
        <div className="relative flex min-h-screen flex-col overflow-hidden sm:min-h-[calc(100vh-3rem)]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,239,224,0.34)_0%,rgba(231,215,191,0.24)_44%,rgba(143,159,126,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,247,232,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(190,132,126,0.14),transparent_32%)]" />

          <div className="relative flex min-h-screen w-full flex-col sm:min-h-[calc(100vh-3rem)]">
          <header className="sticky top-0 z-20 border-b border-[#A98970] bg-[#9E826B] px-4 py-3 shadow-[0_10px_30px_rgba(82,65,45,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="font-[var(--font-serif-thai)] text-[21px] font-semibold leading-tight text-[#FFF8EC]">
                  ห้องพูดคุยและส่งการบ้าน
                </h1>
                <p className="mt-1 text-[12px] font-medium text-[#FFF8EC]/82">
                  สมาชิก 28 คน กำลังคุยกันในห้อง
                </p>
              </div>
              <button
                aria-label="เปิดเมนูห้อง"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#EEE0CA]/80 bg-[#FFF8EC]/88 text-[#536044]"
                type="button"
              >
                <MenuIcon />
              </button>
            </div>
          </header>

          <section className="flex-1 space-y-4 overflow-y-auto px-3 py-4 pb-[182px]">
            {chatMessages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
          </section>

          <footer className="sticky bottom-0 z-20 w-full border-t border-[#A98970] bg-[#9E826B] px-3 pb-4 pt-3 shadow-[0_-16px_40px_rgba(82,65,45,0.12)]">
            <div className="grid grid-cols-3 gap-2">
              {roomActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    className={`flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[22px] px-2.5 py-2.5 text-center text-[12px] font-bold leading-[1.15] shadow-[0_8px_18px_rgba(82,65,45,0.12)] ${action.className}`}
                    onClick={() => {
                      if (action.id === "homework") {
                        setIsHomeworkOpen(true);
                      }
                      if (action.id === "water") {
                        setIsWaterOpen(true);
                      }
                    }}
                    type="button"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="max-w-full text-balance">{action.label}</span>
                  </button>
                );
              })}
            </div>

            {isStickerOpen ? <StickerTray /> : null}

            <div className="mt-3 flex items-center gap-2">
              <button
                aria-label="เปิดสติกเกอร์"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#E8D8C1] bg-[#FFF7EB]/92 text-[#BE847E]"
                onClick={() => setIsStickerOpen((current) => !current)}
                type="button"
              >
                <SmileIcon className="h-5 w-5" />
              </button>
              <div className="flex min-h-11 flex-1 items-center rounded-full border border-[#E8D8C1] bg-[#FFF7EB]/92 px-4 text-[14px] text-[#9A8A78]">
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
            <RealHomeworkSheet onClose={() => setIsHomeworkOpen(false)} />
          ) : null}
          {isWaterOpen ? (
            <WaterSheet onClose={() => setIsWaterOpen(false)} />
          ) : null}
        </div>
      </div>
      </div>
    </main>
  );
}

function RealHomeworkSheet({ onClose }: { onClose: () => void }) {
  const [compressedPhoto, setCompressedPhoto] = useState<CompressedMealPhoto | null>(null);
  const [mealLabel, setMealLabel] = useState("เช้า");
  const [note, setNote] = useState("");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "compressing" | "submitting" | "success" | "error">("idle");
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
    formData.append("note", note);
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

    setStatus("success");
    setMessage("ส่งการบ้านสำเร็จแล้ว โค้ชจะเห็นรายการนี้ในระบบ");
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
            <input
              accept="image/*"
              className="sr-only"
              onChange={handlePhotoChange}
              type="file"
            />
            {photoPreviewUrl ? (
              <img
                alt="รูปอาหารที่เตรียมส่ง"
                className="h-44 w-full object-cover"
                src={photoPreviewUrl}
              />
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
              รูปถูกปรับเป็น {compressedPhoto.width}x{compressedPhoto.height}px · {(compressedPhoto.compressedSize / 1024).toFixed(0)}KB
            </p>
          ) : null}

          <div>
            <p className="mb-2 text-[12px] font-bold text-[#6F6255]">เลือกมื้อ</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "เช้า", className: "bg-[#A9B5E3] text-[#252A40]" },
                { label: "กลางวัน", className: "bg-[#9DD8D4] text-[#173B38]" },
                { label: "เย็น", className: "bg-[#BC8F8F] text-[#3E2424]" },
              ].map((meal) => (
                <button
                  key={meal.label}
                  className={`rounded-full px-3 py-2 text-[12px] font-bold ${meal.className} ${
                    mealLabel === meal.label ? "ring-2 ring-[#27231E]/60" : ""
                  }`}
                  onClick={() => setMealLabel(meal.label)}
                  type="button"
                >
                  {meal.label}
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

function HomeworkSheet({ onClose }: { onClose: () => void }) {
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
                ถ่ายรูปอาหาร แล้วส่งการบ้านในกลุ่ม ได้เลยค่ะ
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
          <button
            className="flex h-44 w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-white/55 bg-white/20 text-center backdrop-blur-[10px]"
            type="button"
          >
            <MealPhotoIcon className="h-9 w-9 text-[#536044]" />
            <span className="mt-3 text-[15px] font-bold text-[#27231E]">เพิ่มรูปอาหาร</span>
            <span className="mt-1 text-[12px] font-semibold text-[#6F6255]">
              ถ่ายรูปอาหารที่คุณทานมื้อนี้ แล้วกดส่งที่ปุ่มด้านล่าง
            </span>
          </button>

          <div>
            <p className="mb-2 text-[12px] font-bold text-[#6F6255]">เลือกมื้อ</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "เช้า", className: "bg-[#A9B5E3] text-[#252A40]" },
                { label: "กลางวัน", className: "bg-[#9DD8D4] text-[#173B38]" },
                { label: "เย็น", className: "bg-[#BC8F8F] text-[#3E2424]" },
              ].map((meal) => (
                <button
                  key={meal.label}
                  className={`rounded-full px-3 py-2 text-[12px] font-bold ${meal.className}`}
                  type="button"
                >
                  {meal.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/30 bg-white/20 px-4 py-3">
            <p className="text-[12px] font-bold text-[#6F6255]">อยากบอกอะไร พิมพ์ได้เลยค่ะ</p>
            <p className="mt-2 text-[14px] font-semibold text-[#27231E]/42">
              วันนี้ทานข้าวประมาณครึ่งจาน เพิ่มไข่ต้ม 1 ฟองค่ะ
            </p>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <button
              className="rounded-full bg-[#8F9F7E] px-4 py-3 text-[14px] font-bold text-[#26301E] shadow-[0_10px_20px_rgba(83,96,68,0.20)]"
              type="button"
            >
              ส่งการบ้านในกลุ่ม
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

function WaterSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end bg-[#3E352B]/36 px-3 pb-4 backdrop-blur-sm">
      <section className="w-full overflow-hidden rounded-[28px] border border-white/30 bg-white/30 text-[#27231E] shadow-[0_24px_70px_rgba(42,32,22,0.28)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]">
        <div className="border-b border-white/30 bg-[#9E826B] px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-[var(--font-coach-display)] text-[20px] font-semibold leading-tight text-[#FFF8EC]">
                บันทึกการดื่มน้ำวันนี้
              </p>
              <p className="mt-1 text-[12px] font-medium text-[#FFF8EC]/82">
                เลือกปริมาณน้ำที่ดื่ม แล้วโพสต์อัปเดตในกลุ่มได้เลยค่ะ
              </p>
            </div>
            <button
              aria-label="ปิดหน้าบันทึกน้ำ"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/20 text-[#FFF8EC]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="space-y-4 px-4 py-4">
          <div className="rounded-[24px] border border-white/30 bg-white/20 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-bold text-[#6F6255]">วันนี้ดื่มแล้ว</p>
                <p className="mt-1 font-[var(--font-coach-display)] text-[42px] font-semibold leading-none text-[#27231E]">
                  1.2L
                </p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#A9C8BE] text-[#1F3530]">
                <DropletIcon className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/30">
              <div className="h-full rounded-full bg-[#8F9F7E]" style={{ width: "60%" }} />
            </div>
            <p className="mt-2 text-[12px] font-semibold text-[#6F6255]">เป้าหมาย 2L ต่อวัน</p>
          </div>

          <div>
            <p className="mb-2 text-[12px] font-bold text-[#6F6255]">เพิ่มปริมาณน้ำ</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "+250ml", hint: "ประมาณ 1 แก้ว", className: "bg-[#A9B5E3] text-[#252A40]" },
                { label: "+500ml", hint: "ประมาณ 2 แก้ว", className: "bg-[#9DD8D4] text-[#173B38]" },
                { label: "+1000ml", hint: "ประมาณ 4 แก้ว", className: "bg-[#BC8F8F] text-[#3E2424]" },
              ].map((amount) => (
                <button
                  key={amount.label}
                  className={`rounded-[18px] px-3 py-2.5 text-center ${amount.className}`}
                  type="button"
                >
                  <span className="block text-[12px] font-bold">{amount.label}</span>
                  <span className="mt-0.5 block text-[10px] font-semibold opacity-75">{amount.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/30 bg-white/20 px-4 py-3">
            <p className="text-[12px] font-bold text-[#6F6255]">อยากบอกอะไร พิมพ์ได้เลยค่ะ</p>
            <p className="mt-2 text-[14px] font-semibold text-[#27231E]/42">
              เพิ่งดื่มน้ำหลังมื้อกลางวัน เพิ่มอีก 1 แก้วค่ะ
            </p>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <button
              className="rounded-full bg-[#A9C8BE] px-4 py-3 text-[14px] font-bold text-[#1F3530] shadow-[0_10px_20px_rgba(83,96,68,0.16)]"
              type="button"
            >
              บันทึกการดื่มน้ำวันนี้
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

function ChatBubble({ message }: { message: (typeof chatMessages)[number] }) {
  const isCoach = message.tone === "coach";
  const bubbleTone = isCoach ? "own" : "other";
  const bubbleClass =
    bubbleTone === "own"
      ? "text-white"
      : "text-[#27231E]";
  if (message.type === "sticker") {
    return (
      <div className={`flex w-full ${isCoach ? "justify-end" : "justify-start"}`}>
        <article
          className={`max-w-[72%] overflow-hidden rounded-xl border border-white/30 bg-white/30 px-5 py-4 text-center shadow-none backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] ${bubbleClass}`}
        >
          <div className="relative">
            <MessageHeader sender={message.sender} time={message.time} tone={bubbleTone} />
            <div className="py-3 text-6xl leading-none">{message.sticker}</div>
            <p className="text-[13px] font-semibold">{message.label}</p>
            <Reactions reactions={message.reactions} tone={bubbleTone} />
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isCoach ? "justify-end" : "justify-start"}`}>
      <article
        className={`max-w-[76%] overflow-hidden rounded-xl border border-white/30 bg-white/30 px-4 py-3 shadow-none backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] ${bubbleClass}`}
      >
        <div className="relative">
        <MessageHeader sender={message.sender} time={message.time} tone={bubbleTone} />

        {message.type === "text" ? (
          <p className="mt-2 text-[14px] leading-7">{message.body}</p>
        ) : null}

        {message.type === "food" ? (
          <div className="mt-3 overflow-hidden rounded-[22px]">
            <div className="h-44 rounded-[22px] bg-[url('/images/prae-lunch.webp')] bg-cover bg-center" />
            <div className="p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[15px] font-bold">{message.mealName}</p>
                  <p className="mt-1 text-[12px] font-semibold opacity-75">
                    มื้อ{message.mealTime}
                  </p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full">
                  <ForkKnifeIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {message.type === "water" ? (
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full">
                <DropletIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-bold">{message.amount}</p>
                  <p className="text-[12px] font-semibold opacity-75">
                    เป้าหมาย {message.goal}
                  </p>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-[#8F9F7E]"
                    style={{ width: `${message.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <Reactions reactions={message.reactions} tone={bubbleTone} />
        </div>
      </article>
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
  tone: "own" | "other";
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[13px] font-bold">{sender}</p>
      <p className={`text-[11px] font-semibold ${tone === "own" ? "text-[#27231E]/62" : "text-white"}`}>
        {time}
      </p>
    </div>
  );
}

function Reactions({
  reactions,
  tone,
}: {
  reactions: readonly { emoji: string; count: number }[];
  tone: "own" | "other";
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {reactions.map((reaction) => (
        <span
          key={`${reaction.emoji}-${reaction.count}`}
          className="text-[11px] font-bold text-[#27231E]/78"
        >
          {reaction.emoji} {reaction.count}
        </span>
      ))}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function ForkKnifeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3v8m3-8v8M7 7h3m-1.5 4v10M17 3v18m0-18c-2.2 1.7-3 3.8-3 6.3 0 2.2 1.2 3.7 3 3.7" />
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
