import Link from "next/link";

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
        <span className={styles.category}>{announcement.category}</span>
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

      <Link
        className={styles.readMoreLink}
        href={`/feeds/${announcement.slug}`}
        aria-label={`Read the complete announcement: ${announcement.title}`}
      >
        Read more
        <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}
