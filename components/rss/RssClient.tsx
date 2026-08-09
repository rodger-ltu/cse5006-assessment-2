"use client";

import { useCallback, useEffect, useState } from "react";

import styles from "./RssClient.module.css";

type RssNotice = {
  guid: string;
  title: string;
  summary: string;
  link: string;
  publishedAt: string;
  author: string;
  category: string;
};

function elementText(element: Element, selector: string) {
  return element.querySelector(selector)?.textContent?.trim() ?? "";
}

function formatRssDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-AU");
}

export function RssClient() {
  const [notices, setNotices] = useState<RssNotice[]>([]);
  const [message, setMessage] = useState("Loading the RSS server…");

  const loadNotices = useCallback(async () => {
    setMessage("Loading the RSS server…");

    try {
      const response = await fetch("/api/rss", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("The RSS server did not respond.");
      }

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/rss+xml")) {
        throw new Error("The server did not return an RSS XML document.");
      }

      const xml = await response.text();
      const document = new DOMParser().parseFromString(
        xml,
        "application/xml",
      );

      if (document.querySelector("parsererror")) {
        throw new Error("The RSS XML could not be parsed.");
      }

      const parsedNotices = Array.from(
        document.querySelectorAll("item"),
      ).map((item) => ({
        guid: elementText(item, "guid"),
        title: elementText(item, "title"),
        summary: elementText(item, "description"),
        link: elementText(item, "link"),
        publishedAt: elementText(item, "pubDate"),
        author: elementText(item, "author"),
        category: elementText(item, "category"),
      }));

      setNotices(parsedNotices);
      setMessage(
        `${parsedNotices.length} RSS items received from /api/rss`,
      );
    } catch (error) {
      setNotices([]);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load the RSS feed.",
      );
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
        <p
          className={styles.status}
          id="rss-client-status"
          aria-live="polite"
        >
          {message}
        </p>

        <button
          className={styles.button}
          onClick={() => void loadNotices()}
          type="button"
        >
          Refresh feed
        </button>
      </div>

      <ul className={styles.list}>
        {notices.map((notice) => (
          <li className={styles.item} key={notice.guid}>
            <h2>
              <a href={notice.link}>{notice.title}</a>
            </h2>

            <p className={styles.meta}>
              {notice.category} · {notice.author} ·{" "}
              {formatRssDate(notice.publishedAt)}
            </p>

            <p>{notice.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}