"use client";

import { useSyncExternalStore } from "react";

/** MediaQueryList objects are cached — creating one per render is wasteful and
 *  breaks useSyncExternalStore's expectation of a cheap getSnapshot. */
const cache = new Map<string, MediaQueryList>();

function getList(query: string) {
  let list = cache.get(query);
  if (!list) {
    list = window.matchMedia(query);
    cache.set(query, list);
  }
  return list;
}

/**
 * Subscribes to a media query. Returns `serverFallback` during SSR and on the
 * first client render, so hydration always matches.
 */
export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const list = getList(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => getList(query).matches,
    () => serverFallback,
  );
}

/**
 * True only for a mouse or trackpad. Touch screens report `coarse`, so this is
 * the gate for anything hover-driven: tilt, magnetic cursor, hover scale.
 * Without it a tap on mobile fires pointermove, tilts the card, and never
 * fires pointerleave to undo it.
 */
export const useFinePointer = () => useMediaQuery("(pointer: fine)");

/** Desktop-width viewports, for effects too expensive to run on a phone. */
export const useWideViewport = () => useMediaQuery("(min-width: 768px)");
