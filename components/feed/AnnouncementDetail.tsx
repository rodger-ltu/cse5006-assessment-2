import Link from "next/link";

import type { Announcement } from "@/data/announcements";

import styles from "./AnnouncementDetail.module.css";

type AnnouncementDetailProps = {
  announcement: Announcement;
};

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function AnnouncementDetail({
  announcement,
}: AnnouncementDetailProps) {
  return (
    <article className={styles.article}>
      <dl className={styles.metadata}>
        <div>
          <dt>Published</dt>
          <dd>
            <time dateTime={announcement.publishedAt}>
              {dateFormatter.format(new Date(announcement.publishedAt))}
            </time>
          </dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{announcement.source}</dd>
        </div>
        <div>
          <dt>Author</dt>
          <dd>{announcement.author}</dd>
        </div>
      </dl>

      <div className={styles.content}>
        {announcement.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <Link className={styles.backLink} href="/feeds">
        <span aria-hidden="true">← </span>
        Back to all announcements
      </Link>
    </article>
  );
}
