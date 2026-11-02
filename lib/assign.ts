// lib/assign.ts
import type { Experiment } from "./experiments";

function hash01(input: string): number {
  let h = 2166136261; // FNV-1a
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296; // [0, 1)
}

export function assign<N extends string>(
  exp: Experiment<N>,
  visitorId: string,
): N {
  const total = exp.variants.reduce((s, v) => s + v.weight, 0);
  let point = hash01(`${exp.id}:${visitorId}`) * total;
  for (const v of exp.variants) {
    if (point < v.weight) return v.name;
    point -= v.weight;
  }
  return exp.variants[exp.variants.length - 1].name;
}
