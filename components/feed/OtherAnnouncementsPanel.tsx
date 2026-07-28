import Link from "next/link";

import type { Announcement } from "@/data/announcements";

import { FeedPanel } from "./FeedPanel";
import { formatAnnouncementDate } from "./announcementDate";
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
    <FeedPanel
      as="aside"
      heading="Other subjects & services"
      headingId="other-announcements-title"
      viewAllHref="/feeds?filter=other"
    >
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
    </FeedPanel>
  );
}
