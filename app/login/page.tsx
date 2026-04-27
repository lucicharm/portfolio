"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateCredentials, setAuthToken } from "@/lib/auth";
import type { FormEvent } from "react";

type Status = "idle" | "submitting" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Validate credentials
    if (validateCredentials(username, password)) {
      setAuthToken();
      setStatus("idle");
      router.push("/");
    } else {
      setStatus("error");
      setError("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-sm w-full">
        <div className="text-center mb-10">
          <p className="font-mono text-sm text-muted mb-3">Access</p>
          <h1 className="font-display font-bold text-3xl text-primary mb-2">
            Portfolio Preview
          </h1>
          <p className="font-sans text-sm text-muted">
            Enter credentials to view the portfolio
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Login form"
          className="space-y-6"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="font-sans text-sm font-medium text-primary"
            >
              Username <span aria-hidden="true">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              disabled={status === "submitting"}
              className="font-sans text-sm border border-border rounded px-3 py-2.5 bg-surface text-text placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-colors disabled:opacity-60"
              placeholder="demo"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-sans text-sm font-medium text-primary"
            >
              Password <span aria-hidden="true">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={status === "submitting"}
              className="font-sans text-sm border border-border rounded px-3 py-2.5 bg-surface text-text placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-colors disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          {status === "error" && (
            <p role="alert" className="font-sans text-sm text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full font-sans text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="font-sans text-xs text-muted text-center">
            Demo credentials visible in source code
          </p>
        </div>
      </div>
    </div>
  );
}
