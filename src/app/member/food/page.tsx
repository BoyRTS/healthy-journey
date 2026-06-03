const chatMessages = [
  {
    id: "m1",
    sender: "แพร",
    time: "08:12",
    type: "text",
    body: "เช้านี้เริ่มเบา ๆ ก่อนนะคะ วันนี้อยากดื่มน้ำให้ครบด้วย",
    reactions: [
      { emoji: "❤️", count: 4 },
      { emoji: "👍", count: 2 },
    ],
    tone: "member",
  },
  {
    id: "m2",
    sender: "เมย์",
    time: "08:24",
    type: "food",
    mealName: "ข้าว ไข่ต้ม และผักลวก",
    mealTime: "เช้า",
    imageSrc: "/images/prae-lunch.webp",
    reactions: [
      { emoji: "🥗", count: 5 },
      { emoji: "❤️", count: 3 },
    ],
    tone: "member",
  },
  {
    id: "m3",
    sender: "โค้ชดาว",
    time: "08:31",
    type: "text",
    body: "ดูอบอุ่นมากค่ะ ใครมีมื้อเช้าแล้วแวะมาแชร์กันได้เลยนะ",
    reactions: [
      { emoji: "😊", count: 6 },
      { emoji: "❤️", count: 4 },
    ],
    tone: "coach",
  },
  {
    id: "m4",
    sender: "บีม",
    time: "09:05",
    type: "water",
    amount: "1.2L",
    goal: "2L",
    progress: 60,
    reactions: [
      { emoji: "💧", count: 7 },
      { emoji: "👍", count: 3 },
    ],
    tone: "member",
  },
  {
    id: "m5",
    sender: "นุ่น",
    time: "09:22",
    type: "sticker",
    sticker: "🌿",
    label: "วันนี้ไปต่อแบบนุ่ม ๆ",
    reactions: [
      { emoji: "😂", count: 2 },
      { emoji: "❤️", count: 5 },
    ],
    tone: "member",
  },
] as const;

const roomActions = [
  {
    label: "แชร์มื้อนี้",
    icon: ForkKnifeIcon,
    className: "bg-[#8F9F7E] text-[#26301E]",
  },
  {
    label: "บันทึกน้ำ",
    icon: DropletIcon,
    className: "bg-[#A9C8BE] text-[#1F3530]",
  },
  {
    label: "สติกเกอร์",
    icon: SmileIcon,
    className: "bg-[#D9A6A3] text-[#3D2524]",
  },
] as const;

