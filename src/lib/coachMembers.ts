import { supabaseServerRequest } from "@/lib/supabaseServer";
import type { CoachMemberMessage, MessageGraphSnapshot } from "@/types/messages";
import type {
  CoachMemberTone,
  CoachMember,
} from "@/types/coachDashboard";
import type {
  MemberDetailPageData,
  WeekDay,
} from "@/types/coachMemberDetail";

type CoachMemberMessageRow = CoachMemberMessage;

type CoachMessageSummary = {
  slug: string;
  name: string;
  latestMessage: CoachMemberMessageRow;
  unreadCount: number;
  tone: CoachMemberTone;
};

function formatRelativeTime(createdAt: string) {
  const date = new Date(createdAt);
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  }).format(date);
}

function toWeekDays(messageCount: number): readonly WeekDay[] {
  const days: WeekDay[] = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"].map((label, index) => ({
    label,
    status: index < Math.min(messageCount, 7) ? "sent" : "missed",
  }));

  return days;
}

function deriveTone(messageCount: number): CoachMemberTone {
  if (messageCount >= 5) return "strong";
  if (messageCount >= 3) return "steady";
  if (messageCount >= 1) return "new";
  return "follow_up";
}

export async function getCoachMemberMessagesOverview() {
  const rows = await supabaseServerRequest<CoachMemberMessageRow[]>(
    "coach_member_messages?select=*",
  );

  const sortedRows = [...rows].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const byMember = new Map<string, CoachMemberMessageRow[]>();
  for (const row of sortedRows) {
    const current = byMember.get(row.member_slug) ?? [];
    current.push(row);
    byMember.set(row.member_slug, current);
  }

  const members: CoachMessageSummary[] = [...byMember.entries()].map(
    ([slug, memberRows]) => ({
      slug,
      name: memberRows[0]?.member_name ?? slug,
      latestMessage: memberRows[0],
      unreadCount: memberRows.filter((row) => row.status === "sent").length,
      tone: deriveTone(memberRows.length),
    }),
  );

  const coachMembers: CoachMember[] = members.map((member, index) => ({
    slug: member.slug,
    name: member.name,
    status: member.unreadCount > 0 ? "มีข้อความใหม่" : "ติดตามต่อ",
    note: `${member.unreadCount} ข้อความล่าสุด`,
    insight: member.latestMessage.message.slice(0, 90),
    lastUpdate: formatRelativeTime(member.latestMessage.created_at),
    behaviorTag: member.latestMessage.graph_snapshot?.note ?? "template sent",
    avatarVariant: (index % 6) + 1,
    href: `/coach/members/${member.slug}`,
    tone: member.tone,
  }));

  return coachMembers;
}

function buildPlanFromSnapshot(snapshot: MessageGraphSnapshot | null) {
  const base = {
    active: {
      eyebrow: "ติดตามความต่อเนื่อง",
      title: "แผนของโค้ชวันนี้",
      message: "ส่งข้อความ template ที่เหมาะกับสถานะปัจจุบันของสมาชิก",
      primaryAction: "ส่งข้อความ",
      secondaryAction: "ดูประวัติ",
      praiseTitle: "สิ่งที่ควรชม",
      praiseItems: ["ส่งการบ้านตรงเวลา", "รักษาความต่อเนื่อง", "ตอบกลับสม่ำเสมอ"],
      improveTitle: "สิ่งที่ควรปรับ",
      improveItems: ["เพิ่มน้ำ", "คงความสม่ำเสมอ", "เช็กความต่อเนื่อง"],
    },
    missed: {
      eyebrow: "เริ่มติดตามใหม่",
      title: "แผนของโค้ชวันนี้",
      message: "ใช้ template สั้น ๆ เพื่อชวนสมาชิกกลับมาส่งต่อ",
      primaryAction: "ส่งข้อความ",
      secondaryAction: "ดูประวัติ",
      praiseTitle: "สิ่งที่ควรชม",
      praiseItems: ["กลับมาส่ง", "เริ่มใหม่ได้", "ยังไม่ต้องกดดัน"],
      improveTitle: "สิ่งที่ควรปรับ",
      improveItems: ["เริ่มจากข้อความสั้น", "ชวนถ่ายรูป", "ค่อย ๆ กลับเข้า routine"],
    },
  };

  return snapshot?.kind === "missed" ? base.missed : base.active;
}

