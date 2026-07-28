import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  GOOGLE_GTAG,
  SITE_DESCRIPTION,
  SITE_FAVICON,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: SITE_FAVICON },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={`${inter.variable} font-sans text-zinc-800`} lang="en">
      <body>
        <div className="flex min-h-screen flex-col antialiased">
          <Header />
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_GTAG}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "${GOOGLE_GTAG}");
          `}
        </Script>
      </body>
    </html>
  );
}
