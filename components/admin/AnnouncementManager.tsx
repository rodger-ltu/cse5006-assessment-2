"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

import styles from "./AnnouncementManager.module.css";

type Feed = { id: number; name: string };
type Notice = {
  id: number; title: string; summary: string; content: string; category: string;
  publishedAt: string; author: { name: string; email?: string | null }; feed: Feed;
};

const emptyForm = { title: "", summary: "", content: "", category: "Subject update", publishedAt: new Date().toISOString().slice(0, 10), authorName: "", authorEmail: "", feedId: "" };

export function AnnouncementManager() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const loadData = useCallback(async () => {
    const [feedResponse, noticeResponse] = await Promise.all([fetch("/api/feeds"), fetch("/api/announcements")]);
    const feedBody = await feedResponse.json() as { data: Feed[] };
    const noticeBody = await noticeResponse.json() as { data: Notice[] };
    setFeeds(feedBody.data); setNotices(noticeBody.data);
    setForm((current) => current.feedId || !feedBody.data[0] ? current : { ...current, feedId: String(feedBody.data[0].id) });
  }, []);

  useEffect(() => {
    // The manager synchronises its client-side list with the CRUD API on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, [loadData]);

  function editNotice(notice: Notice) {
    setEditingId(notice.id);
    setForm({ title: notice.title, summary: notice.summary, content: notice.content, category: notice.category, publishedAt: notice.publishedAt.slice(0, 10), authorName: notice.author.name, authorEmail: notice.author.email ?? "", feedId: String(notice.feed.id) });
    setMessage(`Editing “${notice.title}”.`);
  }

  function resetForm() {
    setEditingId(null); setForm({ ...emptyForm, feedId: feeds[0] ? String(feeds[0].id) : "" }); setMessage("");
  }

  async function saveNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = editingId ? `/api/announcements/${editingId}` : "/api/announcements";
    const response = await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, feedId: Number(form.feedId) }) });
    const body = await response.json() as { error?: { message: string } };
    if (!response.ok) { setMessage(body.error?.message ?? "The notice could not be saved."); return; }
    setMessage(editingId ? "Notice updated." : "Notice published."); resetForm(); await loadData();
  }

  async function deleteNotice(id: number) {
    if (!window.confirm("Delete this sample announcement?")) return;
    const response = await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    setMessage(response.ok ? "Notice deleted." : "The notice could not be deleted.");
    await loadData();
  }

  return (
    <div className={styles.layout}>
      <section className={styles.panel} aria-labelledby="editor-title">
        <h2 id="editor-title">{editingId ? "Edit notice" : "Publish notice"}</h2>
        <form className={styles.form} onSubmit={saveNotice}>
          {(["title", "summary", "content", "category", "authorName", "authorEmail"] as const).map((name) => (
            <label className={styles.field} key={name}>{name === "authorName" ? "Author" : name === "authorEmail" ? "Author email (optional)" : name[0].toUpperCase() + name.slice(1)}
              {name === "content" || name === "summary" ? <textarea required value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} /> : <input required={name !== "authorEmail"} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} />}
            </label>
          ))}
          <label className={styles.field}>Publication date<input required type="date" value={form.publishedAt} onChange={(event) => setForm({ ...form, publishedAt: event.target.value })} /></label>
          <label className={styles.field}>Feed<select required value={form.feedId} onChange={(event) => setForm({ ...form, feedId: event.target.value })}>{feeds.map((feed) => <option key={feed.id} value={feed.id}>{feed.name}</option>)}</select></label>
          <div className={styles.actions}><button className={styles.button} type="submit">{editingId ? "Save changes" : "Publish"}</button>{editingId && <button className={`${styles.button} ${styles.secondary}`} onClick={resetForm} type="button">Cancel</button>}</div>
        </form>
        <p className={styles.message} aria-live="polite">{message}</p>
      </section>
      <section className={styles.panel} aria-labelledby="published-title">
        <h2 id="published-title">Published notices</h2>
        <ul className={styles.list}>{notices.map((notice) => <li className={styles.item} key={notice.id}><h3>{notice.title}</h3><p>{notice.feed.name} · {notice.author.name}</p><div className={styles.actions}><button className={`${styles.button} ${styles.secondary}`} onClick={() => editNotice(notice)} type="button">Edit</button><button className={`${styles.button} ${styles.secondary}`} onClick={() => void deleteNotice(notice.id)} type="button">Delete</button></div></li>)}</ul>
      </section>
    </div>
  );
}
