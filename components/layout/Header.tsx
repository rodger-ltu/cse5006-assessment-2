import Link from "next/link";

import styles from "./SiteLayout.module.css";

type HeaderProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export function Header({ isMenuOpen, onMenuToggle }: HeaderProps) {
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

        <button
          className={styles.menuButton}
          data-open={isMenuOpen}
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={onMenuToggle}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </span>
        </button>
      </div>
    </header>
  );
}
