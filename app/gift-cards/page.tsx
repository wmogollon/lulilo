"use client";

import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

const amounts = [25, 50, 100, 150];

export default function GiftCardsPage() {
  const [amount, setAmount] = useState(50);

  return (
    <section className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">
          Gift cards
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Give the gift of a lifelong memory
        </h1>
        <p className="mt-4 text-navy/60">
          Perfect for birthdays, baby showers, holidays, or just because. The
          recipient chooses the drawing and the style.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div className="rounded-5xl bg-gradient-to-br from-navy to-navy-soft text-cloud p-10 shadow-lift aspect-[16/10] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-bold">LULILO</span>
            <span className="text-xs uppercase tracking-[0.2em] text-cloud/50">Gift Card</span>
          </div>
          <div>
            <p className="font-display text-5xl font-bold">${amount}</p>
            <p className="text-cloud/50 text-sm mt-2">
              Redeemable toward any LULILO keepsake.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-navy mb-3">Choose an amount</h3>
            <div className="grid grid-cols-2 gap-3">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={clsx(
                    "rounded-2xl border-2 py-3 font-bold transition-colors",
                    amount === a
                      ? "border-coral bg-coral/5 text-navy"
                      : "border-navy/10 bg-white text-navy/70 hover:border-sky"
                  )}
                >
                  ${a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Recipient&apos;s email
            </label>
            <input
              type="email"
              placeholder="grandma@example.com"
              className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-sm focus:border-sky outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Personal message (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Can't wait to see what you create!"
              className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-sm focus:border-sky outline-none resize-none"
            />
          </div>

          <Button size="lg" className="w-full">
            Send Gift Card — ${amount}
          </Button>
        </div>
      </div>
    </section>
  );
}
