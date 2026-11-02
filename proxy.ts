// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { processExperiments, setExperimentCookies, handleReset } from "@/lib/ab-testing-util";

export function proxy(req: NextRequest) {
  // 1. Determine visitor identity
  let vid = req.cookies.get("vid")?.value;
  const isNew = !vid;
  vid ??= crypto.randomUUID();

  // 2. Process all experiments
  const { headers, overrides } = processExperiments(vid, req);

  // 3. Build response with modified headers
  const res = NextResponse.next({ request: { headers } });

  // 4. Set cookies and handle reset
  setExperimentCookies(res, vid, isNew, overrides);
  handleReset(req, res);

  return res;
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
