"use client";

import { useState } from "react";
import Link from "next/link";
import { MemberAvatar } from "@/components/coach/MemberAvatar";
import {
  CoachBottomNav,
  CoachPageHeader,
  CoachThemeShell,
  coachTheme,
} from "@/components/layout/CoachThemeShell";
import { coachMembers } from "@/data/mockCoachDashboard";
import {
  coachColors,
  getCoachMutedTextColor,
  getCoachPaletteColor,
  getCoachTextColor,
} from "@/lib/coachTheme";

const coachStats = [
  {
    value: "24",
    label: "สมาชิกทั้งหมด",
    note: "อยู่ในการดูแล",
  },
  {
    value: "16",
    label: "ส่งวันนี้",
    note: "พร้อมตรวจรอบเย็น",
  },
  {
    value: "3",
    label: "ต้องติดตาม",
    note: "ควรเช็กก่อนจบวัน",
  },
  {
    value: "12",
    label: "ตรวจแล้ว",
    note: "ผ่านการดูรอบแรก",
  },
] as const;

const tabs = [
  { key: "all", label: "ทั้งหมด" },
  { key: "recent", label: "ล่าสุด" },
  { key: "focus", label: "ต้องดูแล" },
] as const;

const focusItems = [
  { label: "เตรียมข้อความ", value: "5" },
  { label: "ติดตามวันนี้", value: "3" },
  { label: "โน้ตค้าง", value: "8" },
] as const;

export default function CoachDashboardPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["key"]>("all");

  const filteredMembers = coachMembers.filter((member) => {
    if (activeTab === "recent") return ["new", "steady", "strong"].includes(member.tone);
    if (activeTab === "focus") return ["follow_up", "watch"].includes(member.tone);
    return true;
  });

  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="งานโค้ชวันนี้"
        description="เห็นคิวสำคัญก่อน แล้วค่อยไล่ดูสมาชิกที่ต้องดูแลในรอบเย็น"
        badge="Coach"
      />

      <section className="grid grid-cols-2 gap-3">
        {coachStats.map((item, index) => {
          const backgroundColor = getCoachPaletteColor(index);
          const textColor = getCoachTextColor(backgroundColor);
          const mutedTextColor = getCoachMutedTextColor(backgroundColor);

          return (
          <div
            key={item.label}
            className="rounded-[22px] border p-4"
            style={{
              backgroundColor,
              borderColor: backgroundColor,
              color: textColor,
            }}
          >
            <p className={`${coachTheme.displayFont} text-[34px] font-semibold leading-none`}>
              {item.value}
            </p>
            <p className={`${coachTheme.displayFont} mt-2 text-[12px] font-semibold leading-5`}>
              {item.label}
            </p>
            <p className="mt-1 text-[11px] leading-5" style={{ color: mutedTextColor }}>
              {item.note}
            </p>
          </div>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
              Member queue
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
              รายชื่อสมาชิก
            </h2>
          </div>
          <Link className={`${coachTheme.displayFont} text-[12px] font-semibold text-[#64FFDA]`} href="/coach/organization">
            ทีมโค้ช
          </Link>
        </div>

        <div className={`${coachTheme.displayFont} mt-4 grid grid-cols-3 gap-2 rounded-[20px] border border-[#3A3A3C] bg-[#1C1C1E] p-1.5`}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`rounded-[16px] px-2 py-2 text-[12px] font-semibold transition-colors duration-200 ${
                activeTab === tab.key
                  ? "bg-[#00E5FF] text-[#121212]"
                  : "bg-[#2C2C2E] text-[#EBEBEB] hover:bg-[#343438] hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {filteredMembers.map((member, index) => {
            const backgroundColor = getCoachPaletteColor(index);
            const textColor = getCoachTextColor(backgroundColor);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
            <Link
              key={member.slug}
              className="relative block overflow-hidden rounded-[20px] border p-4 transition-colors duration-200 hover:border-white"
              href={member.href}
              style={{
                backgroundColor,
                borderColor: backgroundColor,
                color: textColor,
              }}
            >
              <div
                className="absolute inset-y-4 left-0 w-1 rounded-r-full"
                style={{ backgroundColor: textColor }}
              />
              <div className="flex gap-3 pl-1">
                <MemberAvatar className="h-14 w-14 ring-2 ring-[#2A2A2A]" variant={member.avatarVariant} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`${coachTheme.displayFont} text-[16px] font-semibold leading-tight`}>
                        {member.name}
                      </p>
                      <p className="mt-1 text-[12px] leading-5" style={{ color: mutedTextColor }}>
                        {member.note}
                      </p>
                    </div>
                    <span
                      className={`${coachTheme.displayFont} shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold`}
                      style={{
                        backgroundColor: coachColors.darkContainer,
                        borderColor: coachColors.darkContainer,
                        color: coachColors.lightText,
                      }}
                    >
                      {member.status}
                    </span>
                  </div>

                  <p className="mt-3 text-[12px] leading-6" style={{ color: textColor }}>
                    {member.insight}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#2C2C2E] bg-[#2C2C2E] px-2.5 py-1 text-[10px] text-white">
                      {member.lastUpdate}
                    </span>
                    <span className="rounded-full border border-[#2C2C2E] bg-[#2C2C2E] px-2.5 py-1 text-[10px] text-white">
                      {member.behaviorTag}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
              Focus
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
              สิ่งที่ควรทำ
            </h2>
          </div>
          <span className={`${coachTheme.displayFont} rounded-full border border-[#64FFDA] bg-[#64FFDA] px-3 py-1 text-[11px] font-semibold text-[#121212]`}>
            Today
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {focusItems.map((item, index) => {
            const backgroundColor = getCoachPaletteColor(index + coachStats.length);
            const textColor = getCoachTextColor(backgroundColor);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
            <div
              key={item.label}
              className="rounded-[18px] border p-3"
              style={{
                backgroundColor,
                borderColor: backgroundColor,
                color: textColor,
              }}
            >
              <p className={`${coachTheme.displayFont} text-[24px] font-semibold leading-none`}>
                {item.value}
              </p>
              <p className="mt-2 text-[11px] leading-4" style={{ color: mutedTextColor }}>
                {item.label}
              </p>
            </div>
            );
          })}
        </div>
      </section>

      <CoachBottomNav activeHref="/coach" />
    </CoachThemeShell>
  );
}
