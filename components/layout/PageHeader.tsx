import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function PageHeader({
  description,
  eyebrow,
  title,
}: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}
