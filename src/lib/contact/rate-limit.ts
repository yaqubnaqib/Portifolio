import "server-only";

const WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS = 5;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

/**
 * Fixed-window limiter. Uses Upstash Redis over REST when
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are set, which is shared
 * across serverless instances. Otherwise falls back to a per-instance memory
 * window: best effort, but still blunts bursts from one client.
 */
export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const key = `contact:${identifier}`;

  if (url && token) {
    try {
      return await upstashLimit(url, token, key);
    } catch {
      // Fall through to the in-memory limiter if Redis is unreachable.
    }
  }
  return memoryLimit(key);
}

async function upstashLimit(url: string, token: string, key: string): Promise<RateLimitResult> {
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(WINDOW_SECONDS), "NX"],
      ["TTL", key],
    ]),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Upstash responded ${response.status}`);

  const results = (await response.json()) as Array<{ result?: number }>;
  const count = Number(results[0]?.result ?? 0);
  const ttl = Number(results[2]?.result ?? WINDOW_SECONDS);
  return { allowed: count <= MAX_REQUESTS, retryAfterSeconds: Math.max(ttl, 1) };
}

const memoryStore = new Map<string, { count: number; resetAt: number }>();

function memoryLimit(key: string): RateLimitResult {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || entry.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    if (memoryStore.size > 5000) pruneExpired(now);
    return { allowed: true, retryAfterSeconds: WINDOW_SECONDS };
  }

  entry.count += 1;
  return {
    allowed: entry.count <= MAX_REQUESTS,
    retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}

function pruneExpired(now: number): void {
  for (const [key, value] of memoryStore) {
    if (value.resetAt <= now) memoryStore.delete(key);
  }
}
