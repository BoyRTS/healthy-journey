import {
  CoachBottomNav,
  CoachPageHeader,
  CoachThemeShell,
  coachTheme,
} from "@/components/layout/CoachThemeShell";
import { coachOrganization } from "@/data/mockCoachOrganization";
import {
  coachColors,
  coachNeonPalette,
  getCoachMutedTextColor,
  getCoachTextColor,
} from "@/lib/coachTheme";

type TeamPerson =
  | (typeof coachOrganization.coaches)[number]
  | (typeof coachOrganization.trainees)[number];

const statusRules = [
  {
    title: "Active",
    description:
      "โค้ชที่ทำงานสม่ำเสมอ ตอบสนองทีมได้ดี และยังไม่ต้องมีคนตามใกล้ชิด",
  },
  {
    title: "ต้องการคำแนะนำ",
    description:
      "โค้ชที่ยังทำงานอยู่ แต่หัวหน้าทีมควรช่วยดูหรือปรับแนวทาง",
  },
] as const;

const organizationPalette = coachNeonPalette.filter(
  (color) => color !== coachColors.neon.radiantYellow,
);

function getOrganizationColor(index: number) {
  return organizationPalette[index % organizationPalette.length];
}

function NeonCard({
  children,
  colorIndex,
  className = "",
}: {
  children: React.ReactNode;
  colorIndex: number;
  className?: string;
}) {
  const backgroundColor = getOrganizationColor(colorIndex);
  const textColor = getCoachTextColor(backgroundColor);

  return (
    <div
      className={`rounded-[20px] border ${className}`}
      style={{
        backgroundColor,
        borderColor: backgroundColor,
        color: textColor,
      }}
    >
      {children}
    </div>
  );
}

function TeamCard({
  colorIndex,
  person,
}: {
  colorIndex: number;
  person: TeamPerson;
}) {
  const backgroundColor = getOrganizationColor(colorIndex);
  const textColor = getCoachTextColor(backgroundColor);
  const mutedTextColor = getCoachMutedTextColor(backgroundColor);

  return (
    <article
      className="rounded-[20px] border p-4"
      style={{
        backgroundColor,
        borderColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={`${coachTheme.displayFont} text-[18px] font-semibold`}>
            {person.name}
          </h3>
          <p className="mt-1 text-[12px] font-semibold" style={{ color: mutedTextColor }}>
            {person.role}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`${coachTheme.displayFont} rounded-full border px-3 py-1 text-[11px] font-semibold`}
            style={{
              backgroundColor: coachColors.darkContainer,
              borderColor: coachColors.darkContainer,
              color: coachColors.lightText,
            }}
          >
            {person.members} คน
          </span>
          <span
            className={`${coachTheme.displayFont} rounded-full border px-3 py-1 text-[11px] font-semibold`}
            style={{
              backgroundColor: coachColors.darkContainer,
              borderColor: coachColors.darkContainer,
              color: coachColors.lightText,
            }}
          >
            {person.status}
          </span>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-6" style={{ color: mutedTextColor }}>
        {person.focus}
      </p>
    </article>
  );
}

export default function CoachOrganizationPage() {
  return (
    <CoachThemeShell>
      <CoachPageHeader
        title="โค้ชในทีม"
        description={`${coachOrganization.owner.teamName} · ${coachOrganization.owner.role}`}
      />

      <section className="grid grid-cols-3 gap-3">
        {coachOrganization.stats.map((item, index) => {
          const backgroundColor = getOrganizationColor(index);
          const mutedTextColor = getCoachMutedTextColor(backgroundColor);

          return (
            <NeonCard key={item.label} className="p-3" colorIndex={index}>
              <p className={`${coachTheme.displayFont} text-[22px] font-semibold leading-none`}>
                {item.value}
              </p>
              <p className="mt-2 text-[11px] leading-4" style={{ color: mutedTextColor }}>
                {item.label}
              </p>
            </NeonCard>
          );
        })}
      </section>

      <section className={coachTheme.section}>
        <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
          Status rules
        </p>
        <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
          ความหมายของสถานะทีม
        </h2>
        <div className="mt-4 space-y-3">
          {statusRules.map((rule, index) => {
            const backgroundColor = getOrganizationColor(index + coachOrganization.stats.length);
            const mutedTextColor = getCoachMutedTextColor(backgroundColor);

            return (
              <NeonCard key={rule.title} className="p-4" colorIndex={index + coachOrganization.stats.length}>
                <p className={`${coachTheme.displayFont} text-[15px] font-semibold`}>
                  {rule.title}
                </p>
                <p className="mt-2 text-[13px] leading-6" style={{ color: mutedTextColor }}>
                  {rule.description}
                </p>
              </NeonCard>
            );
          })}
        </div>
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
              Coaches
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
              โค้ช
            </h2>
          </div>
          <p className="text-[12px] text-[#D4D4D4]">
            {coachOrganization.coaches.length} คน
          </p>
        </div>
        <div className="mt-4 space-y-3">
          {coachOrganization.coaches.map((person, index) => (
            <TeamCard key={person.name} colorIndex={index} person={person} />
          ))}
        </div>
      </section>

      <section className={coachTheme.section}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={`${coachTheme.displayFont} text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00E5FF]`}>
              Trainees
            </p>
            <h2 className={`${coachTheme.displayFont} mt-2 text-[21px] font-semibold leading-tight text-white`}>
              โค้ชฝึกหัด
            </h2>
          </div>
          <p className="text-[12px] text-[#D4D4D4]">
            {coachOrganization.trainees.length} คน
          </p>
        </div>
        <div className="mt-4 space-y-3">
          {coachOrganization.trainees.map((person, index) => (
            <TeamCard
              key={person.name}
              colorIndex={index + coachOrganization.coaches.length}
              person={person}
            />
          ))}
        </div>
      </section>

      <CoachBottomNav activeHref="/coach" />
    </CoachThemeShell>
  );
}
