import { transformationStyles } from "@/lib/mock-data";
import { LinkButton } from "@/components/ui/Button";

const galleryItems = [
  { style: "superhero", title: "Captain Mia, age 6", color: "from-coral/20 to-sunshine/20" },
  { style: "fantasy", title: "Drago the Friendly Dragon, age 4", color: "from-sky/20 to-coral/10" },
  { style: "animal", title: "Bumble the Bear, age 3", color: "from-sky-light to-sunshine/20" },
  { style: "space", title: "Astro Theo, age 7", color: "from-navy/10 to-sky/20" },
  { style: "princess", title: "Queen Aria, age 5", color: "from-coral/15 to-sunshine/25" },
  { style: "pirate", title: "Captain Jonas, age 8", color: "from-navy/10 to-coral/10" },
  { style: "cartoon", title: "Wiggles, age 4", color: "from-sunshine/30 to-sky-light/40" },
  { style: "original", title: "Family Portrait, age 6", color: "from-sky-light to-cloud" },
];

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-3">Gallery</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Imaginations, brought to life
        </h1>
        <p className="mt-4 text-navy/60">
          A few of the keepsakes families have created so far.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {galleryItems.map((item) => {
          const style = transformationStyles.find((s) => s.id === item.style);
          return (
            <div key={item.title} className="card-lift rounded-4xl overflow-hidden border border-navy/5 shadow-soft bg-white">
              <div className={`aspect-square bg-gradient-to-br ${item.color} flex items-center justify-center text-5xl`}>
                {style?.emoji}
              </div>
              <div className="p-4">
                <p className="font-display font-semibold text-navy text-sm">{item.title}</p>
                <p className="text-xs text-navy/40 mt-1">{style?.name} edition</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <LinkButton href="/upload" size="lg">
          Create Yours
        </LinkButton>
      </div>
    </section>
  );
}
