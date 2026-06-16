import type { Media } from "@/payload-types";

export type MediaLike = string | number | Media | null | undefined;

/** Safely pull a URL from a Payload upload relation (populated object or id). */
export const mediaUrl = (m: MediaLike): string | null =>
  typeof m === "object" && m ? (m.url ?? null) : null;

/** Safely pull alt text from a Payload upload relation. */
export const mediaAlt = (m: MediaLike, fallback = ""): string =>
  typeof m === "object" && m ? (m.alt ?? fallback) : fallback;
