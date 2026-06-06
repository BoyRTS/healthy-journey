import Image from "next/image";
import Link from "next/link";
import { MemberPageShell } from "@/components/layout/MemberPageShell";
import { dashboardCover } from "@/data/imageAssets";

const DEBUG_HOTSPOTS = false;
const IMAGE_WIDTH = 941;
const IMAGE_HEIGHT = 1672;

const hotspots = [
  {
    id: 1,
    label: "กลุ่มหลัก ส่งการบ้าน",
    href: "/member/food",
    x: 60,
    y: 460,
    width: 580,
    height: 150,
  },
  {
    id: 2,
    label: "สอนการออกกำลังกาย",
    href: "/community/exercise",
    x: 60,
    y: 620,
    width: 585,
    height: 150,
  },
  {
    id: 3,
    label: "ผลลัพธ์สมาชิก",
    href: "/community/results",
    x: 60,
    y: 775,
    width: 545,
    height: 150,
  },
  {
    id: 4,
    label: "Health Tips",
    href: "/community/tips",
    x: 60,
    y: 935,
    width: 610,
    height: 150,
  },
  {
    id: 5,
    label: "Meal Plan",
    href: "/community/meal-plan",
    x: 60,
    y: 1090,
    width: 585,
    height: 150,
  },
  {
    id: 6,
    label: "คำแนะนำจากโค้ช",
    href: "/member/message",
    x: 60,
    y: 1245,
    width: 585,
    height: 150,
  },
  {
    id: 7,
    label: "ส่งการบ้านวันนี้",
    href: "/member/food",
    x: 105,
    y: 1405,
    width: 785,
    height: 175,
  },
] as const;

function toPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

export default function MemberPage() {
  return (
    <MemberPageShell
      action={
        <Link
          className="rounded-full bg-[var(--olive)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(83,96,56,0.18)]"
          href="/chat"
        >
          พูดคุยกับโค้ช
        </Link>
      }
      backHref="/member/result"
      backLabel="ผลลัพธ์ของฉัน"
      eyebrow="HEALTHY JOURNEY"
      subtitle="หน้าเริ่มต้นของสมาชิกสำหรับเข้าห้องส่งการบ้าน ดูคอมมูนิตี้ และติดตามกิจกรรมประจำวัน"
      title="Member Space"
    >
      <div className="flex h-full min-h-[calc(100vh-7.5rem)] justify-center bg-[var(--cream)] lg:items-start lg:p-6">
        <div className="relative h-full min-h-[calc(100vh-7.5rem)] w-full overflow-hidden bg-[var(--cream)] lg:h-auto lg:min-h-0 lg:max-w-[520px] lg:aspect-[941/1672] lg:rounded-[1.75rem] lg:shadow-[0_24px_60px_rgba(83,96,56,0.16)]">
          <Image
            alt="Healthy Journey dashboard cover"
            className="pointer-events-none object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 520px, (min-width: 768px) 60vw, 100vw"
            src={dashboardCover}
          />
          {hotspots.map((hotspot) => (
            <Link
              key={hotspot.id}
              aria-label={hotspot.label}
              className={`pointer-events-auto absolute z-20 block bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                DEBUG_HOTSPOTS
                  ? "border border-red-500/80 bg-red-500/20 text-[10px] font-semibold text-red-900"
                  : ""
              }`}
              href={hotspot.href}
              style={{
                left: toPercent(hotspot.x, IMAGE_WIDTH),
                top: toPercent(hotspot.y, IMAGE_HEIGHT),
                width: toPercent(hotspot.width, IMAGE_WIDTH),
                height: toPercent(hotspot.height, IMAGE_HEIGHT),
              }}
            >
              {DEBUG_HOTSPOTS ? (
                <span className="absolute left-2 top-2 rounded bg-white/80 px-1.5 py-0.5">
                  {hotspot.id}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </MemberPageShell>
  );
}
