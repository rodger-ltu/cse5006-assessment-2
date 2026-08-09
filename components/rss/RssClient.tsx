"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import styles from "./RssClient.module.css";

type RssNotice = {
  id: number; slug: string; title: string; summary: string; publishedAt: string;
  author: { name: string }; feed: { name: string };
};

export function RssClient() {
  const [notices, setNotices] = useState<RssNotice[]>([]);
  const [message, setMessage] = useState("Loading the RSS server…");

  const loadNotices = useCallback(async () => {
    setMessage("Loading the RSS server…");
    try {
      const response = await fetch("/api/announcements", { cache: "no-store" });
      if (!response.ok) throw new Error("The RSS server did not respond.");
      const body = (await response.json()) as { data: RssNotice[] };
      setNotices(body.data);
      setMessage(`${body.data.length} notices received from the server`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load notices.");
    }
  }, []);

  useEffect(() => {
    // Loading on mount is the intentional RSS client/server integration point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadNotices();
  }, [loadNotices]);

  return (
    <section aria-labelledby="rss-client-status">
      <div className={styles.toolbar}>
        <p className={styles.status} id="rss-client-status" aria-live="polite">{message}</p>
        <button className={styles.button} onClick={() => void loadNotices()} type="button">Refresh feed</button>
      </div>
      <ul className={styles.list}>
        {notices.map((notice) => (
          <li className={styles.item} key={notice.id}>
            <h2><Link href={`/feeds/${notice.slug}?from=all`}>{notice.title}</Link></h2>
            <p className={styles.meta}>{notice.feed.name} · {notice.author.name} · {new Date(notice.publishedAt).toLocaleDateString("en-AU")}</p>
            <p>{notice.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
