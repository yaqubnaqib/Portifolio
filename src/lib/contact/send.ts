import "server-only";
import { PROFILE } from "@/data/profile";
import type { ContactInput } from "./schema";

export type DeliveryResult = "sent" | "not_configured" | "failed";

type Message = Pick<ContactInput, "name" | "email" | "message">;

/**
 * Delivers a contact message with whichever provider is configured:
 * 1. Resend (RESEND_API_KEY), or
 * 2. EmailJS REST API from the server (EMAILJS_* incl. private key).
 * All keys are server-only; nothing is exposed to the browser bundle.
 */
export async function sendContactMessage(message: Message): Promise<DeliveryResult> {
  if (process.env.RESEND_API_KEY) return sendWithResend(process.env.RESEND_API_KEY, message);

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } =
    process.env;
  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_PRIVATE_KEY) {
    return sendWithEmailJs(
      {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
      },
      message,
    );
  }

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
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
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
        accessToken: config.privateKey,
        template_params: {
          from_name: name,
          from_email: email,
          reply_to: email,
          message,
        },
      }),
      cache: "no-store",
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
