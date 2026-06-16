import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import type { Contact as ContactType } from "@/payload-types";

export function Contact({ contact }: { contact: ContactType }) {
  const options = (contact.projectTypeOptions ?? []).map((o) => o.label).filter(Boolean) as string[];

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {contact.eyebrow ?? "Get in touch"}
          </p>
          <h2 className="font-heading text-fluid-2xl font-bold uppercase leading-[0.95]">
            {contact.heading ?? "Let's make something good."}
          </h2>
          {contact.blurb && (
            <p className="mt-6 max-w-md text-fluid-base leading-relaxed text-foreground/70">
              {contact.blurb}
            </p>
          )}
          <div className="mt-8 space-y-3 text-sm">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="block text-foreground/80 transition hover:text-primary">
                {contact.email}
              </a>
            )}
            {contact.responseTime && (
              <p className="font-mono text-xs uppercase tracking-wider text-foreground/50">
                {contact.responseTime}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm
            projectTypeOptions={options}
            successMessage={contact.successMessage ?? "Thanks — I'll get back to you within 24 hours."}
          />
        </Reveal>
      </div>
    </section>
  );
}
