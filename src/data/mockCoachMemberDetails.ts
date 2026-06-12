import type { MemberDetailPageData, WeekDay } from "@/types/coachMemberDetail";

const praeWeekDays = [
  { label: "จ", status: "sent" },
  { label: "อ", status: "sent" },
  { label: "พ", status: "missed" },
  { label: "พฤ", status: "sent" },
  { label: "ศ", status: "sent" },
  { label: "ส", status: "missed" },
  { label: "อา", status: "sent" },
] as const;

const mayWeekDays = [
  { label: "จ", status: "sent" },
  { label: "อ", status: "sent" },
  { label: "พ", status: "missed" },
  { label: "พฤ", status: "missed" },
  { label: "ศ", status: "missed" },
  { label: "ส", status: "missed" },
  { label: "อา", status: "missed" },
] as const;

export const praeMemberDetail = {
  member: {
    name: "คุณแพร แพรวา",
    initial: "แ",
    imageSrc: "/images/prae-avatar.png",
    imageAlt: "รูปโปรไฟล์คุณแพร",
    coachName: "Coach Nam",
    daysLeft: 24,
    phone: "08X-XXX-XXXX",
    badge: "Premium Plan",
  },
  summary: {
    kind: "active",
    energyKcal: 570,
    energyTarget: {
      min: 1100,
      max: 1200,
    },
    energyBurn: 1400,
    statusLabel: "ยังต่ำกว่าช่วงแนะนำ",
    statusNote: "รับแล้ว 570 kcal · ช่วงแนะนำ 1,100–1,200 kcal",
    burnNote: "พลังงานที่ใช้ต่อวันโดยประมาณ ~1,400 kcal",
    macroCharts: [
      { label: "Protein", value: 88, status: "ใกล้ถึงเป้า", color: "#4FD1FF" },
      {
        label: "Fiber",
        value: 72,
        status: "ผัก/ไฟเบอร์ควรเพิ่มอีกนิด",
        color: "#9B6BFF",
      },
      { label: "Water", value: 64, status: "น้ำยังน้อย", color: "#FF6FAE" },
    ],
    insight:
      "พลังงานยังต่ำกว่าช่วงแนะนำ และโปรตีนใกล้ถึงเป้าแล้ว ควรเพิ่มมื้อเล็กหรือของว่างที่มีคุณภาพ เพื่อให้ร่างกายมีแรงและได้รับโปรตีนครบเป้าหมายมากขึ้น",
  },
  plan: {
    active: {
      eyebrow: "เยี่ยมมาก! ใกล้ถึงเป้าโปรตีน",
      title: "แผนของโค้ชวันนี้",
      message:
        "วันนี้โปรตีนของคุณแพรอยู่ที่ 88% ใกล้ถึงเป้าแล้ว แต่พลังงานรวมยังต่ำไป ลองเพิ่มมื้อเล็กหรือของว่างคุณภาพดี เพื่อให้มีแรงและทำต่อได้สม่ำเสมอนะคะ",
      primaryAction: "ส่งคำชมและคำแนะนำ",
      secondaryAction: "ดูประวัติการติดตาม",
      praiseTitle: "สิ่งที่ควรชมวันนี้",
      praiseItems: [
        "ส่งการบ้านต่อเนื่อง 5 วัน",
        "โปรตีนทำได้ดีแล้ว แต่ยังควรเพิ่มอีกเล็กน้อยให้ถึงเป้าหมาย",
        "พลังงานรวมยังต่ำกว่าช่วงแนะนำ",
      ],
      improveTitle: "สิ่งที่ควรช่วยปรับ",
      improveItems: [
        "เพิ่มผัก/ไฟเบอร์อีกเล็กน้อย",
        "ดื่มน้ำให้สม่ำเสมอขึ้น",
        "ให้กำลังใจแบบไม่กดดัน",
      ],
    },
    missed: {
      eyebrow: "กลับมาเริ่มใหม่กันนะคะ",
      title: "แผนของโค้ชวันนี้",
      message:
        "เข้าใจว่าบางช่วงอาจยุ่งหรือลืมส่งการบ้าน ไม่เป็นไรค่ะ วันนี้เริ่มง่าย ๆ ด้วยการถ่ายรูปอาหารมื้อเดียวก่อนก็ได้ ค่อย ๆ กลับมาทำต่อเนื่องกันนะคะ",
      primaryAction: "ส่งข้อความหาเมย์",
      secondaryAction: "ดูประวัติการติดตาม",
      praiseTitle: "สิ่งที่ควรชมวันนี้",
      praiseItems: [
        "เคยส่งต่อเนื่อง 3 วัน",
        "ยังสามารถกลับมาเริ่มใหม่ได้",
        "ไม่ต้องเริ่มให้สมบูรณ์แบบ",
      ],
      improveTitle: "สิ่งที่ควรช่วยปรับ",
      improveItems: [
        "ชวนส่งมื้อถัดไป",
        "ลดความรู้สึกผิด",
        "เริ่มใหม่แบบง่ายที่สุด",
      ],
    },
  },
  homework: {
    kind: "active",
    eyebrow: "มื้อกลางวัน",
    title: "การบ้านและความต่อเนื่อง",
    imageSrc: "/images/prae-lunch.webp",
    imageAlt: "การบ้านล่าสุดของคุณแพร",
    timeLabel: "วันนี้ 12:40 · มื้อกลางวัน",
    description:
      "ข้าวไรซ์เบอร์รี่ + ไก่ผัดสมุนไพร\nโปรตีนใกล้ถึงเป้า พลังงานยังต่ำกว่าช่วงแนะนำ ควรเพิ่มมื้อเล็กหรือของว่างที่มีคุณภาพ",
    tags: ["โปรตีนดี", "คาร์บเชิงซ้อน", "เพิ่มผักอีกนิด"],
    weekDays: praeWeekDays,
  },
  template: {
    title: "ข้อความจากเทมเพลต",
    description:
      "ข้อความนี้มาจากเทมเพลตที่ Admin/Coach เตรียมไว้ สามารถปรับแก้ก่อนส่งได้",
    message:
      "สวัสดีค่ะคุณแพร! 👋\n\nวันนี้ทำได้ดีมากเรื่องความสม่ำเสมอและการเลือกโปรตีนค่ะ\n\nมื้อต่อไปลองเพิ่มผักและดื่มน้ำให้มากขึ้นอีกนิดนะคะ จะช่วยให้ร่างกายสดชื่นและดูแลเป้าหมายได้ต่อเนื่องขึ้นค่ะ\n\nส่งการบ้านต่อเนื่อง 5 วันแล้ว เก่งมากค่ะ 🌟",
    primaryAction: "ส่งข้อความนี้",
    secondaryActions: ["คัดลอกข้อความ", "แก้ไขข้อความ"],
  },
  coachReviewContext: {
    title: "ภาพรวมที่ช่วยโค้ชตัดสินใจ",
    description:
      "ข้อมูลส่วนนี้เป็นการสรุปแบบ rule-based จากการส่งการบ้าน น้ำ และความสม่ำเสมอ ไม่ใช้ AI สร้างข้อความถึงสมาชิก",
    highlights: [
      { label: "7 วันล่าสุด", value: "5/7", note: "ส่งการบ้านต่อเนื่องดี" },
      { label: "น้ำเฉลี่ย", value: "64%", note: "ยังต่ำกว่าเป้าหมาย" },
      { label: "จังหวะมื้อ", value: "กลางวัน", note: "ส่งสม่ำเสมอที่สุด" },
    ],
    cues: [
      "วันนี้ควรชมความสม่ำเสมอก่อน แล้วค่อยชวนเพิ่มน้ำแบบไม่กดดัน",
      "โปรตีนใกล้เป้าแล้ว เหมาะกับ template ชมและตั้งเป้าผัก/น้ำเล็ก ๆ",
      "ยังไม่ต้อง follow-up ส่วนตัว ถ้าพรุ่งนี้ยังส่งต่อเนื่องให้คงแผนเดิม",
    ],
  },
} satisfies MemberDetailPageData;

