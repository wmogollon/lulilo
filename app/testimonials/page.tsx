import { testimonials } from "@/lib/mock-data";
import { LinkButton } from "@/components/ui/Button";

const extended = [
  ...testimonials,
  {
    quote:
      "I cried opening the box. Seeing my daughter's imaginary friend standing there in real life was something I'll never forget.",
    name: "Carla S.",
    location: "Denver, CO",
  },
  {
    quote:
      "The Mini fits perfectly in his backpack. He takes 'tiny me' everywhere now.",
    name: "Tomás R.",
    location: "Miami, FL",
  },
  {
    quote:
      "We send these as baby shower gifts now — a drawing from an older sibling becomes the new baby's first toy.",
    name: "Aaliyah K.",
    location: "Chicago, IL",
  },
];

export default function TestimonialsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">
          Testimonials
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Stories from families like yours
        </h1>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {extended.map((t) => (
          <figure key={t.name} className="rounded-4xl bg-white p-8 shadow-soft border border-navy/5 flex flex-col">
            <blockquote className="font-display text-lg leading-relaxed text-navy italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-navy/50 font-semibold">
              {t.name} · {t.location}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 text-center">
        <LinkButton href="/upload" size="lg">
          Start Your Story
        </LinkButton>
      </div>
    </section>
  );
}
