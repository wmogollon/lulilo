import { productSizes } from "@/lib/mock-data";
import { LinkButton } from "@/components/ui/Button";
import { Check } from "lucide-react";

export default function PricingPreview() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">
            Pricing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
            A keepsake for every memory
          </h2>
          <p className="mt-4 text-navy/60">
            Every size includes AI generation, one free revision, and a
            certificate of creation signed with your child&apos;s name.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productSizes.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-4xl border p-8 flex flex-col card-lift ${
                p.popular
                  ? "border-coral bg-coral/[0.04] shadow-lift"
                  : "border-navy/10 bg-cloud shadow-soft"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-8 bg-coral text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most loved
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold text-navy">{p.name}</h3>
              <p className="text-navy/50 text-sm mt-1">≈ {p.heightCm} cm tall</p>
              <p className="mt-6 mb-2">
                <span className="font-display text-4xl font-bold text-navy">${p.price}</span>
                <span className="text-navy/40 text-sm"> starting</span>
              </p>
              <p className="text-sm text-navy/60 leading-relaxed mb-6">{p.description}</p>
              <ul className="space-y-2 mb-8 text-sm text-navy/70">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky" /> AI 3D generation
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky" /> Preview approval
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-sky" /> Certificate of creation
                </li>
              </ul>
              <LinkButton
                href="/upload"
                variant={p.popular ? "primary" : "secondary"}
                className="mt-auto w-full"
              >
                Choose {p.name}
              </LinkButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
