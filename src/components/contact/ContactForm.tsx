"use client";

import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { PROFILE } from "@/data/profile";
import {
  CONTACT_LIMITS,
  validateContactField,
  type ContactField,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact/limits";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const FIELDS: ContactField[] = ["name", "email", "message"];

type Status = "idle" | "submitting" | "success" | "error" | "not_configured" | "rate_limited";

const STATUS_COPY: Record<Exclude<Status, "idle" | "submitting">, string> = {
  success: "Thanks, your message was sent. I'll get back to you soon.",
  error:
    "Something went wrong and your message was not sent. Please try again, or email me directly.",
  not_configured: "The form is temporarily unavailable. Please email me directly instead.",
  rate_limited:
    "Too many messages from this connection. Please wait a few minutes, or email me directly.",
};

type Values = Record<ContactField | "website", string>;
const EMPTY: Values = { name: "", email: "", message: "", website: "" };

function mailtoHref(values: Values): string {
  const subject = encodeURIComponent(`Portfolio message from ${values.name || "a visitor"}`);
  const body = encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`);
  return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const turnstileRequested = useRef(false);

  const loadTurnstile = () => {
    if (!TURNSTILE_SITE_KEY || turnstileRequested.current) return;
    turnstileRequested.current = true;
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof Values;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "website" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: validateContactField(field, value) }));
    }
    if (status !== "idle" && status !== "submitting") setStatus("idle");
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ContactField;
    if (!event.target.value) return;
    setErrors((current) => ({
      ...current,
      [field]: validateContactField(field, event.target.value),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ContactFieldErrors = {};
    for (const field of FIELDS) {
      const message = validateContactField(field, values[field]);
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const turnstileToken = formData.get("cf-turnstile-response");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          turnstileToken: typeof turnstileToken === "string" ? turnstileToken : undefined,
        }),
      });
      const result = (await response.json()) as ContactResponse;

      if (result.ok) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }
      if (result.fieldErrors) setErrors(result.fieldErrors);
      setStatus(
        result.error === "not_configured" || result.error === "rate_limited"
          ? result.error
          : "error",
      );
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (field: ContactField) =>
    `w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#2f6f8a] dark:focus:ring-[#ADD6E8] bg-[#f8f8f8] text-[#2a2a2a] dark:bg-[#262626] dark:text-[#e6e6e6] ${
      errors[field]
        ? "border-[#b42318] dark:border-[#f97066]"
        : "border-[#cfd8dc] focus:border-[#2f6f8a] dark:border-[#505050] dark:focus:border-[#ADD6E8]"
    }`;

  const labelClass =
    "text-[#2a2a2a] dark:text-[#ADD6E8] block text-sm sm:text-base font-medium mb-2";
  const errorClass = "mt-2 text-sm text-[#b42318] dark:text-[#f97066]";
  const describedBy = (field: ContactField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  const isSubmitting = status === "submitting";
  const statusMessage = status === "idle" || status === "submitting" ? null : STATUS_COPY[status];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocusCapture={loadTurnstile}
      className="space-y-6"
      noValidate
      aria-describedby="contact-form-note"
    >
      <p id="contact-form-note" className="text-sm text-[#5f6b70] dark:text-[#9C9C9C]">
        All fields are required.
      </p>

      {/* Honeypot: removed from layout, hidden from screen readers and skipped by keyboard. */}
      <div
        className="absolute w-px h-px -m-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]"
        aria-hidden="true"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name.max}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          className={fieldClass("name")}
        />
        {errors.name && (
          <p id="name-error" className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          inputMode="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="email"
          spellCheck={false}
          maxLength={CONTACT_LIMITS.email.max}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email")}
          className={fieldClass("email")}
          placeholder="name@example.com"
        />
        {errors.email && (
          <p id="email-error" className={errorClass}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={6}
          maxLength={CONTACT_LIMITS.message.max}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", "message-hint")}
          className={`${fieldClass("message")} resize-y`}
          placeholder="Tell me about your project or how I can help…"
        />
        <p id="message-hint" className="mt-2 text-sm text-[#5f6b70] dark:text-[#9C9C9C]">
          At least {CONTACT_LIMITS.message.min} characters.
        </p>
        {errors.message && (
          <p id="message-error" className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="auto" />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-lg font-semibold text-base sm:text-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed bg-[#83c3de] hover:bg-[#9ed3ea] text-[#10303f] dark:bg-[#ADD6E8] dark:hover:bg-[#9cd5ee] dark:text-[#262626]"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>

      <div role="status" aria-live="polite" aria-atomic="true">
        {statusMessage && (
          <div
            className={`p-4 rounded-lg border text-sm sm:text-base ${
              status === "success"
                ? "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50"
                : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50"
            }`}
          >
            <p>{statusMessage}</p>
            {status !== "success" && (
              <p className="mt-2">
                <a href={mailtoHref(values)} className="underline font-medium hover:opacity-80">
                  Email {PROFILE.email}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
