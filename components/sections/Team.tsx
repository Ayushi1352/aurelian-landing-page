import Image from "next/image";
import type { TeamData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** The four senior advocates in one row (one under another on phones), each with a photo, name and role */
export const Team = ({ data }: { data?: TeamData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" label={data.label} title={data.title} description={data.description} />

        <ul data-reveal className="mx-auto mt-6 grid max-w-sm gap-y-7 sm:max-w-none sm:grid-cols-4 sm:gap-x-3 sm:gap-y-5 lg:mt-10 lg:gap-x-6">
          {data.members.map((member) => (
            <li key={member.name} className="group">
              <div className="relative aspect-square overflow-hidden bg-[var(--color-border)] sm:aspect-[4/5]">
                <Image quality={90} src={member.image} alt={member.name} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 24vw, 92vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                {/* gold line along the bottom of the photo on hover */}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[0.1875rem] origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-500 group-hover:scale-x-100" />
              </div>
              <h3 className="mt-3 font-display text-[1.375rem] font-semibold leading-tight text-[var(--color-heading)] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem]">{member.name}</h3>
              <p className="mt-0.5 text-sm leading-snug text-[var(--color-text-muted)] sm:text-[0.8125rem] lg:text-[0.875rem]">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
