"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { WellnessCard } from "@/components/ui/WellnessCard";
import { communityRooms, type CommunityRoom } from "@/data/mockCommunityRooms";

const roomPalette = [
  "from-[#7F95D1] via-[#FF82A9] to-[#FFEBE7]",
  "from-[#39A0ED] via-[#61BFBE] to-[#BADDD6]",
  "from-[#C08497] via-[#FFB5BA] to-[#FFCAD4]",
  "from-[#61BFBE] via-[#4ABBF3] to-[#BADDD6]",
] as const;

export default function CommunityPage() {
  const [rooms, setRooms] = useState<CommunityRoom[]>(communityRooms);
  const [role] = useState<"admin" | "member">("admin");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [paletteIndex, setPaletteIndex] = useState(0);

  const totalMembers = useMemo(
    () =>
      rooms.reduce((count, room) => {
        const value = Number(room.members.replace(/[^0-9]/g, ""));
        return count + (Number.isFinite(value) ? value : 0);
      }, 0),
    [rooms],
  );

  function handleAddRoom() {
    if (!title.trim() || !description.trim()) return;

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u0E00-\u0E7F]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setRooms((current) => [
      {
        id: slug || `room-${current.length + 1}`,
        title: title.trim(),
        description: description.trim(),
        href: "/community/food",
        members: "0 คน",
        accent: roomPalette[paletteIndex % roomPalette.length],
      },
      ...current,
    ]);

    setTitle("");
    setDescription("");
  }

  return (
    <MemberPageShell
      backHref="/member"
      backLabel="กลับไปหน้าหลักสมาชิก"
      eyebrow="HEALTH JOURNEY"
      subtitle="ศูนย์รวม community rooms ของสมาชิก ใช้สีและฟอนต์เดียวกับหน้า member"
      title="Community Rooms"
    >
      <div className="h-full p-5 sm:p-7">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <WellnessCard className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                  Admin only
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--olive)]">
                  เพิ่มห้องใหม่
                </h2>
              </div>
              <span className="rounded-full bg-[var(--sage-soft)] px-3 py-1 text-xs font-semibold text-[var(--olive)]">
                {role}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              เฉพาะ admin เท่านั้นที่เพิ่มห้องได้ใน prototype นี้ ส่วนสมาชิกทั่วไปจะเห็นแค่รายการห้อง
            </p>

            {role === "admin" ? (
              <div className="mt-4 space-y-3">
                <input
                  className="w-full rounded-[1rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--olive)]"
                  placeholder="ชื่อห้อง"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <textarea
                  className="min-h-[120px] w-full rounded-[1rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--olive)]"
                  placeholder="คำอธิบายห้อง"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--olive)]">
                    Theme color
                  </span>
                  <select
                    className="w-full rounded-[1rem] border border-[var(--line)] bg-white/80 px-4 py-3 text-sm outline-none ring-0 focus:border-[var(--olive)]"
                    value={paletteIndex}
                    onChange={(event) => setPaletteIndex(Number(event.target.value))}
                  >
                    {roomPalette.map((palette, index) => (
                      <option key={palette} value={index}>
                        Palette {index + 1}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className="rounded-full bg-[var(--olive)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
                  onClick={handleAddRoom}
                  type="button"
                >
                  เพิ่มห้อง
                </button>
              </div>
            ) : (
              <div className="mt-4 rounded-[1.35rem] bg-white/72 p-4 ring-1 ring-[var(--line)]">
                <p className="text-sm leading-7 text-[var(--muted)]">
                  คุณไม่มีสิทธิ์เพิ่มห้องในหน้านี้
                </p>
              </div>
            )}
          </WellnessCard>

          <WellnessCard className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
              Overview
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--olive)]">
              ภาพรวมชุมชน
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.35rem] bg-white/72 p-4 ring-1 ring-[var(--line)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--olive)]">
                  ห้องทั้งหมด
                </p>
                <p className="mt-2 text-3xl font-semibold text-[var(--olive)]">{rooms.length}</p>
              </div>
              <div className="rounded-[1.35rem] bg-white/72 p-4 ring-1 ring-[var(--line)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--olive)]">
                  สมาชิกทั้งหมด
                </p>
                <p className="mt-2 text-3xl font-semibold text-[var(--olive)]">{totalMembers}</p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.35rem] bg-[rgba(255,253,248,0.92)] p-4 ring-1 ring-[var(--line)]">
              <p className="text-sm leading-7 text-[var(--muted)]">
                รายการห้องด้านล่างเป็น entry point ให้สมาชิกเข้าแต่ละห้องได้โดยตรง
              </p>
            </div>
          </WellnessCard>
        </div>

        <section className="mt-4">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                Rooms
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--olive)]">ห้องทั้งหมด</h2>
            </div>
            <Link className="text-sm font-semibold text-[var(--olive)]" href="/community/food">
              เปิดห้องตัวอย่าง
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {rooms.map((room) => (
              <Link key={room.id} href={room.href}>
                <WellnessCard className="p-4 transition hover:-translate-y-0.5">
                  <div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${room.accent}`} />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--olive)]">{room.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{room.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[var(--sage-soft)] px-3 py-1 text-xs font-semibold text-[var(--olive)]">
                      {room.members}
                    </span>
                  </div>
                </WellnessCard>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MemberPageShell>
  );
}
