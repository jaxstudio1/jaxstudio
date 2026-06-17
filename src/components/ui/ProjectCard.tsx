"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { PointerEvent } from "react";

import { categoryLabel } from "@/lib/categories";
import { mediaAlt, mediaUrl } from "@/lib/media";
import type { Project } from "@/payload-types";

const MAX_TILT = 7; // degrees

export function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const transform = useMotionTemplate`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * MAX_TILT * 2);
    rx.set(-py * MAX_TILT * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const cover = mediaUrl(project.coverImage);
  const initial = project.title?.charAt(0)?.toUpperCase() ?? "J";

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ transform: reduce ? undefined : transform }}
      className="group [transform-style:preserve-3d]"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] transition-colors hover:border-foreground/20"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {cover ? (
            <Image
              src={cover}
              alt={mediaAlt(project.coverImage, project.title)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-primary)_22%,#161616),#161616_60%)]">
              <span className="font-heading text-6xl text-foreground/30">{initial}</span>
            </div>
          )}
          <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-white/90 backdrop-blur">
            {categoryLabel(project.category)}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
            {project.year && <span className="font-mono text-xs text-foreground/55">{project.year}</span>}
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {project.summary}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
