import type { Metadata } from "next";
import Link from "next/link";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/config";

export const metadata: Metadata = {
  alternates: { canonical: "/404" },
  openGraph: {
    type: "website",
    url: "/404",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/avatar.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/avatar.png"],
  },
};

export default function NotFound() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8 link-invert">
      <p>Page not found. Honesty setting at 90%.</p>
      <br />
      <Link href="/">cd ..</Link>
    </div>
  );
}
