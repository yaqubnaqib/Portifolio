import { z } from "zod";
import { CONTACT_LIMITS } from "./limits";

export const contactSchema = z.object({
  name: z.string().trim().min(CONTACT_LIMITS.name.min).max(CONTACT_LIMITS.name.max),
  email: z.email().trim().max(CONTACT_LIMITS.email.max),
  message: z.string().trim().min(CONTACT_LIMITS.message.min).max(CONTACT_LIMITS.message.max),
  /** Honeypot. Real visitors never see or fill it. */
  website: z.string().max(200).optional().default(""),
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
