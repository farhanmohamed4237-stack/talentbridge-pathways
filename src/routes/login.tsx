import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/talentbridge/auth-pages";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Welcome back | TalentBridge AI" },
      {
        name: "description",
        content: "Explore the sign-in preview or open your saved career workspace.",
      },
      { property: "og:title", content: "Welcome back | TalentBridge AI" },
      {
        property: "og:description",
        content: "Explore the sign-in preview or open your saved career workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <LoginPage />;
}
