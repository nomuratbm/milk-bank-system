// src/constants/programTheme.ts
import type { ProgramId } from "../types/database.types";

export interface ProgramTheme {
  programId: ProgramId;
  name: string;
  primary: string;
  accent: string;
  cardBg: string;
  tabBarBg: string;
  headerBg: string;
}

export const PROGRAM_THEMES: Record<ProgramId, ProgramTheme> = {
  1: {
    programId: 1,
    name: "Supsup Todo",
    primary:   "#F5C842",
    accent:    "#D4A017",
    cardBg:    "#FFFBEA",
    tabBarBg:  "#F5C842",
    headerBg:  "#F5C842",
  },
  2: {
    programId: 2,
    name: "Milky Way",
    primary:   "#7FD8D4",
    accent:    "#27978B",
    cardBg:    "#F0FAFA",
    tabBarBg:  "#7FD8D4",
    headerBg:  "#7FD8D4",
  },
  3: {
    programId: 3,
    name: "Mom's Act",
    primary:   "#F4A7C3",
    accent:    "#D4608A",
    cardBg:    "#FFF0F6",
    tabBarBg:  "#F4A7C3",
    headerBg:  "#F4A7C3",
  },
};

export const DEFAULT_THEME = PROGRAM_THEMES[1];

export function getProgramTheme(programId: ProgramId | null): ProgramTheme {
  if (!programId) return DEFAULT_THEME;
  return PROGRAM_THEMES[programId];
}