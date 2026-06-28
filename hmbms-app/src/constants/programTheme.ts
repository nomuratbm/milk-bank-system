// src/constants/programTheme.ts
import type { ProgramId } from "../types/database.types";

export interface ProgramTheme {
  programId: ProgramId;
  name: string;
  primary: string;
  primaryLight: string;
  accent: string;
  cardBg: string;
  tabBarBg: string;
  headerBg: string;
  headerText: string;
  tabIconActive: string;
}

export const PROGRAM_THEMES: Record<ProgramId, ProgramTheme> = {
  1: {
    programId: 1,
    name: "Supsup Todo",
    primary:      "#FFD230",
    primaryLight: "#FFF192",
    accent:       "#F5C842",
    cardBg:       "#FFFBEA",
    tabBarBg:     "#FFD230",
    headerBg:     "#FFD230",
    headerText:   "#1A1A1A",
    tabIconActive: "#1A1A1A",
  },
  2: {
    programId: 2,
    name: "Milky Way",
    primary:      "#7FD8D4",
    primaryLight: "#D0F8EC",
    accent:       "#27978B",
    cardBg:       "#F0FAFA",
    tabBarBg:     "#7FD8D4",
    headerBg:     "#7FD8D4",
    headerText:   "#0B3B38",
    tabIconActive: "#0B3B38",
  },
  3: {
    programId: 3,
    name: "Mom's Act",
    primary:      "#F4A7C3",
    primaryLight: "#FAD6EA",
    accent:       "#D4608A",
    cardBg:       "#FFF0F6",
    tabBarBg:     "#F4A7C3",
    headerBg:     "#F4A7C3",
    headerText:   "#4A0020",
    tabIconActive: "#4A0020",
  },
};

export const DEFAULT_THEME = PROGRAM_THEMES[1];

export function getProgramTheme(programId: ProgramId | null): ProgramTheme {
  if (!programId) return DEFAULT_THEME;
  return PROGRAM_THEMES[programId];
}