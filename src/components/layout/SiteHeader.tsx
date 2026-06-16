"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

export function SiteHeader({
  siteName,
  navLinks,
}: {
  siteName: string;
  navLinks: NavLink[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [first, ...rest] = siteName.split(" ");
  const remainder = rest.join(" ") || "Studio";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-foreground/10 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight">
          {first}
          <span className="text-brand-gradient">{remainder}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/70 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium transition hover:bg-foreground/5 md:inline-block"
        >
          Start a project →
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/15 md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span className={`h-0.5 w-5 bg-foreground transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-foreground transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-foreground/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground/80 transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block w-fit rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Start a project →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
