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
      {
        url: "/images/eggfavicon.png",
        sizes: "any",
      },
      {
        url: "/images/eggfavicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/eggfavicon.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/images/eggfavicon.png",
    apple: "/images/eggfavicon.png",
    other: [
      {
        rel: "icon",
        url: "/images/eggfavicon.png",
      },
    ],
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
