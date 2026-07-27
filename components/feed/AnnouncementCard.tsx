import { ActionLink } from "@/components/layout/ActionLink";
import type {
  Announcement,
  AnnouncementReturnContext,
} from "@/data/announcements";

import { formatAnnouncementDate } from "./announcementDate";
import styles from "./AnnouncementCard.module.css";

type AnnouncementCardProps = {
  announcement: Announcement;
  embedded?: boolean;
  returnContext?: AnnouncementReturnContext;
  showBackAction?: boolean;
};

export function AnnouncementCard({
  announcement,
  embedded = false,
  returnContext = "all",
  showBackAction = true,
}: AnnouncementCardProps) {
  const titleId = `announcement-${announcement.slug}`;
  const Title = embedded ? "h3" : "h2";
  const detailHref = `/feeds/${announcement.slug}?from=${returnContext}`;

  return (
    <article
      className={styles.card}
      data-embedded={embedded}
      aria-labelledby={titleId}
    >
      <div className={styles.metadata}>
        <span className={`${styles.category} ${styles.cardEmphasis}`}>
          {announcement.category}
        </span>
        <time dateTime={announcement.publishedAt}>
          {formatAnnouncementDate(announcement.publishedAt)}
        </time>
      </div>

      <Title className={styles.title} id={titleId}>
        {announcement.title}
      </Title>

      <p className={styles.source}>
        {announcement.source} · {announcement.author}
      </p>
      <p className={styles.summary}>{announcement.summary}</p>

      <div className={`${styles.actions} ${styles.cardEmphasis}`}>
        <ActionLink
          ariaLabel={`Read the complete announcement: ${announcement.title}`}
          direction="forward"
          href={detailHref}
        >
          Read more
        </ActionLink>
        {showBackAction && (
          <ActionLink ariaLabel="Back to Home" direction="back" href="/">
            Back
          </ActionLink>
        )}
      </div>
    </article>
  );
}
