"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const availableThemes = ["day", "night", "ocean", "terminal"] as const;

export type Theme = (typeof availableThemes)[number];

type PreferencesContextValue = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

type PreferencesProviderProps = {
  children: ReactNode;
};

const themeStorageKey = "tondaw-theme";
const themeChangeEvent = "tondaw-theme-change";
const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return availableThemes.some((theme) => theme === value);
}

function getSavedTheme(): Theme {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  return isTheme(savedTheme) ? savedTheme : "day";
}

function getServerTheme(): Theme {
  return "day";
}

function subscribeToTheme(onThemeChange: () => void) {
  window.addEventListener("storage", onThemeChange);
  window.addEventListener(themeChangeEvent, onThemeChange);

  return () => {
    window.removeEventListener("storage", onThemeChange);
    window.removeEventListener(themeChangeEvent, onThemeChange);
  };
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getSavedTheme,
    getServerTheme,
  );

  // Keep the document theme aligned with the preference stored by the browser.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function setTheme(themeChoice: Theme) {
    document.documentElement.dataset.theme = themeChoice;
    window.localStorage.setItem(themeStorageKey, themeChoice);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <PreferencesContext.Provider value={{ setTheme, theme }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const preferences = useContext(PreferencesContext);

  if (!preferences) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return preferences;
}
