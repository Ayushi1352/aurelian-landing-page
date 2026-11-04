import Image from "next/image";
import type { AboutUsData } from "@/types/templates.types";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** The website's About Us page: one photo beside the firm's story, its mission and vision, and the four key figures */
export const AboutUs = ({ data: about }: { data?: AboutUsData }) => {
  if (!about) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
        <div data-reveal className="relative h-44 overflow-hidden sm:h-72 lg:h-[33rem]">
          <Image quality={90} src={about.image.src} alt={about.image.alt} fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
          {/* years of practice, in a navy tag on the photo */}
          <p className="absolute bottom-0 left-0 bg-[var(--color-navy)] px-4 py-3 sm:px-6 sm:py-4">
            <span className="block font-display text-3xl font-semibold leading-none text-[var(--color-primary-light)] sm:text-[2.5rem]">{about.badge.value}</span>
            <span className="mt-1 block text-xs text-[var(--color-white-85)] sm:text-sm">{about.badge.label}</span>
          </p>
        </div>

        <div>
          <SectionHeading label={about.label} title={about.title} description={about.description} />

          {/* mission and vision are left out on phones, so the section still fits on one screen */}
          <div data-reveal className="mt-5 grid gap-4 max-sm:hidden sm:grid-cols-2 lg:mt-6">
            {about.points.map((point) => (
              <div key={point.title} className="border-l-2 border-[var(--color-primary)] pl-4">
                <h3 className="font-display text-xl font-semibold text-[var(--color-heading)]">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{point.text}</p>
              </div>
            ))}
          </div>

          <dl data-reveal className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--color-border)] pt-5 sm:grid-cols-4 lg:mt-6 lg:pt-6">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[2.25rem] font-semibold leading-none text-[var(--color-navy)] lg:text-[2.75rem]">
                  <CountUp value={stat.value} />
                </dd>
                <dd aria-hidden="true" className="mt-1.5 text-sm leading-snug text-[var(--color-text-muted)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
