import Link from "next/link";

import type { Announcement } from "@/data/announcements";

import styles from "./LatestAnnouncements.module.css";

type LatestAnnouncementsProps = {
  announcements: Announcement[];
  limit?: number;
};

const compactDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function LatestAnnouncements({
  announcements,
  limit = 4,
}: LatestAnnouncementsProps) {
  const latestItems = announcements.slice(0, limit);

  return (
    <aside className={styles.panel} aria-labelledby="latest-announcements-title">
      <div className={styles.headingRow}>
        <h2 className={styles.heading} id="latest-announcements-title">
          Latest announcements
        </h2>
        <Link className={styles.viewAllLink} href="/feeds">
          View all
        </Link>
      </div>

      <ol className={styles.list}>
        {latestItems.map((announcement) => (
          <li className={styles.item} key={announcement.slug}>
            <Link
              className={styles.titleLink}
              href={`/feeds/${announcement.slug}`}
            >
              {announcement.title}
            </Link>
            <p className={styles.details}>
              <time dateTime={announcement.publishedAt}>
                {compactDateFormatter.format(
                  new Date(announcement.publishedAt),
                )}
              </time>
              <span>{announcement.author}</span>
            </p>
          </li>
        ))}
      </ol>
    </aside>
  );
}
