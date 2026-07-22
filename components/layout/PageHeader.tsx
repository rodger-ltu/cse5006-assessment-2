import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  breadcrumbs?: BreadcrumbItem[];
  description: string;
  eyebrow: string;
  title: string;
};

export function PageHeader({
  breadcrumbs,
  description,
  eyebrow,
  title,
}: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}
