"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

// The path the visitor asked for, for the 404 terminal. The 404 page can be
// served as prerendered HTML for any URL, so the server and the first client
// render both print a generic path; the real one appears once hydrated,
// which keeps hydration from ever seeing a mismatch.
export function MissingPath() {
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  return <>{hydrated && pathname ? pathname : "/requested-page"}</>;
}
