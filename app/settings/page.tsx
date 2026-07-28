import type { Metadata } from "next";

import { ContentPanel } from "@/components/content/ContentPanel";
import { PageHeader } from "@/components/layout/PageHeader";
import { NavigationLayoutSelector } from "@/components/preferences/NavigationLayoutSelector";
import { ThemeSelector } from "@/components/preferences/ThemeSelector";
import { WelcomeGuideControl } from "@/components/preferences/WelcomeGuideControl";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Settings" }]}
        title="Settings"
      />

      <ContentPanel title="Preferences">
        <ThemeSelector />
        <NavigationLayoutSelector />
        <WelcomeGuideControl />
      </ContentPanel>
    </>
  );
}
