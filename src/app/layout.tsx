import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.churnaut.com"),
  title: {
    default: "Churnaut — Know the moment they are ready to talk",
    template: "%s — Churnaut",
  },
  description:
    "Churnaut turns known prospect visits into timely sales action, privacy-clean website personalization, and evidence-grounded deal intelligence.",
  applicationName: "Churnaut",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Churnaut",
    title: "Churnaut — Your CRM knows who they are. Your website should too.",
    description:
      "Recognize known prospects from tracked links, personalize their visit, and act while intent is fresh.",
    images: [{ url: "/og.png", width: 1733, height: 908, alt: "Churnaut signal landscape — Know the moment they're ready to talk." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Churnaut — Know the moment they are ready to talk",
    description:
      "Deterministic website signals and deal intelligence for B2B SaaS sales teams.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
