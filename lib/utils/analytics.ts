"use client";

import { useEffect } from "react";

export type AnalyticsEventPayload = Record<string, unknown>;

export function trackEvent(
  name: string,
  payload: AnalyticsEventPayload = {},
): void {
  if (typeof window === "undefined") {
    return;
  }

  const entry = { name, payload, timestamp: Date.now() };

  if (
    Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)
  ) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(entry);
  } else {
    (window as unknown as { dataLayer?: unknown[] }).dataLayer = [entry];
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, payload);
  }
}

export function useAnalyticsEvent(
  name: string,
  payload: AnalyticsEventPayload,
  dependencies: unknown[] = [],
): void {
  useEffect(() => {
    trackEvent(name, payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
