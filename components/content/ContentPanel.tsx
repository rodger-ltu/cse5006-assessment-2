import { useId, type ReactNode } from "react";

import styles from "./ContentPanel.module.css";

type ContentPanelProps = {
  children: ReactNode;
  title: string;
};

export function ContentPanel({ children, title }: ContentPanelProps) {
  const titleId = useId();

  return (
    <section className={styles.panel} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
