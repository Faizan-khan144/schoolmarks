import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { themes, defaultTheme } from "../themes/themes";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("schoolmarks-theme");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultTheme;
      }
    }

    return defaultTheme;
  });

  const preset = themes[settings.preset] || themes.schoolBlue;

  const colors = settings.custom && settings.customColors
    ? settings.customColors
    : preset;

  const resolvedMode =
    settings.mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : settings.mode;

  const updateSettings = (updates) => {
    setSettings((current) => ({
      ...current,
      ...updates
    }));
  };

  const setTheme = (presetName) => {
    setSettings((current) => ({
      ...current,
      preset: presetName,
      custom: false
    }));
  };

  const setMode = (mode) => {
    setSettings((current) => ({
      ...current,
      mode
    }));
  };

  const setCustomColors = (customColors) => {
    setSettings((current) => ({
      ...current,
      custom: true,
      customColors
    }));
  };

  useEffect(() => {
    localStorage.setItem("schoolmarks-theme", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--text", colors.text);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--radius", settings.radius);

    root.dataset.mode = resolvedMode;
    root.dataset.style = settings.style;
  }, [colors, resolvedMode, settings.radius, settings.style]);

  const value = useMemo(
    () => ({
      settings,
      colors,
      themes,
      resolvedMode,
      updateSettings,
      setTheme,
      setMode,
      setCustomColors
    }),
    [settings, colors, resolvedMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}