import { PROFILE } from "@/data/profile";
import ThemeToggleButton from "@/components/hero/ThemeToggleButton";
import SocialBar from "@/components/hero/SocialBar";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="site-heading"
      className="min-h-screen relative w-full overflow-hidden flex flex-col items-start justify-center dark:bg-[#262626]"
    >
      <div className="hero-light dark:hidden" aria-hidden="true" />
      <div className="hero-dark hidden dark:block" aria-hidden="true" />

      <div className="absolute z-20 top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
        <ThemeToggleButton />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-end lg:justify-center min-h-screen pb-24 sm:pb-28 md:pb-32 lg:pb-0 lg:-translate-y-8 lg:px-20 lg:items-start px-4 sm:px-6">
        <div className="writting flex flex-col items-center">
          <div className="flex flex-col items-center relative font-normal">
            <p className="hero-hello font-semibold opacity-[0.6] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] text-[#add6e8d2] dark:text-[#333] lg:text-[10rem] md:text-[8rem] sm:text-[6rem] text-[4.5rem]">
              Hello
            </p>
            <h1 id="site-heading" className="font-normal">
              <span className="absolute left-1/2 -translate-x-1/2 bottom-1/3 md:bottom-1/4 text-[1.15rem] min-[360px]:text-[1.35rem] sm:text-[1.85rem] md:text-[2.35rem] mobile-spacing text-[#2f6f8a] dark:text-[#9cd5ee] whitespace-nowrap">
                I&apos;m {PROFILE.name}
              </span>
              <span className="sr-only">, </span>
              <span className="block text-[#4d5a60] dark:text-[#9C9C9C] text-[0.85rem] sm:text-[1.1rem] md:text-[1.35rem] translate-y-[-1.5rem] sm:translate-y-[-1.8rem] mobile-frontend-spacing">
                {PROFILE.headline}
              </span>
            </h1>
          </div>

          <a
            href={PROFILE.cvPath}
            download="Yaqub-Naqib-Frontend-Developer-CV.pdf"
            className="rounded inline-block bg-[#83c3de] hover:bg-[#9ed3ea] dark:bg-[#53595c] dark:hover:bg-[#88a3ae] py-2 px-8 sm:px-12 md:px-16 lg:px-[5.8rem] text-[#10303f] dark:text-white font-medium text-sm sm:text-base lg:translate-y-[-1rem] translate-y-[-1.3rem] transition-all duration-300 hover:scale-105"
          >
            Download CV<span className="sr-only"> (PDF)</span>
          </a>
        </div>
      </div>

      <div className="absolute z-20 bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-8 left-4 sm:left-6 md:left-8">
        <SocialBar />
      </div>
    </section>
  );
}
