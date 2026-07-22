import Link from "next/link";

import { Navigation } from "./Navigation";
import styles from "./SiteLayout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="TONDAW home: Timely Online Notices, Distributed Announcement Web"
        >
          <span className={styles.brandMark} aria-hidden="true">
            T
          </span>
          <span className={styles.brandText} aria-hidden="true">
            <span>TONDAW</span>
            <span className={styles.brandExpansion}>
              Timely Online Notices · Distributed Announcement Web
            </span>
          </span>
        </Link>

        <p className={styles.assessmentTitle}>
          Assessment 1: Frontend Design and Usability
        </p>
      </div>

      <Navigation />
    </header>
  );
}
