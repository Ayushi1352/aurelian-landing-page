"use client";

import type { EnquiryFormData } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonDark } from "@/components/ui/button";

/** Plain square form fields */
const base =
  "w-full min-w-0 appearance-none border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] max-sm:px-3 max-sm:placeholder:text-xs";
/** single-line fields share one height */
const field = `${base} h-11`;

/**
 * The contact form in the contact section (the fields of the website's Contact Us page).
 * It is a dummy form: nothing is sent, the visitor sees a short sending state and then a thank-you
 * message that hides itself after 5.5 seconds.
 */
export const EnquiryForm = ({ data: form }: { data?: EnquiryFormData }) => {
  const submit = useDummySubmit({ visibleFor: 5500 });
  if (!form) return null;
  const { fields } = form;

  return (
    <>
      {/* remounting the form (via key) after each send clears every field */}
      <form
        key={submit.round}
        onSubmit={submit.onSubmit}
        onInput={submit.onInput}
        aria-busy={submit.sending}
        // from tablet up the message box takes up any spare height of the contact section card
        className="mt-4 grid grid-cols-2 gap-2.5 md:flex-1 md:grid-rows-[repeat(3,auto)_1fr_auto]"
      >
        <input name="name" required placeholder={fields.name} aria-label={fields.name} autoComplete="name" className={`${field} col-span-2`} />
        <input name="email" type="email" required placeholder={fields.email} aria-label={fields.email} autoComplete="email" className={field} />
        <input name="phone" type="tel" placeholder={fields.phone} aria-label={fields.phone} autoComplete="tel" className={field} />
        <input name="subject" required placeholder={fields.subject} aria-label={fields.subject} className={`${field} col-span-2`} />
        <textarea name="message" required rows={4} placeholder={fields.message} aria-label={fields.message} className={`${base} col-span-2 resize-y py-3 md:h-full`} />
        <button
          type="submit"
          disabled={submit.sending}
          className={`${buttonDark} col-span-2 h-12 disabled:cursor-wait disabled:opacity-80 disabled:hover:border-[var(--color-navy)] disabled:hover:bg-[var(--color-navy)] disabled:hover:text-[var(--color-white)]`}
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5" />
              {form.sending}
            </>
          ) : (
            form.button
          )}
        </button>
      </form>
      {submit.showMessage && (
        <FormSuccess
          name={submit.name}
          title={form.successTitle}
          message={form.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={form.closeLabel}
          className="mt-4"
        />
      )}
    </>
  );
};
