import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./SiteLayout.module.css";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={styles.siteLayout}>
      <Header />
      <main className={styles.mainContent} id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
