"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ease } from "@/lib/motion";
import { profile } from "@/lib/data";

/**
 * Full-bleed intro curtain that wipes upward on first paint.
 *
 * Shown once per browser session. The first visit earns the second of theatre;
 * the fifth reload in a row does not, and blocking scroll every single time
 * turns a flourish into an obstacle.
 *
 * Skipped entirely under reduced motion, and it releases the scroll lock as
 * soon as it exits so it can never trap the page.
 */
const SEEN_KEY = "gpw:intro-seen";

/** sessionStorage throws in some privacy modes — a decorative curtain is not
 *  worth an exception, so both accessors swallow failures. */
function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

const noopSubscribe = () => () => {};

export function IntroOverlay() {
  const reduce = useReducedMotion();

  // False on the server and on the first client render, so the markup matches
  // and hydration stays quiet. The curtain only appears once React has taken
  // over — which is also when it can actually animate.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  // Read once, at mount. Reading sessionStorage during render would flip to
  // "seen" the moment the effect marks it, yanking the curtain away mid-wipe.
  const [seenThisSession] = useState(() =>
    typeof window === "undefined" ? true : hasSeenIntro(),
  );

  const [dismissed, setDismissed] = useState(false);
  const visible = mounted && !reduce && !seenThisSession && !dismissed;

  // One effect owns the scroll lock. Two of them racing over the same inline
  // style meant an unlucky ordering could leave the page permanently locked.
  useEffect(() => {
    if (!visible) {
      document.body.style.removeProperty("overflow");
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    markIntroSeen();
    const timer = window.setTimeout(() => setDismissed(true), 1100);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[80] grid place-items-center bg-[var(--bg)]"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: ease.inOut }}
        >
          <m.span
            className="max-w-[14ch] px-6 text-center font-display text-[clamp(1.9rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-balance"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.35 } }}
            transition={{ duration: 0.55, ease: ease.out }}
          >
            {profile.name}
            <span className="text-[var(--accent-text)]">.</span>
          </m.span>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
