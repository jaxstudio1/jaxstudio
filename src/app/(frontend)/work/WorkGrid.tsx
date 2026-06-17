"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECT_CATEGORIES } from "@/lib/categories";
import type { Project } from "@/payload-types";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("all");

  // Only show filter chips for categories that actually have projects.
  const present = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return PROJECT_CATEGORIES.filter((c) => set.has(c.value));
  }, [projects]);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [projects, active],
  );

  const chip = (value: string, label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => setActive(value)}
      aria-pressed={active === value}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active === value
          ? "border-primary bg-primary text-background"
          : "border-foreground/15 text-foreground/70 hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2.5">
        {chip("all", "All work")}
        {present.map((c) => chip(c.value, c.label))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-foreground/40">
          No projects in this category yet.
        </p>
      )}
    </>
  );
}
