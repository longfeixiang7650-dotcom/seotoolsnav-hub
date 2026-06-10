import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "SEO Tools Nav — Best SEO Tools & Software Reviews 2026",
    template: "%s — SEO Tools Nav",
  },
  description:
    "Compare 50+ SEO tools with verified reviews, pricing breakdowns, and expert comparisons. Find the perfect SEO platform for your business. Semrush, Ahrefs, Moz, and more.",
  keywords: [
    "SEO tools",
    "keyword research tools",
    "SEO software",
    "SEO analytics",
    "backlink checkers",
    "rank trackers",
    "technical SEO tools",
    "content optimization",
    "Semrush",
    "Ahrefs",
    "Moz",
  ],
  verification: {
    google: "T5bb4mZivi0CfaYYRiKZLSNIWmhvAX6_RVgDEyonTGo",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SEO Tools Nav",
    title: "SEO Tools Nav — Best SEO Tools & Software Reviews 2026",
    description:
      "Compare 50+ SEO tools with verified reviews, pricing, and expert comparisons.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
