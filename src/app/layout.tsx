import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AudioProvider } from "@/hooks/use-audio";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/evan favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Preload custom fonts for faster loading */}
        <link
          rel="preload"
          href="/fonts/Sequel Sans Semi Bold Head.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Sequel Sans Medium Disp.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Prevent FOUC: hide page until fonts + styles are ready */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { opacity: 0; }
              html.ready { opacity: 1; transition: opacity 0.2s ease-in; }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (document.fonts && document.fonts.ready) {
                  document.fonts.ready.then(function() {
                    document.documentElement.classList.add('ready');
                  });
                }
                // Fallback: always show after 2s even if fonts fail
                setTimeout(function() {
                  document.documentElement.classList.add('ready');
                }, 2000);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jersey10.variable} antialiased font-sans`}
      >
        <AudioProvider>
          {children}
          <Navigation />
          <Footer />
        </AudioProvider>
      </body>
    </html>
  );
}
