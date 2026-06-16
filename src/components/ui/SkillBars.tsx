"use client";

import { motion, useReducedMotion } from "framer-motion";

type Skill = { name: string; pct: number };

export function SkillBars({ skills }: { skills: Skill[] }) {
  const reduce = useReducedMotion();
  if (skills.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      {skills.map((s) => {
        const pct = Math.max(0, Math.min(100, s.pct));
        return (
          <div key={s.name}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">{s.name}</span>
              <span className="font-mono text-xs text-primary">{pct}%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))",
                }}
                initial={{ width: reduce ? `${pct}%` : 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
