import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} (${site.shortName}) | ${site.motto}`,
    template: `%s | ${site.shortName}`,
  },
  description: `${site.shortName} is a community-focused organization in Masingbi, Sierra Leone, supporting communities, empowering young people and creating pathways toward sustainable transformation.`,
  applicationName: site.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} (${site.shortName})`,
    description: site.tagline,
    url: site.url,
    locale: "en_GB",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.shortName}: ${site.motto}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} (${site.shortName})`,
    description: site.tagline,
    images: ["/opengraph-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f5f2e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
