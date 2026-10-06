import type { NextConfig } from "next";
import { SITE_URL } from "./src/lib/site";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Hosts that must permanently redirect to NEXT_PUBLIC_SITE_URL. The current
 * canonical host is filtered out, so setting a custom domain automatically
 * turns yaqubnaqib.vercel.app into a redirect. Preview deployments use other
 * hosts and are unaffected.
 */
const LEGACY_HOSTS = ["yaqubnaqib.vercel.app", "yaqwb.vercel.app"].filter(
  (host) => host !== new URL(SITE_URL).host,
);

/*
 * Inline scripts are allowed because statically rendered App Router pages
 * embed inline bootstrap scripts; a nonce would force every page to render
 * dynamically. Everything else is locked down.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Link",
    value: `<${SITE_URL}/llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt"`,
  },
];

const nextConfig: NextConfig = {
  // A package-lock.json in a parent folder would otherwise be picked as the workspace root.
  outputFileTracingRoot: process.cwd(),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // No 2048/3840 variants: nothing on the site renders wider than ~1200 CSS px.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      ...LEGACY_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      })),
      // Old CV and AI-file URLs that may be linked or indexed elsewhere.
      {
        source: "/YaqubNaqibFrontendDeveloperCV.pdf",
        destination: "/yaqub-naqib-frontend-developer-cv.pdf",
        permanent: true,
      },
      {
        source: "/yaqub-nq.pdf",
        destination: "/yaqub-naqib-frontend-developer-cv.pdf",
        permanent: true,
      },
      {
        source: "/YaqubNaqibFrontendDeveloperCV.md",
        destination: "/llms-full.txt",
        permanent: true,
      },
      { source: "/llm.txt", destination: "/llms.txt", permanent: true },
    ];
  },
};

export default nextConfig;
