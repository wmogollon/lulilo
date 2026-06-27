import { LinkButton } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-24">
      <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3 text-center">
        Our mission
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy text-center">
        We don&apos;t make toys. We preserve childhood.
      </h1>

      <div className="mt-12 space-y-6 text-navy/70 leading-relaxed text-lg">
        <p>
          Every child fills the world with characters — dragons with
          backpacks, cats that drive cars, families of stick figures holding
          hands under a sun with a face. Most of those drawings end up in a
          drawer, then a recycling bin, then a memory that fades.
        </p>
        <p>
          LULILO exists to interrupt that. We built an AI that looks at a
          child&apos;s drawing the way a parent does — not as a flawed
          sketch, but as a complete idea, full of intention and joy. Then we
          turn that idea into something real: a collectible figure your
          family can hold, display, and pass down.
        </p>
        <p>
          We&apos;re powered by OPSLY, our manufacturing and fulfillment
          engine, which means every order is produced with the same care a
          small studio would give a single piece — just at a scale that lets
          every family take part.
        </p>
        <p>
          This isn&apos;t about 3D printing. It&apos;s about the moment, years
          from now, when your child picks up that figure and remembers
          exactly what they were imagining the day they drew it.
        </p>
      </div>

      <div className="mt-14 grid sm:grid-cols-3 gap-6">
        {[
          { stat: "100%", label: "Approved before production" },
          { stat: "7–10 days", label: "From approval to your door" },
          { stat: "1 family", label: "At the heart of every order" },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-mist p-6 text-center">
            <p className="font-display text-3xl font-bold text-navy">{item.stat}</p>
            <p className="text-sm text-navy/50 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <LinkButton href="/upload" size="lg">
          Start With a Drawing
        </LinkButton>
      </div>
    </section>
  );
}
