import type { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { getTermsPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Jax Studio — governing the use of this website.",
};

export default async function TermsPage() {
  const data = await getTermsPage();
  const sections = data.sections ?? [];

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <div className="mb-12 border-b border-foreground/10 pb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Legal</p>
        <h1 className="font-heading text-fluid-2xl font-bold uppercase">
          Terms of <span className="text-brand-gradient">Service</span>
        </h1>
        <p className="mt-3 text-sm text-foreground/55">Last updated: {data.lastUpdated}</p>
      </div>

      <div className="prose-legal">
        {sections.map((section) => (
          <section key={section.id ?? section.heading} className="mb-8">
            <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">{section.heading}</h2>
            <RichText
              data={section.body}
              className="space-y-3 text-foreground/75 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-secondary [&_strong]:text-foreground [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1"
            />
          </section>
        ))}
        {sections.length === 0 && <p className="italic text-foreground/50">Content coming soon.</p>}
      </div>
    </main>
  );
}
