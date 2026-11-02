import { headers } from "next/headers";
import { experiments, type ExperimentKey, type VariantOf } from "./experiments";

export type Variants = { [K in ExperimentKey]: VariantOf<K> };

export async function getVariants(): Promise<Variants> {
  const h = await headers();
  const out: Record<string, string> = {};

  for (const key of Object.keys(experiments) as ExperimentKey[]) {
    const names: readonly string[] = experiments[key].variants.map(
      (v) => v.name,
    );
    const raw = h.get(`x-exp-${key}`);
    // Validate the header, fall back to the first variant (control)
    out[key] = raw && names.includes(raw) ? raw : names[0];
  }
  return out as Variants;
}

// Optional: keep the single lookup for places that need only one
export async function getVariant<K extends ExperimentKey>(key: K) {
  return (await getVariants())[key];
}
