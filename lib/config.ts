import type { Metadata } from "next";

export const SITE_URL = "https://blshen.org";
export const SITE_FAVICON = "/favicon.png";
export const SITE_TITLE = "Bolin Shen";
export const SITE_DESCRIPTION = "Bolin Shen - Academic Page";

export const MENUS = [
  {
    title: "Publications",
    link: "/pubs",
    target: "_self",
  },
  {
    title: "CV",
    link: "/cv",
    target: "_self",
  },
  {
    title: "Misc",
    link: "/misc",
    target: "_self",
  },
  {
    title: "iid.sh↗",
    link: "https://iid.sh",
    target: "_blank",
  },
] as const;

export const FOOTER_CONTENT = "This page is created by Bolin and AI.";

export const GOOGLE_GTAG = "G-ET18GF988R";

export function createPageMetadata(title: string, path: string): Metadata {
  const fullTitle = `${title} · ${SITE_TITLE}`;

  return {
    title,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description: SITE_DESCRIPTION,
      images: ["/avatar.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: SITE_DESCRIPTION,
      images: ["/avatar.png"],
    },
  };
}
