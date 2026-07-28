import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./FeedPanel.module.css";

type FeedPanelProps = {
  as?: "aside" | "section";
  children: ReactNode;
  heading: string;
  headingId: string;
  viewAllHref: string;
};

// Shared panel structure keeps the two Home feed groups visually consistent.
export function FeedPanel({
  as: PanelElement = "section",
  children,
  heading,
  headingId,
  viewAllHref,
}: FeedPanelProps) {
  return (
    <PanelElement className={styles.panel} aria-labelledby={headingId}>
      <div className={styles.headingRow}>
        <h2 className={styles.heading} id={headingId}>
          {heading}
        </h2>
        <Link className={styles.actionLink} href={viewAllHref}>
          View all
        </Link>
      </div>
      {children}
    </PanelElement>
  );
}
