import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/talentbridge/landing";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TalentBridge AI | Skills without borders" },
      {
        name: "description",
        content:
          "Showcase your abilities and explore career pathways for skilled refugees in Kenya.",
      },
      { property: "og:title", content: "TalentBridge AI | Skills without borders" },
      {
        property: "og:description",
        content:
          "Showcase your abilities and explore career pathways for skilled refugees in Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <Landing />;
}
