import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/motion/Reveal";
import type { Hero as HeroType } from "@/payload-types";

export function Hero({ hero }: { hero: HeroType }) {
  const parts = hero.headingParts ?? [];
  const stats = hero.stats ?? [];

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-28 pb-16">
      <AuroraBackground />

      <div className="mx-auto w-full max-w-6xl">
        {hero.eyebrow && (
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {hero.eyebrow}
          </div>
        )}

        {/* LCP element — rendered statically (no opacity gate) for fast paint. */}
        <h1 className="font-heading text-fluid-3xl font-bold uppercase">
          {parts.map((p, i) => (
            <span key={i} className={p.emphasized ? "text-brand-gradient" : undefined}>
              {p.text}
            </span>
          ))}
        </h1>

        <Reveal delay={0.1}>
          {hero.tagline && (
            <p className="mt-7 max-w-2xl text-fluid-base leading-relaxed text-foreground/70">
              {hero.tagline}
            </p>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            {hero.primaryCtaLabel && (
              <a
                href={hero.primaryCtaLink ?? "#work"}
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-background shadow-[0_0_45px_-8px_var(--brand-primary)] transition hover:opacity-90"
              >
                {hero.primaryCtaLabel} →
              </a>
            )}
            {hero.secondaryCtaLabel && (
              <a
                href={hero.secondaryCtaLink ?? "#contact"}
                className="rounded-full border border-foreground/20 px-7 py-3 text-sm font-medium transition hover:bg-foreground/5"
              >
                {hero.secondaryCtaLabel}
              </a>
            )}
          </div>
        </Reveal>

        {stats.length > 0 && (
          <Reveal delay={0.2}>
            <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-background p-5">
                  <dt className="font-heading text-2xl font-bold leading-normal text-brand-gradient">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-foreground/55">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
