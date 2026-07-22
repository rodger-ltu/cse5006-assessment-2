import type { Announcement } from "@/data/announcements";

import { AnnouncementCard } from "./AnnouncementCard";
import styles from "./AnnouncementFeed.module.css";

type AnnouncementFeedProps = {
  announcements: Announcement[];
};

export function AnnouncementFeed({
  announcements,
}: AnnouncementFeedProps) {
  return (
    <section aria-labelledby="announcement-feed-title">
      <div className={styles.headingRow}>
        <h2 className={styles.heading} id="announcement-feed-title">
          All announcements
        </h2>
        <span className={styles.count}>
          {announcements.length} sample items
        </span>
      </div>

      <div className={styles.feed}>
        {announcements.map((announcement) => (
          <AnnouncementCard
            announcement={announcement}
            key={announcement.slug}
          />
        ))}
      </div>
    </section>
  );
}
