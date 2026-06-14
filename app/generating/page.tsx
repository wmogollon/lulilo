"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Analyzing creativity...",
  "Building imagination...",
  "Bringing dreams to life...",
  "Almost ready...",
];

export default function GeneratingPage() {
  const router = useRouter();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setPhraseIndex((i) => Math.min(i + 1, phrases.length - 1));
    }, 1500);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / 60, 100));
    }, 100);

    const redirect = setTimeout(() => {
      router.push("/preview");
    }, 6200);

    return () => {
      clearInterval(phraseTimer);
      clearInterval(progressTimer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <section className="mx-auto max-w-2xl px-6 lg:px-10 py-24 lg:py-32 flex flex-col items-center text-center">
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* orbiting particles */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: ["#5BC8F2", "#FF6F61", "#FFD166"][i],
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="block w-3 h-3 rounded-full"
              style={{
                background: ["#5BC8F2", "#FF6F61", "#FFD166"][i],
                transform: `translateX(${80 + i * 18}px)`,
              }}
            />
          </motion.span>
        ))}

        {/* pulsing core */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-light via-cloud to-sunshine/40 shadow-glow flex items-center justify-center"
        >
          <span className="text-5xl">🪄</span>
        </motion.div>
      </div>

      <div className="mt-10 h-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl sm:text-3xl font-semibold text-navy"
          >
            {phrases[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 w-full max-w-sm h-2 rounded-full bg-mist overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky via-coral to-sunshine"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-6 text-sm text-navy/40">
        This usually takes just a moment — we&apos;re crafting something
        one-of-a-kind.
      </p>
    </section>
  );
}
