import Link from "next/link";

import styles from "./Breadcrumbs.module.css";

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <li className={styles.item} key={`${item.label}-${index}`}>
              {item.href && !isCurrentPage ? (
                <Link className={styles.link} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isCurrentPage ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
