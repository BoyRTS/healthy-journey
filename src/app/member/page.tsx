import { dashboardCover } from "@/data/imageAssets";
import Image from "next/image";
import Link from "next/link";

const DEBUG_HOTSPOTS = false;
const IMAGE_WIDTH = 941;
const IMAGE_HEIGHT = 1672;

const hotspots = [
  {
    id: 1,
    label: "เธเธฅเธธเนเธกเธซเธฅเธฑเธ เธชเนเธเธเธฒเธฃเธเนเธฒเธ",
    href: "/community/food",
    x: 60,
    y: 460,
    width: 580,
    height: 150,
  },
  {
    id: 2,
    label: "เธชเธญเธเธเธฒเธฃเธญเธญเธเธเธณเธฅเธฑเธเธเธฒเธข",
    href: "/community/exercise",
    x: 60,
    y: 620,
    width: 585,
    height: 150,
  },
  {
    id: 3,
    label: "เธเธฅเธฅเธฑเธเธเนเธชเธกเธฒเธเธดเธ",
    href: "/community/results",
    x: 60,
    y: 775,
    width: 545,
    height: 150,
  },
  {
    id: 4,
    label: "Healthy Tips",
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
    label: "เธเธนเธ”เธเธธเธขเธเธฑเธเนเธเนเธเธชเนเธงเธเธ•เธฑเธง",
    href: "/coach-chat",
    x: 60,
    y: 1240,
    width: 585,
    height: 150,
  },
  {
    id: 7,
    label: "เธชเนเธเธเธฒเธฃเธเนเธฒเธเธงเธฑเธเธเธตเน",
    href: "/community/food",
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
    <main className="min-h-screen bg-[var(--cream)] overflow-hidden">
      <section className="relative flex min-h-screen items-start justify-center overflow-hidden p-0 pt-0 md:items-center lg:p-4">
        <div className="relative h-[100svh] w-full overflow-hidden bg-[var(--cream)] shadow-[var(--shadow-soft)] md:h-[min(100svh,calc(100vw*1.775))] md:w-[min(100vw,calc(100svh*0.5625))] md:rounded-[2.25rem] lg:h-[92vh] lg:max-h-[980px] lg:w-auto lg:aspect-[941/1672] lg:rounded-[2.25rem]">
          <Image
            alt="Healthy Journey dashboard cover"
            className="pointer-events-none object-cover md:object-contain"
            fill
            priority
            sizes="(min-width: 1024px) 552px, (min-width: 768px) 60vw, 100vw"
            src={dashboardCover}
          />
          {hotspots.map((hotspot) => (
            <Link
              key={hotspot.id}
              aria-label={hotspot.label}
              className={`absolute z-20 block pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                DEBUG_HOTSPOTS
                  ? "border border-red-500/80 bg-red-500/20 text-[10px] font-semibold text-red-900"
                  : "bg-transparent"
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
      </section>
    </main>
  );
}

