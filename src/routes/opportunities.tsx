import { createFileRoute } from "@tanstack/react-router";
import { OpportunitiesPage } from "@/components/talentbridge/resource-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Explore opportunities | TalentBridge AI" },
      {
        name: "description",
        content:
          "Browse clearly labeled demonstration employment, mentorship, fellowship and training opportunities.",
      },
      { property: "og:title", content: "Explore opportunities | TalentBridge AI" },
      {
        property: "og:description",
        content:
          "Browse clearly labeled demonstration employment, mentorship, fellowship and training opportunities.",
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
      <OpportunitiesPage />
    </Workspace>
  );
}
