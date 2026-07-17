import { GalleryGrid } from "../components/sections/gallery";
import { FinalCTA, PageHero } from "../components/sections/shared";

export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments of Impact"
        description="Conferences, executive engagements, community outreach, and global tours — captured in a single collection."
      />
      <GalleryGrid />
      <FinalCTA />
    </>
  );
}
