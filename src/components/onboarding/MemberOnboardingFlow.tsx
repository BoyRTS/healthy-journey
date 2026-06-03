"use client";

import { useState } from "react";

type MemberOnboardingFlowProps = {
  action: (formData: FormData) => void | Promise<void>;
};

type FieldName =
  | "nickname"
  | "phone"
  | "goal"
  | "motivation"
  | "gender"
  | "birthYear"
  | "heightCm"
  | "weightKg"
  | "desiredWeightKg"
  | "targetDate"
  | "activityLevel"
  | "chronicConditions"
  | "eatingStyle"
  | "allergies"
  | "additiveReactions";

const initialValues: Record<FieldName, string> = {
  nickname: "",
  phone: "",
  goal: "ลดน้ำหนัก",
  motivation: "มีพลังตลอดวัน",
  gender: "ไม่ระบุ",
  birthYear: "1995",
  heightCm: "165",
  weightKg: "70",
  desiredWeightKg: "63",
  targetDate: "ภายใน 12 สัปดาห์",
  activityLevel: "เริ่มต้น",
  chronicConditions: "",
  eatingStyle: "สมดุล",
  allergies: "",
  additiveReactions: "",
};

const goals = ["ลดน้ำหนัก", "คุมน้ำหนัก", "เพิ่มกล้ามเนื้อ", "สุขภาพดีขึ้น", "ฟิตขึ้น"];
const motivations = [
  "มีพลังตลอดวัน",
  "มั่นใจเวลาเข้าสังคม",
  "ดูแลโรคประจำตัวให้ดีขึ้น",
  "อยากใช้ชีวิตได้เต็มที่",
];
const activityLevels = ["เริ่มต้น", "ขยับบ้าง", "ออกกำลังสม่ำเสมอ", "แอคทีฟมาก"];
const chronicOptions = ["ความดัน", "ไขมันสูง", "เบาหวาน", "กรดไหลย้อน", "ไขมันพอกตับ", "PCOS"];
const eatingStyles = ["สมดุล", "โปรตีนสูง", "ลดแป้ง", "มังสวิรัติ", "คีโต", "งดนม"];
const allergyOptions = ["ถั่ว", "นม", "ไข่", "อาหารทะเล", "ปลา", "กลูเตน", "งา", "ไม่มี"];
const reactionOptions = ["ปวดท้อง", "ผื่นคัน", "ปวดหัว/เวียนหัว", "หายใจลำบาก", "อ่อนเพลีย", "ไม่มี"];

function joinToggleValue(current: string, value: string) {
  if (value === "ไม่มี") {
    return current === "ไม่มี" ? "" : "ไม่มี";
  }

  const values = current
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => item !== "ไม่มี");

  if (values.includes(value)) {
    return values.filter((item) => item !== value).join(", ");
  }

  return [...values, value].join(", ");
}

