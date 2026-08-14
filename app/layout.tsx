import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { NoticeBanner } from "@/components/chrome/NoticeBanner";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { event } from "@/lib/event";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// Display only — reserved for the single pull-quote block.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title: {
    default: `${event.name} — ${event.tagline}`,
    template: `%s — ${event.name}`,
  },
  description: event.description,
  openGraph: {
    title: `${event.name} — ${event.tagline}`,
    description: event.description,
    url: event.siteUrl,
    siteName: event.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${event.name} — ${event.tagline}`,
    description: event.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${newsreader.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border-[length:var(--rule)] focus:border-chalk focus:bg-ink focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <NoticeBanner />
      </body>
    </html>
  );
}
