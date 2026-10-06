import SectionHeading from "@/components/heading/SectionHeading";
import BrandIcon from "@/components/icons/BrandIcon";
import { SKILL_GROUPS, WORKING_KNOWLEDGE } from "@/data/content";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="min-h-screen py-12 sm:py-16 md:py-20 relative bg-white dark:bg-[#262626]"
    >
      <SectionHeading id="skills-heading" prefix="My" title="Skills" decoration="My" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {SKILL_GROUPS.map((group) => (
          <div key={group.id} aria-labelledby={`skills-${group.id}`} role="group">
            <h3
              id={`skills-${group.id}`}
              className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-[#1a1a1a] dark:text-white"
            >
              {group.title}
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="group rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 ease-out hover:scale-[1.05] sm:hover:scale-110 hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col items-center justify-center w-full h-full aspect-square text-center bg-gradient-to-br from-[#F0F7FB] to-[#E8F4F8] hover:shadow-lg sm:hover:shadow-xl hover:shadow-[#9cd5ee40] border border-[#E0EFF5] dark:from-[#2d2d2d] dark:to-[#1f1f1f] dark:hover:shadow-[#505C6240] dark:border-[#3a3a3a]"
                >
                  <div className="mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-[1.08] sm:group-hover:scale-110 flex items-center justify-center flex-1 text-[#111] dark:text-white">
                    <BrandIcon
                      name={skill.icon}
                      className="w-[3.5rem] sm:w-[3.8rem] md:w-[4rem] lg:w-[4.2rem] xl:w-[4.5rem] h-[3.5rem] sm:h-[3.8rem] md:h-[4rem] lg:h-[4.2rem] xl:h-[4.5rem]"
                    />
                  </div>
                  <p className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-[#4a4a4a] group-hover:text-[#2a2a2a] dark:text-[#e0e0e0] dark:group-hover:text-white">
                    {skill.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="text-base sm:text-lg text-[#4a4a4a] dark:text-[#d0d0d0]">
          <span className="font-semibold text-[#1a1a1a] dark:text-white">Working knowledge:</span>{" "}
          {WORKING_KNOWLEDGE.join(", ")}.
        </p>
      </div>
    </section>
  );
}
