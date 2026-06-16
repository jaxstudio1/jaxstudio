"use client";

import { motion } from "framer-motion";

/**
 * Blurred brand-colored gradient blobs + a faint masked grid. Pure
 * transform/opacity animation (GPU-cheap) so it won't tax LCP. Colors read from
 * the Brand-driven CSS vars (--brand-primary / --brand-secondary).
 */
export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      <motion.div
        className="absolute -top-[20%] left-1/2 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle at center, var(--brand-primary), transparent 62%)",
          opacity: 0.4,
        }}
        animate={{ scale: [1, 1.15, 1], x: ["-50%", "-44%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-[10%] right-[5%] h-[42vw] w-[42vw] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle at center, var(--brand-secondary), transparent 62%)",
          opacity: 0.32,
        }}
        animate={{ scale: [1, 1.2, 1], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
