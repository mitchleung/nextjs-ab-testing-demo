// components/exposure-tracker.tsx
"use client";
import { useEffect, useRef } from "react";

export function ExposureTracker({
  experiment,
  variant,
}: {
  experiment: string;
  variant: string;
}) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    navigator.sendBeacon(
      "/api/exposure",
      JSON.stringify({ experiment, variant, ts: Date.now() }),
    );
  }, [experiment, variant]);
  return null;
}
