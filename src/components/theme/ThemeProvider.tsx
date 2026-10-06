"use client";

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export interface ThemeContextValue {
  isLight: boolean;
  setIsLight: (isLight: boolean) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const isLightFromDom = (): boolean =>
  typeof document === "undefined" || !document.documentElement.classList.contains("dark");

const applyTheme = (isLight: boolean): void => {
  const root = document.documentElement;
  root.classList.toggle("dark", !isLight);
  root.classList.toggle("dark-scrollbar", !isLight);
  document.body.classList.toggle("dark-scrollbar", !isLight);
  root.style.colorScheme = isLight ? "light" : "dark";
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, isLight ? "light" : "dark");
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLight, setIsLightState] = useState(true);

  useEffect(() => {
    setIsLightState(isLightFromDom());
  }, []);

  const setIsLight = useCallback((nextIsLight: boolean) => {
    applyTheme(nextIsLight);
    setIsLightState(nextIsLight);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsLight(!isLightFromDom());
  }, [setIsLight]);

  const value = useMemo(
    () => ({ isLight, setIsLight, toggleTheme }),
    [isLight, setIsLight, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
