// components/variant-switcher.tsx
import Link from "next/link";
import { experiments } from "@/lib/experiments";

export function VariantSwitcher({
  current,
}: {
  current: Record<string, string>;
}) {
  return (
    <div className="fixed bottom-4 right-4 rounded-lg bg-black/85 p-3 text-xs text-white shadow-lg space-y-3">
      {Object.entries(experiments).map(([key, exp]) => (
        <div key={key} className="space-y-1">
          <div className="font-semibold">{key}</div>
          <div className="flex gap-1">
            {exp.variants.map((v) => (
              <Link
                key={v.name}
                href={`/?exp_${key}=${v.name}`}
                className={`rounded px-2 py-1 ${
                  current[key] === v.name
                    ? "bg-white text-black"
                    : "bg-white/20"
                }`}
              >
                {v.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <Link href="/?reset=1" className="underline">
        reset
      </Link>
    </div>
  );
}
