"use client";

import { useEffect, useState } from "react";
import { compressMealPhoto, type CompressedMealPhoto } from "@/lib/compressMealPhoto";
import type { MealHomeworkSubmission } from "@/types/mealHomework";

const mealOptions = ["เช้า", "กลางวัน", "เย็น", "มื้อว่าง"] as const;

export default function MemberFoodPage() {
  const [compressedPhoto, setCompressedPhoto] = useState<CompressedMealPhoto | null>(null);
  const [mealLabel, setMealLabel] = useState<(typeof mealOptions)[number]>("เช้า");
  const [note, setNote] = useState("");
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "compressing" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submissions, setSubmissions] = useState<MealHomeworkSubmission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSubmissions() {
      const response = await fetch("/api/member/meal-homework");

      if (!isMounted) {
        return;
      }

      if (!response.ok) {
        setIsLoadingSubmissions(false);
        return;
      }

      const body = (await response.json()) as { submissions?: MealHomeworkSubmission[] };
      setSubmissions(body.submissions ?? []);
      setIsLoadingSubmissions(false);
    }

    loadSubmissions();

    return () => {
      isMounted = false;
    };
  }, []);

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
    setSubmissions((current) => [body.submission, ...current]);
    setCompressedPhoto(null);
    setPhotoPreviewUrl("");
    setNote("");
    setStatus("success");
    setMessage("ส่งการบ้านสำเร็จแล้ว โค้ชจะเห็นรายการนี้ในระบบ");
  }

  return (
    <main className="min-h-screen bg-[#EFE4D3] px-3 py-4 font-[var(--font-sans-thai)] text-[#30291F] sm:py-6">
      <div className="mx-auto min-h-[calc(100vh-2rem)] w-full max-w-[430px] overflow-hidden rounded-[32px] border border-[#E6D0BC] bg-[#FFF8EC] shadow-[0_24px_70px_rgba(82,65,45,0.18)]">
        <header className="relative overflow-hidden bg-[#9E826B] px-5 pb-6 pt-5 text-[#FFF8EC]">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#F4D6A5]/25" />
          <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-full bg-[#8F9F7E]/24" />
          <div className="relative">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FFF8EC]/75">
              Meal homework
            </p>
            <h1 className="mt-2 font-[var(--font-serif-thai)] text-[27px] font-semibold leading-tight">
              ส่งการบ้านมื้ออาหาร
            </h1>
            <p className="mt-2 text-[13px] font-medium leading-6 text-[#FFF8EC]/86">
              อัปโหลดรูปอาหารจริง ระบบจะย่อรูปก่อนบันทึก แล้วส่งให้โค้ชตรวจใน Healthy Journey
            </p>
          </div>
        </header>

        <section className="space-y-5 px-4 py-5">
          <section className="rounded-[28px] border border-[#E6D0BC] bg-[#FFFDF7] p-4 shadow-[0_14px_34px_rgba(82,65,45,0.08)]">
            <label className="flex min-h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-[#B89A7E] bg-[#F5E8D6] text-center transition hover:bg-[#F1DFC7]">
              <input
                accept="image/*"
                className="sr-only"
                onChange={handlePhotoChange}
                type="file"
              />
              {photoPreviewUrl ? (
                <img
                  alt="รูปอาหารที่เตรียมส่ง"
                  className="h-52 w-full object-cover"
                  src={photoPreviewUrl}
                />
              ) : (
                <span className="flex flex-col items-center px-5 py-8">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#E8D8C1] text-[#536044]">
                    <MealPhotoIcon className="h-7 w-7" />
                  </span>
                  <span className="mt-3 text-[16px] font-bold text-[#30291F]">เลือกรูปอาหาร</span>
                  <span className="mt-1 text-[12px] font-semibold leading-5 text-[#6F6255]">
                    รูปจะถูกปรับขนาดก่อนเก็บ เพื่อให้ระบบเร็วและประหยัดค่าใช้จ่าย
                  </span>
                </span>
              )}
            </label>

            {compressedPhoto ? (
              <p className="mt-3 text-[11px] font-semibold text-[#6F6255]">
                รูปถูกปรับเป็น {compressedPhoto.width}x{compressedPhoto.height}px ·{" "}
                {(compressedPhoto.compressedSize / 1024).toFixed(0)}KB
              </p>
            ) : null}

            <div className="mt-4">
              <p className="mb-2 text-[12px] font-bold text-[#6F6255]">เลือกมื้อ</p>
              <div className="grid grid-cols-4 gap-2">
                {mealOptions.map((meal) => (
                  <button
                    className={`rounded-full px-2.5 py-2 text-[12px] font-bold transition ${
                      mealLabel === meal
                        ? "bg-[#536044] text-[#FFF8EC] shadow-[0_8px_18px_rgba(83,96,68,0.22)]"
                        : "bg-[#E8D8C1] text-[#4D4034]"
                    }`}
                    key={meal}
                    onClick={() => setMealLabel(meal)}
                    type="button"
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[12px] font-bold text-[#6F6255]" htmlFor="meal-homework-note">
                รายละเอียดเพิ่มเติมถึงโค้ช
              </label>
              <textarea
                className="mt-2 min-h-24 w-full resize-none rounded-[18px] border border-[#E3D0B8] bg-white px-4 py-3 text-[14px] font-medium leading-6 text-[#30291F] outline-none placeholder:text-[#9A8A78]"
                id="meal-homework-note"
                onChange={(event) => setNote(event.target.value)}
                placeholder="เช่น วันนี้ทานข้าวประมาณครึ่งจาน เพิ่มไข่ต้ม 1 ฟองค่ะ"
                value={note}
              />
            </div>

            {message ? (
              <p
                className={`mt-4 rounded-[18px] px-4 py-3 text-[12px] font-bold leading-5 ${
                  status === "error"
                    ? "bg-[#F1D0CA] text-[#713D36]"
                    : status === "success"
                      ? "bg-[#DCE8CF] text-[#3A4B2F]"
                      : "bg-[#EFE3D1] text-[#6F6255]"
                }`}
              >
                {message}
              </p>
            ) : null}

            <button
              className="mt-4 w-full rounded-full bg-[#536044] px-5 py-4 text-[15px] font-bold text-[#FFF8EC] shadow-[0_12px_24px_rgba(83,96,68,0.22)] disabled:cursor-not-allowed disabled:opacity-55"
              disabled={status === "compressing" || status === "submitting" || !compressedPhoto}
              onClick={submitHomework}
              type="button"
            >
              {status === "submitting" ? "กำลังส่ง..." : "ส่งการบ้านให้โค้ช"}
            </button>
          </section>

          <section className="rounded-[28px] border border-[#E6D0BC] bg-[#FFFDF7] p-4 shadow-[0_14px_34px_rgba(82,65,45,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8F7A67]">
                  Recent submissions
                </p>
                <h2 className="mt-1 text-[20px] font-bold text-[#30291F]">รายการที่ส่งแล้ว</h2>
              </div>
              <span className="rounded-full bg-[#E8D8C1] px-3 py-1 text-[12px] font-bold text-[#4D4034]">
                {submissions.length}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {isLoadingSubmissions ? (
                <p className="rounded-[18px] bg-[#F5E8D6] px-4 py-4 text-[13px] font-semibold text-[#6F6255]">
                  กำลังโหลดรายการส่งล่าสุด...
                </p>
              ) : null}

              {!isLoadingSubmissions && submissions.length === 0 ? (
                <p className="rounded-[18px] bg-[#F5E8D6] px-4 py-4 text-[13px] font-semibold leading-6 text-[#6F6255]">
                  ยังไม่มีรายการส่งจริง เมื่อส่งรูปอาหารสำเร็จ รายการจะขึ้นที่นี่
                </p>
              ) : null}

              {submissions.map((submission) => (
                <article
                  className="rounded-[18px] border border-[#E6D0BC] bg-[#F5E8D6] px-4 py-3"
                  key={submission.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-bold text-[#30291F]">มื้อ{submission.meal_label}</p>
                      <p className="mt-1 text-[12px] font-semibold text-[#7B6D5F]">
                        {formatBangkokDateTime(submission.submitted_at)}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#DCE8CF] px-3 py-1 text-[11px] font-bold text-[#3A4B2F]">
                      ส่งแล้ว
                    </span>
                  </div>
                  {submission.note ? (
                    <p className="mt-2 text-[13px] font-medium leading-6 text-[#5B4D40]">
                      {submission.note}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function formatBangkokDateTime(value: string) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  }).format(new Date(value));
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