export const mayMemberDetail = {
  member: {
    name: "คุณเมย์",
    initial: "ม",
    imageSrc: "/images/badge-avatar-2.jpg",
    imageAlt: "รูปโปรไฟล์คุณเมย์",
    coachName: "Coach Nam",
    daysLeft: 18,
    phone: "08X-XXX-XXXX",
    badge: "อยู่ในโปรแกรม",
  },
  summary: {
    kind: "missed",
    eyebrow: "จากการบ้านล่าสุด",
    title: "สรุปสุขภาพวันนี้",
    emptyTitle: "ยังไม่มีข้อมูลอาหารล่าสุด",
    emptyDescription:
      "ไม่ได้ส่งการบ้านมา 2 วัน จึงยังไม่มีข้อมูลอาหารล่าสุดสำหรับสรุปวันนี้",
    tags: ["ส่งล่าสุด: 2 วันที่แล้ว", "ความต่อเนื่อง: 3/7 วัน", "ควรติดตาม: วันนี้"],
  },
  plan: {
    active: {
      eyebrow: "เยี่ยมมาก! ใกล้ถึงเป้าโปรตีน",
      title: "แผนของโค้ชวันนี้",
      message:
        "วันนี้โปรตีนของคุณเมย์อยู่ที่ 88% ใกล้ถึงเป้าแล้ว แต่พลังงานรวมยังต่ำไป ลองเพิ่มมื้อเล็กหรือของว่างคุณภาพดี เพื่อให้มีแรงและทำต่อได้สม่ำเสมอนะคะ",
      primaryAction: "ส่งคำชมและคำแนะนำ",
      secondaryAction: "ดูประวัติการติดตาม",
      praiseTitle: "สิ่งที่ควรชมวันนี้",
      praiseItems: [
        "ส่งการบ้านต่อเนื่อง 5 วัน",
        "โปรตีนทำได้ดีแล้ว แต่ยังควรเพิ่มอีกเล็กน้อยให้ถึงเป้าหมาย",
        "พลังงานรวมยังต่ำกว่าช่วงแนะนำ",
      ],
      improveTitle: "สิ่งที่ควรช่วยปรับ",
      improveItems: [
        "เพิ่มผัก/ไฟเบอร์อีกเล็กน้อย",
        "ดื่มน้ำให้สม่ำเสมอขึ้น",
        "ให้กำลังใจแบบไม่กดดัน",
      ],
    },
    missed: {
      eyebrow: "กลับมาเริ่มใหม่กันนะคะ",
      title: "แผนของโค้ชวันนี้",
      message:
        "เข้าใจว่าบางช่วงอาจยุ่งหรือลืมส่งการบ้าน ไม่เป็นไรค่ะ วันนี้เริ่มง่าย ๆ ด้วยการถ่ายรูปอาหารมื้อเดียวก่อนก็ได้ ค่อย ๆ กลับมาทำต่อเนื่องกันนะคะ",
      primaryAction: "ส่งข้อความหาเมย์",
      secondaryAction: "ดูประวัติการติดตาม",
      praiseTitle: "สิ่งที่ควรชมวันนี้",
      praiseItems: [
        "เคยส่งต่อเนื่อง 3 วัน",
        "ยังสามารถกลับมาเริ่มใหม่ได้",
        "ไม่ต้องเริ่มให้สมบูรณ์แบบ",
      ],
      improveTitle: "สิ่งที่ควรช่วยปรับ",
      improveItems: [
        "ชวนส่งมื้อถัดไป",
        "ลดความรู้สึกผิด",
        "เริ่มใหม่แบบง่ายที่สุด",
      ],
    },
  },
  homework: {
    kind: "missed",
    eyebrow: "ยังไม่มีรูปอาหารล่าสุด",
    title: "การบ้านและความต่อเนื่อง",
    emptyTitle: "ยังไม่มีการบ้านล่าสุด",
    emptyDescription: "ส่งล่าสุด 2 วันที่แล้ว",
    supportText: "ชวนคุณเมย์กลับมาส่งมื้อถัดไปแบบไม่กดดัน",
    weekDays: mayWeekDays,
  },
  template: {
    title: "ข้อความจากเทมเพลต",
    description:
      "ข้อความนี้มาจากเทมเพลตที่ Admin/Coach เตรียมไว้ สามารถปรับแก้ก่อนส่งได้",
    message:
      "สวัสดีค่ะคุณเมย์! 👋\n\nช่วง 2 วันที่ผ่านมาเมย์อาจจะยุ่งหรือหลุดจากจังหวะไปบ้าง ไม่เป็นไรเลยค่ะ\n\nวันนี้ลองกลับมาเริ่มเบา ๆ ด้วยการส่งมื้อถัดไปให้โค้ชดูก่อนได้ไหมคะ ไม่ต้องสมบูรณ์แบบ แค่กลับมาเริ่มต่อก็ถือว่าดีมากแล้วค่ะ\n\nโค้ชอยู่ตรงนี้เพื่อช่วยดูและค่อย ๆ ปรับไปด้วยกันนะคะ",
    primaryAction: "ส่งข้อความนี้",
    secondaryActions: ["คัดลอกข้อความ", "แก้ไขข้อความ"],
  },
  followUp: {
    title: "หมายเหตุสำหรับโค้ช",
    message:
      "คุณเมย์ไม่ได้ส่งการบ้านมา 2 วัน ควรติดตามวันนี้ด้วยข้อความที่ให้กำลังใจ ไม่ตำหนิ และชวนกลับมาเริ่มใหม่แบบง่ายที่สุด",
    tags: [
      "ส่งล่าสุด: 2 วันที่แล้ว",
      "ความต่อเนื่องล่าสุด: 3/7 วัน",
      "Template ที่แนะนำ: ติดตามแบบให้กำลังใจ",
    ],
  },
  coachReviewContext: {
    title: "ภาพรวมที่ช่วยโค้ชตัดสินใจ",
    description:
      "ข้อมูลส่วนนี้เป็นการสรุปแบบ rule-based จากการส่งการบ้าน น้ำ และความสม่ำเสมอ ไม่ใช้ AI สร้างข้อความถึงสมาชิก",
    highlights: [
      { label: "7 วันล่าสุด", value: "2/7", note: "เริ่มหลุดจากจังหวะเดิม" },
      { label: "ขาดต่อเนื่อง", value: "2 วัน", note: "ควรติดตามวันนี้" },
      { label: "แนวทาง", value: "เบา ๆ", note: "ชวนกลับมาเริ่ม 1 มื้อ" },
    ],
    cues: [
      "ใช้ template ติดตามแบบให้กำลังใจ ไม่ตำหนิ และขอเพียงรูปมื้อถัดไป",
      "อย่าเพิ่มงานหลายอย่างพร้อมกัน ให้เริ่มจากส่งอาหาร 1 มื้อก่อน",
      "ถ้ายังไม่ตอบภายในพรุ่งนี้ ค่อยยกระดับเป็น coach note สำหรับติดตามส่วนตัว",
    ],
  },
} satisfies MemberDetailPageData;

