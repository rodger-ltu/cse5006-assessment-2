import { ActionLink } from "@/components/layout/ActionLink";
import type { Announcement } from "@/data/announcements";

import styles from "./AnnouncementCard.module.css";

type AnnouncementCardProps = {
  announcement: Announcement;
};

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const titleId = `announcement-${announcement.slug}`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.metadata}>
        <span className={`${styles.category} ${styles.cardEmphasis}`}>
          {announcement.category}
        </span>
        <time dateTime={announcement.publishedAt}>
          {dateFormatter.format(new Date(announcement.publishedAt))}
        </time>
      </div>

      <h2 className={styles.title} id={titleId}>
        {announcement.title}
      </h2>

      <p className={styles.source}>
        {announcement.source} · {announcement.author}
      </p>
      <p className={styles.summary}>{announcement.summary}</p>

      <div className={`${styles.actions} ${styles.cardEmphasis}`}>
        <ActionLink
          ariaLabel={`Read the complete announcement: ${announcement.title}`}
          direction="forward"
          href={`/feeds/${announcement.slug}`}
        >
          Read more
        </ActionLink>
        <ActionLink
          ariaLabel="Back to latest announcements"
          direction="back"
          href="/"
        >
          Back
        </ActionLink>
      </div>
    </article>
  );
}
