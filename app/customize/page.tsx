"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";

export default function CustomizePage() {
  const router = useRouter();
  const { order, update } = useOrder();

  return (
    <section className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={2} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Tell us about the little artist
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          This helps us personalize the keepsake — and we&apos;ll add it to
          the certificate of creation.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        {order.drawingPreview && (
          <div className="rounded-4xl bg-white border border-navy/5 shadow-soft p-6 flex items-center justify-center">
            <img
              src={order.drawingPreview}
              alt="Uploaded drawing"
              className="max-h-72 rounded-2xl object-contain"
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="childName" className="block text-sm font-semibold text-navy mb-2">
              Child&apos;s name
            </label>
            <input
              id="childName"
              type="text"
              value={order.childName}
              onChange={(e) => update({ childName: e.target.value })}
              placeholder="e.g. Mia"
              className="w-full rounded-2xl border border-navy/10 bg-white px-5 py-3.5 text-navy placeholder:text-navy/30 focus:border-sky outline-none"
            />
          </div>

          <div>
            <label htmlFor="childAge" className="block text-sm font-semibold text-navy mb-2">
              Age
            </label>
            <select
              id="childAge"
              value={order.childAge}
              onChange={(e) => update({ childAge: e.target.value })}
              className="w-full rounded-2xl border border-navy/10 bg-white px-5 py-3.5 text-navy focus:border-sky outline-none"
            >
              <option value="">Select age</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((age) => (
                <option key={age} value={age}>
                  {age} years old
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
              A message for the future (optional)
            </label>
            <textarea
              id="message"
              value={order.message}
              onChange={(e) => update({ message: e.target.value })}
              placeholder="e.g. To my future self — this is what I dreamed about at age 5."
              rows={4}
              className="w-full rounded-2xl border border-navy/10 bg-white px-5 py-3.5 text-navy placeholder:text-navy/30 focus:border-sky outline-none resize-none"
            />
            <p className="mt-2 text-xs text-navy/40">
              We&apos;ll include this on a printed card with your keepsake.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <Button variant="ghost" onClick={() => router.push("/upload")}>
          Back
        </Button>
        <Button size="lg" onClick={() => router.push("/style")}>
          Continue
        </Button>
      </div>
    </section>
  );
}
