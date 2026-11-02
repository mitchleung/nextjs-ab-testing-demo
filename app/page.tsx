import { Suspense } from "react";
import { getVariants } from "@/lib/get-variant";
import { experiments, type ExperimentKey } from "@/lib/experiments";
import { ExposureTracker } from "@/components/exposure-tracker";
import { VariantSwitcher } from "@/components/variant-switcher";
import { Hero } from "@/components/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A/B Testing in Next.js",
};

async function Experience() {
  const v = await getVariants();

  return (
    <>
      {(Object.keys(v) as ExperimentKey[]).map((key) => (
        <ExposureTracker
          key={key}
          experiment={experiments[key].id}
          variant={v[key]}
        />
      ))}
      <Hero v={v} />
      <VariantSwitcher current={v} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
      <Experience />
    </Suspense>
  );
}
