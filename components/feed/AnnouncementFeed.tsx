import type {
  Announcement,
  AnnouncementReturnContext,
} from "@/data/announcements";

import { AnnouncementCard } from "./AnnouncementCard";
import styles from "./AnnouncementFeed.module.css";

type AnnouncementFeedProps = {
  announcements: Announcement[];
  label: string;
  returnContext: AnnouncementReturnContext;
};

export function AnnouncementFeed({
  announcements,
  label,
  returnContext,
}: AnnouncementFeedProps) {
  return (
    <section aria-label={label}>
      <div className={styles.feed}>
        {announcements.map((announcement) => (
          <AnnouncementCard
            announcement={announcement}
            key={announcement.slug}
            returnContext={returnContext}
          />
        ))}
      </div>
    </section>
  );
}
