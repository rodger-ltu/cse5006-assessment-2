import { prisma } from "@/lib/prisma";

export type AnnouncementInput = {
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  feedId: number;
  authorName: string;
  authorEmail?: string;
  imageUrl?: string;
  linkUrl?: string;
  slug?: string;
};

function requiredText(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required.`);
  }

  return value.trim();
}

function optionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseAnnouncementInput(body: unknown): AnnouncementInput {
  if (!body || typeof body !== "object") {
    throw new Error("A JSON announcement object is required.");
  }

  const value = body as Record<string, unknown>;
  const feedId = Number(value.feedId);
  const publishedAt = requiredText(value.publishedAt, "publishedAt");

  if (!Number.isInteger(feedId) || feedId < 1) {
    throw new Error("feedId must be a positive integer.");
  }

  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error("publishedAt must be a valid date.");
  }

  return {
    title: requiredText(value.title, "title"),
    summary: requiredText(value.summary, "summary"),
    content: requiredText(value.content, "content"),
    category: requiredText(value.category, "category"),
    publishedAt,
    feedId,
    authorName: requiredText(value.authorName, "authorName"),
    authorEmail: optionalText(value.authorEmail),
    imageUrl: optionalText(value.imageUrl),
    linkUrl: optionalText(value.linkUrl),
    slug: optionalText(value.slug),
  };
}

export async function getOrCreateAuthor(input: AnnouncementInput) {
  if (input.authorEmail) {
    return prisma.author.upsert({
      where: { email: input.authorEmail },
      update: { name: input.authorName },
      create: { name: input.authorName, email: input.authorEmail },
    });
  }

  const existing = await prisma.author.findFirst({
    where: { name: input.authorName },
  });

  return existing ?? prisma.author.create({ data: { name: input.authorName } });
}
