"use client";

import type { BadgeLevel, BadgeType } from "@/types/badges";
import { useState } from "react";

type BadgeIconProps = {
  badge_type: BadgeType;
  level: BadgeLevel;
  show_tooltip?: boolean;
};

const badgeMeta = {
  consistency: {
    icons: ["F", "FF", "FFF"],
    label: "สายสม่ำเสมอ",
    tooltip:
      "สมาชิกคนนี้ส่งการบ้านสม่ำเสมอต่อเนื่อง\nทุกคนที่ทำได้จะได้ badge นี้เหมือนกันเลยค่ะ 😊",
    tone: "from-[#E9D9A8] via-[#D8B97A] to-[#C89E58]",
    glow: "shadow-[0_0_10px_rgba(216,185,122,0.16)]",
  },
  cheerleader: {
    icons: ["C", "CC", "CCC"],
    label: "ขวัญใจกลุ่ม",
    tooltip:
      "สมาชิกคนนี้ให้กำลังใจเพื่อนๆ ในกลุ่มสม่ำเสมอ\nขอบคุณที่ทำให้กลุ่มอบอุ่นนะคะ ❤️",
    tone: "from-[#E6C7DA] via-[#DFA8BC] to-[#C58AA4]",
    glow: "shadow-[0_0_10px_rgba(223,168,188,0.16)]",
  },
} as const;

export function BadgeIcon({ badge_type, level, show_tooltip = true }: BadgeIconProps) {
  const [open, setOpen] = useState(false);
  const meta = badgeMeta[badge_type];
  const icon = meta.icons[level - 1] ?? meta.icons[0];

  return (
    <span className="relative inline-flex">
      <button
        className={`grid h-6 w-6 place-items-center rounded-full border border-white/30 bg-gradient-to-r ${meta.tone} text-[9px] font-semibold text-[#241A16] ${meta.glow}`}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="grid h-4 w-4 place-items-center rounded-full bg-white/45 leading-none">
          {icon}
        </span>
      </button>
      {show_tooltip && open ? (
        <span className="absolute left-0 top-[calc(100%+6px)] z-20 w-64 rounded-[1rem] border border-white/10 bg-[#111827] px-3 py-2 text-xs leading-5 text-white/84 shadow-[0_18px_36px_rgba(0,0,0,0.28)]">
          {meta.tooltip}
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
            {meta.label}
          </span>
        </span>
      ) : null}
    </span>
  );
}