export default function MemberFoodPage() {
  return (
    <main className="min-h-screen bg-[#EDE1D0] font-[var(--font-sans-thai)] text-[#3E352B]">
      <div className="relative min-h-screen overflow-hidden bg-[url('/images/background_food1.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,239,224,0.76)_0%,rgba(231,215,191,0.68)_44%,rgba(143,159,126,0.52)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,247,232,0.65),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(190,132,126,0.30),transparent_34%)]" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
          <header className="sticky top-0 z-20 border-b border-[#F8EEDC]/55 bg-[#F5E8D6]/72 px-4 py-3 shadow-[0_10px_30px_rgba(82,65,45,0.08)] backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-[20px] font-bold leading-tight text-[#3D352B]">
                  ห้องพูดคุยและส่งการบ้าน
                </h1>
                <p className="mt-1 text-[12px] font-medium text-[#7B6D5F]">
                  สมาชิก 28 คน กำลังคุยกันในห้อง
                </p>
              </div>
              <button
                aria-label="เปิดเมนูห้อง"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#EEE0CA]/80 bg-[#FFF8EC]/65 text-[#536044] backdrop-blur-xl"
                type="button"
              >
                <MenuIcon />
              </button>
            </div>
          </header>

          <section className="flex-1 space-y-4 overflow-y-auto px-3 py-4 pb-[182px]">
            {chatMessages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
          </section>

          <footer className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-[#F8EEDC]/50 bg-[#F3E3CF]/78 px-3 pb-4 pt-3 shadow-[0_-16px_40px_rgba(82,65,45,0.12)] backdrop-blur-2xl">
            <div className="grid grid-cols-3 gap-2">
              {roomActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-3 text-[12px] font-bold shadow-[0_8px_18px_rgba(82,65,45,0.12)] ${action.className}`}
                    type="button"
                  >
                    <Icon className="h-4 w-4" />
                    {action.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                aria-label="เปิดสติกเกอร์"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#E8D8C1] bg-[#FFF7EB]/72 text-[#BE847E] backdrop-blur-xl"
                type="button"
              >
                <SmileIcon className="h-5 w-5" />
              </button>
              <div className="flex min-h-11 flex-1 items-center rounded-full border border-[#E8D8C1] bg-[#FFF7EB]/74 px-4 text-[14px] text-[#9A8A78] backdrop-blur-xl">
                พูดคุยในห้อง...
              </div>
              <button
                aria-label="ส่งข้อความ"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8F9F7E] text-[#FFF8EC] shadow-[0_10px_20px_rgba(83,96,68,0.22)]"
                type="button"
              >
                <SendIcon />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

function ChatBubble({ message }: { message: (typeof chatMessages)[number] }) {
  const isCoach = message.tone === "coach";

  if (message.type === "sticker") {
    return (
      <article className="mx-auto max-w-[250px] rounded-[28px] border border-[#F4E8D7]/70 bg-[#FFF6E9]/54 px-5 py-4 text-center shadow-[0_14px_34px_rgba(82,65,45,0.11)] backdrop-blur-xl">
        <MessageHeader sender={message.sender} time={message.time} />
        <div className="py-3 text-6xl leading-none">{message.sticker}</div>
        <p className="text-[13px] font-semibold text-[#6D614F]">{message.label}</p>
        <Reactions reactions={message.reactions} />
      </article>
    );
  }

  return (
    <article
      className={`rounded-[26px] border px-4 py-3 shadow-[0_14px_34px_rgba(82,65,45,0.10)] backdrop-blur-xl ${
        isCoach
          ? "ml-8 border-[#D8C7AA]/70 bg-[#E8D8BE]/68"
          : "mr-6 border-[#F4E8D7]/70 bg-[#FFF6E9]/62"
      }`}
    >
      <MessageHeader sender={message.sender} time={message.time} />

      {message.type === "text" ? (
        <p className="mt-2 text-[14px] leading-7 text-[#453A30]">{message.body}</p>
      ) : null}

      {message.type === "food" ? (
        <div className="mt-3 overflow-hidden rounded-[22px] border border-[#EFE0C9]/80 bg-[#FFF9EF]/55">
          <div className="h-44 bg-[url('/images/prae-lunch.webp')] bg-cover bg-center" />
          <div className="p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[15px] font-bold text-[#3D352B]">{message.mealName}</p>
                <p className="mt-1 text-[12px] font-semibold text-[#8A7865]">
                  มื้อ{message.mealTime}
                </p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#8F9F7E]/22 text-[#536044]">
                <ForkKnifeIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {message.type === "water" ? (
        <div className="mt-3 rounded-[22px] border border-[#D7E1D5]/80 bg-[#F3F7EF]/58 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#A9C8BE]/45 text-[#3F6A60]">
              <DropletIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-bold text-[#3D352B]">{message.amount}</p>
                <p className="text-[12px] font-semibold text-[#7B6D5F]">
                  เป้าหมาย {message.goal}
                </p>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#D8CDB9]/70">
                <div
                  className="h-full rounded-full bg-[#8F9F7E]"
                  style={{ width: `${message.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Reactions reactions={message.reactions} />
    </article>
  );
}

function MessageHeader({ sender, time }: { sender: string; time: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[13px] font-bold text-[#536044]">{sender}</p>
      <p className="text-[11px] font-semibold text-[#9A8A78]">{time}</p>
    </div>
  );
}

function Reactions({
  reactions,
}: {
  reactions: readonly { emoji: string; count: number }[];
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {reactions.map((reaction) => (
        <span
          key={`${reaction.emoji}-${reaction.count}`}
          className="rounded-full border border-[#E8D8C1]/80 bg-[#FFF8EC]/60 px-2.5 py-1 text-[11px] font-bold text-[#6D614F]"
        >
          {reaction.emoji} {reaction.count}
        </span>
      ))}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function ForkKnifeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3v8m3-8v8M7 7h3m-1.5 4v10M17 3v18m0-18c-2.2 1.7-3 3.8-3 6.3 0 2.2 1.2 3.7 3 3.7" />
    </svg>
  );
}

function DropletIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3s6 6.2 6 11a6 6 0 1 1-12 0c0-4.8 6-11 6-11Z" />
    </svg>
  );
}

function SmileIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 9h.01M15.5 9h.01M8 14c1 1.4 2.4 2 4 2s3-.6 4-2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 14-7-4 14-3-6-7-1Z" />
    </svg>
  );
}
