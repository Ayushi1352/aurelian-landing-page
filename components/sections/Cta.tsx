import type { CtaData } from "@/types/templates.types";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { buttonGold } from "@/components/ui/button";

/** Plain navy band under the team, leading down to the contact form */
export const Cta = ({ data: cta }: { data?: CtaData }) => {
  if (!cta) return null;

  return (
    <section className="bg-[var(--color-navy)] py-9 lg:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
        <div data-reveal>
          <SectionLabel text={cta.label} light />
          <h2 className="mt-3 font-display text-[2rem] font-semibold leading-[1.1] text-[var(--color-white)] sm:text-[2.5rem] lg:text-[2.75rem]">{cta.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-white-85)] sm:text-[1rem]">{cta.description}</p>
        </div>
        <a href={cta.button.href} className={`${buttonGold} h-[3.25rem] shrink-0 px-8 lg:h-14 lg:px-9`}>
          {cta.button.label}
        </a>
      </div>
    </section>
  );
};
