import { PageHeader } from "@/components/layout/PageHeader";
import { RssClient } from "@/components/rss/RssClient";

export default function RssClientPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ href: "/", label: "Home" }, { label: "RSS client" }]} title="RSS client" />
      <RssClient />
    </>
  );
}
