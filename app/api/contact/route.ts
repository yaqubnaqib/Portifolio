import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/contact/schema";
import type { ContactFieldErrors, ContactResponse } from "@/lib/contact/limits";
import { rateLimit } from "@/lib/contact/rate-limit";
import { verifyTurnstile } from "@/lib/contact/turnstile";
import { sendContactMessage } from "@/lib/contact/send";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ ok: false, error: "validation" }, 403);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return json({ ok: false, error: "validation" }, 413);

  const ip = clientIp(request);
  const limit = await rateLimit(ip);
  if (!limit.allowed) {
    return json({ ok: false, error: "rate_limited" }, 429, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "validation" }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "message") {
        fieldErrors[field] ??= "Please check this field.";
      }
    }
    return json({ ok: false, error: "validation", fieldErrors }, 422);
  }

  const { website, turnstileToken, ...message } = parsed.data;

  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return json({ ok: true }, 200);

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return json({ ok: false, error: "captcha" }, 400);
  }

  const result = await sendContactMessage(message);
  if (result === "sent") return json({ ok: true }, 200);
  if (result === "not_configured") return json({ ok: false, error: "not_configured" }, 503);
  return json({ ok: false, error: "delivery" }, 502);
}
