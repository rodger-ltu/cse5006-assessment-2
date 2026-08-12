"use client";

import Link from "next/link";

import { ContentPanel } from "@/components/content/ContentPanel";
import { FeedPanel } from "@/components/feed/FeedPanel";
import { formatAnnouncementDate } from "@/components/feed/announcementDate";
import { usePreferences } from "@/components/preferences/PreferencesProvider";
import type { Announcement } from "@/data/announcements";

import styles from "./HomePrimaryContent.module.css";

type HomePrimaryContentProps = {
  currentSubjectAnnouncements: Announcement[];
};

const guideLinks = [
  { href: "/feeds", label: "Feeds", text: "Browse every announcement." },
  { href: "/about", label: "About", text: "Learn why TONDAW was created." },
  {
    href: "/settings",
    label: "Settings",
    text: "Choose a theme and navigation layout.",
  },
];

export function HomePrimaryContent({
  currentSubjectAnnouncements,
}: HomePrimaryContentProps) {
  const { dismissWelcomeGuide, isWelcomeGuideDismissed } = usePreferences();
  const visibleAnnouncements = currentSubjectAnnouncements.slice(0, 5);

  if (isWelcomeGuideDismissed) {
    return (
      <FeedPanel
        heading="Current subject"
        headingId="current-subject-title"
        viewAllHref="/feeds?filter=current"
      >
        {visibleAnnouncements.length > 0 ? (
          <ol className={styles.currentList}>
            {visibleAnnouncements.map((announcement) => (
              <li className={styles.currentItem} key={announcement.slug}>
                <div className={styles.currentHeadingRow}>
                  <h3 className={styles.currentHeading}>
                    <Link
                      className={styles.currentTitleLink}
                      href={`/feeds/${announcement.slug}?from=home`}
                    >
                      {announcement.title}
                    </Link>
                  </h3>
                  <span className={styles.currentAuthor}>
                    {announcement.author}
                  </span>
                </div>
                <p className={styles.currentSummary}>
                  {announcement.summary}
                </p>
                <p className={styles.currentFooter}>
                  <Link
                    aria-label={`Read the complete announcement: ${announcement.title}`}
                    className={styles.currentReadMore}
                    href={`/feeds/${announcement.slug}?from=home`}
                  >
                    Read more →
                  </Link>
                  <time
                    className={styles.currentDate}
                    dateTime={announcement.publishedAt}
                  >
                    {formatAnnouncementDate(
                      announcement.publishedAt,
                      "compact",
                    )}
                  </time>
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.emptyState}>
            No current-subject announcements have been published yet.
          </p>
        )}
      </FeedPanel>
    );
  }

  return (
    <ContentPanel title="Welcome to TONDAW">
      <p>
        TONDAW brings notices from university subjects and services into one
        clear feed.
      </p>
      <ul className={styles.guideList}>
        {guideLinks.map((guideLink) => (
          <li key={guideLink.href}>
            <Link href={guideLink.href}>{guideLink.label}</Link>
            <span> — {guideLink.text}</span>
          </li>
        ))}
      </ul>
      <button
        className={styles.dismissButton}
        onClick={dismissWelcomeGuide}
        type="button"
      >
        Start using TONDAW
      </button>
      <p className={styles.restoreNote}>
        You can show this guide again from Settings.
      </p>
    </ContentPanel>
  );
}
