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
      router.push("/portfolio");
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
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="username"
              className="block font-sans text-sm font-medium text-primary mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-sans text-sm font-medium text-primary mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full font-sans text-sm font-medium bg-primary text-surface px-4 py-2.5 rounded hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "submitting" ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}