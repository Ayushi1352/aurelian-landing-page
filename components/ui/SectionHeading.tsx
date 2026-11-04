import type { HeadingPart } from "@/types/templates.types";

/** Small uppercase gold label above a heading, with a short gold rule before it */
export const SectionLabel = ({ text, light = false, className = "" }: { text: string; light?: boolean; className?: string }) => (
  <p
    className={`inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.22em] ${
      light ? "text-[var(--color-primary-light)]" : "text-[var(--color-primary-strong)]"
    } ${className}`}
  >
    <span aria-hidden="true" className="h-px w-8 bg-[var(--color-primary)]" />
    {text}
  </p>
);

/** Heading text with its highlighted words in gold italics */
export const HeadingText = ({ parts }: { parts: HeadingPart[] }) =>
  parts.map((part) => (
    <span key={part.text} className={part.highlight ? "italic text-[var(--color-primary-strong)]" : ""}>
      {part.text}
    </span>
  ));

type SectionHeadingProps = {
  label: string;
  title: HeadingPart[];
  description?: string;
  align?: "left" | "center";
  descriptionClassName?: string;
  className?: string;
};

/** Section intro used across the page: label, serif title with a highlight, optional text */
export const SectionHeading = ({ label, title, description, align = "left", descriptionClassName = "", className = "" }: SectionHeadingProps) => {
  const center = align === "center";

  return (
    <div data-reveal className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <SectionLabel text={label} />
      <h2 className="mt-3 text-balance font-display text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.01em] text-[var(--color-heading)] sm:text-[2.75rem] lg:text-[3.125rem]">
        <HeadingText parts={title} />
      </h2>
      {description && <p className={`mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-[1rem] ${descriptionClassName}`}>{description}</p>}
    </div>
  );
};
