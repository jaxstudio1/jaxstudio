/** Shared project taxonomy — safe to import from both server and client code. */
export const PROJECT_CATEGORIES = [
  { label: "Web & Apps", value: "web-app" },
  { label: "Branding & Logos", value: "branding" },
  { label: "Flyers & Posters", value: "print" },
  { label: "Apparel & Merch", value: "apparel" },
  { label: "Brochures & Print", value: "brochure" },
  { label: "Other", value: "other" },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]["value"];

export const categoryLabel = (value?: string | null): string =>
  PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? "Other";
