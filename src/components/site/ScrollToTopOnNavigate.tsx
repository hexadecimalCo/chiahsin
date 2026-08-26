"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

// `scroll-smooth` on <html> (for in-page anchor links) also animates Next's
// automatic scroll-to-top on route change, so a long scroll animation can
// leave the new page's title hidden under the sticky header for a moment.
// Force an instant reset on every pathname change instead — unless the new
// URL carries a hash, in which case jump straight to that section instead
// of resetting to top first.
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const hash = window.location.hash;
    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (target) {
      target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