export function MemberOnboardingFlow({ action }: MemberOnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);

  const totalSteps = 7;
  const progress = Math.min(100, Math.round((step / totalSteps) * 100));
  const isFinalStep = step === totalSteps;

  function updateValue(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function toggleValue(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: joinToggleValue(current[name], value) }));
  }

  function nextStep() {
    setStep((current) => Math.min(totalSteps, current + 1));
  }

  function previousStep() {
    setStep((current) => Math.max(0, current - 1));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_14%,#d6fff3_0,transparent_30%),radial-gradient(circle_at_86%_18%,#fff1a8_0,transparent_28%),linear-gradient(180deg,#f8fcff_0%,#edf7ff_58%,#f8fbff_100%)] text-[#183247]">
      <AmbientDecor />
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[460px] flex-col px-5 pb-5 pt-6">
        {step > 0 ? (
          <div className="mb-7 flex items-center gap-4">
            <button
              aria-label="ย้อนกลับ"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl shadow-[0_10px_28px_rgba(24,50,71,0.1)] backdrop-blur transition active:scale-95"
              onClick={previousStep}
              type="button"
            >
              ‹
            </button>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#dbe6f0] shadow-[inset_0_2px_5px_rgba(24,50,71,0.08)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#1e7fe5,#19c2de)] shadow-[0_0_16px_rgba(35,131,220,0.45)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="min-w-12 text-right text-lg font-black text-[#2383dc]">
              {step}/{totalSteps}
            </span>
          </div>
        ) : null}

        <form action={action} className="flex flex-1 flex-col">
          {Object.entries(values).map(([name, value]) => (
            <input key={name} name={name} type="hidden" value={value} />
          ))}

          {step === 0 ? <IntroStep onNext={nextStep} /> : null}
          {step === 1 ? (
            <ChoiceStep
              eyebrow="เริ่มจากเป้าหมายหลัก"
              onChange={(value) => updateValue("goal", value)}
              options={goals}
              title="ตอนนี้คุณอยากให้ Healthy Journey ช่วยเรื่องไหนที่สุด?"
              value={values.goal}
            />
          ) : null}
          {step === 2 ? <BasicsStep onChange={updateValue} values={values} /> : null}
          {step === 3 ? <BodyStep onChange={updateValue} values={values} /> : null}
          {step === 4 ? <GoalPlanStep onChange={updateValue} values={values} /> : null}
          {step === 5 ? (
            <HealthContextStep onChange={updateValue} onToggle={toggleValue} values={values} />
          ) : null}
          {step === 6 ? (
            <FoodContextStep onChange={updateValue} onToggle={toggleValue} values={values} />
          ) : null}
          {step === 7 ? <ReadyStep values={values} /> : null}

          <div className="mt-auto pt-6">
            {isFinalStep ? (
              <button
                className="w-full rounded-full bg-[linear-gradient(135deg,#1d7fe0,#16b7d4)] px-6 py-4 text-xl font-black text-white shadow-[0_18px_34px_rgba(35,131,220,0.28)] transition hover:-translate-y-0.5 active:scale-[0.98]"
                type="submit"
              >
                บันทึกและเข้าหน้าสมาชิก
              </button>
            ) : step > 0 ? (
              <button
                className="w-full rounded-full bg-[linear-gradient(135deg,#1d7fe0,#16b7d4)] px-6 py-4 text-xl font-black text-white shadow-[0_18px_34px_rgba(35,131,220,0.28)] transition hover:-translate-y-0.5 active:scale-[0.98]"
                onClick={nextStep}
                type="button"
              >
                ต่อไป
              </button>
            ) : null}
          </div>
        </form>
      </section>
    </main>
  );
}

function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <HeroIllustration />
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2383dc]">Healthy Journey</p>
      <h1 className="mt-4 text-5xl font-black leading-tight text-[#132536]">
        สวัสดีค่ะ
        <br />
        มาตั้งต้นแผนของคุณกัน
      </h1>
      <p className="mt-5 text-lg leading-8 text-[#64727f]">
        ตอบคำถามสั้นๆ เพื่อให้โค้ชเห็นภาพสุขภาพ เป้าหมาย และข้อควรระวังของคุณตั้งแต่วันแรก
      </p>
      <button
        className="mt-12 w-full rounded-full bg-[linear-gradient(135deg,#1d7fe0,#16b7d4)] px-6 py-4 text-2xl font-black text-white shadow-[0_18px_34px_rgba(35,131,220,0.28)] transition hover:-translate-y-0.5 active:scale-[0.98]"
        onClick={onNext}
        type="button"
      >
        เริ่มเลย
      </button>
    </div>
  );
}

