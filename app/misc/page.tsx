import type { Metadata } from "next";

import { Section } from "@/components/section";
import MiscContent from "@/content/home/misc.mdx";
import { createPageMetadata } from "@/lib/config";

export const metadata: Metadata = createPageMetadata("Misc", "/misc");

export default function MiscPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8">
      <Section heading="h1" title="Misc">
        <MiscContent />
      </Section>
    </div>
  );
}
