import { createFileRoute } from "@tanstack/react-router";
import { EmployerHubPage } from "@/components/talentbridge/readiness-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "Employer hub | TalentBridge AI" },
      { name: "description", content: "Guidance for employers and NGOs on fair, skills-first recruitment of displaced professionals in Kenya." },
      { property: "og:title", content: "Employer hub | TalentBridge AI" },
      { property: "og:description", content: "Guidance for employers and NGOs on fair, skills-first recruitment of displaced professionals in Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <Workspace>
      <EmployerHubPage />
    </Workspace>
  );
}
