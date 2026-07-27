import Link from "next/link";

import type { FeedFilter } from "@/data/announcements";

import styles from "./FeedFilters.module.css";

type FeedFiltersProps = {
  activeFilter: FeedFilter;
  counts: Record<FeedFilter, number>;
};

const filterOptions: Array<{
  href: string;
  label: string;
  value: FeedFilter;
}> = [
  { href: "/feeds", label: "All announcements", value: "all" },
  {
    href: "/feeds?filter=current",
    label: "Current subject",
    value: "current",
  },
  {
    href: "/feeds?filter=other",
    label: "Other subjects & services",
    value: "other",
  },
];

export function FeedFilters({ activeFilter, counts }: FeedFiltersProps) {
  return (
    <nav className={styles.filters} aria-label="Filter announcements">
      <ul className={styles.list}>
        {filterOptions.map((option) => (
          <li key={option.value}>
            <Link
              aria-current={activeFilter === option.value ? "page" : undefined}
              className={styles.link}
              href={option.href}
            >
              <span>{option.label}</span>
              <span className={styles.count}>{counts[option.value]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
