import Link from "next/link";

const columns = [
  {
    title: "Create",
    links: [
      { href: "/upload", label: "Start a Drawing" },
      { href: "/gallery", label: "Gallery" },
      { href: "/gift-cards", label: "Gift Cards" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/track-order", label: "Track Order" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our Mission" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-cloud mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div>
          <span className="font-display text-3xl font-bold tracking-tight">LULILO</span>
          <p className="text-cloud/50 text-xs uppercase tracking-[0.2em] font-semibold mt-1">
            Powered by OPSLY
          </p>
          <p className="mt-4 text-cloud/70 max-w-xs text-sm leading-relaxed">
            We don&apos;t make toys. We preserve childhood — turning your
            child&apos;s drawings into real, collectible keepsakes.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-cloud/90 mb-4 text-sm tracking-wide">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cloud/60 hover:text-sky text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cloud/10 mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cloud/40">
        <p>© {new Date().getFullYear()} LULILO, a product of OPSLY. All rights reserved.</p>
        <p className="font-display italic text-cloud/60">
          &ldquo;From little imaginations to lifelong memories.&rdquo;
        </p>
      </div>
    </footer>
  );
}
