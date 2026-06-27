"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";
import { productSizes } from "@/lib/mock-data";

export default function ProductPage() {
  const router = useRouter();
  const { order, update } = useOrder();

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={4} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Choose the size of the memory
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          Every size is crafted with the same care — from a pocket-sized
          friend to a museum-quality centerpiece.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productSizes.map((p) => {
          const active = order.productId === p.id;
          // relative scale for the size silhouette, normalized against the largest
          const scale = 0.45 + (p.heightCm / 24) * 0.55;
          return (
            <button
              key={p.id}
              onClick={() => update({ productId: p.id })}
              className={clsx(
                "card-lift rounded-4xl border-2 p-6 bg-white text-left flex flex-col transition-colors",
                active ? "border-coral shadow-lift" : "border-navy/5 shadow-soft hover:border-sky"
              )}
            >
              {p.popular && (
                <span className="self-start mb-2 bg-sunshine text-navy text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Most loved
                </span>
              )}
              <div className="h-28 flex items-end justify-center mb-4">
                <div
                  style={{ height: `${scale * 100}%` }}
                  className="w-14 rounded-t-3xl rounded-b-md bg-gradient-to-b from-sky-light to-sky flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-navy/60">{p.heightCm}cm</span>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy">{p.name}</h3>
              <p className="font-display text-2xl font-bold text-navy mt-1">
                ${p.price}
                <span className="text-navy/40 text-xs font-body font-normal"> starting</span>
              </p>
              <p className="text-xs text-navy/50 mt-2 leading-relaxed">{p.description}</p>
              {active && (
                <span className="mt-3 text-xs font-bold text-coral">Selected ✓</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-between">
        <Button variant="ghost" onClick={() => router.push("/style")}>
          Back
        </Button>
        <Button size="lg" disabled={!order.productId} onClick={() => router.push("/packaging")}>
          Continue
        </Button>
      </div>
    </section>
  );
}
