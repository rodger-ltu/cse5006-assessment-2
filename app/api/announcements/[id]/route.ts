import { getOrCreateAuthor, parseAnnouncementInput } from "@/lib/announcementInput";
import { errorResponse, successResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { recordRequest } from "@/lib/requestMetrics";

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(request: Request, context: RouteContext<"/api/announcements/[id]">) {
  const startedAt = Date.now();
  const id = parseId((await context.params).id);

  if (!id) return errorResponse("INVALID_ID", "A positive announcement ID is required.", 400);

  const record = await prisma.announcement.findUnique({
    where: { id },
    include: { author: true, feed: true },
  });

  await recordRequest({ request, route: "/api/announcements/[id]", statusCode: record ? 200 : 404, startedAt, feedId: record?.feedId });
  return record
    ? successResponse(record)
    : errorResponse("NOT_FOUND", "Announcement not found.", 404);
}

export async function PUT(request: Request, context: RouteContext<"/api/announcements/[id]">) {
  const startedAt = Date.now();
  const id = parseId((await context.params).id);

  if (!id) return errorResponse("INVALID_ID", "A positive announcement ID is required.", 400);

  try {
    const input = parseAnnouncementInput(await request.json());
    const [existingRecord, feed] = await Promise.all([
      prisma.announcement.findUnique({ where: { id } }),
      prisma.feed.findUnique({ where: { id: input.feedId } }),
    ]);

    if (!existingRecord) {
      await recordRequest({
        request,
        route: "/api/announcements/[id]",
        statusCode: 404,
        startedAt,
      });
      return errorResponse("NOT_FOUND", "Announcement not found.", 404);
    }

    if (!feed) {
      await recordRequest({
        request,
        route: "/api/announcements/[id]",
        statusCode: 404,
        startedAt,
      });
      return errorResponse(
        "FEED_NOT_FOUND",
        "The selected feed does not exist.",
        404,
      );
    }

    const author = await getOrCreateAuthor(input);
    const record = await prisma.announcement.update({
      where: { id },
      data: {
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

    await recordRequest({ request, route: "/api/announcements/[id]", statusCode: 200, startedAt, feedId: record.feedId });
    return successResponse(record);
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "Unable to update announcement.";
    await recordRequest({ request, route: "/api/announcements/[id]", statusCode: 400, startedAt });
    return errorResponse("UPDATE_FAILED", message, 400);
  }
}

export async function DELETE(request: Request, context: RouteContext<"/api/announcements/[id]">) {
  const startedAt = Date.now();
  const id = parseId((await context.params).id);

  if (!id) return errorResponse("INVALID_ID", "A positive announcement ID is required.", 400);

  try {
    const record = await prisma.announcement.delete({ where: { id } });
    await recordRequest({ request, route: "/api/announcements/[id]", statusCode: 200, startedAt, feedId: record.feedId });
    return successResponse({ deletedId: record.id });
  } catch {
    await recordRequest({ request, route: "/api/announcements/[id]", statusCode: 404, startedAt });
    return errorResponse("NOT_FOUND", "Announcement not found.", 404);
  }
}
