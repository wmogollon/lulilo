"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";
import { packagingOptions } from "@/lib/mock-data";
import { Gift, Package, Sparkles } from "lucide-react";

const icons: Record<string, JSX.Element> = {
  standard: <Package size={28} />,
  gift: <Gift size={28} />,
  luxury: <Sparkles size={28} />,
};

export default function PackagingPage() {
  const router = useRouter();
  const { order, update } = useOrder();

  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={5} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          How should it arrive?
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          The unboxing is part of the memory. Choose the presentation that
          fits the occasion.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        {packagingOptions.map((pkg) => {
          const active = order.packagingId === pkg.id;
          return (
            <button
              key={pkg.id}
              onClick={() => update({ packagingId: pkg.id })}
              className={clsx(
                "card-lift rounded-4xl border-2 p-8 bg-white text-left flex flex-col items-start transition-colors",
                active ? "border-coral shadow-lift" : "border-navy/5 shadow-soft hover:border-sky"
              )}
            >
              <div
                className={clsx(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-5",
                  pkg.id === "standard" && "bg-mist text-navy",
                  pkg.id === "gift" && "bg-sky-light text-navy",
                  pkg.id === "luxury" && "bg-sunshine/40 text-navy"
                )}
              >
                {icons[pkg.id]}
              </div>
              <h3 className="font-display text-xl font-semibold text-navy">{pkg.name}</h3>
              <p className="text-sm text-navy/50 mt-2 leading-relaxed">{pkg.description}</p>
              <p className="font-display font-bold text-navy mt-4">
                {pkg.price === 0 ? "Included" : `+ $${pkg.price}`}
              </p>
              {active && (
                <span className="mt-3 text-xs font-bold text-coral">Selected ✓</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-between">
        <Button variant="ghost" onClick={() => router.push("/product")}>
          Back
        </Button>
        <Button size="lg" disabled={!order.packagingId} onClick={() => router.push("/generating")}>
          Bring it to life
        </Button>
      </div>
    </section>
  );
}
