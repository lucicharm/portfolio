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
      // Focus uses the global three-band ring.
      className: `min-h-11 border ${
        error ? "border-danger" : "border-rule-strong"
      } rounded-xs px-3 py-2 bg-paper text-ink placeholder:text-ink-2 ${extraClass}`,
    };
  }

  function fieldError(field: Field) {
    const error = errorFor(field);
    return error ? (
      <p id={`${field}-error`} className="text-sm text-danger">
        {error}
      </p>
    ) : null;
  }

  return (
    <div className="wrap py-16">
      <div className="max-w-[36rem]">
        <p className="font-mono text-sm tracking-[0.02em] text-ink-2 mb-5">
          Contact
        </p>
        <h1 className="text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] mb-5">
          Get in touch
        </h1>
        <p className="text-ink-2 mb-10">
          Interested in working together or want to talk design systems and
          accessibility? Send me a note, or find me on{" "}
          <a href="https://www.linkedin.com/in/magarland/" rel="me">
            LinkedIn
          </a>
          . All fields are required. Messages are sent through Formspree;
          see the{" "}
          <Link href="/privacy">
            Privacy notice
          </Link>
          .
        </p>

        {state.succeeded ? (
          <div className="border border-success p-6">
            <h2
              ref={successRef}
              tabIndex={-1}
              className="text-lg font-extrabold text-success mb-1"
            >
              Message sent
            </h2>
            <p className="text-ink-2">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact form"
            className="grid gap-6"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-semibold"
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-semibold"
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-semibold"
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
              className="justify-self-start inline-flex min-h-11 items-center rounded-xs bg-ink px-5 py-2 font-semibold text-paper hover:bg-mark disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending…" : "Send message"}
            </button>
            {/* Kept in the DOM so screen readers announce errors added later. */}
            <div role="alert" className="text-sm text-danger">
              {formErrors.length > 0 &&
                `Your message wasn't sent. ${formErrors
                  .map((e) => e.message)
                  .join(" ")}`}
            </div>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-rule">
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center gap-1 font-semibold"
          >
            <span aria-hidden="true">← </span>Back to work
          </Link>
        </div>
      </div>
    </div>
  );
}
