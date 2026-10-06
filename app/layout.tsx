import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PROFILE } from "@/data/profile";
import { IS_PRODUCTION_DEPLOY, SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name}, ${PROFILE.headline}`,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.metaDescription,
  applicationName: PROFILE.name,
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  formatDetection: { telephone: false },
  robots: IS_PRODUCTION_DEPLOY
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#9cd5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#262626" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Applies the saved theme before first paint to avoid a light/dark flash.
const themeInit = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var dark=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var d=document.documentElement;if(dark){d.classList.add('dark','dark-scrollbar');d.style.colorScheme='dark';}else{d.style.colorScheme='light';}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={poppins.className} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="me" href={PROFILE.github} />
        <link rel="me" href={PROFILE.linkedin} />
        <link rel="me" href={`mailto:${PROFILE.email}`} />
      </head>
      <body className="App bg-white dark:bg-[#262626]">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
