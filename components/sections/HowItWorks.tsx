const steps = [
  {
    title: "Upload the drawing",
    description:
      "Snap a photo or upload any drawing — crayon, marker, or pencil all work.",
    icon: "🖍️",
  },
  {
    title: "AI brings it to life",
    description:
      "Our AI studies every line and color, then crafts a 3D character that feels true to the original.",
    icon: "✨",
  },
  {
    title: "Customize & approve",
    description:
      "Rotate, recolor, and personalize the preview. Nothing is made until you say yes.",
    icon: "🔄",
  },
  {
    title: "It arrives, forever",
    description:
      "Your collectible is hand-finished and shipped — a keepsake that lasts a lifetime.",
    icon: "🎁",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
            A simple journey to something that lasts forever
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="text-4xl mb-5">{step.icon}</div>
              <h3 className="font-display text-xl font-semibold text-navy mb-2">
                {step.title}
              </h3>
              <p className="text-navy/60 text-sm leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 -right-5 text-navy/15 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
