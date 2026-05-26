import { useId } from "react";

type MemberAvatarProps = {
  variant: number;
  className?: string;
};

type AvatarConfig = {
  background: [string, string];
  skin: string;
  hair: string;
  clothes: string;
  accent: string;
  accessory: "none" | "glasses" | "clip" | "headband" | "cap" | "bun";
};

const avatarConfigs: AvatarConfig[] = [
  {
    background: ["#4FD1FF", "#7BA8FF"],
    skin: "#EFC7A7",
    hair: "#2A2E40",
    clothes: "#4A5C7A",
    accent: "#FF6FAE",
    accessory: "glasses",
  },
  {
    background: ["#7BA8FF", "#A78BFA"],
    skin: "#F3C9AE",
    hair: "#3B3044",
    clothes: "#5A4B7E",
    accent: "#4FD1FF",
    accessory: "none",
  },
  {
    background: ["#8F9F7E", "#CBA65D"],
    skin: "#EBC19D",
    hair: "#5A3A2A",
    clothes: "#6B7757",
    accent: "#F7D77A",
    accessory: "cap",
  },
  {
    background: ["#FFB69A", "#FF6FAE"],
    skin: "#F0C09E",
    hair: "#2D2438",
    clothes: "#8B5E70",
    accent: "#FFE4E0",
    accessory: "headband",
  },
  {
    background: ["#9B6BFF", "#4FD1FF"],
    skin: "#EEC4A5",
    hair: "#1F2435",
    clothes: "#415A77",
    accent: "#FCE38A",
    accessory: "bun",
  },
  {
    background: ["#CBA65D", "#8F9F7E"],
    skin: "#F0C9A8",
    hair: "#4C342D",
    clothes: "#6A5B43",
    accent: "#F7E4BD",
    accessory: "clip",
  },
  {
    background: ["#6DB6A7", "#4FD1FF"],
    skin: "#EBC5A2",
    hair: "#2D2C3B",
    clothes: "#40606A",
    accent: "#B9F4E4",
    accessory: "glasses",
  },
  {
    background: ["#F0A9A0", "#CBA65D"],
    skin: "#F3C8AD",
    hair: "#342A34",
    clothes: "#75505A",
    accent: "#FFF1C9",
    accessory: "none",
  },
  {
    background: ["#8F9F7E", "#7BA8FF"],
    skin: "#EBC29E",
    hair: "#2B2F3D",
    clothes: "#516A57",
    accent: "#F5F0D8",
    accessory: "cap",
  },
  {
    background: ["#A78BFA", "#FF6FAE"],
    skin: "#EFC6A4",
    hair: "#2B3140",
    clothes: "#6D5C8E",
    accent: "#FFF0C9",
    accessory: "clip",
  },
];

export function MemberAvatar({ variant, className }: MemberAvatarProps) {
  const id = useId().replace(/:/g, "");
  const config = avatarConfigs[variant % avatarConfigs.length];
  const gradientId = `member-avatar-gradient-${id}`;
  const clothesId = `member-avatar-clothes-${id}`;
  const hairId = `member-avatar-hair-${id}`;

  return (
    <div
      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.2)] ring-1 ring-[rgba(255,255,255,0.08)] ${className ?? ""}`}
    >
      <svg aria-hidden="true" className="block h-full w-full" viewBox="0 0 64 64">
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="25%" r="85%">
            <stop offset="0%" stopColor={config.background[0]} stopOpacity="1" />
            <stop offset="100%" stopColor={config.background[1]} stopOpacity="1" />
          </radialGradient>
          <linearGradient id={clothesId} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={config.clothes} stopOpacity="0.95" />
            <stop offset="100%" stopColor={config.accent} stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id={hairId} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={config.hair} stopOpacity="1" />
            <stop offset="100%" stopColor="#0E1018" stopOpacity="1" />
          </linearGradient>
        </defs>

        <circle cx="32" cy="32" r="32" fill={`url(#${gradientId})`} />
        <circle cx="32" cy="34" r="19" fill={config.skin} opacity="0.92" />
        <path
          d="M17 42c2.4-9.5 8.9-16 15-16s12.6 6.5 15 16v12H17V42Z"
          fill={`url(#${clothesId})`}
        />
        <path
          d="M18 25c2.3-8.2 9-14 14-14s11.7 5.7 14 14v4H18v-4Z"
          fill={`url(#${hairId})`}
        />
        <circle cx="25.8" cy="33.4" r="1.4" fill="#181A24" />
        <circle cx="38.2" cy="33.4" r="1.4" fill="#181A24" />
        <path
          d="M26.6 39.2c1.8 1.8 8.9 1.8 10.7 0"
          fill="none"
          stroke="#181A24"
          strokeLinecap="round"
          strokeWidth="1.6"
        />

        {config.accessory === "glasses" ? (
          <>
            <circle cx="25.8" cy="33.4" r="4.5" fill="none" stroke="#222431" strokeWidth="1.2" />
            <circle cx="38.2" cy="33.4" r="4.5" fill="none" stroke="#222431" strokeWidth="1.2" />
            <path
              d="M30.3 33.4h3.4"
              fill="none"
              stroke="#222431"
              strokeLinecap="round"
              strokeWidth="1.2"
            />
          </>
        ) : null}

        {config.accessory === "clip" ? (
          <path d="M42 19l3 3-3 3-3-3 3-3Z" fill={config.accent} />
        ) : null}

        {config.accessory === "headband" ? (
          <path
            d="M19 24c5-4 21-4 26 0"
            fill="none"
            stroke={config.accent}
            strokeLinecap="round"
            strokeWidth="3"
          />
        ) : null}

        {config.accessory === "cap" ? (
          <path
            d="M18 24c2.5-6.3 25.5-6.3 28 0"
            fill="none"
            stroke={config.accent}
            strokeLinecap="round"
            strokeWidth="3"
          />
        ) : null}

        {config.accessory === "bun" ? (
          <circle cx="45" cy="20" r="4" fill={config.hair} />
        ) : null}
      </svg>
    </div>
  );
}
