import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/payload-types";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Selected work
              </p>
              <h2 className="font-heading text-fluid-2xl font-bold uppercase">
                Featured <span className="text-brand-gradient">projects</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium transition hover:bg-foreground/5"
            >
              View all work →
            </Link>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <StaggerItem key={p.id}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
