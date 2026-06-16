"use server";

import config from "@payload-config";
import { getPayload } from "payload";

export type LeadFormState = {
  ok: boolean;
  error: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot — bots fill hidden fields; humans don't.
  if (String(formData.get("website") ?? "").trim()) {
    return { ok: true, error: null };
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!firstName || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    const payload = await getPayload({ config });
    // afterChange hook on the Leads collection fires the SendGrid emails.
    await payload.create({
      collection: "leads",
      data: { firstName, lastName, email, projectType, message, source: "website" },
    });
    return { ok: true, error: null };
  } catch (err) {
    console.error("submitLead failed:", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
