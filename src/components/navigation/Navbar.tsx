"use client";

import { useEffect, useId, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * Slide-in menu. The links are always in the server-rendered HTML (hidden with
 * `invisible` while closed, which also removes them from the tab order), and
 * the animation is plain CSS so no animation library ships to the browser.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header>
      <button
        ref={buttonRef}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((open) => !open)}
        className="fixed z-40 right-4 sm:right-6 md:right-8 top-4 sm:top-6 md:top-8 rounded-lg p-2 sm:p-2.5 md:p-3 min-w-11 min-h-11 flex items-center justify-center transition-colors duration-300 backdrop-blur-sm bg-[#9cd5ee64] hover:bg-[#9cd5ee80] dark:bg-[#505C62] dark:hover:bg-[#505C6290]"
      >
        <div
          className={`tham tham-e-squeeze tham-w-5 sm:tham-w-6 md:tham-w-8${
            menuOpen ? " tham-active" : ""
          }`}
        >
          <div className="tham-box">
            <div
              className={`tham-inner ${
                menuOpen ? "bg-[#10303f] dark:bg-[#fffb]" : "bg-[#2f6f8a] dark:bg-[#add6e8c5]"
              }`}
            />
          </div>
        </div>
      </button>

      <div
        className={`fixed inset-0 z-30 transition-[visibility] duration-300 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#e4e4e480] backdrop-blur-[0.1rem] dark:bg-[#53525247] dark:backdrop-blur-[0.2rem] transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <nav
          id={menuId}
          aria-label="Primary"
          className={`absolute inset-y-0 right-0 h-full w-full md:w-[45%] lg:w-[35%] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-x-0 opacity-100" : "translate-x-[8%] opacity-0"
          }`}
        >
          <ul className="h-full w-full overflow-y-auto bg-[#92cae2] dark:bg-[#2d2d2ddf] flex flex-col justify-center md:justify-start py-24 md:py-[8rem] gap-4 md:gap-6 px-6 md:pl-5">
            {NAV_LINKS.map(({ href, label }, index) => (
              <li
                key={label}
                className="dv w-full rounded-md flex items-center justify-center md:justify-start min-h-14"
              >
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="list relative text-3xl sm:text-4xl lg:text-5xl text-[#10303f] dark:text-white py-2 w-full text-center md:text-left md:pl-5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
