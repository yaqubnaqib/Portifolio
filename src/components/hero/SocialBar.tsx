import BrandIcon from "@/components/icons/BrandIcon";
import { SOCIALS } from "@/data/profile";

export default function SocialBar() {
  return (
    <ul
      aria-label="Yaqub Naqib on social media"
      className="flex rounded-lg gap-1 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 backdrop-blur-sm bg-[#9cd5ee64] dark:bg-[#505C62]"
    >
      {SOCIALS.map((social) => (
        <li key={social.id}>
          <a
            target="_blank"
            rel="noopener noreferrer me"
            href={social.href}
            aria-label={`${social.label} (opens in a new tab)`}
            className="flex items-center justify-center min-w-11 min-h-11 rounded-md text-[#1f4f63] hover:text-[#0b2633] dark:text-[#e6e6e6] dark:hover:text-white transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <BrandIcon name={social.id} className="w-6 h-6 md:w-7 md:h-7" />
          </a>
        </li>
      ))}
    </ul>
  );
}
