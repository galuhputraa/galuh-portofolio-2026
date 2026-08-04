import type { Metadata, Viewport } from "next";
import { Great_Vibes, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Same three families the original portfolio HTML loaded.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const description = `${profile.shortTagline} Google Cloud Certified Professional Machine Learning Engineer, based in Jakarta.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Computer Vision",
    "Generative AI",
    "Jakarta",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    locale: "en_US",
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
    { media: "(prefers-color-scheme: light)", color: "#eef1f6" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${plexMono.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
