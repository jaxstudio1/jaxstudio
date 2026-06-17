import type { Metadata } from "next";
import {
  Anton,
  Archivo,
  Boldonse,
  Bricolage_Grotesque,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getBrand, getSiteSettings } from "@/lib/data";
import "./globals.css";

const boldonse = Boldonse({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-boldonse",
  // Boldonse has no metric data in next/font for an auto-adjusted fallback;
  // disable it to avoid the build warning (our CSS stack provides the fallback).
  adjustFontFallback: false,
});
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

const DISPLAY_VAR: Record<string, string> = {
  boldonse: "var(--font-boldonse)",
  bricolage: "var(--font-bricolage)",
  "space-grotesk": "var(--font-space-grotesk)",
  anton: "var(--font-anton)",
};

const BODY_VAR: Record<string, string> = {
  archivo: "var(--font-archivo)",
  "space-grotesk": "var(--font-space-grotesk)",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const name = settings.siteName ?? "Jax Studio";
  return {
    metadataBase: new URL("https://jaxstudio.ink"),
    title: {
      default: `${name} — Graphic & Web Design`,
      template: `%s — ${name}`,
    },
    description:
      settings.tagline ??
      "Portfolio of Wade “Jax” Jackson — full-stack apps, websites, branding, flyers, posters, apparel & print.",
    openGraph: {
      type: "website",
      siteName: name,
      url: "https://jaxstudio.ink",
    },
  };
}

export default async function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [brand, settings] = await Promise.all([getBrand(), getSiteSettings()]);

  const displayFont = DISPLAY_VAR[brand.displayFont ?? "boldonse"] ?? DISPLAY_VAR.boldonse;
  const bodyFont = BODY_VAR[brand.bodyFont ?? "archivo"] ?? BODY_VAR.archivo;

  const themeVars = [
    `--brand-primary:${brand.primary};`,
    `--brand-secondary:${brand.secondary};`,
    `--background:${brand.background};`,
    `--foreground:${brand.foreground};`,
    `--font-display:${displayFont},"Archivo Black",system-ui,sans-serif;`,
    `--font-body:${bodyFont},system-ui,sans-serif;`,
    `--font-mono-stack:var(--font-jetbrains-mono),ui-monospace,monospace;`,
  ].join("");

  const navLinks = (settings.navLinks ?? []).map((l) => ({ label: l.label, href: l.href }));

  return (
    <html
      lang="en"
      className={`${boldonse.variable} ${bricolage.variable} ${spaceGrotesk.variable} ${anton.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root{${themeVars}}` }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <MotionProvider intensity={brand.animationIntensity}>
          <SiteHeader siteName={settings.siteName ?? "Jax Studio"} navLinks={navLinks} />
          {children}
          <SiteFooter settings={settings} />
        </MotionProvider>
      </body>
    </html>
  );
}
