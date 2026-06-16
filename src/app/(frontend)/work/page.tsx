import type { Metadata } from "next";

import { getProjects } from "@/lib/data";
import { WorkGrid } from "./WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Wade “Jax” Jackson — web & apps, branding, flyers, posters, apparel and print design.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Portfolio
        </p>
        <h1 className="font-heading text-fluid-3xl font-bold uppercase leading-[0.92]">
          Selected <span className="text-brand-gradient">work</span>
        </h1>
        <p className="mt-6 max-w-2xl text-fluid-base leading-relaxed text-foreground/70">
          A cross-section of what I make — full-stack apps and websites, brand identities,
          flyers and posters, apparel graphics, and print.
        </p>

        <div className="mt-14">
          <WorkGrid projects={projects} />
        </div>
      </div>
    </main>
  );
}
