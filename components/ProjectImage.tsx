import Image from "next/image";

export type ImageAspect = "wide" | "standard" | "portrait";

type Props = {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: ImageAspect;
  // Intrinsic pixel size. When set, the image keeps its own proportions
  // instead of being cropped to `aspect`, and links to the full-size file.
  width?: number;
  height?: number;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function withBasePath(src: string) {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}

const aspectClass: Record<ImageAspect, string> = {
  wide: "aspect-video",      // 16:9  — screenshots, dashboards, flow diagrams
  standard: "aspect-[4/3]",  // 4:3   — general UI, wireframes
  portrait: "aspect-[3/4]",  // 3:4   — mobile screens
};

export default function ProjectImage({
  src,
  alt,
  caption,
  aspect = "wide",
  width,
  height,
}: Props) {
  if (src && width && height) {
    const fullSrc = withBasePath(src);
    return (
      <figure className="my-2">
        <Image
          src={fullSrc}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-lg border border-border"
          sizes="(max-width: 768px) 100vw, 672px"
        />
        {caption && (
          <figcaption className="font-sans text-xs text-muted mt-2 text-center leading-relaxed">
            {caption}
          </figcaption>
        )}
        {/* Screenshots of text shrink at column width; offer the original. */}
        <p className="text-center">
          <a
            href={fullSrc}
            className="inline-block py-1 font-sans text-xs text-secondary underline underline-offset-2 hover:text-primary"
          >
            View full-size image
            <span className="sr-only">: {caption ?? alt}</span>
          </a>
        </p>
      </figure>
    );
  }

  return (
    <figure className="my-2">
      <div className={`relative w-full ${aspectClass[aspect]} rounded-lg overflow-hidden`}>
        {src ? (
          <Image
            src={withBasePath(src)}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        ) : (
          /* ── Placeholder ──────────────────────────────────────────────────
             To replace: set src to a path under /public (e.g. src="/images/pd-admin-before-after.png")
             or an external URL. Remove this comment block when done.
          ─────────────────────────────────────────────────────────────────── */
          <div
            className="absolute inset-0 bg-paper border-2 border-dashed border-border-strong rounded-lg flex flex-col items-center justify-center gap-3 p-6"
            aria-label={`Image placeholder: ${alt}`}
            role="img"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-border-strong"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p className="font-mono text-xs text-muted text-center leading-relaxed max-w-xs">
              {alt}
            </p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="font-sans text-xs text-muted mt-2 text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
