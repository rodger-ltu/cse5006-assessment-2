import Link from "next/link";

import { Navigation } from "./Navigation";
import styles from "./SiteLayout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link className={styles.brand} href="/" aria-label="RSS to LMS home">
          <span className={styles.brandMark} aria-hidden="true">
            RSS
          </span>
          <span>RSS to LMS</span>
        </Link>

        <p className={styles.assessmentTitle}>
          Assessment 1: Frontend Design and Usability
        </p>
      </div>

      <Navigation />
    </header>
  );
}
