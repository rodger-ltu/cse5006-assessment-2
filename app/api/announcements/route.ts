import { createSlug, getOrCreateAuthor, parseAnnouncementInput } from "@/lib/announcementInput";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

export async function GET(request: Request) {
  const startedAt = Date.now();
  const url = new URL(request.url);
  const sourceGroup = url.searchParams.get("sourceGroup");
  const feedSlug = url.searchParams.get("feed");

  const records = await prisma.announcement.findMany({
    where: {
      ...(sourceGroup === "current" || sourceGroup === "other"
        ? { feed: { sourceGroup } }
        : {}),
      ...(feedSlug ? { feed: { slug: feedSlug } } : {}),
    },
    include: { author: true, feed: true },
    orderBy: { publishedAt: "desc" },
  });

  const data = records.map((record) => ({
    id: record.id,
    slug: record.slug,
    title: record.title,
    summary: record.summary,
    content: record.content,
    category: record.category,
    publishedAt: record.publishedAt.toISOString(),
    imageUrl: record.imageUrl,
    linkUrl: record.linkUrl,
    author: record.author,
    feed: record.feed,
  }));
  const response = successResponse(data);

  await recordRequest({ request, route: "/api/announcements", statusCode: 200, startedAt });
  return response;
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const input = parseAnnouncementInput(await request.json());
    const [feed, author] = await Promise.all([
      prisma.feed.findUnique({ where: { id: input.feedId } }),
      getOrCreateAuthor(input),
    ]);

    if (!feed) {
      return errorResponse("FEED_NOT_FOUND", "The selected feed does not exist.", 404);
    }

    const record = await prisma.announcement.create({
      data: {
        slug: createSlug(input.slug ?? input.title),
        title: input.title,
        summary: input.summary,
        content: input.content,
        category: input.category,
        publishedAt: new Date(input.publishedAt),
        imageUrl: input.imageUrl,
        linkUrl: input.linkUrl,
        feedId: feed.id,
        authorId: author.id,
      },
      include: { author: true, feed: true },
    });
    const response = successResponse(record, 201);

    await recordRequest({ request, route: "/api/announcements", statusCode: 201, startedAt, feedId: feed.id });
    return response;
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "Unable to create announcement.";
    await recordRequest({ request, route: "/api/announcements", statusCode: 400, startedAt });
    return errorResponse("INVALID_ANNOUNCEMENT", message, 400);
  }
}
