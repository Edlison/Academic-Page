import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/config";

const routes = ["", "/pubs", "/misc", "/cv"] as const;

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
