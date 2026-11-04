"use client";

import { useState } from "react";
import type { EnquiryFormData } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonDark } from "@/components/ui/button";

/** Plain square form fields */
const base =
  "w-full min-w-0 appearance-none border border-[var(--color-border)] bg-[var(--color-bg-main)] px-3.5 text-sm text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] max-sm:px-3 max-sm:placeholder:text-xs";
/** single-line fields and selects share one height */
const field = `${base} h-11`;
/** grey placeholder text while a select or date has no value yet */
const emptyText = "text-[var(--color-text-placeholder)] max-sm:text-xs";

type SelectFieldProps = { name: string; placeholder: string; options: string[]; required?: boolean; className?: string };

const SelectField = ({ name, placeholder, options, required, className = "" }: SelectFieldProps) => {
  const [value, setValue] = useState("");

  return (
    <div className={`relative ${className}`}>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={placeholder}
        className={`${field} cursor-pointer pr-8 ${value === "" ? emptyText : "text-[var(--color-heading)]"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-[var(--color-heading)]">
            {option}
          </option>
        ))}
      </select>
      <Icon name="LuChevronDown" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-primary)]" />
    </div>
  );
};

/**
 * Date picker that shows its label as grey placeholder text while it is empty (a date input has no placeholder of its own).
 * The browser's own date text only shows once it has focus or a value.
 */
const DateField = ({ name, placeholder, className = "" }: { name: string; placeholder: string; className?: string }) => {
  const [value, setValue] = useState("");

  return (
    <div className={`relative ${className}`}>
      <input
        type="date"
        name={name}
        required
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={placeholder}
        className={`peer ${field} cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 ${
          value === "" ? "text-transparent focus:text-[var(--color-heading)]" : "text-[var(--color-heading)]"
        }`}
      />
      {value === "" && (
        <span aria-hidden="true" className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm peer-focus:hidden max-sm:left-3 ${emptyText}`}>
          {placeholder}
        </span>
      )}
    </div>
  );
};

/** The appointment form in the contact section (fields of the website's Book Appointment page) */
export const EnquiryForm = ({ data: form }: { data?: EnquiryFormData }) => {
  const submit = useDummySubmit();
  if (!form) return null;
  const { fields } = form;

  return (
    <>
      {/* remounting the form (via key) after each send clears every field, including the controlled selects */}
      <form
        key={submit.round}
        onSubmit={submit.onSubmit}
        onInput={submit.onInput}
        aria-busy={submit.sending}
        // from tablet up the message box takes up any spare height of the contact section card
        className="mt-4 grid grid-cols-2 gap-2.5 md:flex-1 md:grid-rows-[repeat(4,auto)_1fr_auto]"
      >
        <input name="name" required placeholder={fields.name} aria-label={fields.name} autoComplete="name" className={`${field} col-span-2`} />
        <input name="email" type="email" required placeholder={fields.email} aria-label={fields.email} autoComplete="email" className={field} />
        <input name="phone" type="tel" required placeholder={fields.phone} aria-label={fields.phone} autoComplete="tel" className={field} />
        <SelectField name="practiceArea" placeholder={fields.practiceArea} options={form.practiceOptions} required className="col-span-2" />
        <DateField name="date" placeholder={fields.date} />
        <SelectField name="time" placeholder={fields.time} options={form.timeOptions} required />
        <textarea name="details" rows={3} placeholder={fields.details} aria-label={fields.details} className={`${base} col-span-2 resize-y py-3 md:h-full`} />
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
