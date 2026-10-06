"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

const AUTH_STORAGE_KEY = "portfolio-authenticated";
const AUTH_CHANGE_EVENT = "portfolio-auth-change";
// Hi, curious code reader! I know this isn't secure: on a static site the
// password is bundled into client-side JavaScript. Think of this as a friendly
// "please don't wander in" sign for casual visitors, not a lock on sensitive
// content.
const configuredPassword = process.env.NEXT_PUBLIC_PASSWORD;

function subscribeToAuthentication(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(AUTH_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
  };
}

function getAuthenticationSnapshot() {
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

// Unknown until the browser can read localStorage. Rendering the gate on the
// server would flash it, and a screen reader could start reading it, for
// visitors who have already unlocked the site.
function getServerAuthenticationSnapshot(): boolean | null {
  return null;
}

export default function PasswordGate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAuthenticated = useSyncExternalStore<boolean | null>(
    subscribeToAuthentication,
    getAuthenticationSnapshot,
    getServerAuthenticationSnapshot,
  );
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const justUnlocked = useRef(false);

  // The form, and the button that had focus, disappear on unlock. Move focus
  // to the page heading so keyboard and screen-reader users start there.
  useEffect(() => {
    if (!isAuthenticated || !justUnlocked.current) return;
    justUnlocked.current = false;
    const heading = document.querySelector<HTMLElement>("#main-content h1");
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus();
  }, [isAuthenticated]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configuredPassword || password !== configuredPassword) {
      setHasError(true);
      return;
    }

    justUnlocked.current = true;
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    setHasError(false);
  }

  if (isAuthenticated) return children;
  if (isAuthenticated === null) {
    return (
      <noscript>
        <p className="font-sans text-base text-body p-6">
          This portfolio needs JavaScript. Please enable it and reload the page.
        </p>
      </noscript>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-6 py-16 flex items-center justify-center">
      <section
        aria-labelledby="password-gate-title"
        className="w-full max-w-md border border-border rounded-lg bg-paper p-8 sm:p-10"
      >
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          Melissa Garland · UX Principal
        </p>
        <h1
          id="password-gate-title"
          className="font-display font-bold text-3xl text-primary tracking-tight"
        >
          Private portfolio
        </h1>
        <p className="font-sans text-base text-muted leading-relaxed mt-3 mb-8">
          Enter the password to view this portfolio.
        </p>

        {configuredPassword ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="portfolio-password"
                className="block font-sans text-sm font-medium text-primary mb-2"
              >
                Password
              </label>
              <input
                id="portfolio-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setHasError(false);
                }}
                aria-invalid={hasError}
                aria-describedby={hasError ? "password-error" : undefined}
                className="w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 font-sans text-base text-primary"
              />
              {hasError && (
                <p
                  id="password-error"
                  role="alert"
                  className="font-sans text-sm text-danger mt-2"
                >
                  That password wasn’t correct. Please try again.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-3 font-sans text-sm font-medium text-surface hover:bg-secondary transition-colors"
            >
              View portfolio
            </button>
          </form>
        ) : (
          <p role="alert" className="font-sans text-sm text-danger">
            Password protection hasn’t been configured for this site.
          </p>
        )}
      </section>
    </main>
  );
}
