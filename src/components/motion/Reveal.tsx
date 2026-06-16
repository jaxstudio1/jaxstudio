"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useMotionConfig } from "./MotionProvider";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Scroll-triggered reveal. Distance/duration scale with Brand.animationIntensity.
 * Do not wrap the LCP hero heading in this.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const cfg = useMotionConfig();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: cfg.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: cfg.duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
