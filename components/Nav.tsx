"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function isCurrent(href: string, pathname: string) {
  const routePath = pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname === basePath
      ? "/"
      : pathname;

  if (href === "/portfolio") {
    return (
      routePath === "/" ||
      routePath === "/portfolio" ||
      routePath === "/work" ||
      routePath.startsWith("/work/")
    );
  }

  return routePath === href || routePath.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the button that opened it.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="border-b border-rule-strong bg-paper tall-sm:sticky tall-sm:top-0 z-20">
      <nav
        className="wrap min-h-16 flex items-center justify-between gap-x-6"
        aria-label="Main navigation"
      >
        <Link
          href="/portfolio"
          className="py-2.5 font-extrabold tracking-[-0.01em] text-ink no-underline hover:text-mark whitespace-nowrap"
        >
          Melissa Garland
        </Link>

        {/* Desktop nav. The current page gets a bar as well as the color; a
            border, unlike a shadow, survives forced-colors mode. */}
        <ul className="hidden sm:flex items-center gap-1" role="list">
          {navLinks.map(({ href, label }) => {
            const isActive = isCurrent(href, pathname);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className="inline-flex items-center min-h-11 px-3 font-mono text-sm text-ink no-underline hover:underline hover:decoration-3 hover:decoration-mark aria-[current=page]:text-mark aria-[current=page]:border-b-3 aria-[current=page]:border-mark aria-[current=page]:pt-[3px]"
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button. The icon swaps instantly; nothing animates. */}
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="sm:hidden -mr-2.5 grid size-11 place-items-center text-ink"
        >
          <svg
            viewBox="0 0 20 20"
            className="size-5"
            aria-hidden="true"
            focusable="false"
          >
            {open ? (
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M2 5h16M2 10h16M2 15h16"
                stroke="currentColor"
                strokeWidth="2"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {open && (
        <div id="mobile-menu" className="sm:hidden border-t border-rule">
          <ul className="wrap py-2" role="list">
            {navLinks.map(({ href, label }) => {
              const isActive = isCurrent(href, pathname);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center min-h-11 px-1 font-mono text-base text-ink no-underline hover:underline hover:decoration-3 hover:decoration-mark aria-[current=page]:text-mark aria-[current=page]:border-b-3 aria-[current=page]:border-mark aria-[current=page]:pt-[3px]"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
