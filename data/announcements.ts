export type AnnouncementSourceGroup = "current" | "other";
export type FeedFilter = "all" | AnnouncementSourceGroup;
export type AnnouncementReturnContext = FeedFilter | "home";

export type Announcement = {
  id?: number;
  author: string;
  category: string;
  content: string[];
  publishedAt: string;
  slug: string;
  source: string;
  sourceGroup: AnnouncementSourceGroup;
  summary: string;
  title: string;
  imageUrl?: string;
  linkUrl?: string;
};
