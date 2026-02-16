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

export const metadata: Metadata = {
  title: "app.gib.work - OG Image Preview",
  description: "Dynamic OG image generation for app.gib.work bounties",
  openGraph: {
    title: "app.gib.work - OG Image Preview",
    description: "Dynamic OG image generation for app.gib.work bounties",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
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
