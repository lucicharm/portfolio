import Link from "next/link";

const linkClass = "inline-flex items-center min-h-11 px-1";

export default function Footer() {
  return (
    <footer className="border-t border-rule-strong mt-16">
      <div className="wrap py-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <p className="font-extrabold">Melissa Garland</p>
        <ul className="flex flex-wrap gap-x-4" role="list">
          <li>
            <Link href="/contact" className={linkClass}>
              Get in touch
            </Link>
          </li>
          <li>
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/magarland/"
              rel="me"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="font-mono text-sm text-ink-2">
          UX Principal · Design Systems · Accessibility
        </p>
      </div>
    </footer>
  );
}
