import type { MemberFoodPageData } from "@/types/memberFood";

export const memberFoodPageData: MemberFoodPageData = {
  member: {
    name: "คุณแพร",
    coachName: "Coach Nam",
    streakLabel: "ส่งต่อเนื่อง 5 วัน",
    memberCode: "HJ-024",
  },
  stats: [
    {
      label: "ส่งวันนี้",
      value: "1/3",
      note: "มื้อเช้าเรียบร้อย รอมื้ออื่นเพิ่ม",
      tone: "sage",
    },
    {
      label: "รอตรวจ",
      value: "2 รายการ",
      note: "โค้ชจะดูรวมรอบเย็น",
      tone: "gold",
    },
    {
      label: "ความสม่ำเสมอ",
      value: "ดีมาก",
      note: "มีจังหวะส่งสม่ำเสมอขึ้น",
      tone: "olive",
    },
  ],
  submission: {
    title: "ส่งการบ้านมื้ออาหารวันนี้",
    subtitle: "ถ่ายรูปมื้ออาหารแล้วพิมพ์รายละเอียดสั้น ๆ เพื่อให้โค้ชใช้ประกอบการติดตาม",
    mealLabel: "มื้อเช้า",
    mealTime: "08:10",
    moodLabel: "อิ่มพอดี ไม่แน่นเกินไป",
    notePlaceholder: "เช่น กินอะไรบ้าง ปริมาณประมาณเท่าไร หรือมีอะไรอยากให้โค้ชช่วยดูเป็นพิเศษ",
    imageAlt: "ตัวอย่างภาพการบ้านมื้ออาหาร",
    imageSrc: "/images/background_food1.png",
    actionPrimary: "บันทึกเป็นฉบับร่าง",
    actionSecondary: "ส่งให้โค้ชตรวจ",
  },
  coachSummary: {
    title: "ข้อมูลที่จะส่งให้โค้ชดูต่อ",
    description:
      "โค้ชจะเห็นภาพรวมมื้ออาหาร ความต่อเนื่อง และข้อความสั้น ๆ จากสมาชิกก่อนคุยต่อในรอบถัดไป",
    items: [
      "มื้ออาหารและเวลา",
      "รูปถ่ายประกอบการบ้าน",
      "หมายเหตุจากสมาชิก",
      "สถานะรอตรวจหรือส่งแล้ว",
    ],
  },
  guidance: {
    title: "ก่อนกดส่ง แนะนำให้เช็ก",
    items: [
      "รูปชัดและเห็นอาหารหลัก",
      "พิมพ์รายละเอียดสั้นและตรงไปตรงมา",
      "ถ้าวันนี้มีหลายมื้อ ให้แยกทีละการ์ด",
      "ส่งแล้วจะขึ้นในประวัติให้โค้ชดูต่อ",
    ],
  },
  recentActivity: [
    {
      title: "มื้อกลางวัน",
      time: "12:20",
      status: "reviewed",
      note: "โค้ชอ่านแล้ว และตอบกลับด้วยคำแนะนำสั้น ๆ",
    },
    {
      title: "มื้อเช้า",
      time: "08:10",
      status: "submitted",
      note: "ส่งสำเร็จ รอเข้าคิวตรวจช่วงเย็น",
    },
    {
      title: "สรุปเมื่อวาน",
      time: "เมื่อวาน 19:40",
      status: "draft",
      note: "มีฉบับร่างไว้แล้ว ยังไม่ได้กดส่ง",
    },
  ],
};
