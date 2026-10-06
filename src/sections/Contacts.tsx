import { PROFILE } from "@/data/profile";
import ContactForm from "@/components/contact/ContactForm";

export default function Contacts() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="contact relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 dark:bg-[#262626]"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="contact-heading"
            className="text-[#2a2a2a] dark:text-[#ADD6E8] text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6"
          >
            Contact
          </h2>
          <p className="text-[#4a4a4a] dark:text-[#9C9C9C] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {PROFILE.summary}
          </p>
          <address className="text-[#4a4a4a] dark:text-[#9C9C9C] not-italic text-sm sm:text-base mt-4 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2 sm:gap-x-5 sm:gap-y-2">
            <a
              href={`mailto:${PROFILE.email}`}
              className="underline underline-offset-4 hover:opacity-80 py-1"
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.phoneHref}
              className="underline underline-offset-4 hover:opacity-80 py-1"
            >
              {PROFILE.phone}
            </a>
            <span>{PROFILE.location}</span>
          </address>
        </div>

        <div className="bg-white shadow-lg dark:bg-[#1f1f1f] dark:shadow-xl dark:shadow-black/20 rounded-2xl p-6 sm:p-8 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
