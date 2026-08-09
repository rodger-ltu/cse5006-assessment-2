import type { Metadata } from "next";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { PreferencesProvider } from "@/components/preferences/PreferencesProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TONDAW | Assessment 2",
    template: "%s | TONDAW Assessment 2",
  },
  description:
    "CSE5006 Assessment 2 foundation for a database-backed RSS announcement platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day">
      <body>
        <PreferencesProvider>
          <SiteLayout>{children}</SiteLayout>
        </PreferencesProvider>
      </body>
    </html>
  );
}
