import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import "./globals.css";
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
  title: "Evangeline - UX Designer Portfolio",
  description: "Product designer and UX specialist creating meaningful digital experiences",
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
        <Footer />
      </body>
    </html>
  );
}
