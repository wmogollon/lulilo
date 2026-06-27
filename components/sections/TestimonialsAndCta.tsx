import { testimonials } from "@/lib/mock-data";
import { LinkButton } from "@/components/ui/Button";

export default function TestimonialsAndCta() {
  return (
    <>
      <section className="bg-mist py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">
              Real families, real memories
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
              The first time a drawing becomes something they can hold
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-4xl bg-white p-8 shadow-soft border border-navy/5 flex flex-col"
              >
                <blockquote className="font-display text-lg leading-relaxed text-navy italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-navy/50 font-semibold">
                  {t.name} · {t.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky/20 blur-3xl" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-coral/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-cloud leading-tight">
            Your child imagines it.
            <br />
            <span className="italic text-sunshine">We bring it to life.</span>
          </h2>
          <p className="mt-5 text-cloud/60 max-w-xl mx-auto">
            It takes less than five minutes to start. The memory lasts a
            lifetime.
          </p>
          <div className="mt-9">
            <LinkButton href="/upload" size="lg">
              Bring My Child&apos;s Drawing to Life
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
