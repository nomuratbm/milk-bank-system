// src/contexts/ThemeContext.tsx
import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { getProgramTheme, type ProgramTheme } from "../constants/programTheme";

const ThemeContext = createContext<ProgramTheme | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { programId } = useAuth();
  const theme = getProgramTheme(programId);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ProgramTheme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}