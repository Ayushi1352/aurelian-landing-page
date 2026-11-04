import type { PracticeAreasData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PracticeSlider } from "@/components/sections/PracticeSlider";

/** Heading with arrows beside it, then all nine practice areas in a sideways row of whole, uncropped photos */
export const PracticeAreas = ({ data }: { data?: PracticeAreasData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PracticeSlider data={data}>
          <SectionHeading label={data.label} title={data.title} description={data.description} />
        </PracticeSlider>
      </div>
    </section>
  );
};
