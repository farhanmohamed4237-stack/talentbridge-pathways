import { createFileRoute } from "@tanstack/react-router";
import { RegistrationPage } from "@/components/talentbridge/auth-pages";
export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Start your journey | TalentBridge AI" },
      {
        name: "description",
        content: "Preview registration and begin a locally saved professional profile.",
      },
      { property: "og:title", content: "Start your journey | TalentBridge AI" },
      {
        property: "og:description",
        content: "Preview registration and begin a locally saved professional profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <RegistrationPage />;
}
