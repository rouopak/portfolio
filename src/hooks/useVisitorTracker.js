import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to track unique page visits with session-level deduplication.
 * Avoids duplicate records caused by React 19 strict-mode or rapid re-renders.
 */
export function useVisitorTracker() {
  const location = useLocation();
  const lastLoggedPath = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;

    // Do not track visits on the admin analytics page itself
    if (currentPath.startsWith("/admin")) {
      return;
    }

    // Prevent immediate duplicate log on same path within the same component mount
    if (lastLoggedPath.current === currentPath) {
      return;
    }
    lastLoggedPath.current = currentPath;

    // Generate or retrieve unique session ID stored in sessionStorage (persists across page navigations in tab)
    let sessionId = "";
    try {
      sessionId = sessionStorage.getItem("portfolio_vid");
      if (!sessionId) {
        sessionId = "s_" + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
        sessionStorage.setItem("portfolio_vid", sessionId);
      }
    } catch {
      // Fallback if sessionStorage is disabled or restricted
      sessionId = "guest_" + Date.now();
    }

    const payload = JSON.stringify({
      page: currentPath,
      referrer: document.referrer || "",
      sessionId: sessionId,
    });

    // Use sendBeacon if available, fallback to fetch with keepalive
    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        const success = navigator.sendBeacon("/api/track", blob);
        if (!success) {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Silently catch network or tracking errors so user experience is never degraded
    }
  }, [location.pathname]);
}
