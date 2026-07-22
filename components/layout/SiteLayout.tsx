"use client";

import { useEffect, useState, type ReactNode } from "react";

import { usePreferences } from "@/components/preferences/PreferencesProvider";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import styles from "./SiteLayout.module.css";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  const { navigationLayout } = usePreferences();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Escape provides a predictable keyboard method for closing the compact menu.
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeMenuOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeMenuOnEscape);
    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, [isMenuOpen]);

  return (
    <div className={styles.siteLayout} data-navigation-layout={navigationLayout}>
      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((isOpen) => !isOpen)}
      />

      <div className={styles.contentFrame}>
        <Navigation
          isMenuOpen={isMenuOpen}
          onNavigate={() => setIsMenuOpen(false)}
        />
        <main className={styles.mainContent} id="main-content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
