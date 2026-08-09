import { AnnouncementManager } from "@/components/admin/AnnouncementManager";
import { PageHeader } from "@/components/layout/PageHeader";

export default function ManagePage() {
  return <><PageHeader breadcrumbs={[{ href: "/", label: "Home" }, { label: "Manage" }]} title="Manage notices" /><AnnouncementManager /></>;
}
