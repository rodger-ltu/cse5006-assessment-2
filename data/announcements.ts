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

// Frontend-only sample data. Assessment 2 can replace this array with API data.
export const announcements: Announcement[] = [
  {
    slug: "cloud-application-workshop-resources",
    title: "Cloud application workshop resources available",
    source: "CSE5006 Cloud-Based Web Application",
    sourceGroup: "current",
    author: "CSE5006 Teaching Team",
    category: "Subject update",
    publishedAt: "2026-07-21T09:30:00+10:00",
    summary:
      "The workshop examples and supporting notes are now available for students preparing their frontend assessment.",
    content: [
      "The latest workshop examples and supporting notes have been published in the subject resources area.",
      "Students should review the React component, navigation and usability examples before completing Assessment 1.",
    ],
  },
  {
    slug: "postgraduate-internship-briefing",
    title: "Postgraduate industry internship briefing",
    source: "Careers and Opportunities",
    sourceGroup: "other",
    author: "Work Integrated Learning Team",
    category: "Internship",
    publishedAt: "2026-07-19T14:00:00+10:00",
    summary:
      "A briefing session will explain the application process, available placements and important internship dates.",
    content: [
      "Postgraduate students interested in an industry placement are invited to attend the upcoming internship briefing.",
      "The session will cover eligibility, application requirements, placement support and key dates.",
    ],
  },
  {
    slug: "cybersecurity-lab-schedule-update",
    title: "Cybersecurity laboratory schedule updated",
    source: "Cybersecurity Subjects",
    sourceGroup: "other",
    author: "Cybersecurity Teaching Team",
    category: "Timetable",
    publishedAt: "2026-07-17T11:15:00+10:00",
    summary:
      "Several laboratory sessions have moved rooms. Students should check the revised schedule before attending class.",
    content: [
      "The laboratory schedule has been revised to reflect room availability for the remainder of the teaching period.",
      "Please confirm the room and starting time for your allocated session before travelling to campus.",
    ],
  },
  {
    slug: "student-hackathon-registrations",
    title: "Student hackathon registrations now open",
    source: "Student Innovation Hub",
    sourceGroup: "other",
    author: "Innovation and Entrepreneurship Team",
    category: "Event",
    publishedAt: "2026-07-15T16:45:00+10:00",
    summary:
      "Students from all disciplines can register for a weekend challenge focused on practical solutions for campus life.",
    content: [
      "Registrations are open for the upcoming student hackathon hosted by the Student Innovation Hub.",
      "Participants may register individually or as a team. Mentors and technical support will be available throughout the event.",
    ],
  },
  {
    slug: "volunteer-mentor-program",
    title: "Applications open for volunteer student mentors",
    source: "Student Support Services",
    sourceGroup: "other",
    author: "Peer Learning Team",
    category: "Volunteering",
    publishedAt: "2026-07-13T10:00:00+10:00",
    summary:
      "The peer learning program is seeking experienced students to support new students during their first teaching period.",
    content: [
      "Applications are now open for students interested in joining the volunteer peer mentor program.",
      "Mentors receive training and ongoing support while helping new students find services, activities and study resources.",
    ],
  },
];

export function getAnnouncementBySlug(slug: string) {
  return announcements.find((announcement) => announcement.slug === slug);
}

export function getAnnouncementsByFilter(filter: FeedFilter) {
  if (filter === "all") {
    return announcements;
  }

  return announcements.filter(
    (announcement) => announcement.sourceGroup === filter,
  );
}
