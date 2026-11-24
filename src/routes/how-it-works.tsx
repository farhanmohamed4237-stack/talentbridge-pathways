import { createFileRoute } from "@tanstack/react-router";
import { HowItWorks } from "@/components/talentbridge/landing";
export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works | TalentBridge AI" },
      {
        name: "description",
        content: "Build your profile, explore competencies and plan your next career step.",
      },
      { property: "og:title", content: "How it works | TalentBridge AI" },
      {
        property: "og:description",
        content: "Build your profile, explore competencies and plan your next career step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <HowItWorks />;
}
