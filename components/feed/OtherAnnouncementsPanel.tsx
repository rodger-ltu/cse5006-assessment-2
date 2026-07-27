import Link from "next/link";

import type { Announcement } from "@/data/announcements";

import { formatAnnouncementDate } from "./announcementDate";
import panelStyles from "./FeedPanel.module.css";
import styles from "./OtherAnnouncementsPanel.module.css";

type OtherAnnouncementsPanelProps = {
  announcements: Announcement[];
  limit?: number;
};

export function OtherAnnouncementsPanel({
  announcements,
  limit = 4,
}: OtherAnnouncementsPanelProps) {
  const visibleAnnouncements = announcements.slice(0, limit);

  return (
    <aside
      className={panelStyles.panel}
      aria-labelledby="other-announcements-title"
    >
      <div className={panelStyles.headingRow}>
        <h2 className={panelStyles.heading} id="other-announcements-title">
          Other subjects &amp; services
        </h2>
        <Link className={styles.viewAllLink} href="/feeds?filter=other">
          View all
        </Link>
      </div>

      <ol className={styles.list}>
        {visibleAnnouncements.map((announcement) => (
          <li className={styles.item} key={announcement.slug}>
            <Link
              className={styles.titleLink}
              href={`/feeds/${announcement.slug}?from=home`}
            >
              {announcement.title}
            </Link>
            <p className={styles.details}>
              <time dateTime={announcement.publishedAt}>
                {formatAnnouncementDate(announcement.publishedAt, "compact")}
              </time>
              <span>{announcement.author}</span>
            </p>
          </li>
        ))}
      </ol>
    </aside>
  );
}
