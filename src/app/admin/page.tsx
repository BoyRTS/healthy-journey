"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/StatCard";
import { WellnessCard } from "@/components/ui/WellnessCard";

const roomStats = [
  { label: "ห้องทั้งหมด", value: "5", tone: "gold" as const },
  { label: "ห้องที่ใช้งาน", value: "5", tone: "sage" as const },
  { label: "คำขอใหม่", value: "3", tone: "beige" as const },
  { label: "ห้องรออนุมัติ", value: "1", tone: "olive" as const },
];

const rooms = [
  {
    title: "กลุ่มหลัก ส่งการบ้าน",
    description: "ห้องแชร์อาหารและพูดคุยของสมาชิก",
    href: "/community/food",
  },
  {
    title: "สอนการออกกำลังกาย",
    description: "ห้องสอนท่าทางและกิจกรรมเบา ๆ",
    href: "/community/exercise",
  },
  {
    title: "ผลลัพธ์สมาชิก",
    description: "ห้องโชว์ความคืบหน้าและกำลังใจ",
    href: "/community/results",
  },
  {
    title: "Health Tips",
    description: "ห้องรวมคำแนะนำสั้น ๆ ที่อ่านง่าย",
    href: "/community/tips",
  },
] as const;

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("hj_admin_auth") !== "1") {
      router.replace("/admin/login");
    }
  }, [router]);

  function handleLogout() {
    window.localStorage.removeItem("hj_admin_auth");
    router.push("/admin/login");
  }

  return (
    <AppShell>
      <div className="space-y-5">
        <section className="rounded-[2rem] bg-[linear-gradient(135deg,#f8f2e7,#efe1c7)] p-6 shadow-[var(--shadow-card)] ring-1 ring-[var(--line)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                HEALTH JOURNEY
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-[var(--olive)]">
                Admin Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                หน้าควบคุมสำหรับแอดมิน ใช้ดูภาพรวมระบบ, จัดการห้อง community, และตรวจงานเบื้องต้นก่อนส่งต่อให้ทีม
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                className="rounded-full bg-[var(--olive)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
                href="/community"
              >
                ไปหน้า Community
              </Link>
              <button
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--olive)] ring-1 ring-[var(--line)]"
                onClick={handleLogout}
                type="button"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          {roomStats.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} tone={item.tone} />
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <WellnessCard className="p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                  Room control
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--olive)]">
                  จัดการห้องชุมชน
                </h2>
              </div>
              <Link className="text-sm font-semibold text-[var(--olive)]" href="/community">
                เปิดหน้าคุมห้อง
              </Link>
            </div>

            <div className="mt-4 grid gap-3">
              {rooms.map((room) => (
                <Link key={room.href} href={room.href}>
                  <div className="rounded-[1.35rem] border border-[var(--line)] bg-white/76 p-4 transition hover:-translate-y-0.5">
                    <h3 className="text-lg font-semibold text-[var(--olive)]">{room.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{room.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </WellnessCard>

          <WellnessCard className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
              Quick actions
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--olive)]">
              ทางลัดสำหรับแอดมิน
            </h2>

            <div className="mt-4 space-y-3">
              {[
                "เพิ่มห้องใหม่",
                "เปิดดูผลลัพธ์สมาชิก",
                "เช็กห้องที่ใช้งานบ่อย",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.35rem] bg-[rgba(255,253,248,0.92)] px-4 py-3 text-sm text-[var(--muted)] ring-1 ring-[var(--line)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(79,99,70,0.08),rgba(203,166,93,0.12))] p-4 ring-1 ring-[var(--line)]">
              <p className="text-sm leading-7 text-[var(--muted)]">
                หน้านี้เป็น prototype dashboard ของ admin ถ้าล็อกอินผ่าน email/password ระบบจะพามาที่หน้านี้
              </p>
            </div>
          </WellnessCard>
        </section>
      </div>
    </AppShell>
  );
}
