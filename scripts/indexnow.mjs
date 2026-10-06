// Notifies Bing, Yandex, Seznam, Naver (and via them, others) that pages changed.
// Usage after a production deploy:  npm run indexnow
// Reads URLs from the live sitemap so it always matches what is deployed.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://yaqubnaqib.vercel.app").replace(
  /\/$/,
  "",
);
const KEY = process.env.INDEXNOW_KEY || "307f19964dededb899a96fc9165a1e5a";

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  return res.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URLs`);
if (!response.ok && response.status !== 202) process.exit(1);
