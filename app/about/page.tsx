import type { Metadata } from "next";

import { ContentPanel } from "@/components/content/ContentPanel";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        title="About TONDAW"
      />

      <ContentPanel title="Assessment 2 scope">
        <p>
          TONDAW is a full-stack, database-backed RSS announcement platform
          developed for CSE5006 Assessment 2.
        </p>
        <p>
          <strong>TONDAW</strong> stands for Timely Online Notices —
          Distributed Announcement Web.
        </p>
        <p>
          <strong>Student:</strong> Rodger Herbert
          <br />
          <strong>Student number:</strong> 22838962
        </p>
      </ContentPanel>

      <ContentPanel title="How the system works">
        <p>
          Announcements, feeds and authors are stored in a SQLite database
          managed through Prisma. Next.js API routes provide CRUD operations,
          health information, request metrics and database statistics.
        </p>
        <p>
          The RSS Server converts database announcements into RSS XML. The RSS
          Client requests that feed, parses the XML and displays the returned
          announcements through the TONDAW interface.
        </p>
      </ContentPanel>

      <ContentPanel title="Deployment">
        <p>
          The application runs inside a Docker container on an AWS EC2 server.
          A Docker named volume stores the SQLite database so its records survive
          container replacement and restart.
        </p>
      </ContentPanel>
    </>
  );
}