const activeWeekPatterns = {
  newStarter: [
    { label: "จ", status: "missed" },
    { label: "อ", status: "missed" },
    { label: "พ", status: "missed" },
    { label: "พฤ", status: "missed" },
    { label: "ศ", status: "missed" },
    { label: "ส", status: "missed" },
    { label: "อา", status: "sent" },
  ],
  strong: [
    { label: "จ", status: "sent" },
    { label: "อ", status: "sent" },
    { label: "พ", status: "sent" },
    { label: "พฤ", status: "sent" },
    { label: "ศ", status: "missed" },
    { label: "ส", status: "sent" },
    { label: "อา", status: "sent" },
  ],
  steady: [
    { label: "จ", status: "sent" },
    { label: "อ", status: "missed" },
    { label: "พ", status: "sent" },
    { label: "พฤ", status: "sent" },
    { label: "ศ", status: "sent" },
    { label: "ส", status: "sent" },
    { label: "อา", status: "sent" },
  ],
  restart: [
    { label: "จ", status: "missed" },
    { label: "อ", status: "missed" },
    { label: "พ", status: "sent" },
    { label: "พฤ", status: "missed" },
    { label: "ศ", status: "sent" },
    { label: "ส", status: "sent" },
    { label: "อา", status: "sent" },
  ],
  balanced: [
    { label: "จ", status: "sent" },
    { label: "อ", status: "sent" },
    { label: "พ", status: "sent" },
    { label: "พฤ", status: "missed" },
    { label: "ศ", status: "sent" },
    { label: "ส", status: "sent" },
    { label: "อา", status: "sent" },
  ],
} as const satisfies Record<string, readonly WeekDay[]>;

