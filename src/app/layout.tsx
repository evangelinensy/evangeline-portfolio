import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

const jersey10 = Jersey_10({
  variable: "--font-jersey-10",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Evangeline Ng, Product Design in the Bay Area",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/evan favicon.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-32x32.ico", sizes: "32x32" },
      { url: "/favicon-16x16.ico", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/evan favicon.png?v=2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/evan favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jersey10.variable} antialiased font-sans`}
      >
        {children}
        <Navigation />
        <Footer />
      </body>
    </html>
  );
}