function ChoiceStep({
  eyebrow,
  title,
  value,
  options,
  onChange,
}: {
  eyebrow?: string;
  title: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      {eyebrow ? <p className="mb-3 text-sm font-black text-[#2383dc]">{eyebrow}</p> : null}
      <h1 className="text-4xl font-black leading-tight text-[#132536]">{title}</h1>
      <div className="mt-8 space-y-4">
        {options.map((option) => {
          const selected = option === value;

          return (
            <button
              className={`flex w-full items-center justify-between rounded-[1.5rem] border bg-white/92 px-5 py-5 text-left text-xl font-bold shadow-[0_10px_28px_rgba(24,50,71,0.06)] backdrop-blur transition hover:-translate-y-0.5 active:scale-[0.99] ${
                selected
                  ? "border-[#2383dc] bg-[#eef8ff] text-[#2383dc] ring-4 ring-[#2383dc]/10"
                  : "border-[#e4edf5] text-[#4f5d68]"
              }`}
              key={option}
              onClick={() => onChange(option)}
              type="button"
            >
              <span className="flex items-center gap-3">
                <span
                  className={`h-9 w-9 rounded-2xl ${
                    selected
                      ? "bg-[radial-gradient(circle_at_35%_30%,#fff,#7fd9ff_36%,#2383dc_100%)]"
                      : "bg-[linear-gradient(145deg,#f3fbff,#e5eef6)]"
                  }`}
                />
                {option}
              </span>
              <span
                className={`h-6 w-6 rounded-full border-2 ${
                  selected ? "border-[#2383dc] bg-[#2383dc]" : "border-[#d7e5f0]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BasicsStep({
  values,
  onChange,
}: {
  values: Record<FieldName, string>;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div>
      <h1 className="text-4xl font-black leading-tight text-[#132536]">ขอรู้จักคุณอีกนิด</h1>
      <p className="mt-3 text-lg leading-8 text-[#64727f]">
        ข้อมูลนี้ใช้ให้โค้ชเรียกชื่อและติดต่อสมาชิกได้สะดวกขึ้น
      </p>
      <div className="mt-8 space-y-5">
        <TextField
          label="ชื่อเล่นหรือชื่อที่อยากให้เรียก"
          name="nickname"
          onChange={(value) => onChange("nickname", value)}
          placeholder="เช่น แพร"
          required
          value={values.nickname}
        />
        <TextField
          label="เบอร์โทรสำหรับติดต่อ"
          name="phone"
          onChange={(value) => onChange("phone", value)}
          placeholder="08x-xxx-xxxx"
          type="tel"
          value={values.phone}
        />
        <ChoicePills
          label="เพศ"
          onChange={(value) => onChange("gender", value)}
          options={["หญิง", "ชาย", "ไม่ระบุ"]}
          value={values.gender}
        />
        <TextField
          label="ปีเกิด"
          name="birthYear"
          onChange={(value) => onChange("birthYear", value)}
          type="number"
          value={values.birthYear}
        />
      </div>
    </div>
  );
}

function BodyStep({
  values,
  onChange,
}: {
  values: Record<FieldName, string>;
  onChange: (name: FieldName, value: string) => void;
}) {
  const height = Number(values.heightCm);
  const weight = Number(values.weightKg);
  const bmi = height > 0 && weight > 0 ? weight / (height / 100) ** 2 : 0;

  return (
    <div>
      <h1 className="text-4xl font-black leading-tight text-[#132536]">ข้อมูลร่างกายปัจจุบัน</h1>
      <p className="mt-3 text-lg leading-8 text-[#64727f]">
        ใช้เป็นฐานให้โค้ชดูแนวโน้ม ไม่ใช่การวินิจฉัยทางการแพทย์
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <TextField
          label="ส่วนสูง (cm)"
          name="heightCm"
          onChange={(value) => onChange("heightCm", value)}
          type="number"
          value={values.heightCm}
        />
        <TextField
          label="น้ำหนัก (kg)"
          name="weightKg"
          onChange={(value) => onChange("weightKg", value)}
          type="number"
          value={values.weightKg}
        />
      </div>
      <div className="mt-7 overflow-hidden rounded-[2rem] border border-[#d8edf7] bg-white/92 p-6 shadow-[0_14px_34px_rgba(24,50,71,0.08)] backdrop-blur">
        <div className="mb-5 h-28 rounded-[1.5rem] bg-[radial-gradient(circle_at_20%_30%,#fef3bf_0,transparent_28%),radial-gradient(circle_at_80%_30%,#b7f4ef_0,transparent_32%),linear-gradient(135deg,#eef8ff,#ffffff)]" />
        <p className="text-lg font-bold text-[#64727f]">BMI โดยประมาณ</p>
        <p className="mt-2 text-5xl font-black text-[#0e3b63]">{bmi ? bmi.toFixed(1) : "-"}</p>
        <div className="mt-5 h-4 overflow-hidden rounded-full bg-gradient-to-r from-[#46b9e8] via-[#7bd447] via-45% to-[#ef625a]" />
        <p className="mt-4 text-sm leading-6 text-[#64727f]">
          ตัวเลขนี้ช่วยให้โค้ชเห็นภาพเริ่มต้นเท่านั้น แผนจริงจะดูพฤติกรรมและสุขภาพร่วมด้วย
        </p>
      </div>
    </div>
  );
}

function GoalPlanStep({
  values,
  onChange,
}: {
  values: Record<FieldName, string>;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div>
      <h1 className="text-4xl font-black leading-tight text-[#132536]">เป้าหมายและไลฟ์สไตล์</h1>
      <div className="mt-8 space-y-6">
        <TextField
          label="น้ำหนักเป้าหมาย (kg)"
          name="desiredWeightKg"
          onChange={(value) => onChange("desiredWeightKg", value)}
          type="number"
          value={values.desiredWeightKg}
        />
        <ChoicePills
          label="อยากไปถึงเป้าหมายเมื่อไร"
          onChange={(value) => onChange("targetDate", value)}
          options={["ภายใน 8 สัปดาห์", "ภายใน 12 สัปดาห์", "ภายใน 6 เดือน", "ค่อยเป็นค่อยไป"]}
          value={values.targetDate}
        />
        <ChoicePills
          label="ระดับกิจกรรม"
          onChange={(value) => onChange("activityLevel", value)}
          options={activityLevels}
          value={values.activityLevel}
        />
        <ChoicePills
          label="อะไรจะสร้างความเปลี่ยนแปลงให้คุณมากที่สุด?"
          onChange={(value) => onChange("motivation", value)}
          options={motivations}
          value={values.motivation}
        />
      </div>
    </div>
  );
}

function HealthContextStep({
  values,
  onToggle,
}: {
  values: Record<FieldName, string>;
  onToggle: (name: FieldName, value: string) => void;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div>
      <h1 className="text-4xl font-black leading-tight text-[#132536]">มีเรื่องสุขภาพที่โค้ชควรรู้ไหม?</h1>
      <p className="mt-3 text-lg leading-8 text-[#64727f]">เลือกได้หลายข้อ หรือข้ามได้ถ้ายังไม่แน่ใจ</p>
      <ToggleGrid
        onToggle={(value) => onToggle("chronicConditions", value)}
        options={chronicOptions}
        value={values.chronicConditions}
      />
    </div>
  );
}

function FoodContextStep({
  values,
  onToggle,
  onChange,
}: {
  values: Record<FieldName, string>;
  onToggle: (name: FieldName, value: string) => void;
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <div>
      <h1 className="text-4xl font-black leading-tight text-[#132536]">อาหารที่ควรรู้ก่อนเริ่ม</h1>
      <div className="mt-8 space-y-7">
        <ChoicePills
          label="สไตล์การกิน"
          onChange={(value) => onChange("eatingStyle", value)}
          options={eatingStyles}
          value={values.eatingStyle}
        />
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#64727f]">
            แพ้อาหาร / เลี่ยงอาหาร
          </p>
          <ToggleGrid
            onToggle={(value) => onToggle("allergies", value)}
            options={allergyOptions}
            value={values.allergies}
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#64727f]">
            เคยมีอาการหลังทานบางอย่างไหม
          </p>
          <ToggleGrid
            onToggle={(value) => onToggle("additiveReactions", value)}
            options={reactionOptions}
            value={values.additiveReactions}
          />
        </div>
      </div>
    </div>
  );
}

function ReadyStep({ values }: { values: Record<FieldName, string> }) {
  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <TrophyVisual />
      <h1 className="text-5xl font-black leading-tight text-[#132536]">แผนเริ่มต้นพร้อมแล้ว</h1>
      <p className="mt-5 text-lg leading-8 text-[#64727f]">
        โค้ชจะเห็นข้อมูลของ {values.nickname || "สมาชิก"} เพื่อช่วยเลือกแนวทางและติดตามการบ้านได้เหมาะขึ้น
      </p>
      <div className="mt-8 rounded-[2rem] border border-[#d8edf7] bg-white/92 p-5 text-left shadow-[0_14px_34px_rgba(24,50,71,0.08)] backdrop-blur">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2383dc]">สรุปข้อมูล</p>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <SummaryItem label="เป้าหมาย" value={values.goal} />
          <SummaryItem label="กิจกรรม" value={values.activityLevel} />
          <SummaryItem label="ส่วนสูง" value={`${values.heightCm} cm`} />
          <SummaryItem label="น้ำหนัก" value={`${values.weightKg} kg`} />
        </dl>
      </div>
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  placeholder,
  required,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "number" | "tel";
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black uppercase tracking-[0.16em] text-[#64727f]">
        {label}
      </span>
      <input
        className="w-full rounded-[1.35rem] border border-[#dfeaf2] bg-white/95 px-5 py-4 text-lg font-bold text-[#183247] outline-none shadow-[0_10px_28px_rgba(24,50,71,0.05)] transition focus:border-[#2383dc] focus:ring-4 focus:ring-[#2383dc]/10"
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function ChoicePills({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#64727f]">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const selected = option === value;

          return (
            <button
              className={`rounded-full border px-4 py-3 text-sm font-black transition active:scale-95 ${
                selected
                  ? "border-[#2383dc] bg-[#2383dc] text-white shadow-[0_10px_24px_rgba(35,131,220,0.22)]"
                  : "border-[#dfeaf2] bg-white/92 text-[#4f5d68]"
              }`}
              key={option}
              onClick={() => onChange(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleGrid({
  options,
  value,
  onToggle,
}: {
  options: string[];
  value: string;
  onToggle: (value: string) => void;
}) {
  const selectedValues = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = selectedValues.includes(option);

        return (
          <button
            className={`rounded-[1.25rem] border bg-white/92 px-4 py-4 text-center text-base font-black shadow-[0_10px_28px_rgba(24,50,71,0.05)] transition hover:-translate-y-0.5 active:scale-[0.98] ${
              selected
                ? "border-[#2383dc] bg-[#eef8ff] text-[#2383dc] ring-4 ring-[#2383dc]/10"
                : "border-[#e4edf5] text-[#4f5d68]"
            }`}
            key={option}
            onClick={() => onToggle(option)}
            type="button"
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#eef7ff] p-4">
      <dt className="text-xs font-black uppercase tracking-[0.14em] text-[#64727f]">{label}</dt>
      <dd className="mt-1 text-lg font-black text-[#183247]">{value}</dd>
    </div>
  );
}

function AmbientDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-8 top-24 h-12 w-12 rotate-12 rounded-[1.1rem] bg-[#ffcf5a]/50 blur-[1px]" />
      <div className="absolute right-10 top-40 h-16 w-16 rounded-full bg-[#77e5d8]/45 blur-[2px]" />
      <div className="absolute -left-10 top-[48%] h-32 w-32 rounded-full bg-[#c8efff]/70 blur-xl" />
      <div className="absolute -right-16 bottom-24 h-40 w-40 rounded-full bg-[#ffe6a6]/65 blur-2xl" />
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mb-10 h-56 w-full">
      <div className="absolute inset-x-2 top-8 h-44 rounded-[3rem] bg-[radial-gradient(circle_at_30%_20%,#d9fff1,transparent_34%),radial-gradient(circle_at_78%_35%,#f4f7b7,transparent_30%),linear-gradient(160deg,#dff5ff,#f7fbff)] shadow-[inset_0_0_60px_rgba(255,255,255,0.8),0_22px_60px_rgba(24,50,71,0.08)]" />
      <div className="absolute left-6 top-4 h-12 w-12 -rotate-12 rounded-[1.2rem] bg-white shadow-[0_12px_26px_rgba(24,50,71,0.12)]">
        <div className="mx-auto mt-3 h-2 w-7 rounded-full bg-[#2383dc]" />
        <div className="mx-auto mt-2 h-2 w-5 rounded-full bg-[#7bd447]" />
      </div>
      <div className="absolute right-8 top-2 h-14 w-14 rounded-[1.5rem] bg-[#ff746d] shadow-[0_14px_28px_rgba(255,116,109,0.24)]">
        <div className="ml-7 mt-3 h-2 w-4 rounded-full bg-white/80" />
      </div>
      <div className="absolute bottom-3 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#9fe6ff_38%,#2383dc_100%)] shadow-[0_18px_42px_rgba(35,131,220,0.28)]">
        <div className="mx-auto mt-8 flex w-12 justify-between">
          <span className="h-2 w-2 rounded-full bg-[#183247]" />
          <span className="h-2 w-2 rounded-full bg-[#183247]" />
        </div>
        <div className="mx-auto mt-3 h-2 w-8 rounded-full bg-white/90" />
      </div>
      <div className="absolute bottom-8 right-10 h-12 w-12 rotate-45 rounded-[1rem] bg-[#ffe28a] shadow-[0_12px_24px_rgba(203,166,93,0.18)]" />
    </div>
  );
}

function TrophyVisual() {
  return (
    <div className="relative mx-auto mb-8 h-44 w-44">
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,#e8f7ff,#fff7d9,#dffcf7,#e8f7ff)] opacity-80" />
      <div className="absolute inset-5 rounded-[3rem] bg-white/80 shadow-[0_20px_50px_rgba(24,50,71,0.12)]" />
      <div className="absolute left-12 top-10 h-20 w-20 rounded-b-[2.6rem] rounded-t-[1.4rem] bg-[linear-gradient(150deg,#ffd45f,#f2a83b)] shadow-[0_16px_32px_rgba(242,168,59,0.26)]" />
      <div className="absolute left-[4.4rem] top-[6.5rem] h-9 w-9 rounded-b-xl bg-[#37414c]" />
      <div className="absolute left-[3.7rem] top-[8.4rem] h-5 w-14 rounded-full bg-[#27303a]" />
      <div className="absolute left-[4.8rem] top-[4.4rem] h-7 w-7 rotate-12 rounded-lg bg-[#fff2b6]" />
    </div>
  );
}
