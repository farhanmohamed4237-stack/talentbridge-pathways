import { createFileRoute } from "@tanstack/react-router";
import { AssessmentPage } from "@/components/talentbridge/assessment-page";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Skills assessment | TalentBridge AI" },
      {
        name: "description",
        content: "Explore foundational workplace competencies with a preliminary assessment.",
      },
      { property: "og:title", content: "Skills assessment | TalentBridge AI" },
      {
        property: "og:description",
        content: "Explore foundational workplace competencies with a preliminary assessment.",
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
      <AssessmentPage />
    </Workspace>
  );
}
