"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { GlobalUIData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { buttonDark } from "@/components/ui/button";

/** id of the landing page section a link points to ("#about" → "about") */
const sectionId = (href: string) => href.replace(/^#/, "");

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

type HeaderProps = {
  data?: HeaderData;
  ui: GlobalUIData;
};

export const Header = ({ data, ui }: HeaderProps) => {
  const links = data?.navigation ?? [];
  const [ids] = useState(() => links.map((link) => sectionId(link.href)));
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!data) return null;
  const { brand, cta } = data;
  // the "Contact Us" button already leads to the contact section, so its link is left out of both menus
  const menuLinks = links.filter((link) => link.href !== cta.href);

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto max-w-[1920px] border-b border-[var(--color-border)] bg-[var(--color-bg-main)]">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={goHome} aria-label={ui.backToTop} className="shrink-0">
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} preload sizes="200px" className="h-auto w-[8.5rem] lg:w-40" />
        </Link>

        <nav aria-label={ui.mainNav} className="hidden items-center gap-9 lg:flex">
          {menuLinks.map((link) => {
            const current = sectionId(link.href) === active;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "location" : undefined}
                className={`whitespace-nowrap border-b py-1 text-[0.9375rem] font-semibold transition-colors hover:text-[var(--color-primary-strong)] ${
                  current ? "border-[var(--color-primary)] text-[var(--color-primary-strong)]" : "border-transparent text-[var(--color-heading)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={cta.href} className={`${buttonDark} h-12 whitespace-nowrap px-6 max-sm:hidden`}>
            {cta.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="grid size-11 place-items-center border border-[var(--color-border)] text-[var(--color-heading)] lg:hidden"
          >
            <Icon name={open ? "LuX" : "LuMenu"} className="size-6" />
          </button>
        </div>
      </div>

      {/* dims the page under the open menu; tapping it closes the menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-x-0 bottom-0 top-[4.5rem] bg-[var(--color-menu-backdrop)] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      />

      <nav
        id="mobile-menu"
        aria-label={ui.mobileNav}
        // when open it is only as tall as its links (and scrolls if they do not fit on a short screen)
        className={`relative grid max-h-[calc(100dvh-4.5rem)] overflow-hidden bg-[var(--color-bg-main)] transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="mx-auto flex min-h-0 w-full max-w-7xl flex-col overflow-y-auto px-4 pt-2 sm:px-6 [&>li:last-child]:pb-4">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-[var(--color-border)] py-3.5 font-display text-xl font-semibold transition-colors hover:text-[var(--color-primary-strong)] ${
                  sectionId(link.href) === active ? "text-[var(--color-primary-strong)]" : "text-[var(--color-heading)]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-5 sm:hidden">
            <a href={cta.href} onClick={() => setOpen(false)} className={`${buttonDark} h-12 w-full px-7`}>
              {cta.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
