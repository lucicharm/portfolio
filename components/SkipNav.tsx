export default function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:bg-ink focus:text-paper focus:font-semibold focus:no-underline"
    >
      Skip to main content
    </a>
  );
}
