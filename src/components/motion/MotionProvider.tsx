"use client";

import { createContext, useContext, type ReactNode } from "react";

export type MotionConfig = {
  y: number;
  duration: number;
  stagger: number;
};

export const MOTION_CONFIG: Record<string, MotionConfig> = {
  subtle: { y: 12, duration: 0.45, stagger: 0.05 },
  balanced: { y: 26, duration: 0.6, stagger: 0.09 },
  expressive: { y: 46, duration: 0.85, stagger: 0.13 },
};

const MotionContext = createContext<MotionConfig>(MOTION_CONFIG.balanced);

export const useMotionConfig = () => useContext(MotionContext);

export function MotionProvider({
  intensity,
  children,
}: {
  intensity?: string | null;
  children: ReactNode;
}) {
  const config = MOTION_CONFIG[intensity ?? "balanced"] ?? MOTION_CONFIG.balanced;
  return <MotionContext.Provider value={config}>{children}</MotionContext.Provider>;
}
