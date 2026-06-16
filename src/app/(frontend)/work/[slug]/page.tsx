import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { categoryLabel } from "@/lib/categories";
import { getProject, getProjectSlugs } from "@/lib/data";
import { mediaAlt, mediaUrl } from "@/lib/media";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.seo?.metaTitle ?? project.title,
    description: project.seo?.metaDescription ?? project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const cover = mediaUrl(project.coverImage);
  const tags = (project.tags ?? []).map((t) => t.label).filter(Boolean) as string[];
  const gallery = (project.gallery ?? [])
    .map((g) => ({ url: mediaUrl(g.image), alt: mediaAlt(g.image, project.title) }))
    .filter((g) => g.url);

  return (
    <main className="px-6 pb-24 pt-32">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 transition hover:text-foreground"
        >
          ← Back to work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-foreground/55">
          <span className="rounded-full border border-primary/40 px-3 py-1 text-primary">
            {categoryLabel(project.category)}
          </span>
          {project.year && <span className="font-mono">{project.year}</span>}
          {project.client && <span>· {project.client}</span>}
        </div>

        <h1 className="mt-5 font-heading text-fluid-2xl font-bold uppercase leading-[0.95]">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-fluid-lg leading-relaxed text-foreground/75">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground/60">
          {project.role && <span>Role — {project.role}</span>}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition hover:text-secondary"
            >
              Visit live →
            </a>
          )}
        </div>

        {cover && (
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/10">
            <Image
              src={cover}
              alt={mediaAlt(project.coverImage, project.title)}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {project.description && (
          <div className="prose-legal mt-12 space-y-4 text-fluid-base leading-relaxed text-foreground/80 [&_a]:text-primary [&_a]:underline [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:font-heading [&_h3]:font-semibold [&_strong]:text-foreground [&_ul]:ml-5 [&_ul]:list-disc">
            <RichText data={project.description} />
          </div>
        )}

        {gallery.length > 0 && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {gallery.map((g, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-foreground/10">
                <Image src={g.url as string} alt={g.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-4 py-1.5 text-sm text-foreground/75">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-foreground/10 pt-10">
          <Link href="/#contact" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Start a project →
          </Link>
        </div>
      </article>
    </main>
  );
}
