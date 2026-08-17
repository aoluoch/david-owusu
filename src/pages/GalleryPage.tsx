import { GalleryGrid } from "../components/sections/gallery";
import { PageHero } from "../components/sections/shared";
import { breadcrumbJsonLd, useSeo } from "../lib/seo";

export function GalleryPage() {
  useSeo({
    title: "Gallery",
    description:
      "View moments from Dr. David Owusu's conferences, executive engagements, community outreach, and international tours.",
    path: "/gallery",
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
      ]),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments of Impact"
        description="Conferences, executive engagements, community outreach, and global tours — captured in a single collection."
      />
      <GalleryGrid />
    </>
  );
}
