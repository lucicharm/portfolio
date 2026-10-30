"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isPublicPath, useIsAuthenticated } from "@/components/PasswordGate";

// GoatCounter: cookie-free analytics, so no consent banner is needed.
const GOATCOUNTER_ENDPOINT = "https://mgarland.goatcounter.com/count";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

declare global {
  interface Window {
    goatcounter?: { count: (vars?: Record<string, unknown>) => void };
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();
  const [isLoaded, setIsLoaded] = useState(false);
  const lastCounted = useRef<string | null>(null);

  // Client-side navigation doesn't reload the page, so count each route
  // change here instead of relying on GoatCounter's automatic onload count.
  useEffect(() => {
    if (!isLoaded || isAuthenticated === null) return;
    const isLocked = !isAuthenticated && !isPublicPath(pathname);
    // Locked views are counted separately, so you can see visitors who
    // opened a link but didn't enter the password.
    const path = `${basePath}${pathname}${isLocked ? " (password screen)" : ""}`;
    if (lastCounted.current === path) return;
    const isFirstView = lastCounted.current === null;
    lastCounted.current = path;
    window.goatcounter?.count({
      path,
      title: isLocked ? "Password screen" : document.title,
      // document.referrer doesn't change on client-side navigation. Credit the
      // referrer (and any ?ref= tag) once, not on every page in the visit.
      ...(isFirstView ? {} : { referrer: "" }),
    });
  }, [isLoaded, isAuthenticated, pathname]);

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={GOATCOUNTER_ENDPOINT}
      data-goatcounter-settings='{"no_onload": true}'
      strategy="afterInteractive"
      onLoad={() => setIsLoaded(true)}
    />
  );
}
