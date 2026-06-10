import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NextGen Scholars — Learn Today. Lead Tomorrow." },
      {
        name: "description",
        content:
          "Premium coaching for Classes 6–12. Expert faculty, small batches, personalized mentorship. Book your free counseling session today.",
      },
      { property: "og:title", content: "NextGen Scholars — Learn Today. Lead Tomorrow." },
      {
        property: "og:description",
        content:
          "Premium coaching for Classes 6–12. Expert faculty, small batches, personalized mentorship.",
      },
    ],
  }),
  component: LandingPage,
});
