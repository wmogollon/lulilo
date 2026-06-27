"use client";

import clsx from "clsx";

const steps = [
  { id: 1, label: "Upload", href: "/upload" },
  { id: 2, label: "Details", href: "/customize" },
  { id: 3, label: "Style", href: "/style" },
  { id: 4, label: "Product", href: "/product" },
  { id: 5, label: "Packaging", href: "/packaging" },
  { id: 6, label: "Reveal", href: "/generating" },
  { id: 7, label: "Preview", href: "/preview" },
  { id: 8, label: "Checkout", href: "/checkout" },
];

export default function FlowProgress({ current }: { current: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-2">
        {steps.map((step) => (
          <span
            key={step.id}
            className={clsx(
              "step-dot",
              step.id === current && "active",
              step.id < current && "done"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy/40">
        Step {current} of {steps.length} · {steps[current - 1]?.label}
      </p>
    </div>
  );
}

export { steps as flowSteps };
