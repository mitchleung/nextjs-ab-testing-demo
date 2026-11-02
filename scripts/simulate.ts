// scripts/simulate.ts
import { experiments, type ExperimentKey } from "../lib/experiments";
import { assign } from "../lib/assign";

const N = 10_000;

for (const key of Object.keys(experiments) as ExperimentKey[]) {
  const exp = experiments[key];
  const counts: Record<string, number> = {};

  for (let i = 0; i < N; i++) {
    const v = assign(exp, crypto.randomUUID());
    counts[v] = (counts[v] ?? 0) + 1;
  }

  console.log(`\n${key} (${exp.id})`);
  for (const [name, n] of Object.entries(counts)) {
    console.log(
      `  ${name.padEnd(14)} ${String(n).padStart(6)}  ${((n / N) * 100).toFixed(1)}%`,
    );
  }
}
