"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Our Mission" },
  { href: "/faq", label: "FAQ" },
  { href: "/track-order", label: "Track Order" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-cloud/80 backdrop-blur-md border-b border-navy/5">
      <div className="mx-auto max-w-7xl h-full px-6 lg:px-10 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display text-2xl font-bold text-navy tracking-tight group-hover:text-coral transition-colors">
            LULILO
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy/40 font-semibold mt-0.5">
            Powered by OPSLY
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-navy/70 hover:text-navy transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/gift-cards"
            className="text-sm font-semibold text-navy/70 hover:text-navy transition-colors"
          >
            Gift Cards
          </Link>
          <Link
            href="/upload"
            className="rounded-full bg-coral text-white text-sm font-bold px-5 py-2.5 shadow-soft hover:bg-coral-deep hover:shadow-lift transition-all hover:-translate-y-0.5"
          >
            Bring a Drawing to Life
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2 text-navy"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-cloud border-b border-navy/5 shadow-soft px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-navy/80"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/gift-cards"
            onClick={() => setOpen(false)}
            className="text-base font-semibold text-navy/80"
          >
            Gift Cards
          </Link>
          <Link
            href="/upload"
            onClick={() => setOpen(false)}
            className="rounded-full bg-coral text-white text-center font-bold px-5 py-3 mt-2"
          >
            Bring a Drawing to Life
          </Link>
        </div>
      )}
    </header>
  );
}