const missedWeekPatterns = {
  oneDay: [
    { label: "จ", status: "sent" },
    { label: "อ", status: "sent" },
    { label: "พ", status: "missed" },
    { label: "พฤ", status: "sent" },
    { label: "ศ", status: "sent" },
    { label: "ส", status: "sent" },
    { label: "อา", status: "missed" },
  ],
  threeDays: [
    { label: "จ", status: "sent" },
    { label: "อ", status: "sent" },
    { label: "พ", status: "missed" },
    { label: "พฤ", status: "missed" },
    { label: "ศ", status: "missed" },
    { label: "ส", status: "missed" },
    { label: "อา", status: "missed" },
  ],
} as const satisfies Record<string, readonly WeekDay[]>;

function createActiveMemberDetail({
  badge,
  burn,
  calories,
  daysLeft,
  fiber,
  initial,
  insight,
  macroNote,
  meal,
  name,
  protein,
  sentCount,
  statusLabel,
  templateLine,
  water,
  weekDays,
}: {
  badge: string;
  burn: number;
  calories: number;
  daysLeft: number;
  fiber: number;
  initial: string;
  insight: string;
  macroNote: string;
  meal: string;
  name: string;
  protein: number;
  sentCount: string;
  statusLabel: string;
  templateLine: string;
  water: number;
  weekDays: readonly WeekDay[];
}): MemberDetailPageData {
  return {
    ...praeMemberDetail,
    member: {
      ...praeMemberDetail.member,
      name,
      initial,
      imageSrc: undefined,
      imageAlt: undefined,
      daysLeft,
      badge,
    },
    summary: {
      kind: "active",
      energyKcal: calories,
      energyTarget: { min: 1100, max: 1200 },
      energyBurn: burn,
      statusLabel,
      statusNote: `รับแล้ว ${calories} kcal · ช่วงแนะนำ 1,100-1,200 kcal`,
      burnNote: `พลังงานที่ใช้ต่อวันโดยประมาณ ~${burn.toLocaleString()} kcal`,
      macroCharts: [
        { label: "Protein", value: protein, status: macroNote, color: "#4FD1FF" },
        { label: "Fiber", value: fiber, status: fiber >= 75 ? "ผักและไฟเบอร์ดีขึ้น" : "ควรเพิ่มผักอีกเล็กน้อย", color: "#9B6BFF" },
        { label: "Water", value: water, status: water >= 75 ? "น้ำเริ่มเข้าเป้า" : "น้ำยังควรเพิ่ม", color: "#FF6FAE" },
      ],
      insight,
    },
    homework: {
      kind: "active",
      eyebrow: "มื้อล่าสุด",
      title: "การบ้านและความต่อเนื่อง",
      imageSrc: "/images/prae-lunch.webp",
      imageAlt: `การบ้านล่าสุดของ${name}`,
      timeLabel: "วันนี้ · มื้อล่าสุด",
      description: meal,
      tags: [sentCount, macroNote, water >= 75 ? "น้ำดีขึ้น" : "เพิ่มน้ำอีกนิด"],
      weekDays,
    },
    template: {
      ...praeMemberDetail.template,
      message: `สวัสดีค่ะ${name}!\n\n${templateLine}\n\nพรุ่งนี้โฟกัสเป้าหมายเล็ก ๆ แค่เรื่องเดียวก่อนนะคะ เพื่อให้ทำต่อได้จริงและไม่รู้สึกหนักเกินไปค่ะ`,
    },
    coachReviewContext: {
      title: "ภาพรวมที่ช่วยโค้ชตัดสินใจ",
      description: "ข้อมูลส่วนนี้เป็นการสรุปแบบ rule-based จากการส่งการบ้าน น้ำ และความสม่ำเสมอ",
      highlights: [
        { label: "7 วันล่าสุด", value: sentCount.replace("ส่ง ", ""), note: "ดูจากการบ้านรายวัน" },
        { label: "โปรตีน", value: `${protein}%`, note: macroNote },
        { label: "น้ำ", value: `${water}%`, note: water >= 75 ? "กำลังดีขึ้น" : "ยังเพิ่มได้" },
      ],
      cues: [
        templateLine,
        `วันนี้ควรดูแลด้วยข้อความที่ reinforce พฤติกรรมดีของ${name}`,
        "เลือก template ที่มี action ถัดไปเพียงหนึ่งอย่าง",
      ],
    },
  };
}

