import { transformationStyles } from "@/lib/mock-data";
import { LinkButton } from "@/components/ui/Button";

export default function StyleShowcase() {
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">
              Choose a world
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
              Every drawing can become a hero, a friend, or an explorer
            </h2>
          </div>
          <LinkButton href="/upload" variant="secondary">
            Start with your drawing
          </LinkButton>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {transformationStyles.map((style) => (
            <div
              key={style.id}
              className={`card-lift rounded-4xl bg-gradient-to-br ${style.gradient} p-6 flex flex-col items-center text-center bg-white border border-navy/5 shadow-soft`}
            >
              <span className="text-4xl mb-3">{style.emoji}</span>
              <h3 className="font-display font-semibold text-navy">{style.name}</h3>
              <p className="text-xs text-navy/50 mt-1 leading-relaxed">
                {style.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
