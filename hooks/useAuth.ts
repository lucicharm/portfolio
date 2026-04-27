"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthEnabled, isAuthenticated, clearAuthToken } from "@/lib/auth";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Skip auth check if disabled
    if (!isAuthEnabled()) {
      setIsChecking(false);
      return;
    }

    // Allow / and /portfolio to load without redirecting
    if (pathname === "/" || pathname === "/portfolio") {
      setIsChecking(false);
      return;
    }

    // Check if authenticated
    const authed = isAuthenticated();
    setIsAuthed(authed);

    // Redirect to /login if not authenticated
    if (!authed) {
      router.replace("/login");
    }

    setIsChecking(false);
  }, [pathname, router]);

  const logout = () => {
    clearAuthToken();
    router.push("/");
  };

  return { isAuthed, isChecking, logout };
}
