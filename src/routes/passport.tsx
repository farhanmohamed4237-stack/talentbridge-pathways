import { createFileRoute } from "@tanstack/react-router";
import { PassportPage } from "@/components/talentbridge/profile-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Digital skills passport | TalentBridge AI" },
      {
        name: "description",
        content:
          "Create a printable summary of your self-reported experience and preliminary competencies.",
      },
      { property: "og:title", content: "Digital skills passport | TalentBridge AI" },
      {
        property: "og:description",
        content:
          "Create a printable summary of your self-reported experience and preliminary competencies.",
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
      <PassportPage />
    </Workspace>
  );
}
