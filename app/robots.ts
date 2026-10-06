import type { MetadataRoute } from "next";
import { IS_PRODUCTION_DEPLOY, SITE_URL, absoluteUrl } from "@/lib/site";

/** Search and AI crawlers explicitly welcomed, so the profile can be cited in AI answers. */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_DEPLOY) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: "/api/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
