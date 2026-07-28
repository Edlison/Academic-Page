import type { Metadata } from "next";

import { Section } from "@/components/section";
import PubsContent from "@/content/home/pubs.mdx";
import { createPageMetadata } from "@/lib/config";

export const metadata: Metadata = createPageMetadata("Publications", "/pubs");

export default function PublicationsPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8">
      <Section heading="h1" title="Publications">
        <PubsContent />
      </Section>
    </div>
  );
}
