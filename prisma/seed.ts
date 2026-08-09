import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedAnnouncements = [
  {
    slug: "cloud-application-workshop-resources",
    title: "Cloud application workshop resources available",
    feedSlug: "cse5006",
    authorEmail: "cse5006@latrobe.example",
    category: "Subject update",
    publishedAt: new Date("2026-07-21T09:30:00+10:00"),
    summary:
      "The workshop examples and supporting notes are available for students preparing their cloud application assessment.",
    content:
      "The latest workshop examples and supporting notes have been published in the subject resources area.\n\nStudents should review the API, database and Docker examples before completing Assessment 2.",
  },
  {
    slug: "postgraduate-internship-briefing",
    title: "Postgraduate industry internship briefing",
    feedSlug: "careers",
    authorEmail: "wil@latrobe.example",
    category: "Internship",
    publishedAt: new Date("2026-07-19T14:00:00+10:00"),
    summary:
      "A briefing session will explain the application process, available placements and important internship dates.",
    content:
      "Postgraduate students interested in an industry placement are invited to attend the upcoming internship briefing.\n\nThe session will cover eligibility, application requirements, placement support and key dates.",
  },
  {
    slug: "cybersecurity-lab-schedule-update",
    title: "Cybersecurity laboratory schedule updated",
    feedSlug: "cybersecurity",
    authorEmail: "cyber@latrobe.example",
    category: "Timetable",
    publishedAt: new Date("2026-07-17T11:15:00+10:00"),
    summary:
      "Several laboratory sessions have moved rooms. Students should check the revised schedule before attending class.",
    content:
      "The laboratory schedule has been revised to reflect room availability for the remainder of the teaching period.\n\nPlease confirm the room and starting time for your allocated session before travelling to campus.",
  },
  {
    slug: "student-hackathon-registrations",
    title: "Student hackathon registrations now open",
    feedSlug: "innovation",
    authorEmail: "innovation@latrobe.example",
    category: "Event",
    publishedAt: new Date("2026-07-15T16:45:00+10:00"),
    summary:
      "Students from all disciplines can register for a weekend challenge focused on practical solutions for campus life.",
    content:
      "Registrations are open for the upcoming student hackathon hosted by the Student Innovation Hub.\n\nParticipants may register individually or as a team. Mentors and technical support will be available throughout the event.",
  },
  {
    slug: "volunteer-mentor-program",
    title: "Applications open for volunteer student mentors",
    feedSlug: "student-support",
    authorEmail: "peerlearning@latrobe.example",
    category: "Volunteering",
    publishedAt: new Date("2026-07-13T10:00:00+10:00"),
    summary:
      "The peer learning program is seeking experienced students to support new students during their first teaching period.",
    content:
      "Applications are now open for students interested in joining the volunteer peer mentor program.\n\nMentors receive training and ongoing support while helping new students find services, activities and study resources.",
  },
];

async function seed() {
  const feeds = [
    {
      name: "CSE5006 Cloud-Based Web Application",
      slug: "cse5006",
      description: "Announcements for the current cloud application subject.",
      siteUrl: "https://www.latrobe.edu.au/",
      feedUrl: "http://localhost:3000/api/rss?feed=cse5006",
      sourceGroup: "current",
    },
    {
      name: "Careers and Opportunities",
      slug: "careers",
      description: "Internships and work-integrated learning notices.",
      siteUrl: "https://www.latrobe.edu.au/students/opportunities/careers",
      feedUrl: "http://localhost:3000/api/rss?feed=careers",
      sourceGroup: "other",
    },
    {
      name: "Cybersecurity Subjects",
      slug: "cybersecurity",
      description: "Cross-subject cybersecurity notices.",
      siteUrl: "https://www.latrobe.edu.au/",
      feedUrl: "http://localhost:3000/api/rss?feed=cybersecurity",
      sourceGroup: "other",
    },
    {
      name: "Student Innovation Hub",
      slug: "innovation",
      description: "Innovation events and hackathons.",
      siteUrl: "https://www.latrobe.edu.au/",
      feedUrl: "http://localhost:3000/api/rss?feed=innovation",
      sourceGroup: "other",
    },
    {
      name: "Student Support Services",
      slug: "student-support",
      description: "Student support and volunteering opportunities.",
      siteUrl: "https://www.latrobe.edu.au/students/support",
      feedUrl: "http://localhost:3000/api/rss?feed=student-support",
      sourceGroup: "other",
    },
  ];

  const authors = [
    { name: "CSE5006 Teaching Team", email: "cse5006@latrobe.example" },
    { name: "Work Integrated Learning Team", email: "wil@latrobe.example" },
    { name: "Cybersecurity Teaching Team", email: "cyber@latrobe.example" },
    {
      name: "Innovation and Entrepreneurship Team",
      email: "innovation@latrobe.example",
    },
    { name: "Peer Learning Team", email: "peerlearning@latrobe.example" },
  ];

  for (const feed of feeds) {
    await prisma.feed.upsert({
      where: { slug: feed.slug },
      update: feed,
      create: feed,
    });
  }

  for (const author of authors) {
    await prisma.author.upsert({
      where: { email: author.email },
      update: author,
      create: author,
    });
  }

  for (const announcement of seedAnnouncements) {
    const feed = await prisma.feed.findUniqueOrThrow({
      where: { slug: announcement.feedSlug },
    });
    const author = await prisma.author.findUniqueOrThrow({
      where: { email: announcement.authorEmail },
    });

    await prisma.announcement.upsert({
      where: { slug: announcement.slug },
      update: {
        title: announcement.title,
        summary: announcement.summary,
        content: announcement.content,
        category: announcement.category,
        publishedAt: announcement.publishedAt,
        feedId: feed.id,
        authorId: author.id,
      },
      create: {
        slug: announcement.slug,
        title: announcement.title,
        summary: announcement.summary,
        content: announcement.content,
        category: announcement.category,
        publishedAt: announcement.publishedAt,
        feedId: feed.id,
        authorId: author.id,
      },
    });
  }
}

seed()
  .then(() => console.log("TONDAW sample database is ready."))
  .finally(async () => prisma.$disconnect());
