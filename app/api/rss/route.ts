import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(request: Request) {
  const startedAt = Date.now();
  const requestedFeed = new URL(request.url).searchParams.get("feed");
  const feed = requestedFeed
    ? await prisma.feed.findUnique({ where: { slug: requestedFeed } })
    : null;
  const announcements = await prisma.announcement.findMany({
    where: feed ? { feedId: feed.id } : undefined,
    include: { author: true, feed: true },
    orderBy: { publishedAt: "desc" },
  });
  const origin = new URL(request.url).origin;
  const channelTitle = feed?.name ?? "TONDAW University Announcements";
  const items = announcements
    .map(
      (item) => `  <item>
    <title>${escapeXml(item.title)}</title>
    <description>${escapeXml(item.summary)}</description>
    <link>${escapeXml(item.linkUrl ?? `${origin}/feeds/${item.slug}`)}</link>
    <guid isPermaLink="false">tondaw-${item.id}</guid>
    <pubDate>${item.publishedAt.toUTCString()}</pubDate>
    <author>${escapeXml(item.author.name)}</author>
    <category>${escapeXml(item.category)}</category>
  </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(channelTitle)}</title>
  <description>${escapeXml(feed?.description ?? "University notices collected by TONDAW")}</description>
  <link>${escapeXml(feed?.siteUrl ?? origin)}</link>
${items}
</channel>
</rss>`;

  await recordRequest({ request, route: "/api/rss", statusCode: 200, startedAt, feedId: feed?.id });
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