function createMissedMemberDetail({
  badge,
  daysLeft,
  followUp,
  initial,
  missedDays,
  name,
  reason,
  weekDays,
}: {
  badge: string;
  daysLeft: number;
  followUp: string;
  initial: string;
  missedDays: string;
  name: string;
  reason: string;
  weekDays: readonly WeekDay[];
}): MemberDetailPageData {
  return {
    ...mayMemberDetail,
    member: {
      ...mayMemberDetail.member,
      name,
      initial,
      imageSrc: undefined,
      imageAlt: undefined,
      daysLeft,
      badge,
    },
    summary: {
      kind: "missed",
      eyebrow: "จากการบ้านล่าสุด",
      title: "สรุปสุขภาพวันนี้",
      emptyTitle: "ยังไม่มีข้อมูลอาหารล่าสุด",
      emptyDescription: `${name}ยังไม่ได้ส่งการบ้านมา ${missedDays}`,
      tags: [`ส่งล่าสุด: ${missedDays}`, reason, "เตือนสั้น ๆ"],
    },
    homework: {
      kind: "missed",
      eyebrow: "ยังไม่มีรูปอาหารล่าสุด",
      title: "การบ้านและความต่อเนื่อง",
      emptyTitle: "ยังไม่มีการบ้านล่าสุด",
      emptyDescription: `ส่งล่าสุด ${missedDays}`,
      supportText: followUp,
      weekDays,
    },
    template: {
      ...mayMemberDetail.template,
      message: `สวัสดีค่ะ${name}!\n\nถ้าวันนี้สะดวก ส่งรูปมื้อใดมื้อหนึ่งให้โค้ชดูก่อนได้เลยนะคะ เริ่มจากมื้อเดียวก็พอค่ะ ไม่ต้องกดดันว่าต้องครบทุกอย่าง\n\n${followUp}`,
    },
    followUp: {
      title: "หมายเหตุสำหรับโค้ช",
      message: `${name}ขาดส่ง ${missedDays} ควรใช้ข้อความสั้น อ่อนโยน และไม่ทำให้รู้สึกผิด`,
      tags: [`ขาดส่ง ${missedDays}`, reason, "รอดูการตอบกลับ"],
    },
    coachReviewContext: {
      title: "ภาพรวมที่ช่วยโค้ชตัดสินใจ",
      description: "ข้อมูลส่วนนี้เป็นการสรุปแบบ rule-based จากความต่อเนื่องล่าสุด",
      highlights: [
        { label: "สถานะ", value: "ขาดส่ง", note: missedDays },
        { label: "แนวทาง", value: "เบา ๆ", note: "ไม่กดดัน" },
        { label: "เป้าหมาย", value: "1 มื้อ", note: "เริ่มใหม่ง่ายที่สุด" },
      ],
      cues: [
        followUp,
        "ยังไม่ควรใช้เวลาโค้ชมากกว่ากลุ่ม active จนกว่าจะกลับมาส่งอีกครั้ง",
        "ส่งเพียง reminder สั้น ๆ แล้วรอดูการตอบกลับ",
      ],
    },
  };
}

