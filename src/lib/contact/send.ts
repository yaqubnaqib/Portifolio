import "server-only";
import { PROFILE } from "@/data/profile";
import type { ContactInput } from "./schema";

export type DeliveryResult = "sent" | "not_configured" | "failed";

type Message = Pick<ContactInput, "name" | "email" | "message">;

/**
 * Delivers a contact message with whichever provider is configured:
 * 1. Resend (RESEND_API_KEY), or
 * 2. EmailJS REST API, called from the server. Reads EMAILJS_* and falls back
 *    to the legacy NEXT_PUBLIC_EMAILJS_* / REACT_APP_EMAILJS_* names already
 *    set in Vercel. The private key is optional (needed only if "Use Private
 *    Key" is on in EmailJS).
 * Secrets stay on the server; nothing here ships in the browser bundle.
 */
/** Reads an EmailJS setting under its current name or a legacy prefix. */
function emailJsEnv(name: string): string | undefined {
  return (
    process.env[`EMAILJS_${name}`] ||
    process.env[`NEXT_PUBLIC_EMAILJS_${name}`] ||
    process.env[`REACT_APP_EMAILJS_${name}`] ||
    undefined
  );
}

export async function sendContactMessage(message: Message): Promise<DeliveryResult> {
  if (process.env.RESEND_API_KEY) return sendWithResend(process.env.RESEND_API_KEY, message);

  const serviceId = emailJsEnv("SERVICE_ID");
  const templateId = emailJsEnv("TEMPLATE_ID");
  const publicKey = emailJsEnv("PUBLIC_KEY");
  if (serviceId && templateId && publicKey) {
    return sendWithEmailJs(
      { serviceId, templateId, publicKey, privateKey: emailJsEnv("PRIVATE_KEY") },
      message,
    );
  }

  console.error("Contact form: no email provider configured (RESEND_API_KEY or EMAILJS_*).");
  return "not_configured";
}

async function sendWithResend(apiKey: string, { name, email, message }: Message) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio contact <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? PROFILE.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      cache: "no-store",
    });
    if (!response.ok) console.error(`Contact form: Resend responded ${response.status}`);
    return response.ok ? "sent" : "failed";
  } catch (error) {
    console.error("Contact form: Resend request failed", error);
    return "failed";
  }
}

interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey?: string;
}

async function sendWithEmailJs(config: EmailJsConfig, { name, email, message }: Message) {
  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        ...(config.privateKey ? { accessToken: config.privateKey } : {}),
        template_params: {
          from_name: name,
          from_email: email,
          reply_to: email,
          message,
        },
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      // EmailJS explains failures in plain text, e.g. "API calls are disabled for non-browser applications".
      console.error(`Contact form: EmailJS responded ${response.status}: ${await response.text()}`);
    }
    return response.ok ? "sent" : "failed";
  } catch (error) {
    console.error("Contact form: EmailJS request failed", error);
    return "failed";
  }
}
