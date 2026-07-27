const longDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const compactDateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatAnnouncementDate(
  publishedAt: string,
  format: "compact" | "long" = "long",
) {
  const formatter = format === "compact" ? compactDateFormatter : longDateFormatter;

  return formatter.format(new Date(publishedAt));
}
