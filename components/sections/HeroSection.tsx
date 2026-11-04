import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { buttonGold } from "@/components/ui/button";

/** Simple banner: one full-width photo with the heading, a short line and one button */
export const HeroSection = ({ data: hero }: { data?: HeroData }) => {
  if (!hero) return null;

  return (
    <section className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-[var(--color-bg-deep)] pt-[4.5rem] sm:min-h-[38rem] lg:min-h-[42rem]">
      <Image src={hero.image.src} alt={hero.image.alt} fill preload quality={90} sizes="100vw" className="-z-20 object-cover object-[62%_center]" />
      {/* navy fade keeps the text readable and leaves the statue on the right in view on desktop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--color-hero-overlay)] lg:bg-transparent lg:bg-gradient-to-r lg:from-[var(--color-bg-deep)] lg:from-25% lg:via-[var(--color-hero-overlay-mid)] lg:via-45% lg:to-[var(--color-hero-overlay-end)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl transition-[opacity,transform] duration-700 ease-out [@starting-style]:translate-y-5 [@starting-style]:opacity-0">
          <span aria-hidden="true" className="block h-px w-16 bg-[var(--color-primary)]" />
          <h1 className="mt-6 font-display text-[3.25rem] font-semibold leading-[1.02] tracking-[-0.01em] text-[var(--color-white)] sm:text-[4.5rem] lg:text-[5.5rem]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--color-white-85)] sm:text-[1.125rem] lg:text-[1.25rem]">{hero.description}</p>
          {/* the one call-to-action scrolls down to the contact section */}
          <a href={hero.button.href} className={`${buttonGold} mt-8 h-[3.25rem] px-8 lg:h-14 lg:px-9`}>
            {hero.button.label}
          </a>
        </div>
      </div>
    </section>
  );
};
