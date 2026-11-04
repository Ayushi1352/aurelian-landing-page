"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PracticeAreasData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

const arrow =
  "grid size-11 place-items-center border border-[var(--color-navy)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy)] hover:text-[var(--color-white)] disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--color-navy)]";

/**
 * A row of practice area cards that scrolls sideways: four in view on desktop, three on tablets and a
 * swipeable one-and-a-half on phones. The photos are shown whole (they are all 3:4, the card is 3:4),
 * with the text below them instead of on top. The arrows move one card at a time.
 */
export const PracticeSlider = ({ data, children }: { data: PracticeAreasData; children: React.ReactNode }) => {
  const row = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (direction: number) => {
    const el = row.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap) });
  };

  return (
    <>
      <div className="flex items-end justify-between gap-6">
        {children}
        <div data-reveal className="flex shrink-0 gap-2 max-sm:hidden">
          <button type="button" aria-label={data.previousLabel} onClick={() => move(-1)} disabled={edges.start} className={arrow}>
            <Icon name="LuArrowLeft" className="size-5" />
          </button>
          <button type="button" aria-label={data.nextLabel} onClick={() => move(1)} disabled={edges.end} className={arrow}>
            <Icon name="LuArrowRight" className="size-5" />
          </button>
        </div>
      </div>

      <ul
        ref={row}
        data-reveal
        className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto scroll-smooth px-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:mx-0 lg:mt-10 lg:scroll-px-0 lg:gap-6 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {data.cards.map((card) => (
          <li key={card.title} className="w-[62%] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-4.5rem)/4)]">
            <a href={data.cardLink} aria-label={`${data.cardButton}: ${card.title}`} className="group block">
              <span className="relative block aspect-[3/4] overflow-hidden bg-[var(--color-bg-alt)]">
                <Image
                  quality={90}
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 290px, (min-width: 640px) 30vw, 62vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* gold line along the bottom of the photo on hover */}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[0.1875rem] origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <span className="mt-3 block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-[var(--color-primary-strong)] lg:mt-4">{card.subtitle}</span>
              <span className="mt-1 block font-display text-[1.25rem] font-semibold leading-tight text-[var(--color-heading)] transition-colors group-hover:text-[var(--color-primary-strong)] lg:text-[1.5rem]">
                {card.title}
              </span>
              <span className="mt-1 block text-sm leading-snug text-[var(--color-text-muted)] max-sm:hidden">{card.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
