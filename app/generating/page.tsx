"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "@/lib/order-context";

const phrases = [
  "Analyzing creativity...",
  "Understanding the character...",
  "Building in 3D...",
  "Adding textures and colors...",
  "Bringing dreams to life...",
  "Almost ready...",
];

export default function GeneratingPage() {
  const router = useRouter();
  const { order, update } = useOrder();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const taskIdRef = useRef<string | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!order.drawingPreview) {
      router.push("/upload");
      return;
    }
    startGeneration();
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Cycle through phrases
  useEffect(() => {
    const t = setInterval(() => {
      setPhraseIndex((i) => (i < phrases.length - 1 ? i + 1 : i));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  async function startGeneration() {
    try {
      setProgress(5);

      const res = await fetch("/api/generate-3d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: order.drawingPreview,
          styleId: order.styleId ?? "original",
          childName: order.childName,
        }),
      });

      if (!res.ok) throw new Error("Failed to start generation");

      const { taskId } = await res.json();
      taskIdRef.current = taskId;
      setProgress(15);

      // Start polling every 3 seconds
      pollingRef.current = setInterval(() => pollStatus(taskId), 3000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong starting the generation. Please try again.");
    }
  }

  async function pollStatus(taskId: string) {
    try {
      const res = await fetch(`/api/generation-status/${taskId}`);
      if (!res.ok) return;

      const data = await res.json();

      if (data.status === "success") {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setProgress(100);
        // Save the GLB URL and rendered preview into order state
        update({
          glbUrl: data.glbUrl,
          renderedImage: data.renderedImage,
        });
        setTimeout(() => router.push("/preview"), 800);
        return;
      }

      if (data.status === "failed") {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setError("Generation failed. Please try again.");
        return;
      }

      // Still processing — update progress
      const tripoProgress = data.progress ?? 50;
      // Map Tripo's 0-100 to our 15-95 range
      const mapped = 15 + (tripoProgress / 100) * 80;
      setProgress(Math.round(mapped));
    } catch (err) {
      console.error("Polling error:", err);
    }
  }

  if (error) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="text-5xl mb-6">😔</div>
        <h1 className="font-display text-3xl font-semibold text-navy mb-4">
          Something went wrong
        </h1>
        <p className="text-navy/60 mb-8">{error}</p>
        <button
          onClick={() => router.push("/packaging")}
          className="rounded-full bg-coral text-white font-bold px-8 py-4"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 lg:px-10 py-24 lg:py-32 flex flex-col items-center text-center">
      {/* Orbiting particles */}
      <div className="relative w-56 h-56 flex items-center justify-center mb-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3 + i * 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: ["#5BC8F2", "#FF6F61", "#FFD166"][i],
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -${60 + i * 20}px)`,
              }}
            />
          </motion.div>
        ))}

        {/* Pulsing core */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-light via-cloud to-sunshine/40 shadow-glow flex items-center justify-center z-10"
        >
          <span className="text-5xl">🪄</span>
        </motion.div>
      </div>

      {/* Phrase */}
      <div className="h-12 mt-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-display text-2xl sm:text-3xl font-semibold text-navy"
          >
            {phrases[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-full max-w-sm">
        <div className="h-2 rounded-full bg-mist overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky via-coral to-sunshine"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 text-sm font-semibold text-navy/40">{progress}%</p>
      </div>

      <p className="mt-6 text-sm text-navy/40 max-w-xs">
        Our AI is studying every line of the drawing and crafting something
        one-of-a-kind. This takes about 30–60 seconds.
      </p>
    </section>
  );
}
