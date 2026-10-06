"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "@formspree/react";
import Link from "next/link";

type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;

const fields: Field[] = ["name", "email", "message"];

const requiredMessages: Record<Field, string> = {
  name: "Enter your name.",
  email: "Enter your email address.",
  message: "Enter a message.",
};
const emailFormatMessage =
  "Enter an email address in the format name@example.com.";

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of fields) {
    if (!String(data.get(field) ?? "").trim()) {
      errors[field] = requiredMessages[field];
    }
  }
  const email = String(data.get("email") ?? "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = emailFormatMessage;
  }
  return errors;
}

// Focusing the first invalid field makes a screen reader announce its
// label, invalid state, and error message together.
function focusField(form: HTMLFormElement | null, field: Field) {
  const el = form?.elements.namedItem(field);
  if (el instanceof HTMLElement) el.focus();
}

export default function ContactPage() {
  const [state, handleSubmit] = useForm<Record<Field, string>>("mkoklrej");
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // The form, and the button that had focus, are gone after a successful
  // send. Moving focus to the confirmation tells screen-reader users it worked.
  useEffect(() => {
    if (state.succeeded) successRef.current?.focus();
  }, [state.succeeded]);

  // Formspree's own messages are terse fragments ("should be an email"), so
  // known codes get the same wording as client-side errors.
  function serverError(field: Field) {
    const error = state.errors?.getFieldErrors(field)[0];
    if (!error) return undefined;
    if (error.code === "TYPE_EMAIL") return emailFormatMessage;
    if (error.code.startsWith("REQUIRED_FIELD")) return requiredMessages[field];
    return error.message;
  }

  const errorFor = (field: Field) => clientErrors[field] ?? serverError(field);
  const formErrors = state.errors?.getFormErrors() ?? [];

  useEffect(() => {
    if (!state.errors) return;
    const first = fields.find((f) => state.errors?.getFieldErrors(f).length);
    if (first) focusField(formRef.current, first);
  }, [state.errors]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const errors = validate(new FormData(event.currentTarget));
    setClientErrors(errors);
    const first = fields.find((f) => errors[f]);
    if (first) {
      event.preventDefault();
      focusField(event.currentTarget, first);
      return;
    }
    handleSubmit(event);
  }

  function fieldProps(field: Field, extraClass = "") {
    const error = errorFor(field);
    return {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${field}-error` : undefined,
      className: `font-sans text-sm border ${
        error ? "border-danger" : "border-border-strong"
      } rounded px-3 py-2.5 bg-surface text-body placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-colors ${extraClass}`,
    };
  }

  function fieldError(field: Field) {
    const error = errorFor(field);
    return error ? (
      <p id={`${field}-error`} className="font-sans text-sm text-danger">
        {error}
      </p>
    ) : null;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="max-w-lg">
        <p className="font-mono text-sm text-muted mb-3">Contact</p>
        <h1 className="font-display font-bold text-4xl text-primary mb-4 leading-tight">
          Get in touch
        </h1>
        <p className="font-sans text-base text-muted leading-relaxed mb-10">
          Interested in working together or want to talk design systems and
          accessibility? Send me a note. All fields are required.
        </p>

        {state.succeeded ? (
          <div className="border border-success rounded-lg p-6 bg-paper">
            <h2
              ref={successRef}
              tabIndex={-1}
              className="font-display font-semibold text-success mb-1"
            >
              Message sent
            </h2>
            <p className="font-sans text-sm text-muted">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact form"
            className="space-y-6"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="font-sans text-sm font-medium text-primary"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                {...fieldProps("name")}
                placeholder="Your name"
              />
              {fieldError("name")}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-sans text-sm font-medium text-primary"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                {...fieldProps("email")}
                placeholder="you@example.com"
              />
              {fieldError("email")}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="font-sans text-sm font-medium text-primary"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                {...fieldProps("message", "resize-y")}
                placeholder="What's on your mind?"
              />
              {fieldError("message")}
            </div>


            <button
              type="submit"
              disabled={state.submitting}
              className="font-sans text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending…" : "Send message"}
            </button>
            {/* Kept in the DOM so screen readers announce errors added later. */}
            <div role="alert" className="font-sans text-sm text-danger">
              {formErrors.length > 0 &&
                `Your message wasn't sent. ${formErrors
                  .map((e) => e.message)
                  .join(" ")}`}
            </div>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/portfolio"
            className="font-sans text-sm font-medium text-secondary hover:underline"
          >
            <span aria-hidden="true">← </span>Back to work
          </Link>
        </div>
      </div>
    </div>
  );
}
