interface SectionHeadingProps {
  /** Used as the heading id, for the section's aria-labelledby. */
  id: string;
  /** Visible heading text, e.g. "Me". */
  title: string;
  /** Large faded word drawn behind the title. Purely decorative (CSS content). */
  decoration: string;
  /**
   * Visually hidden words placed before `title` so the heading reads naturally
   * when crawled or announced, e.g. "About" + "Me" reads "About Me".
   */
  prefix?: string;
}

export default function SectionHeading({ id, title, decoration, prefix }: SectionHeadingProps) {
  return (
    <div className="my-6 sm:my-8 md:my-10 lg:my-12">
      <h2 id={id} data-decoration={decoration} className="section-heading mb-[-3rem]">
        <span className="block text-[2rem] sm:text-[2.4rem] text-[#2f6f8a] dark:text-[#ADD6E8] -translate-y-12 sm:-translate-y-16 text-center">
          {prefix && <span className="sr-only">{prefix} </span>}
          {title}
        </span>
      </h2>
    </div>
  );
}
