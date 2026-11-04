import Image from "next/image";
import type { WhyChooseUsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonDark } from "@/components/ui/button";
import { swipeItem, swipeRow } from "@/components/ui/swipe";

/** The four principles as plain white cards beside a photo of an advocate (the photo is left out on phones) */
export const WhyChooseUs = ({ data }: { data?: WhyChooseUsData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16 lg:px-8">
        <div data-reveal className="relative h-[33rem] overflow-hidden max-lg:hidden">
          <Image quality={90} src={data.image.src} alt={data.image.alt} fill sizes="440px" className="object-cover" />
        </div>

        <div className="min-w-0">
          <SectionHeading label={data.label} title={data.title} description={data.description} />

          <ul data-reveal className={`mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8 lg:gap-4 ${swipeRow}`}>
            {data.items.map((item) => (
              <li
                key={item.title}
                className={`border border-[var(--color-border)] bg-[var(--color-bg-main)] p-5 transition-colors hover:border-[var(--color-primary)] lg:p-6 ${swipeItem}`}
              >
                <Icon name={item.icon} className="size-8 text-[var(--color-primary)]" />
                <h3 className="mt-3 font-display text-[1.375rem] font-semibold text-[var(--color-heading)]">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.text}</p>
              </li>
            ))}
          </ul>

          <a data-reveal href={data.button.href} className={`${buttonDark} mt-6 h-12 px-7 lg:mt-8`}>
            {data.button.label}
          </a>
        </div>
      </div>
    </section>
  );
};
