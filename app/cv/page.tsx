import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/config";

export const metadata: Metadata = createPageMetadata("CV", "/cv");

export default function CvPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
        <h1 className="text-2xl font-bold">CV</h1>
        <a
          className="link-invert text-sm"
          href="https://edlison.github.io/CV/cv.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Open PDF
        </a>
      </div>

      <div className="w-full border border-zinc-200 rounded-lg overflow-hidden bg-white">
        <iframe
          className="w-full"
          src="https://edlison.github.io/CV/cv.pdf"
          style={{ height: "calc(100vh - 14rem)" }}
          title="CV PDF"
        />
      </div>
    </div>
  );
}
