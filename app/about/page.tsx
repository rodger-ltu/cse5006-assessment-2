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
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "About" },
        ]}
        eyebrow="About"
        title="About this project"
        description="Assessment 1 establishes the frontend experience for an RSS server that will later supply announcements to an LMS."
      />

      <ContentPanel title="Assessment scope">
        <p>
          This stage is frontend only. It uses sample announcement content so
          the navigation, layout and usability can be evaluated before backend
          RSS processing is introduced in Assessment 2.
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
    </>
  );
}
