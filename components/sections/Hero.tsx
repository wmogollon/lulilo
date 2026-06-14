"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cloud">
      {/* ambient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-light/50 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-sunshine/30 blur-3xl animate-float" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-coral font-bold text-sm uppercase tracking-[0.25em] mb-5"
          >
            Powered by OPSLY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.05] font-semibold text-navy"
          >
            From little
            <br />
            imaginations to{" "}
            <span className="relative italic text-coral underline-scribble">
              lifelong
            </span>{" "}
            memories.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-navy/60 max-w-md leading-relaxed"
          >
            Your child imagines it. We bring it to life. Upload any drawing
            and our AI crafts a beautiful, real, collectible figure — made to
            be held, displayed, and treasured for decades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <LinkButton href="/upload" size="lg">
              Bring My Child&apos;s Drawing to Life
            </LinkButton>
            <LinkButton href="/gallery" size="lg" variant="ghost">
              See What Other Families Made →
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex items-center gap-8 text-sm text-navy/50"
          >
            <div>
              <p className="font-display text-2xl font-bold text-navy">7–10 days</p>
              <p>Crafted &amp; shipped</p>
            </div>
            <div className="w-px h-10 bg-navy/10" />
            <div>
              <p className="font-display text-2xl font-bold text-navy">100%</p>
              <p>Approved before production</p>
            </div>
            <div className="w-px h-10 bg-navy/10" />
            <div>
              <p className="font-display text-2xl font-bold text-navy">For ages</p>
              <p>3–10 &amp; beyond</p>
            </div>
          </motion.div>
        </div>

        <DrawingToToyMorph />
      </div>
    </section>
  );
}

/**
 * Signature element: a hand-drawn scribble line-draws itself,
 * then morphs/cross-dissolves into a rendered "toy" version
 * of the same shape — visualizing the product's core promise.
 */
function DrawingToToyMorph() {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square">
      {/* Soft card frame */}
      <div className="absolute inset-0 rounded-5xl bg-white shadow-lift border border-navy/5" />

      {/* Paper / sketch layer */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 6, times: [0, 0.55, 1], repeat: Infinity, repeatDelay: 1.5 }}
        className="absolute inset-6 rounded-4xl bg-mist flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-3/4 h-3/4" fill="none">
          <motion.path
            d="M60 150 C40 110, 50 60, 100 50 C150 60, 160 110, 140 150 C120 175, 80 175, 60 150 Z
               M85 90 a5 5 0 1 0 0.1 0 M115 90 a5 5 0 1 0 0.1 0
               M85 120 Q100 135 115 120
               M40 70 C30 50, 35 35, 55 35
               M160 70 C170 50, 165 35, 145 35"
            stroke="#0A1F44"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0.7 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5.3 }}
          />
        </svg>
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-navy/40 uppercase tracking-[0.2em]">
          A child&apos;s drawing
        </span>
      </motion.div>

      {/* "Toy" rendered layer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: [0, 0, 1, 1], scale: [0.92, 0.92, 1, 1] }}
        transition={{ duration: 6, times: [0, 0.55, 0.75, 1], repeat: Infinity, repeatDelay: 1.5 }}
        className="absolute inset-6 rounded-4xl bg-gradient-to-br from-sky-light via-cloud to-sunshine/30 flex items-center justify-center"
      >
        <div className="relative w-3/4 h-3/4 flex items-center justify-center">
          <div className="absolute bottom-4 w-40 h-6 rounded-full bg-navy/10 blur-sm" />
          <ToyCharacter />
        </div>
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-coral uppercase tracking-[0.2em]">
          Your real collectible
        </span>
      </motion.div>
    </div>
  );
}

function ToyCharacter() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE3B0" />
          <stop offset="100%" stopColor="#FFD166" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="120" rx="48" ry="50" fill="url(#bodyGrad)" stroke="#0A1F44" strokeWidth="3" />
      <circle cx="85" cy="105" r="5" fill="#0A1F44" />
      <circle cx="115" cy="105" r="5" fill="#0A1F44" />
      <path d="M85 130 Q100 145 115 130" stroke="#0A1F44" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M52 90 C40 75, 45 55, 65 55" stroke="#FF6F61" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M148 90 C160 75, 155 55, 135 55" stroke="#5BC8F2" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="65" cy="55" r="6" fill="#FF6F61" />
      <circle cx="135" cy="55" r="6" fill="#5BC8F2" />
    </svg>
  );
}
