import { createFileRoute } from "@tanstack/react-router";
import { AssistantPage } from "@/components/talentbridge/resource-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI career assistant preview | TalentBridge AI" },
      {
        name: "description",
        content: "Try scripted career preparation conversations in the TalentBridge AI prototype.",
      },
      { property: "og:title", content: "AI career assistant preview | TalentBridge AI" },
      {
        property: "og:description",
        content: "Try scripted career preparation conversations in the TalentBridge AI prototype.",
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
      <AssistantPage />
    </Workspace>
  );
}
