/**
 * Best-effort in-memory rate limiter (per server instance).
 *
 * Good enough to slow down casual spam on a single Node server. On serverless
 * hosts (e.g. Vercel) each instance has its own memory, so for stronger protection
 * swap this for a shared store such as Upstash Redis (@upstash/ratelimit): only
 * `rateLimit()` below needs to change.
 */

const buckets = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 }: { limit?: number; windowMs?: number } = {},
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return { ok: false, retryAfterSeconds: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  buckets.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return { ok: true, retryAfterSeconds: 0 };
}
