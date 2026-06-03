export const coachColors = {
  background: "#1C1C1E",
  darkContainer: "#2C2C2E",
  darkText: "#121212",
  lightText: "#FFFFFF",
  mutedLightText: "#EBEBEB",
  neon: {
    vividCyan: "#00E5FF",
    softNeonPink: "#FF8FAB",
    luminousLilac: "#B388FF",
    electricMint: "#64FFDA",
    radiantYellow: "#F8DF95",
    blazingOrange: "#FFC79C",
  },
} as const;

export const coachNeonPalette = [
  coachColors.neon.vividCyan,
  coachColors.neon.softNeonPink,
  coachColors.neon.luminousLilac,
  coachColors.neon.electricMint,
  coachColors.neon.radiantYellow,
  coachColors.neon.blazingOrange,
] as const;

export type CoachNeonColor = (typeof coachNeonPalette)[number];

export function getCoachPaletteColor(index: number): CoachNeonColor {
  return coachNeonPalette[index % coachNeonPalette.length];
}

export function getCoachTextColor(backgroundColor: string): string {
  const normalizedColor = backgroundColor.toUpperCase();
  const brightColors = new Set<string>(coachNeonPalette);

  if (brightColors.has(normalizedColor as CoachNeonColor)) {
    return coachColors.darkText;
  }

  return coachColors.lightText;
}

export function getCoachMutedTextColor(backgroundColor: string): string {
  const normalizedColor = backgroundColor.toUpperCase();
  const brightColors = new Set<string>(coachNeonPalette);

  if (brightColors.has(normalizedColor as CoachNeonColor)) {
    return coachColors.darkText;
  }

  return coachColors.mutedLightText;
}
