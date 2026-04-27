"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-40">
      <nav
        className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display font-semibold text-lg tracking-tight text-primary hover:text-secondary transition-colors whitespace-nowrap"
        >
          Melissa Garland
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-8" role="list">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-sans text-sm font-medium transition-colors ${
                    isActive ? "text-secondary" : "text-muted hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="sm:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span
            className={`block w-5 h-0.5 bg-primary transition-transform origin-center ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-opacity ${
              open ? "opacity-0" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block w-5 h-0.5 bg-primary transition-transform origin-center ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-border bg-surface px-6 py-4"
        >
          <ul className="flex flex-col gap-4" role="list">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`font-sans text-base font-medium transition-colors ${
                      isActive
                        ? "text-secondary"
                        : "text-primary hover:text-secondary"
                    }`}
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
