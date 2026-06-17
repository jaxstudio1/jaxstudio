import type { Marquee as MarqueeType } from "@/payload-types";

export function Marquee({ marquee }: { marquee: MarqueeType }) {
  const items = (marquee.items ?? []).map((i) => i.text).filter(Boolean) as string[];
  if (items.length === 0) return null;

  // Double the list so the -50% keyframe loops seamlessly.
  const loop = [...items, ...items];

  return (
    <section aria-hidden className="border-y border-foreground/10 py-6 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {loop.map((text, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-heading text-xl uppercase tracking-tight text-foreground/60">
              {text}
            </span>
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
