"use client";

import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isChecking } = useAuth();

  // Show nothing while checking auth (prevents flash of unprotected content)
  if (isChecking) {
    return null;
  }

  return children;
}
