/**
 * Single source of truth for the production origin. Canonical URLs, sitemap,
 * robots, Open Graph, JSON-LD and llms.txt all read from here, so moving to a
 * custom domain only means changing NEXT_PUBLIC_SITE_URL.
 */
const FALLBACK_SITE_URL = "https://yaqubnaqib.vercel.app";

function normaliseOrigin(value: string | undefined): string {
  const raw = value?.trim() || FALLBACK_SITE_URL;
  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return new URL(withProtocol).origin;
}

export const SITE_URL = normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL);

/** Builds an absolute URL on the production origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Date the content of the site was last meaningfully changed. Bump it when you
 * edit copy so sitemap lastModified and JSON-LD dateModified stay accurate.
 */
export const CONTENT_UPDATED = "2026-10-06";

/** First commit of this portfolio repository. */
export const SITE_CREATED = "2022-09-08";

export const IS_PRODUCTION_DEPLOY =
  process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production";
