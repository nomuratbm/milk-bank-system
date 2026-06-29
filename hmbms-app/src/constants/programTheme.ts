// src/constants/programTheme.ts
import type { Tables } from "../types/database.types";

// 1. Extract the ProgramId type dynamically from the beneficiaries table row structure
export type ProgramId = Tables<"beneficiaries">["program_id"];

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

// 2. Use a type assertion or explicit type map to satisfy the Record definition safely
export const PROGRAM_THEMES: Record<number, ProgramTheme> = {
  1: {
    programId: 1,
    name: "Supsup Todo",
    primary:      "#FFF085",
    primaryLight: "#FFF085",
    accent:       "#FFD230",
    cardBg:       "#FFD230",
    tabBarBg:     "#FFF085",
    headerBg:     "#FFF085",
    headerText:   "#1A1A1A",
    tabIconActive: "#1A1A1A",
  },
  2: {
    programId: 2,
    name: "Milky Way",
    primary:      "#CBFBF1",
    primaryLight: "#CBFBF1",
    accent:       "#96F7E4",
    cardBg:       "#96F7E4",
    tabBarBg:     "#CBFBF1",
    headerBg:     "#CBFBF1",
    headerText:   "#1A1A1A",
    tabIconActive: "#1A1A1A",
  },
  3: {
    programId: 3,
    name: "Mom's Act",
    primary:      "#FCCEE8",
    primaryLight: "#FCCEE8",
    accent:       "#FDA5D5",
    cardBg:       "#FDA5D5",
    tabBarBg:     "#FCCEE8",
    headerBg:     "#FCCEE8",
    headerText:   "#1A1A1A",
    tabIconActive: "#1A1A1A",
  },
};

// Helper function to safely fetch themes without breaking on unexpected or null program IDs
export function getProgramTheme(programId: ProgramId | null | undefined): ProgramTheme {
  const fallbackTheme = PROGRAM_THEMES[1]; // Default fallback if no program is selected yet
  if (!programId) return fallbackTheme;
  
  return PROGRAM_THEMES[programId as number] || fallbackTheme;
}