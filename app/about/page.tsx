import type { Metadata } from "next";

import { ContentPanel } from "@/components/content/ContentPanel";
import { PageHeader } from "@/components/layout/PageHeader";

import styles from "./page.module.css";

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

      <ContentPanel title="Assessment video">
        <video
          className={styles.video}
          controls
          preload="metadata"
          aria-label="TONDAW Assessment 1 demonstration video"
        >
          <source src="/assets/tondaw-assessment-video.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <p>
          <a href="/assets/tondaw-assessment-video.mp4">
            Open the assessment video in a new tab
          </a>
        </p>
      </ContentPanel>
    </>
  );
}
