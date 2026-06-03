export type CommunityRoom = {
  id: string;
  title: string;
  description: string;
  href: string;
  members: string;
  accent: string;
};

export const communityRooms: CommunityRoom[] = [
  {
    id: "food",
    title: "กลุ่มหลัก ส่งการบ้าน",
    description: "ห้องแชร์อาหารและพูดคุยของสมาชิก",
    href: "/community/food",
    members: "128 คน",
    accent: "from-[#7F95D1] via-[#FF82A9] to-[#FFEBE7]",
  },
  {
    id: "exercise",
    title: "สอนการออกกำลังกาย",
    description: "ห้องสอนท่าทางและกิจกรรมเบา ๆ",
    href: "/community/exercise",
    members: "64 คน",
    accent: "from-[#39A0ED] via-[#61BFBE] to-[#BADDD6]",
  },
  {
    id: "results",
    title: "ผลลัพธ์สมาชิก",
    description: "ห้องโชว์ความคืบหน้าและกำลังใจ",
    href: "/community/results",
    members: "91 คน",
    accent: "from-[#C08497] via-[#FFB5BA] to-[#FFCAD4]",
  },
  {
    id: "tips",
    title: "Health Tips",
    description: "ห้องรวมคำแนะนำสั้น ๆ ที่อ่านง่าย",
    href: "/community/tips",
    members: "52 คน",
    accent: "from-[#FFB5BA] via-[#B0D0D3] to-[#C08497]",
  },
  {
    id: "meal-plan",
    title: "Meal Plan",
    description: "ห้องแผนมื้ออาหารและแนวทางในบ้าน",
    href: "/community/meal-plan",
    members: "77 คน",
    accent: "from-[#61BFBE] via-[#4ABBF3] to-[#BADDD6]",
  },
] as const;
