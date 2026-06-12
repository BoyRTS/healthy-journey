import { getMemberMessages } from "@/lib/messages";
import { requireHealthyJourneyCurrentUser } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type MemberMessagesPageProps = {
  searchParams?: Promise<{
    member?: string;
  }>;
};

export default async function MemberMessagesPage({
  searchParams,
}: MemberMessagesPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentUser = await requireHealthyJourneyCurrentUser();
  const memberSlug = resolvedSearchParams?.member ?? currentUser.id;
  const messages = await getMemberMessages(memberSlug);

  return (
    <main className="min-h-screen bg-[#1C1C1E] text-white">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#1C1C1E] px-3 py-3">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <section className="rounded-[22px] border border-[#343434] bg-[#202020] p-6 text-center shadow-none">
              <h2 className="text-[20px] font-semibold text-[#F6F3EA]">
                ยังไม่มีข้อความจากโค้ช
              </h2>
              <p className="mt-2 text-[13px] leading-6 text-[#B8B2A7]">
                เมื่อโค้ชส่งข้อความหรือสรุปสุขภาพ ข้อความจะแสดงในหน้านี้
              </p>
            </section>
          ) : (
            messages.map((message) => (
              <article
                className="rounded-[22px] border border-[#343434] bg-[#202020] p-4 shadow-none"
                key={message.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B8B2A7]">
                      Coach message
                    </p>
                    <h2 className="mt-2 text-[22px] font-semibold leading-tight text-[#F6F3EA]">
                      {message.member_name}
                    </h2>
                  </div>
                  <time className="text-[12px] text-[#B8B2A7]">
                    {new Intl.DateTimeFormat("th-TH", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Bangkok",
                    }).format(new Date(message.created_at))}
                  </time>
                </div>

                {message.graph_snapshot ? (
                  <div className="mt-4">
                    <MemberGraphCard graph={message.graph_snapshot} />
                  </div>
                ) : null}

                <section className="mt-4 rounded-[15px] border border-[#D3E397] bg-[#D3E397] p-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black">
                    ข้อความจากโค้ช
                  </p>
                  <p className="whitespace-pre-line text-[16px] font-medium leading-8 text-black">
                    {message.message}
                  </p>
                </section>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function MemberGraphCard({
  graph,
}: {
  graph: NonNullable<Awaited<ReturnType<typeof getMemberMessages>>[number]["graph_snapshot"]>;
}) {
  const chartItems = graph.chartItems ?? parseTagsToChartItems(graph.tags);
  const primaryValue = chartItems[0]?.value ?? 0;

  return (
    <div className="rounded-[22px] border border-[#343434] bg-[#202020] p-5 shadow-none">
      <h3 className="text-[24px] font-medium leading-tight text-[#F6F3EA]">
        {graph.title}
      </h3>

      <div className="mt-6 flex justify-center">
        <EnergyRingChart label={graph.primaryMetric} value={primaryValue} />
      </div>

      <div className="mt-5 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF9100] bg-transparent px-4 py-2 text-[13px] font-medium text-[#FF9100]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D87918]" />
          {graph.note}
        </span>
      </div>

      <div className="mt-6 space-y-3 text-[14px] leading-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#B8B2A7]">เป้าหมายวันนี้</span>
          <span className="font-semibold text-[#F6F3EA]">{graph.secondaryMetric.replace("เป้าหมาย ", "")}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#B8B2A7]">อัตราความสำเร็จเป้า</span>
          <span className="font-semibold text-[#64FFDA]">{primaryValue}%</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {chartItems.map((item) => (
          <MacroRingCard item={item} key={item.label} />
        ))}
      </div>
    </div>
  );
}

function EnergyRingChart({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (Math.max(0, Math.min(value, 100)) / 100);
  const kcal = label.replace(" kcal", "");

  return (
    <div className="relative h-[250px] w-[250px]">
      <svg aria-hidden="true" className="-rotate-90" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          fill="none"
          r={radius}
          stroke="#1F4051"
          strokeWidth="24"
        />
        <circle
          cx="110"
          cy="110"
          fill="none"
          r={radius}
          stroke="#93E1FF"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeWidth="24"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="mb-3 max-w-[130px] text-center text-[12px] leading-4 text-[#B8B2A7]">
          พลังงานที่รับวันนี้
        </span>
        <span className="text-[60px] font-bold leading-none text-[#F6F3EA]">{kcal}</span>
        <span className="mt-3 text-[18px] leading-none text-[#B8B2A7]">kcal</span>
      </div>
    </div>
  );
}

function MacroRingCard({
  item,
}: {
  item: {
    label: string;
    value: number;
    color: string;
  };
}) {
  return (
    <div className="rounded-[16px] border border-[#343434] bg-[#2B2B2E] p-3.5 text-center shadow-none">
      <SmallRingChart color={item.color} value={item.value} />
      <p className="mt-3 text-[13px] font-semibold text-[#F6F3EA]">{item.label}</p>
      <p className="mt-1 text-[11px] leading-4 text-[#8E8E93]">
        {item.label === "Protein"
          ? "ใกล้ถึงเป้า"
          : item.label === "Fiber"
            ? "ผัก/ไฟเบอร์ควรเพิ่มอีกนิด"
            : "น้ำยังน้อย"}
      </p>
    </div>
  );
}

function SmallRingChart({ color, value }: { color: string; value: number }) {
  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * (Math.max(0, Math.min(value, 100)) / 100);

  return (
    <div className="mx-auto grid h-16 w-16 place-items-center">
      <svg aria-hidden="true" viewBox="0 0 56 56">
        <circle cx="28" cy="28" fill="none" r={radius} stroke="#252528" strokeWidth="7" />
        <circle
          cx="28"
          cy="28"
          fill="none"
          r={radius}
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeWidth="7"
          transform="rotate(-90 28 28)"
        />
        <text
          className="fill-white text-[13px] font-bold"
          dominantBaseline="middle"
          textAnchor="middle"
          x="28"
          y="31"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
}

function parseTagsToChartItems(tags: string[]) {
  return tags.map((tag, index) => {
    const value = Number(tag.match(/(\d+)%/)?.[1] ?? 0);
    const colors = ["#4FD1FF", "#9B6BFF", "#FF6FAE"];

    return {
      color: colors[index % colors.length],
      label: tag.replace(/\s+\d+%$/, ""),
      value,
    };
  });
}
