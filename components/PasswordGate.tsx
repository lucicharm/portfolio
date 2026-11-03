"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { usePathname } from "next/navigation";

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

export function useIsAuthenticated() {
  return useSyncExternalStore<boolean | null>(
    subscribeToAuthentication,
    getAuthenticationSnapshot,
    getServerAuthenticationSnapshot,
  );
}

// Pages anyone can read without the password.
export function isPublicPath(pathname: string) {
  return pathname.endsWith("/privacy");
}

export default function PasswordGate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();
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

  if (isPublicPath(pathname)) return children;
  if (isAuthenticated) return children;
  if (isAuthenticated === null) {
    return (
      <noscript>
        <p className="p-6">
          This portfolio needs JavaScript. Please enable it and reload the page.
        </p>
      </noscript>
    );
  }

  return (
    <main className="min-h-screen px-4 py-16 flex items-center justify-center">
      <section
        aria-labelledby="password-gate-title"
        className="w-full max-w-md border border-rule-strong border-t-ink border-t-2 p-6 sm:p-10"
      >
        <p className="font-mono text-sm tracking-[0.02em] text-ink-2 mb-3">
          Melissa Garland · UX Principal
        </p>
        <h1
          id="password-gate-title"
          className="text-2xl font-extrabold tracking-[-0.02em]"
        >
          Private portfolio
        </h1>
        <p className="text-ink-2 mt-3 mb-8">
          Enter the password to view this portfolio.
        </p>

        {configuredPassword ? (
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
              <label
                htmlFor="portfolio-password"
                className="block font-semibold mb-2"
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
                className="w-full min-h-11 rounded-xs border border-rule-strong bg-paper px-3 py-2 text-ink"
              />
              {hasError && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-sm text-danger mt-2"
                >
                  That password wasn’t correct. Please try again.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full min-h-11 rounded-xs bg-ink px-4 py-2 font-semibold text-paper hover:bg-mark"
            >
              View portfolio
            </button>
          </form>
        ) : (
          <p role="alert" className="text-sm text-danger">
            Password protection hasn’t been configured for this site.
          </p>
        )}
      </section>
    </main>
  );
}
