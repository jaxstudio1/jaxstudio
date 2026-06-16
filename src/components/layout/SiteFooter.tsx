import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

import type { SiteSetting } from "@/payload-types";

export function SiteFooter({ settings }: { settings: SiteSetting }) {
  const name = settings.siteName ?? "Jax Studio";
  const [first, ...rest] = name.split(" ");
  const remainder = rest.join(" ") || "Studio";
  const socials = settings.socialLinks ?? [];

  const isMail = (p: string) => ["mail", "email"].includes(p.toLowerCase());
  const label = (p: string) => p.charAt(0).toUpperCase() + p.slice(1);

  return (
    <footer className="border-t border-foreground/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-heading text-base font-bold">
          {first}
          <span className="text-brand-gradient">{remainder}</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-foreground/65">
          <Link href="/work" className="transition hover:text-foreground">Work</Link>
          <Link href="/#about" className="transition hover:text-foreground">About</Link>
          <Link href="/#contact" className="transition hover:text-foreground">Contact</Link>
          <Link href="/terms" className="transition hover:text-foreground">Terms</Link>
          <Link href="/privacy" className="transition hover:text-foreground">Privacy</Link>
        </nav>

        {socials.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => {
              const platform = s.platform ?? "";
              const Icon = isMail(platform) ? Mail : ExternalLink;
              return (
                <a
                  key={s.url}
                  href={isMail(platform) && !s.url.startsWith("mailto:") ? `mailto:${s.url}` : s.url}
                  target={isMail(platform) ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1.5 text-xs text-foreground/70 transition hover:border-primary/50 hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {label(platform)}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {settings.footerNote && (
        <p className="mx-auto mt-10 max-w-6xl px-6 text-center text-xs text-foreground/50 sm:text-left">
          {settings.footerNote}
        </p>
      )}
    </footer>
  );
}
