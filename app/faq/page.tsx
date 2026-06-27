"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { faqs } from "@/lib/mock-data";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 lg:px-10 py-16 lg:py-24">
      <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3 text-center">
        Questions
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy text-center">
        Frequently asked questions
      </h1>

      <div className="mt-12 space-y-3">
        {faqs.map((item, i) => (
          <div key={item.q} className="rounded-3xl bg-white border border-navy/5 shadow-soft overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open === i}
            >
              <span className="font-display font-semibold text-navy">{item.q}</span>
              <ChevronDown
                className={clsx(
                  "shrink-0 text-navy/40 transition-transform",
                  open === i && "rotate-180"
                )}
                size={20}
              />
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-sm text-navy/60 leading-relaxed">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
