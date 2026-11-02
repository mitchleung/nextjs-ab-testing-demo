import { NextRequest, NextResponse } from "next/server";
import { experiments, type ExperimentKey } from "./experiments";
import { assign } from "./assign";

/** Checks if a forced variant value is valid for the given experiment. */
function isForcedVariant(
  exp: { variants: readonly { name: string }[] },
  forced: string | null,
): boolean {
  return forced !== null && exp.variants.some((v) => v.name === forced);
}

/** Computes the variant for a single experiment. */
function computeVariant<K extends ExperimentKey>(
  key: K,
  exp: (typeof experiments)[K],
  vid: string,
  req: NextRequest,
): string {
  const forced = req.nextUrl.searchParams.get(`exp_${key}`);
  if (isForcedVariant(exp, forced)) {
    return forced!;
  }
  const cookieValue = req.cookies.get(`exp_${key}`)?.value;
  return cookieValue ?? assign(exp, vid);
}

/**
 * Processes all experiments for a request.
 * Returns headers to set and overrides to track for cookie setting.
 */
export function processExperiments(
  vid: string,
  req: NextRequest,
): { headers: Headers; overrides: Record<string, string> } {
  const headers = new Headers(req.headers);
  const overrides: Record<string, string> = {};

  for (const [key, exp] of Object.entries(experiments) as [ExperimentKey, (typeof experiments)[ExperimentKey]][]) {
    const variant = computeVariant(key, exp, vid, req);
    const forced = req.nextUrl.searchParams.get(`exp_${key}`);
    if (isForcedVariant(exp, forced)) {
      overrides[`exp_${key}`] = forced!;
    }
    headers.set(`x-exp-${key}`, variant);
  }

  return { headers, overrides };
}

/** Sets experiment-related cookies on the response. */
export function setExperimentCookies(
  res: NextResponse,
  vid: string,
  isNew: boolean,
  overrides: Record<string, string>,
): void {
  if (isNew) {
    res.cookies.set("vid", vid, {
      maxAge: 31536000,
      path: "/",
      sameSite: "lax",
    });
  }
  for (const [name, value] of Object.entries(overrides)) {
    res.cookies.set(name, value, { path: "/", sameSite: "lax" });
  }
}

/** Clears experiment cookies if reset parameter is present. */
export function handleReset(req: NextRequest, res: NextResponse): void {
  if (req.nextUrl.searchParams.get("reset")) {
    for (const key of Object.keys(experiments)) {
      res.cookies.delete(`exp_${key}`);
    }
  }
}