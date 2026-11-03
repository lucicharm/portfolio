import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjectBySlug, type Block } from "@/lib/projects";
import { selectedWork, type SelectedWorkItem } from "@/lib/selected-work";
import ProjectImage from "@/components/ProjectImage";
import AcrToolPage from "@/components/AcrToolPage";
import ProjectNav from "@/components/ProjectNav";
import TokenDiagram from "@/components/TokenDiagram";
import {
  ContrastChecks,
  FocusRingSamples,
  PairingRules,
} from "@/components/TokenFigures";

const figures: Record<
  Extract<Block, { type: "figure" }>["name"],
  React.ComponentType<{ number?: number }>
> = {
  "token-diagram": TokenDiagram,
  "contrast-checks": ContrastChecks,
  "focus-rings": FocusRingSamples,
  "pairing-rules": PairingRules,
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Appendices link back to the case study they belong to.
function backLink(item: SelectedWorkItem | undefined) {
  const parent = selectedWork.find((other) => other.slug === item?.parent);
  return parent
    ? { href: `/work/${parent.slug}`, label: `Back to ${parent.title.split(":")[0]}` }
    : { href: "/portfolio", label: "Back to work" };
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

// Figures are numbered in reading order. Only figures with a caption get a
// number, so the visible sequence has no gaps.
type FigureCounter = { next: () => number };

function figureCounter(): FigureCounter {
  let n = 0;
  return { next: () => ++n };
}

function renderBlock(block: Block, idx: number, figs: FigureCounter) {
  switch (block.type) {
    case "paragraph":
      return <p key={idx}>{block.text}</p>;

    case "list":
      return (
        <ul key={idx} className="dash-list grid gap-2 pl-5" role="list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <blockquote
          key={idx}
          className="quote-mark border border-rule-strong p-6"
        >
          <p className="text-lg leading-normal">{block.text}</p>
        </blockquote>
      );

    case "metrics":
      return (
        <ul
          key={idx}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] border-t border-ink"
          role="list"
        >
          {block.items.map((metric, i) => (
            <li
              key={i}
              className="grid content-start gap-1 border-b border-rule py-4 pr-4"
            >
              <p className="text-2xl font-extrabold tabular-nums text-mark">
                {metric.value}
              </p>
              <p className="font-semibold">{metric.label}</p>
              {metric.note && (
                <p className="text-sm text-ink-2">{metric.note}</p>
              )}
            </li>
          ))}
        </ul>
      );

    case "stages":
      return (
        <ol key={idx} className="ml-3 grid border-l border-ink" role="list">
          {block.items.map((stage, i) => (
            <li
              key={stage.title}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] pb-7 last:pb-0"
            >
              <span
                className="-ml-3 grid size-6 place-items-center border border-mark bg-paper font-mono text-sm text-mark"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="grid grid-cols-[minmax(0,1fr)] gap-1">
                {stage.when && (
                  <p className="font-mono text-sm tracking-[0.02em] text-ink-2">
                    {stage.when}
                  </p>
                )}
                <h3 className="text-lg font-semibold">
                  <span className="sr-only">Stage {i + 1}: </span>
                  {stage.title}
                </h3>
                <p>{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "links":
      return (
        <ul
          key={idx}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-4"
          role="list"
        >
          {block.items.map((link) => (
            <li
              key={link.href}
              className="link-row relative grid content-start gap-2 border border-rule-strong p-5 hover:border-mark hover:bg-panel focus-within:border-mark focus-within:bg-panel"
            >
              {link.eyebrow && (
                <p className="font-mono text-sm tracking-[0.02em] text-ink-2">
                  {link.eyebrow}
                </p>
              )}
              <h3 className="text-lg font-semibold">
                {/* The stretched link makes the whole card clickable. */}
                <Link href={link.href} className="stretched-link">
                  {link.title}
                </Link>
              </h3>
              <p>{link.text}</p>
            </li>
          ))}
        </ul>
      );

    case "figure": {
      const Figure = figures[block.name];
      return <Figure key={idx} number={figs.next()} />;
    }

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
          number={block.caption ? figs.next() : undefined}
        />
      );
  }
}

const backLinkClass =
  "inline-flex min-h-11 items-center gap-1 font-mono text-sm tracking-[0.02em] text-ink-2";

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="mb-2">
      <Link href={href} className={backLinkClass}>
        <span aria-hidden="true">←</span>
        {label}
      </Link>
    </p>
  );
}

const titleClass =
  "max-w-[22ch] text-3xl font-extrabold leading-[1.08] tracking-[-0.03em]";
const ledeClass = "max-w-[38rem] text-lg leading-normal text-ink-2";
const headerClass = "border-b border-rule pt-8 pb-12";
const headerInnerClass = "wrap grid grid-cols-[minmax(0,1fr)] gap-5";

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
            back={backLink(selectedItem)}
          />
          <ProjectNav slug={slug} />
        </>
      );
    }

    return (
      <>
        <header className={headerClass}>
          <div className={headerInnerClass}>
            <BackLink href="/portfolio" label="Back to work" />
            <h1 className={titleClass}>{selectedItem.title}</h1>
            <p className={ledeClass}>{selectedItem.description}</p>
          </div>
        </header>
        <div className="wrap py-12">
          <p className="max-w-[44rem]">
            Work in progress. More details coming soon.
          </p>
        </div>
        <ProjectNav slug={slug} />
      </>
    );
  }

  const selectedItem = selectedWork.find((item) => item.slug === slug);
  const inProgress = selectedItem?.inProgress;
  const back = backLink(selectedItem);
  const figs = figureCounter();

  const spec = (
    [
      ["Client", study.client],
      ["Year", study.year],
      ["Role", study.role],
    ] satisfies [string, string | undefined][]
  ).filter((row): row is [string, string] => Boolean(row[1]));
  const hasSpec = spec.length > 0 || study.tags.length > 0 || study.heroMetric;
  const specRowClass =
    "grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-rule py-2";
  const specTermClass = "font-mono text-sm tracking-[0.02em] text-ink-2 pt-0.5";

  return (
    <>
      {/* Project Header */}
      <header className={headerClass}>
        <div className={headerInnerClass}>
          <BackLink href={back.href} label={back.label} />

          {inProgress && (
            <p className="block max-w-[40rem] border border-mark bg-mark-wash px-4 py-3 rounded-xs">
              <strong className="font-semibold">Work in progress.</strong>{" "}
              This case study is still being written.
            </p>
          )}

          <h1 className={titleClass}>{study.title}</h1>

          <p className={ledeClass}>{study.summary}</p>

          {hasSpec && (
            <div className="grid max-w-[60rem] grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-6 border-t border-ink pt-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <dl className="grid">
                {spec.map(([term, value]) => (
                  <div key={term} className={specRowClass}>
                    <dt className={specTermClass}>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                {study.tags.length > 0 && (
                  <div className={specRowClass}>
                    <dt className={specTermClass}>Tags</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-1.5" role="list">
                        {study.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-xs border border-rule-strong px-2 font-mono text-sm"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>

              {study.heroMetric && (
                <p className="grid content-start gap-1 border-l-3 border-mark pl-4">
                  <span className="text-2xl font-extrabold leading-[1.1] tracking-[-0.02em] tabular-nums">
                    {study.heroMetric.value}
                  </span>{" "}
                  <span className="text-ink-2">{study.heroMetric.label}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero image, full frame width */}
      {study.heroImage && (
        <div className="wrap pt-10">
          <ProjectImage
            src={study.heroImage.src}
            alt={study.heroImage.alt}
            caption={study.heroImage.caption}
            aspect={study.heroImage.aspect}
            width={study.heroImage.width}
            height={study.heroImage.height}
            number={study.heroImage.caption ? figs.next() : undefined}
          />
        </div>
      )}

      {/* Project Body, with an outline of its H2s */}
      <div
        className={`wrap grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-8 py-12 ${
          study.sections.length
            ? "lg:grid-cols-[14rem_minmax(0,44rem)]"
            : "lg:grid-cols-[minmax(0,44rem)]"
        }`}
      >
        {study.sections.length > 0 && (
          <nav
            aria-labelledby="toc-heading"
            className="self-start border-t border-ink pt-3 pr-2 pb-2 tall-lg:sticky tall-lg:top-22 tall-lg:max-h-[calc(100vh-7rem)] tall-lg:overflow-auto tall-lg:scroll-py-2"
          >
            <p
              id="toc-heading"
              className="mb-2 font-mono text-sm tracking-[0.02em] text-ink-2"
            >
              On this page
            </p>
            <ol role="list">
              {study.sections.map((section) => (
                <li
                  key={section.heading}
                  className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline"
                >
                  {/* The level tag sits outside the link, so the link's name
                      matches the heading it goes to. */}
                  <span
                    className="font-mono text-sm tracking-[0.02em] text-mark"
                    aria-hidden="true"
                  >
                    H2
                  </span>
                  <a
                    href={`#section-${slugify(section.heading)}`}
                    className="block py-2 text-sm leading-[1.4] text-ink no-underline hover:underline hover:decoration-mark hover:decoration-3"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article
          className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-16"
          aria-label={`Project: ${study.title}`}
        >
          {study.sections.map((section) => (
            <section
              key={section.heading}
              aria-labelledby={`section-${slugify(section.heading)}`}
              className="grid grid-cols-[minmax(0,1fr)] gap-5"
            >
              <h2
                id={`section-${slugify(section.heading)}`}
                className="border-b border-rule pb-3 text-xl font-extrabold tracking-[-0.015em]"
              >
                {section.heading}
              </h2>
              {section.blocks.map((block, idx) =>
                renderBlock(block, idx, figs),
              )}
            </section>
          ))}
        </article>
      </div>

      <ProjectNav slug={slug} />
    </>
  );
}
