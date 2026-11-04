import Image from "next/image";
import type { TeamData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { swipeRow } from "@/components/ui/swipe";

/** All ten advocates in two rows of five (one swipeable row on phones), each with a photo, name and role */
export const Team = ({ data }: { data?: TeamData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" label={data.label} title={data.title} description={data.description} />

        <ul data-reveal className={`mt-6 grid gap-x-3 gap-y-5 sm:grid-cols-5 lg:mt-8 lg:gap-x-5 ${swipeRow}`}>
          {data.members.map((member) => (
            <li key={member.name} className="group max-sm:w-[58%] max-sm:shrink-0 max-sm:snap-start">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-border)] lg:aspect-square">
                <Image quality={90} src={member.image} alt={member.name} fill sizes="(min-width: 640px) 240px, 58vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[0.1875rem] origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-500 group-hover:scale-x-100" />
              </div>
              <h3 className="mt-2.5 font-display text-lg font-semibold leading-tight text-[var(--color-heading)] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.25rem]">{member.name}</h3>
              <p className="mt-0.5 text-xs leading-snug text-[var(--color-text-muted)] lg:text-[0.875rem]">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
