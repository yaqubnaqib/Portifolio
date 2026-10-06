/** Field limits shared by the client form (inline validation) and the server schema. */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

export type ContactField = "name" | "email" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export interface ContactResponse {
  ok: boolean;
  /** Machine-readable reason when ok is false. */
  error?: "validation" | "rate_limited" | "captcha" | "not_configured" | "delivery";
  fieldErrors?: ContactFieldErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Lightweight client-side validation that mirrors the server schema. */
export function validateContactField(field: ContactField, value: string): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case "name":
      if (trimmed.length < CONTACT_LIMITS.name.min) return "Please enter your name.";
      if (trimmed.length > CONTACT_LIMITS.name.max) return "Name is too long.";
      return undefined;
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (trimmed.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(trimmed))
        return "Please enter a valid email address, like name@example.com.";
      return undefined;
    case "message":
      if (trimmed.length < CONTACT_LIMITS.message.min)
        return `Please write at least ${CONTACT_LIMITS.message.min} characters.`;
      if (trimmed.length > CONTACT_LIMITS.message.max)
        return `Please keep your message under ${CONTACT_LIMITS.message.max} characters.`;
      return undefined;
  }
}
