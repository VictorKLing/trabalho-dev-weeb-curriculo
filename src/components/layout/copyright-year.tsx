"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getBuildYear() {
  return 2026;
}

export function CopyrightYear() {
  return useSyncExternalStore(subscribe, getCurrentYear, getBuildYear);
}