function buildSummaryFromSnapshot(
  snapshot: MessageGraphSnapshot | null,
): MemberDetailPageData["summary"] {
  if (!snapshot || snapshot.kind === "missed") {
    return {
      kind: "missed" as const,
      eyebrow: "ยังไม่มีข้อมูลวันนี้",
      title: "สรุปสุขภาพวันนี้",
      emptyTitle: "ยังไม่มีการบ้านล่าสุด",
      emptyDescription: "เมื่อสมาชิกส่งการบ้าน ระบบจะดึงข้อความล่าสุดมาแสดงตรงนี้",
      tags: ["รอการบ้าน", "รอประเมิน", "ติดตามต่อ"],
    };
  }

  return {
    kind: "active" as const,
    energyKcal: Number(snapshot.primaryMetric.replace(/[^0-9]/g, "")) || 0,
    energyTarget: {
      min: 1100,
      max: 1200,
    },
    energyBurn: 1400,
    statusLabel: snapshot.note,
    statusNote: snapshot.secondaryMetric,
    burnNote: "อ้างอิงจากข้อมูลที่ coach ส่งเข้ามาล่าสุด",
    macroCharts:
      snapshot.chartItems?.map((chart) => ({
        label: chart.label,
        value: chart.value,
        status: snapshot.note,
        color: chart.color,
      })) ?? [
        { label: "Protein", value: 60, status: "ใกล้เป้า", color: "#4FD1FF" },
        { label: "Fiber", value: 50, status: "กำลังดี", color: "#9B6BFF" },
        { label: "Water", value: 40, status: "ควรเพิ่ม", color: "#FF6FAE" },
      ],
    insight: snapshot.title,
  };
}

function buildHomeworkFromSnapshot(
  snapshot: MessageGraphSnapshot | null,
): MemberDetailPageData["homework"] {
  if (!snapshot || snapshot.kind === "missed") {
    return {
      kind: "missed" as const,
      eyebrow: "การบ้านล่าสุด",
      title: "ยังไม่มีการบ้านใหม่",
      emptyTitle: "รอสมาชิกส่งการบ้าน",
      emptyDescription: "เมื่อมีภาพอาหารหรือข้อความล่าสุด ระบบจะแสดงตรงนี้",
      supportText: "ใช้ template สั้น ๆ เพื่อชวนกลับมาส่งต่อ",
      weekDays: toWeekDays(0),
    };
  }

  return {
    kind: "active" as const,
    eyebrow: "การบ้านล่าสุด",
    title: snapshot.title,
    imageSrc: "/images/prae-lunch.webp",
    imageAlt: snapshot.title,
    timeLabel: "อ้างอิงจากข้อความที่ส่งล่าสุด",
    description: snapshot.secondaryMetric,
    tags: snapshot.tags,
    weekDays: toWeekDays(snapshot.tags.length),
  };
}

export async function getCoachMemberDetailFromMessages(slug: string): Promise<MemberDetailPageData | null> {
  const rows = await supabaseServerRequest<CoachMemberMessageRow[]>(
    `coach_member_messages?member_slug=eq.${encodeURIComponent(slug)}&order=created_at.desc`,
  );

  const latest = rows[0];
  if (!latest) return null;

  const snapshot = latest.graph_snapshot;

  return {
    member: {
      name: latest.member_name,
      initial: latest.member_name.trim().charAt(0) || "M",
      coachName: "Coach",
      daysLeft: 30,
      phone: "08X-XXX-XXXX",
      badge: snapshot?.note ?? "Template message",
    },
    summary: buildSummaryFromSnapshot(snapshot),
    plan: {
      active: buildPlanFromSnapshot(snapshot),
      missed: buildPlanFromSnapshot({ kind: "missed", title: "", primaryMetric: "", secondaryMetric: "", note: "", tags: [] }),
    },
    homework: buildHomeworkFromSnapshot(snapshot),
    template: {
      title: "ข้อความจากเทมเพลต",
      description: "ข้อความนี้มาจากระบบ template ที่ coach ส่งแล้ว",
      message: latest.message,
      primaryAction: "ส่งข้อความนี้",
      secondaryActions: ["คัดลอกข้อความ", "แก้ไขก่อนส่ง"],
    },
    followUp: snapshot?.kind === "missed"
      ? {
          title: "ติดตามต่อ",
          message: "สมาชิกยังไม่มีข้อมูลการบ้านล่าสุด ให้ส่งข้อความสั้นเพื่อชวนกลับมา",
          tags: ["รอการบ้าน", "ติดตามต่อ", "template"],
        }
      : undefined,
    coachReviewContext: {
      title: "ภาพรวมที่ช่วยโค้ชตัดสินใจ",
      description: "ข้อมูลนี้มาจากข้อความและ graph snapshot ที่ coach บันทึกไว้ล่าสุด",
      highlights: [
        { label: "ข้อความล่าสุด", value: "1", note: "ดึงจากฐานข้อมูลจริง" },
        { label: "สถานะ", value: latest.status, note: "จาก message record" },
        { label: "อัปเดต", value: formatRelativeTime(latest.created_at), note: "เวลาไทย" },
      ],
      cues: [
        "ใช้ข้อความ template เดิมเพื่อทดสอบ flow การส่งจริง",
        "หน้ารายละเอียดนี้อ่านข้อมูลจากตาราง coach_member_messages",
        "ถ้าไม่มี snapshot ระบบจะยังแสดงข้อมูลพื้นฐานได้",
      ],
    },
  };
}
