import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protects /admin with HTTP Basic authentication using ADMIN_USER / ADMIN_PASSWORD.
 *
 * - If those variables are NOT set, /admin does not exist (404). The admin area is
 *   therefore closed by default.
 * - This is a stop-gap for the MVP placeholder. When a real admin dashboard is built
 *   (V2), replace it with proper authentication (e.g. Supabase Auth / NextAuth) and
 *   hashed passwords.
 */

function safeEqual(a: string, b: string) {
  // Constant-time comparison to avoid leaking information through timing.
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new NextResponse("Not found", { status: 404 });
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const idx = decoded.indexOf(":");
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (idx > -1 && safeEqual(u, user) && safeEqual(p, pass)) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "no-store");
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        return res;
      }
    } catch {
      /* fall through to 401 */
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="CEST admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
