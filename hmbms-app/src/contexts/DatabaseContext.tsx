/**
 * DatabaseContext.tsx
 * --------------------
 * This context stores which of the 3 milk bank programs (databases)
 * the staff member has selected on the Home screen.
 *
 * WHY A CONTEXT?
 * The staff has 4 screens (Home, Registry, Tracker, Reports). All of
 * them need to know which program is active so they show the right data
 * and the right accent color. Instead of passing a prop through every
 * screen (which is messy with Expo Router), we use React Context — a
 * global store any component can read with one hook call.
 *
 * ProgramId maps to the existing database.types.ts:
 *   1 → Supsup Todo   (#FFF085)
 *   2 → Milky Way     (#CBFBF1)
 *   3 → Mother's Act  (#FCCEE8)
 */

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { ProgramId } from '../types/database.types';

// ── Types ────────────────────────────────────────────────────
export interface ProgramMeta {
  id: ProgramId;
  label: string;   // display name on buttons and headers
  color: string;   // accent hex — used for header bg and button bg
  textColor: string; // foreground color on colored surfaces
}

// ── The 3 programs ───────────────────────────────────────────
// These IDs intentionally match the ProgramId type (1 | 2 | 3)
// already defined by the team in database.types.ts.
export const PROGRAMS: ProgramMeta[] = [
  { id: 1, label: 'Supsup Todo',  color: '#FFF085', textColor: '#1E1E1E' },
  { id: 2, label: 'Milky Way',    color: '#CBFBF1', textColor: '#1E1E1E' },
  { id: 3, label: "Mother's Act", color: '#FCCEE8', textColor: '#1E1E1E' },
];

// ── Context shape ─────────────────────────────────────────────
interface DatabaseContextValue {
  /** The currently active program meta object */
  activeProgram: ProgramMeta;
  /** Call this with a ProgramId to switch the active program */
  setActiveProgram: (id: ProgramId) => void;
}

// Default: start with Supsup Todo (id: 1)
const DatabaseContext = createContext<DatabaseContextValue>({
  activeProgram: PROGRAMS[0],
  setActiveProgram: () => {},
});

// ── Provider ──────────────────────────────────────────────────
/**
 * Wrap the staff route group with this provider so all staff
 * screens can call useDatabase(). We place it in the staff _layout.
 */
export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [activeProgram, setActiveMeta] = useState<ProgramMeta>(PROGRAMS[0]);

  // Accepts a raw ProgramId (1 | 2 | 3) and finds the full object
  const setActiveProgram = (id: ProgramId) => {
    const found = PROGRAMS.find(p => p.id === id);
    if (found) setActiveMeta(found);
  };

  return (
    <DatabaseContext value={{ activeProgram, setActiveProgram }}>
      {children}
    </DatabaseContext>
  );
}

// ── Hook ─────────────────────────────────────────────────────
/**
 * Usage in any staff screen:
 *   const { activeProgram, setActiveProgram } = useDatabase();
 */
export function useDatabase() {
  return useContext(DatabaseContext);
}
