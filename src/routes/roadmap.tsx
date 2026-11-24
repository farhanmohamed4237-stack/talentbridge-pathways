import { createFileRoute } from "@tanstack/react-router";
import { RoadmapPage } from "@/components/talentbridge/profile-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Career roadmap | TalentBridge AI" },
      {
        name: "description",
        content: "Explore skills gaps, learning steps and qualification recognition pathways.",
      },
      { property: "og:title", content: "Career roadmap | TalentBridge AI" },
      {
        property: "og:description",
        content: "Explore skills gaps, learning steps and qualification recognition pathways.",
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
      <RoadmapPage />
    </Workspace>
  );
}
