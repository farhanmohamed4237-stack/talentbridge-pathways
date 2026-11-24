import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/talentbridge/profile-pages";
import { Workspace } from "@/components/talentbridge/shell";
export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Professional profile | TalentBridge AI" },
      {
        name: "description",
        content: "Describe your education, experience, skills and professional goals.",
      },
      { property: "og:title", content: "Professional profile | TalentBridge AI" },
      {
        property: "og:description",
        content: "Describe your education, experience, skills and professional goals.",
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
      <ProfilePage />
    </Workspace>
  );
}
