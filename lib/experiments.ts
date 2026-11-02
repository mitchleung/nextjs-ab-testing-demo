// lib/experiments.ts
export type Variant<N extends string = string> = { name: N; weight: number };

export type Experiment<N extends string = string> = {
  id: string; // changing this reshuffles users, so bump it deliberately
  variants: readonly Variant<N>[];
};

export const experiments = {
  heroCta: {
    id: "hero_cta_v1",
    variants: [
      { name: "control", weight: 50 },
      { name: "bold", weight: 50 },
    ],
  },
  headline: {
    id: "pm_headline_v1",
    variants: [
      { name: "short", weight: 50 },
      { name: "benefit", weight: 50 },
    ],
  },
  image: {
    id: "pm_image_v1",
    variants: [
      { name: "photo", weight: 50 },
      { name: "illustration", weight: 50 },
    ],
  },
  button: {
    id: "pm_button_v1",
    variants: [
      { name: "green", weight: 34 },
      { name: "blue", weight: 33 },
      { name: "black", weight: 33 },
    ],
  },
} as const satisfies Record<string, Experiment>;

export type ExperimentKey = keyof typeof experiments;
export type VariantOf<K extends ExperimentKey> =
  (typeof experiments)[K]["variants"][number]["name"];
