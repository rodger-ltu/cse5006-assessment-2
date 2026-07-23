"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const availableThemes = ["day", "night", "ocean", "terminal"] as const;
export const availableNavigationLayouts = ["top", "side"] as const;

export type Theme = (typeof availableThemes)[number];
export type NavigationLayout = (typeof availableNavigationLayouts)[number];

type PreferencesContextValue = {
  dismissWelcomeGuide: () => void;
  isWelcomeGuideDismissed: boolean;
  navigationLayout: NavigationLayout;
  restoreWelcomeGuide: () => void;
  setNavigationLayout: (layout: NavigationLayout) => void;
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

type PreferencesProviderProps = {
  children: ReactNode;
};

const themeStorageKey = "tondaw-theme";
const navigationStorageKey = "tondaw-navigation-layout";
const welcomeGuideStorageKey = "tondaw-welcome-guide-dismissed";
const preferencesChangeEvent = "tondaw-preferences-change";
const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return availableThemes.some((theme) => theme === value);
}

function isNavigationLayout(value: string | null): value is NavigationLayout {
  return availableNavigationLayouts.some((layout) => layout === value);
}

function getSavedTheme(): Theme {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  return isTheme(savedTheme) ? savedTheme : "day";
}

function getSavedNavigationLayout(): NavigationLayout {
  const savedLayout = window.localStorage.getItem(navigationStorageKey);
  return isNavigationLayout(savedLayout) ? savedLayout : "top";
}

function getSavedWelcomeGuideDismissed(): boolean {
  return window.localStorage.getItem(welcomeGuideStorageKey) === "true";
}

function getServerTheme(): Theme {
  return "day";
}

function getServerNavigationLayout(): NavigationLayout {
  return "top";
}

function getServerWelcomeGuideDismissed(): boolean {
  return false;
}

function subscribeToPreferences(onPreferenceChange: () => void) {
  window.addEventListener("storage", onPreferenceChange);
  window.addEventListener(preferencesChangeEvent, onPreferenceChange);

  return () => {
    window.removeEventListener("storage", onPreferenceChange);
    window.removeEventListener(preferencesChangeEvent, onPreferenceChange);
  };
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const theme = useSyncExternalStore(
    subscribeToPreferences,
    getSavedTheme,
    getServerTheme,
  );
  const navigationLayout = useSyncExternalStore(
    subscribeToPreferences,
    getSavedNavigationLayout,
    getServerNavigationLayout,
  );
  const isWelcomeGuideDismissed = useSyncExternalStore(
    subscribeToPreferences,
    getSavedWelcomeGuideDismissed,
    getServerWelcomeGuideDismissed,
  );

  // Keep the document theme aligned with the preference stored by the browser.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function setTheme(themeChoice: Theme) {
    document.documentElement.dataset.theme = themeChoice;
    window.localStorage.setItem(themeStorageKey, themeChoice);
    window.dispatchEvent(new Event(preferencesChangeEvent));
  }

  function setNavigationLayout(layoutChoice: NavigationLayout) {
    window.localStorage.setItem(navigationStorageKey, layoutChoice);
    window.dispatchEvent(new Event(preferencesChangeEvent));
  }

  function dismissWelcomeGuide() {
    window.localStorage.setItem(welcomeGuideStorageKey, "true");
    window.dispatchEvent(new Event(preferencesChangeEvent));
  }

  function restoreWelcomeGuide() {
    window.localStorage.removeItem(welcomeGuideStorageKey);
    window.dispatchEvent(new Event(preferencesChangeEvent));
  }

  return (
    <PreferencesContext.Provider
      value={{
        dismissWelcomeGuide,
        isWelcomeGuideDismissed,
        navigationLayout,
        restoreWelcomeGuide,
        setNavigationLayout,
        setTheme,
        theme,
      }}
    >
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
