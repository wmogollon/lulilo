"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";
import { productSizes, packagingOptions, transformationStyles } from "@/lib/mock-data";

export default function CheckoutPage() {
  const router = useRouter();
  const { order } = useOrder();

  const product = productSizes.find((p) => p.id === order.productId) ?? productSizes[1];
  const packaging = packagingOptions.find((p) => p.id === order.packagingId) ?? packagingOptions[0];
  const style = transformationStyles.find((s) => s.id === order.styleId);

  const subtotal = product.price + packaging.price;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={8} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          One step from forever
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          Review the details below. Nothing goes to production until you
          confirm.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-10">
        {/* Order summary */}
        <div className="rounded-4xl bg-white border border-navy/5 shadow-soft p-8 space-y-6">
          <h2 className="font-display text-xl font-semibold text-navy">Order summary</h2>

          <SummaryRow
            label="Product"
            value={`${product.name} (≈${product.heightCm}cm)`}
            price={product.price}
          />
          <SummaryRow
            label="Transformation"
            value={`${style?.emoji ?? ""} ${style?.name ?? "Original"}`}
          />
          <SummaryRow
            label="For"
            value={`${order.childName || "Your little artist"}${
              order.childAge ? `, age ${order.childAge}` : ""
            }`}
          />
          <SummaryRow
            label="Customization"
            value={`Color, ${order.base.replace("-", " ")} base${
              order.engravedName ? `, engraved “${order.engravedName}”` : ""
            }`}
          />
          <SummaryRow label="Packaging" value={packaging.name} price={packaging.price} />
          <SummaryRow label="Production time" value="7–10 business days" />
          <SummaryRow label="Shipping" value="Free, tracked" price={0} />

          <div className="pt-4 border-t border-navy/10 space-y-2">
            <div className="flex justify-between text-sm text-navy/60">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-navy/60">
              <span>Estimated tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-display text-xl font-bold text-navy pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment (mock) */}
        <div className="rounded-4xl bg-white border border-navy/5 shadow-soft p-8 space-y-5">
          <h2 className="font-display text-xl font-semibold text-navy">Payment details</h2>
          <p className="text-xs text-navy/40">
            This is a demo checkout — no real payment will be processed.
          </p>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Card number</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">CVC</label>
              <input
                type="text"
                placeholder="123"
                className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Shipping address</label>
            <input
              type="text"
              placeholder="123 Imagination Lane"
              className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none"
            />
          </div>

          <Button size="lg" className="w-full mt-2" onClick={() => router.push("/confirmation")}>
            Create This Memory — ${total.toFixed(2)}
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <Button variant="ghost" onClick={() => router.push("/preview")}>
          Back
        </Button>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  price,
}: {
  label: string;
  value: string;
  price?: number;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-navy/40 font-semibold">{label}</p>
        <p className="text-sm text-navy mt-0.5">{value}</p>
      </div>
      {price !== undefined && (
        <p className="text-sm font-semibold text-navy whitespace-nowrap">
          {price === 0 ? "Free" : `$${price.toFixed(2)}`}
        </p>
      )}
    </div>
  );
}
