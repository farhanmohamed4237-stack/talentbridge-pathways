import { createFileRoute } from "@tanstack/react-router";
import { GuidancePage } from "@/components/talentbridge/resource-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/guidance")({
  head: () => ({
    meta: [
      { title: "Kenya legal and financial guidance | TalentBridge AI" },
      {
        name: "description",
        content:
          "General information on employment documentation, credential recognition and financial access in Kenya.",
      },
      { property: "og:title", content: "Kenya legal and financial guidance | TalentBridge AI" },
      {
        property: "og:description",
        content:
          "General information on employment documentation, credential recognition and financial access in Kenya.",
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
      <GuidancePage />
    </Workspace>
  );
}
