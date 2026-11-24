import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/talentbridge/profile-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your career dashboard | TalentBridge AI" },
      {
        name: "description",
        content: "Track your profile, preliminary assessment and next career steps.",
      },
      { property: "og:title", content: "Your career dashboard | TalentBridge AI" },
      {
        property: "og:description",
        content: "Track your profile, preliminary assessment and next career steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <Workspace>
      <Dashboard />
    </Workspace>
  );
}
