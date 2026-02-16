import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const resolveUrl = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
const siteUrl = resolveUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000",
);
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "app.gib.work - OG Image Preview",
  description: "Dynamic OG image generation for app.gib.work bounties",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "app.gib.work",
    title: "app.gib.work - OG Image Preview",
    description: "Dynamic OG image generation for app.gib.work bounties",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 600,
        alt: "app.gib.work bounty preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "app.gib.work - OG Image Preview",
    description: "Dynamic OG image generation for app.gib.work bounties",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
