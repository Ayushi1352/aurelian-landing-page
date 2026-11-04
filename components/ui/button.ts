/** Shared look of every button and button-like link: square corners and small uppercase letters, as on the Aurelian website */
const base =
  "inline-flex items-center justify-center gap-2.5 border font-sans text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300";

/** Navy button for light sections; turns gold on hover */
export const buttonDark = `${base} border-[var(--color-navy)] bg-[var(--color-navy)] text-[var(--color-white)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-deep)]`;

/** Gold button for dark sections (hero, call-to-action band); turns white on hover */
export const buttonGold = `${base} border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-bg-deep)] hover:border-[var(--color-white)] hover:bg-[var(--color-white)]`;
