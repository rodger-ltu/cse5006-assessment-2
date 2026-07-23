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
    <section aria-label="Announcement list">
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
