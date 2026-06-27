"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import clsx from "clsx";

const milestones = [
  { label: "Order received", done: true },
  { label: "AI design approved", done: true },
  { label: "In production at OPSLY", done: true },
  { label: "Quality check & finishing", done: false },
  { label: "Shipped", done: false },
  { label: "Delivered", done: false },
];

export default function TrackOrderPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-2xl px-6 lg:px-10 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">
          Track your order
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Where&apos;s the memory?
        </h1>
      </div>

      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mt-10 rounded-4xl bg-white border border-navy/5 shadow-soft p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Order number</label>
            <input
              type="text"
              placeholder="LU-482913"
              required
              className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border border-navy/10 bg-cloud px-4 py-3 text-sm focus:border-sky outline-none"
            />
          </div>
          <Button size="lg" className="w-full" type="submit">
            Track Order
          </Button>
        </form>
      ) : (
        <div className="mt-10 rounded-4xl bg-white border border-navy/5 shadow-soft p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-navy/40 font-semibold">
            Order LU-482913
          </p>
          <p className="font-display text-2xl font-semibold text-navy mt-1">
            Currently in production
          </p>
          <p className="text-sm text-navy/50 mt-1">Estimated delivery in 4 days</p>

          <div className="mt-8 space-y-4">
            {milestones.map((m, i) => (
              <div key={m.label} className="flex items-center gap-4">
                <div
                  className={clsx(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                    m.done ? "bg-sky text-white" : "bg-mist text-navy/30"
                  )}
                >
                  {m.done ? <Check size={14} /> : <span className="text-xs">{i + 1}</span>}
                </div>
                <p className={clsx("text-sm font-semibold", m.done ? "text-navy" : "text-navy/40")}>
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
