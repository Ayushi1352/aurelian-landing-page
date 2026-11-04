import type { CompanyData, ContactData, EnquiryFormData } from "@/types/templates.types";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ContactProps = {
  data?: ContactData;
  form?: EnquiryFormData;
  company: CompanyData;
};

/** Contact details on the left, the contact form in a card on the right (the website's Contact Us page) */
export const Contact = ({ data: contact, form, company }: ContactProps) => {
  if (!contact) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
        <div className="flex min-w-0 flex-col">
          <SectionHeading label={contact.label} title={contact.title} description={contact.description} />

          {/* one card per row on phones and tablets (two side by side between 640 and 767px); on desktop the four cards share the height left beside the form, so both columns end level */}
          <ul data-reveal className="mt-5 grid flex-1 gap-2.5 sm:auto-rows-fr sm:grid-cols-2 sm:gap-3 md:grid-cols-1 lg:mt-6 lg:grid-cols-2 lg:gap-4">
            {company.contactInfo.map((item) => {
              const external = item.href.startsWith("http");
              // the free consultation note has no link; it shows as a navy card so the offer stands out
              const note = !item.href;
              const card = `flex h-full items-start gap-3.5 border p-4 sm:flex-col sm:gap-0 md:flex-row md:gap-3.5 lg:flex-col lg:gap-0 lg:p-5 ${
                note ? "border-[var(--color-navy)] bg-[var(--color-navy)]" : "border-[var(--color-border)]"
              }`;
              const body = (
                <>
                  <Icon name={item.icon} className="mt-0.5 size-6 shrink-0 text-[var(--color-primary)] sm:mt-0 md:mt-0.5 lg:mt-0" />
                  <span className="min-w-0 sm:mt-3 md:mt-0 lg:mt-3">
                    <span
                      className={`block font-display text-lg font-semibold transition-colors ${
                        note ? "text-[var(--color-white)]" : "text-[var(--color-heading)] group-hover:text-[var(--color-primary-strong)]"
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.lines.map((line) => (
                      <span key={line} className={`block break-words text-sm leading-snug ${note ? "text-[var(--color-white-85)]" : "text-[var(--color-text-muted)]"}`}>
                        {line}
                      </span>
                    ))}
                  </span>
                </>
              );
              return (
                <li key={item.title}>
                  {!note ? (
                    <a
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={`group ${card} transition-colors hover:border-[var(--color-primary)]`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={card}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* from tablet up the message box takes up any spare height, so both sides end level */}
        <div data-reveal className="flex min-w-0 flex-col bg-[var(--color-bg-alt)] p-5 sm:p-7">
          <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-[var(--color-heading)]">{contact.form.title}</h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{contact.form.description}</p>
          <EnquiryForm data={form} />
        </div>
      </div>
    </section>
  );
};
