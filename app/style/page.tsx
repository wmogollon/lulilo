"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";
import { transformationStyles } from "@/lib/mock-data";

export default function StylePage() {
  const router = useRouter();
  const { order, update } = useOrder();

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={3} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Choose the world for this character
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          The same drawing can become anything. Pick the transformation that
          feels most like your child&apos;s story.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {transformationStyles.map((style) => {
          const active = order.styleId === style.id;
          return (
            <button
              key={style.id}
              onClick={() => update({ styleId: style.id })}
              className={clsx(
                "card-lift rounded-4xl border-2 p-6 text-left bg-white transition-colors",
                active ? "border-coral shadow-lift" : "border-navy/5 shadow-soft hover:border-sky"
              )}
            >
              <span className="text-4xl">{style.emoji}</span>
              <h3 className="font-display font-semibold text-navy mt-3">{style.name}</h3>
              <p className="text-xs text-navy/50 mt-1 leading-relaxed">{style.description}</p>
              {active && (
                <span className="mt-3 inline-block text-xs font-bold text-coral">
                  Selected ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-between">
        <Button variant="ghost" onClick={() => router.push("/customize")}>
          Back
        </Button>
        <Button size="lg" disabled={!order.styleId} onClick={() => router.push("/product")}>
          Continue
        </Button>
      </div>
    </section>
  );
}
