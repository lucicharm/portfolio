import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectBySlug, type Block } from "@/lib/projects";
import { selectedWork } from "@/lib/selected-work";
import ProjectImage from "@/components/ProjectImage";
import AcrToolPage from "@/components/AcrToolPage";
import ProjectNav from "@/components/ProjectNav";

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}


type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    ...selectedWork.map((item) => ({ slug: item.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getProjectBySlug(slug);
  if (study) {
    return {
      title: study.title,
      description: study.summary,
    };
  }
  const selectedItem = selectedWork.find((item) => item.slug === slug);
  if (!selectedItem) return {};
  return {
    title: selectedItem.title,
    description: selectedItem.description,
  };
}

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="font-sans text-base text-body leading-relaxed">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul key={idx} className="space-y-2" role="list">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="font-sans text-base text-body leading-relaxed flex gap-3"
            >
              <span className="text-secondary mt-1 shrink-0" aria-hidden="true">
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <blockquote
          key={idx}
          className="border-l-2 border-secondary pl-5 py-1 bg-paper rounded-r-md"
        >
          <p className="font-sans text-base text-body leading-relaxed italic">
            {block.text}
          </p>
        </blockquote>
      );

    case "metrics":
      return (
        <dl key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {block.items.map((metric, i) => (
            <div
              key={i}
              className="border border-border rounded-lg p-6 bg-paper flex flex-col gap-1"
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="font-display font-bold text-4xl text-secondary">
                  {metric.value}
                </span>
                <p className="font-sans text-sm font-medium text-primary mt-1">
                  {metric.label}
                </p>
                {metric.note && (
                  <p className="font-sans text-xs text-muted mt-1 leading-relaxed">
                    {metric.note}
                  </p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "image":
      return (
        <ProjectImage
          key={idx}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          aspect={block.aspect}
          width={block.width}
          height={block.height}
        />
      );
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const study = getProjectBySlug(slug);
  if (!study) {
    const selectedItem = selectedWork.find((item) => item.slug === slug);
    if (!selectedItem) notFound();

    if (selectedItem.slug === "accessibility-programs-tooling") {
      return (
        <>
          <AcrToolPage
            title={selectedItem.title}
            description={selectedItem.description}
          />
          <ProjectNav slug={slug} />
        </>
      );
    }

    return (
      <>
        <header className="border-b border-border bg-paper">
          <div className="max-w-5xl mx-auto px-6 pt-12 pb-12">
            <Link
              href="/portfolio"
              className="font-sans text-sm text-muted hover:text-primary transition-colors mb-8 inline-block"
            >
              <span aria-hidden="true">← </span>Back to work
            </Link>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-primary leading-tight tracking-tight mb-4">
              {selectedItem.title}
            </h1>
            <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">
              {selectedItem.description}
            </p>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="font-sans text-lg text-muted leading-relaxed">
            Work in progress. More details coming soon.
          </p>
        </div>
        <ProjectNav slug={slug} />
      </>
    );
  }

  const inProgress = selectedWork.find((item) => item.slug === slug)
    ?.inProgress;

  const byline = [study.client, study.year, study.role].filter(
    (item): item is string => Boolean(item),
  );

  return (
    <>
      {/* Project Header */}
      <header className="border-b border-border bg-paper">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-12">
          <Link
            href="/portfolio"
            className="font-sans text-sm text-muted hover:text-primary transition-colors mb-8 inline-block"
          >
            <span aria-hidden="true">← </span>Back to work
          </Link>

          {inProgress && (
            <p className="font-sans text-base text-body border-l-2 border-secondary bg-surface px-4 py-3 mb-6 max-w-2xl">
              <strong className="font-semibold">Work in progress.</strong>{" "}
              This case study is still being written, and its images are
              placeholders.
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-sm text-muted border border-border rounded px-2 py-0.5 bg-surface"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl text-primary leading-tight tracking-tight mb-4">
            {study.title}
          </h1>

          {byline.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mb-6 font-sans text-sm text-muted">
              {byline.map((item, i) => (
                <span key={item} className="contents">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          )}

          <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">
            {study.summary}
          </p>

          {study.heroMetric && (
            <div className="mt-10 inline-flex items-baseline gap-3 border-t border-border pt-8">
              <span className="font-display font-bold text-5xl text-secondary">
                {study.heroMetric.value}
              </span>
              <span className="font-sans text-base text-muted">
                {study.heroMetric.label}
              </span>
            </div>
          )}
        </div>

        {/* Hero image — full width within the header band */}
        {study.heroImage && (
          <div className="max-w-5xl mx-auto px-6 pb-12">
            <ProjectImage
              src={study.heroImage.src}
              alt={study.heroImage.alt}
              caption={study.heroImage.caption}
              aspect={study.heroImage.aspect}
              width={study.heroImage.width}
              height={study.heroImage.height}
            />
          </div>
        )}
      </header>

      {/* Project Body */}
      <article
        className="max-w-3xl mx-auto px-6 py-16 space-y-16"
        aria-label={`Project: ${study.title}`}
      >
        {study.sections.map((section) => (
          <section
            key={section.heading}
            aria-labelledby={`section-${slugify(section.heading)}`}
          >
            <h2
              id={`section-${slugify(section.heading)}`}
              className="font-display font-semibold text-2xl text-primary mb-6 pb-3 border-b border-border"
            >
              {section.heading}
            </h2>
            <div className="space-y-6">
              {section.blocks.map((block, idx) => renderBlock(block, idx))}
            </div>
          </section>
        ))}
      </article>

      <ProjectNav slug={slug} />
    </>
  );
}
