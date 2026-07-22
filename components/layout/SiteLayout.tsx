"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const pathname = usePathname();
  const mainContentRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The shared layout stays mounted, so reset its scroll pane on navigation.
  useEffect(() => {
    mainContentRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

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
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((isOpen) => !isOpen)}
      />

      <div className={styles.contentFrame}>
        <Navigation
          isMenuOpen={isMenuOpen}
          onNavigate={() => setIsMenuOpen(false)}
        />
        <main
          className={styles.mainContent}
          id="main-content"
          ref={mainContentRef}
          tabIndex={-1}
        >
          <div className={styles.mainContentInner}>{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
