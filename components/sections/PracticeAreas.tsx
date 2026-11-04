import Image from "next/image";
import type { PracticeAreasData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { swipeItem, swipeRow } from "@/components/ui/swipe";

/**
 * All nine practice areas as photo tiles with the name on a navy fade; the heading sits beside them on
 * desktop so the whole grid fits on one screen. Each tile links down to the booking form.
 */
export const PracticeAreas = ({ data }: { data?: PracticeAreasData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[22rem_1fr] lg:gap-14 lg:px-8">
        <SectionHeading label={data.label} title={data.title} description={data.description} />

        <ul data-reveal className={`grid min-w-0 gap-3 sm:grid-cols-3 lg:gap-4 ${swipeRow}`}>
          {data.cards.map((card) => (
            <li key={card.title} className={swipeItem}>
              <a
                href={data.cardLink}
                aria-label={`${data.cardButton}: ${card.title}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-[var(--color-bg-deep)] sm:aspect-[4/3]"
              >
                <Image quality={90} src={card.image} alt="" fill sizes="(min-width: 1024px) 260px, (min-width: 640px) 32vw, 76vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-card-overlay)] from-10% to-[var(--color-card-overlay-end)] to-70%" />
                <span className="absolute inset-x-0 bottom-0 p-3.5 lg:p-4">
                  <span className="block font-display text-xl font-semibold leading-tight text-[var(--color-white)] sm:text-[1.0625rem] md:text-[1.125rem] lg:text-[1.3125rem]">{card.title}</span>
                  <span className="mt-1 block text-xs leading-snug text-[var(--color-primary-light)] max-md:sm:hidden">{card.subtitle}</span>
                  {/* gold rule that grows on hover */}
                  <span aria-hidden="true" className="mt-2 block h-px w-6 bg-[var(--color-primary)] transition-[width] duration-500 group-hover:w-14" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
