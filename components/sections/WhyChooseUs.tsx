import type { WhyChooseUsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonDark } from "@/components/ui/button";

/**
 * Heading with the button beside it, then the four principles in one row (two on tablets, a list on phones),
 * each with a large gold number. Thin lines separate them instead of boxed cards.
 */
export const WhyChooseUs = ({ data }: { data?: WhyChooseUsData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)] lg:py-[calc(var(--section-gap)*1.5)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionHeading label={data.label} title={data.title} description={data.description} />
          <a data-reveal href={data.button.href} className={`${buttonDark} h-12 shrink-0 self-start px-7 lg:self-auto`}>
            {data.button.label}
          </a>
        </div>

        {/* the 1px gaps show the border colour behind the cells, which draws the lines between them */}
        <ol data-reveal className="mt-7 grid gap-px border-y border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <li key={item.title} className="group relative flex gap-4 bg-[var(--color-bg-alt)] py-4 sm:block sm:p-6 lg:px-8 lg:py-9 lg:first:pl-0">
              {/* gold line along the top that grows on hover */}
              <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-0 bg-[var(--color-primary)] transition-[width] duration-500 group-hover:w-full max-sm:hidden" />
              <div className="flex shrink-0 items-center justify-between max-sm:w-10 max-sm:self-start sm:mb-5">
                <span aria-hidden="true" className="font-display text-[2rem] font-semibold leading-none text-[var(--color-primary)] sm:text-[3rem] lg:text-[3.5rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon name={item.icon} className="size-7 text-[var(--color-navy)] max-sm:hidden" />
              </div>
              <div>
                <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-[var(--color-heading)] lg:text-[1.625rem]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