export const coachMemberDetails = {
  may: mayMemberDetail,
  prae: praeMemberDetail,
  fon: createActiveMemberDetail({
    badge: "New Member",
    burn: 1320,
    calories: 430,
    daysLeft: 30,
    fiber: 48,
    initial: "ฝ",
    insight: "เพิ่งเริ่มส่งวันแรก ข้อมูลยังน้อย แต่ตอบรับดี เหมาะกับการให้กำลังใจและตั้งเป้าสั้นมาก",
    macroNote: "โปรตีนเริ่มต้นได้",
    meal: "ไข่ต้ม + ข้าวกล้องครึ่งจาน + แตงกวา\nยังควรเพิ่มผักและน้ำเพื่อให้เห็นภาพรวมชัดขึ้น",
    name: "คุณฝน",
    protein: 58,
    sentCount: "ส่ง 1/7",
    statusLabel: "เริ่มเก็บข้อมูลวันแรก",
    templateLine: "วันนี้เริ่มต้นได้ดีมากค่ะ การส่งการบ้านวันแรกช่วยให้โค้ชเห็นจังหวะชีวิตจริงของคุณฝน",
    water: 42,
    weekDays: activeWeekPatterns.newStarter,
  }),
  ann: createMissedMemberDetail({
    badge: "Protein Focus",
    daysLeft: 21,
    followUp: "กลับมาเริ่มจากรูปมื้อเช้าง่าย ๆ ก่อนก็พอค่ะ โค้ชจะช่วยดูเรื่องโปรตีนให้ทีละนิด",
    initial: "อ",
    missedDays: "1 วัน",
    name: "คุณแอน",
    reason: "โปรตีนยังไม่นิ่ง",
    weekDays: missedWeekPatterns.oneDay,
  }),
  beam: createActiveMemberDetail({
    badge: "Strong Momentum",
    burn: 1510,
    calories: 820,
    daysLeft: 25,
    fiber: 68,
    initial: "บ",
    insight: "ส่งต่อเนื่องดีมาก พลังงานยังไม่ครบ แต่มี momentum สูง เหมาะกับการชื่นชมและเพิ่มเป้าหมายเล็ก ๆ",
    macroNote: "โปรตีนดีมาก",
    meal: "อกไก่ย่าง + ข้าวไรซ์เบอร์รี่ + ผักลวก\nโปรตีนดี เหลือเพิ่มพลังงานรวมให้พอดีกับวัน",
    name: "คุณบีม",
    protein: 92,
    sentCount: "ส่ง 6/7",
    statusLabel: "กำลังมี momentum ดี",
    templateLine: "ความสม่ำเสมอช่วงนี้ดีมากค่ะ โค้ชอยากให้รักษาจังหวะเดิมไว้",
    water: 72,
    weekDays: activeWeekPatterns.strong,
  }),
  nut: createMissedMemberDetail({
    badge: "Gentle Check-in",
    daysLeft: 17,
    followUp: "เริ่มจากมื้อเดียวก็พอค่ะ ไม่ต้องย้อนเก็บวันที่หายไป โค้ชขอดูแค่มื้อถัดไปก่อน",
    initial: "น",
    missedDays: "3 วัน",
    name: "คุณนัท",
    reason: "หายจากจังหวะเดิม",
    weekDays: missedWeekPatterns.threeDays,
  }),
  lin: createActiveMemberDetail({
    badge: "Hydration Progress",
    burn: 1390,
    calories: 690,
    daysLeft: 23,
    fiber: 74,
    initial: "ล",
    insight: "น้ำดีขึ้นชัดเจน ความต่อเนื่องดี เหมาะกับการ reinforce habit เดิมโดยไม่เพิ่มภาระใหม่",
    macroNote: "โปรตีนใกล้เป้า",
    meal: "ข้าวกล้อง + ปลาอบ + ต้มจืดผัก\nน้ำดีขึ้นและมื้อหลักเริ่มบาลานซ์มากขึ้น",
    name: "คุณลิน",
    protein: 84,
    sentCount: "ส่ง 6/7",
    statusLabel: "น้ำและจังหวะดีขึ้น",
    templateLine: "เรื่องน้ำดีขึ้นชัดเจนมากค่ะ วันนี้ขอชื่นชม habit ที่คุณลินทำได้ต่อเนื่อง",
    water: 86,
    weekDays: activeWeekPatterns.steady,
  }),
  ton: createMissedMemberDetail({
    badge: "Routine Support",
    daysLeft: 19,
    followUp: "ถ้าตารางยุ่ง ส่งแค่มื้อที่สะดวกที่สุดก่อนก็ได้ค่ะ โค้ชจะช่วยหาจังหวะที่เข้ากับวันของคุณต้น",
    initial: "ต",
    missedDays: "1 วัน",
    name: "คุณต้น",
    reason: "ตารางเริ่มสะดุด",
    weekDays: missedWeekPatterns.oneDay,
  }),
  kwang: createActiveMemberDetail({
    badge: "Restarted Well",
    burn: 1460,
    calories: 760,
    daysLeft: 22,
    fiber: 61,
    initial: "ก",
    insight: "กลับมาเริ่มใหม่ได้ดีหลังสะดุด เหมาะกับการย้ำว่าเริ่มใหม่ได้เสมอและล็อก action ถัดไปให้เล็ก",
    macroNote: "โปรตีนกำลังดีขึ้น",
    meal: "ข้าว + ไข่เจียว + แกงจืดเต้าหู้\nกลับมาส่งได้แล้ว ควรเพิ่มผักและลดของทอดเล็กน้อย",
    name: "คุณกวาง",
    protein: 76,
    sentCount: "ส่ง 4/7",
    statusLabel: "กลับมาเริ่มใหม่แล้ว",
    templateLine: "การกลับมาเริ่มใหม่รอบนี้เป็นสัญญาณที่ดีค่ะ คุณกวางไม่จำเป็นต้องทำให้สมบูรณ์แบบ",
    water: 58,
    weekDays: activeWeekPatterns.restart,
  }),
  fa: createActiveMemberDetail({
    badge: "Balanced Habit",
    burn: 1360,
    calories: 910,
    daysLeft: 26,
    fiber: 88,
    initial: "ฟ",
    insight: "ผักและไฟเบอร์ดีขึ้นมาก พลังงานรวมใกล้ขึ้น เหมาะกับการชื่นชมและเพิ่มความหลากหลายของโปรตีน",
    macroNote: "โปรตีนกลาง ๆ",
    meal: "สลัดอกไก่ + มันหวาน + โยเกิร์ต\nไฟเบอร์ดีมาก เหลือเพิ่มโปรตีนให้สม่ำเสมอขึ้น",
    name: "คุณฟ้า",
    protein: 70,
    sentCount: "ส่ง 6/7",
    statusLabel: "บาลานซ์ดีขึ้น",
    templateLine: "ผักและไฟเบอร์ดีขึ้นมากค่ะ วันนี้ควรย้ำสิ่งที่คุณฟ้าทำได้ดีและค่อย ๆ เพิ่มความหลากหลาย",
    water: 79,
    weekDays: activeWeekPatterns.balanced,
  }),
} satisfies Record<string, MemberDetailPageData>;
