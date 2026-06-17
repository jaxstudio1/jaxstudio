"use client";

import { useActionState } from "react";

import { submitLead, type LeadFormState } from "@/app/(frontend)/actions";

const initialState: LeadFormState = { ok: false, error: null };

export function ContactForm({
  projectTypeOptions,
  successMessage,
}: {
  projectTypeOptions: string[];
  successMessage: string;
}) {
  const [state, action, pending] = useActionState(submitLead, initialState);

  if (state.ok) {
    return (
      <div
        data-testid="contact-success"
        className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-2xl border border-primary/30 bg-foreground/[0.03] p-8 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-2xl text-primary">
          ✓
        </div>
        <div className="mt-4 font-heading text-2xl font-bold leading-normal text-brand-gradient">Message received.</div>
        <p className="mt-2 max-w-xs text-sm text-foreground/60">{successMessage}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-foreground/15 bg-background px-4 py-3 text-sm outline-none transition placeholder:text-foreground/55 focus:border-primary/60";

  return (
    <form
      action={action}
      data-testid="contact-form"
      className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 sm:p-8"
    >
      {/* honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-foreground/60">First name</label>
          <input name="firstName" required placeholder="First name" className={inputClass} data-testid="contact-firstName" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-foreground/60">Last name</label>
          <input name="lastName" placeholder="Last name" className={inputClass} />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-foreground/60">Email</label>
        <input name="email" type="email" required placeholder="you@email.com" className={inputClass} data-testid="contact-email" />
      </div>

      {projectTypeOptions.length > 0 && (
        <div className="mt-4">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-foreground/60">Project type</label>
          <select name="projectType" defaultValue="" aria-label="Project type" className={inputClass}>
            <option value="" disabled>Select a project type…</option>
            {projectTypeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-4">
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-foreground/60">Project / message</label>
        <textarea name="message" required rows={4} placeholder="Tell me about your project…" className={`${inputClass} resize-none`} data-testid="contact-message" />
      </div>

      {state.error && <p className="mt-4 text-sm text-primary" role="alert">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        data-testid="contact-submit"
        className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-[0_0_40px_-8px_var(--brand-primary)] transition hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
