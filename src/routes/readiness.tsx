import { createFileRoute } from "@tanstack/react-router";
import { ReadinessPage } from "@/components/talentbridge/readiness-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/readiness")({
  head: () => ({
    meta: [
      { title: "Employment readiness centre | TalentBridge AI" },
      { name: "description", content: "Track self-reported progress on documents, credential recognition, CVs, interviews and financial readiness." },
      { property: "og:title", content: "Employment readiness centre | TalentBridge AI" },
      { property: "og:description", content: "Track self-reported progress on documents, credential recognition, CVs, interviews and financial readiness." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <Workspace>
      <ReadinessPage />
    </Workspace>
  );
}
