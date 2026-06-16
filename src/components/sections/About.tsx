import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { SkillBars } from "@/components/ui/SkillBars";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { About as AboutType } from "@/payload-types";

export function About({ about }: { about: AboutType }) {
  const paragraphs = (about.paragraphs ?? []).map((p) => p.text).filter(Boolean) as string[];
  const skills = (about.skills ?? []).map((s) => ({ name: s.name, pct: s.pct }));
  const tools = (about.tools ?? []).map((t) => t.label).filter(Boolean) as string[];
  const photo = mediaUrl(about.photo);
  const name = about.personName ?? "Wade Jackson";
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {about.eyebrow ?? "About me"}
          </p>
          <h2 className="max-w-3xl font-heading text-fluid-2xl font-bold uppercase">
            {about.headingPre}{" "}
            <span className="text-brand-gradient">{about.headingEmphasis}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[340px_1fr] lg:gap-16">
          <Reveal>
            <div className="md:sticky md:top-24">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-primary)_30%,#161616),#161616_60%)]">
                {photo ? (
                  <Image
                    src={photo}
                    alt={mediaAlt(about.photo, name)}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-heading text-7xl text-foreground/30">
                    {initials}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h3 className="font-heading text-xl font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-foreground/60">{about.role}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {about.location && (
                    <span className="rounded-full border border-foreground/10 px-3 py-1 text-foreground/70">
                      {about.location}
                    </span>
                  )}
                  {about.yearsExperience != null && (
                    <span className="rounded-full border border-foreground/10 px-3 py-1 font-mono uppercase tracking-wider text-primary">
                      {about.yearsExperience}+ yrs
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-fluid-base leading-relaxed text-foreground/75">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {skills.length > 0 && (
              <div className="mt-10">
                <h4 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-foreground/50">
                  Core skills
                </h4>
                <SkillBars skills={skills} />
              </div>
            )}

            {tools.length > 0 && (
              <div className="mt-10">
                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground/50">
                  Tools & software
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-4 py-1.5 text-sm text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
