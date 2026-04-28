"use client";

import { useForm, ValidationError } from "@formspree/react";
import Link from "next/link";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mkoklrej");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="max-w-lg">
        <p className="font-mono text-sm text-muted mb-3">Contact</p>
        <h1 className="font-display font-bold text-4xl text-primary mb-4 leading-tight">
          Get in touch
        </h1>
        <p className="font-sans text-base text-muted leading-relaxed mb-10">
          Interested in working together or want to talk design systems and
          accessibility? Send me a note.
        </p>

        {state.succeeded ? (
          <div
            role="status"
            aria-live="polite"
            className="border border-success rounded-lg p-6 bg-paper"
          >
            <p className="font-display font-semibold text-success mb-1">
              Message sent
            </p>
            <p className="font-sans text-sm text-muted">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            className="space-y-6"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="font-sans text-sm font-medium text-primary"
              >
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="font-sans text-sm border border-border rounded px-3 py-2.5 bg-surface text-body placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-colors"
                placeholder="Your name"
              />
              <ValidationError field="name" errors={state.errors} className="font-sans text-sm text-danger" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-sans text-sm font-medium text-primary"
              >
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="font-sans text-sm border border-border rounded px-3 py-2.5 bg-surface text-body placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-colors"
                placeholder="you@example.com"
              />
              <ValidationError field="email" errors={state.errors} className="font-sans text-sm text-danger" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="font-sans text-sm font-medium text-primary"
              >
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="font-sans text-sm border border-border rounded px-3 py-2.5 bg-surface text-body placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-colors resize-y"
                placeholder="What's on your mind?"
              />
              <ValidationError field="message" errors={state.errors} className="font-sans text-sm text-danger" />
            </div>

            <ValidationError errors={state.errors} className="font-sans text-sm text-danger" />

            <button
              type="submit"
              disabled={state.submitting}
              className="font-sans text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="font-sans text-sm font-medium text-secondary hover:underline"
          >
            ← Back to work
          </Link>
        </div>
      </div>
    </div>
  );
}
