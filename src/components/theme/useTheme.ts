"use client";

import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "./ThemeProvider";

export default function useTheme(): ThemeContextValue {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return theme;
}
