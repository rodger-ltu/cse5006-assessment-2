"use client";

import Link from "next/link";

import { ContentPanel } from "@/components/content/ContentPanel";
import { AnnouncementCard } from "@/components/feed/AnnouncementCard";
import panelStyles from "@/components/feed/FeedPanel.module.css";
import { usePreferences } from "@/components/preferences/PreferencesProvider";
import type { Announcement } from "@/data/announcements";

import styles from "./HomePrimaryContent.module.css";

type HomePrimaryContentProps = {
  currentSubjectAnnouncement: Announcement;
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
  currentSubjectAnnouncement,
}: HomePrimaryContentProps) {
  const { dismissWelcomeGuide, isWelcomeGuideDismissed } = usePreferences();

  if (isWelcomeGuideDismissed) {
    return (
      <section
        className={panelStyles.panel}
        aria-labelledby="current-subject-title"
      >
        <div className={panelStyles.headingRow}>
          <h2 className={panelStyles.heading} id="current-subject-title">
            Current subject
          </h2>
        </div>
        <AnnouncementCard
          announcement={currentSubjectAnnouncement}
          embedded
          returnContext="home"
          showBackAction={false}
        />
      </section>
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
