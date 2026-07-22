import type { Metadata } from "next";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { PreferencesProvider } from "@/components/preferences/PreferencesProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TONDAW",
    template: "%s | TONDAW",
  },
  description:
    "Assessment 1 frontend for organising university announcements through an RSS-to-LMS workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day">
      <body>
        <SiteLayout>
          <PreferencesProvider>{children}</PreferencesProvider>
        </SiteLayout>
      </body>
    </html>
  );
}
