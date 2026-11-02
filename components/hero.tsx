// app/components/hero.tsx
import type { Variants } from "@/lib/get-variant";

const headlines: Record<Variants["headline"], string> = {
  short: "Ship faster.",
  benefit: "Ship faster and sleep better at night.",
};

const buttonStyles: Record<Variants["button"], string> = {
  green: "bg-green-600 text-white",
  blue: "bg-blue-600 text-white",
  black: "bg-black text-white",
};

type HeroImage = { src: string; alt: string };

// image sources as ALT text
const images: Record<Variants["image"], HeroImage> = {
  photo: {
    src: "/ab/hero/hero-photo.jpg",
    alt: "Source: https://unsplash.com/photos/woman-in-black-long-sleeve-shirt-covering-her-face-0v0IQY0_Wgw?utm_sourc",
  },
  illustration: {
    src: "/ab/hero/hero-illustration.svg",
    alt: "Source: https://www.linustock.com/vectors/life/action/lem00002",
  },
};

export function Hero({ v }: { v: Variants }) {
  const size =
    v.heroCta === "bold" ? "text-4xl py-6 px-10" : "text-2xl py-3 px-6";
  return (
    <section className="breakout grid grid-cols-3 items-center gap-5 lg:gap-10">
      <img
        src={images[v.image].src}
        alt={images[v.image].alt}
        className="row-span-full aspect-square w-full h-full object-cover"
      />
      <div className="col-span-2 flex flex-col h-full items-start justify-center gap-10">
        <h1
          className={`font-bold ${v.heroCta === "bold" ? "text-8xl" : "text-5xl"}`}
        >
          {headlines[v.headline]}
        </h1>
        <button className={`rounded ${size} ${buttonStyles[v.button]}`}>
          Get started
        </button>
      </div>
    </section>
  );
}
