import type { ReactNode } from "react";

import styles from "./ContentPanel.module.css";

type ContentPanelProps = {
  children: ReactNode;
  title: string;
};

export function ContentPanel({ children, title }: ContentPanelProps) {
  return (
    <section className={styles.panel} aria-labelledby="content-panel-title">
      <h2 id="content-panel-title" className={styles.title}>
        {title}
      </h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
