"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { useMotionConfig } from "./MotionProvider";

/**
 * Orchestrated stagger. `onLoad` plays immediately (use for the above-the-fold
 * hero); otherwise it triggers when scrolled into view.
 */
export function Stagger({
  children,
  className,
  onLoad = false,
}: {
  children: ReactNode;
  className?: string;
  onLoad?: boolean;
}) {
  const cfg = useMotionConfig();
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: cfg.stagger, delayChildren: 0.05 } },
  };

  const trigger = onLoad
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <motion.div className={className} initial="hidden" variants={parent} {...trigger}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const cfg = useMotionConfig();
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const item: Variants = {
    hidden: { opacity: 0, y: cfg.y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: cfg.duration, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
