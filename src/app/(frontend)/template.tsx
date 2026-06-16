"use client";

import { motion } from "framer-motion";

/**
 * Per-route transition. Opacity-only on purpose: a transform here would create a
 * containing block and break the fixed site header.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
