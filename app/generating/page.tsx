"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "@/lib/order-context";

const phrases = [
  "Analyzing your drawing...",
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
  const [statusText, setStatusText] = useState("Starting...");
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!order.drawingPreview) {
      router.push("/upload");
      return;
    }
    if (!startedRef.current) {
      startedRef.current = true;
      startGeneration();
    }
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setPhraseIndex((i) => (i < phrases.length - 1 ? i + 1 : i));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Smoothly animate progress so it never looks stuck
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 88 ? p : p + 0.25));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  async function startGeneration() {
    try {
      setProgress(5);
      setStatusText("Analyzing your drawing with AI...");

      // Check for extra prompt from "Adjust description" in preview
      const extraPrompt = sessionStorage.getItem("lulilo_extra_prompt") ?? "";
      sessionStorage.removeItem("lulilo_extra_prompt");

      const res = await fetch("/api/generate-3d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: order.drawingPreview,
          styleId: order.styleId ?? "original",
          childName: order.childName,
          extraPrompt,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || data.error || "Failed to start generation");
      }

      const { taskId } = await res.json();
      setProgress(18);
      setStatusText("Building your 3D character...");

      pollingRef.current = setInterval(() => pollStatus(taskId), 4000);
    } catch (err) {
      console.error(err);
      setError(String(err));
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
        setStatusText("Your character is ready!");
        update({ glbUrl: data.glbUrl, renderedImage: data.renderedImage });
        setTimeout(() => router.push("/preview"), 900);
        return;
      }

      if (data.status === "failed") {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setError("The AI couldn't generate the model. Please try again.");
        return;
      }

      // Update progress from Tripo's real value
      if (data.progress && data.progress > 0) {
        const mapped = 18 + (data.progress / 100) * 72;
        setProgress((p) => Math.max(p, mapped));
      }

      setProgress((p) => {
        if (p < 30) setStatusText("Analyzing your drawing with AI...");
        else if (p < 55) setStatusText("Building the 3D shape...");
        else if (p < 75) setStatusText("Painting textures...");
        else setStatusText("Final touches...");
        return p;
      });

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
        <p className="text-navy/60 mb-8 max-w-md mx-auto">{error}</p>
        <button
          onClick={() => router.push("/packaging")}
          className="rounded-full bg-coral text-white font-bold px-8 py-4 hover:bg-coral-deep transition-colors"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 lg:px-10 py-24 lg:py-32 flex flex-col items-center text-center">
      <div className="relative w-56 h-56 flex items-center justify-center mb-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3 + i * 1.2, repeat: Infinity, ease: "linear" }}
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
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-light via-cloud to-sunshine/40 shadow-glow flex items-center justify-center z-10"
        >
          <span className="text-5xl">🪄</span>
        </motion.div>
      </div>

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

      <div className="mt-10 w-full max-w-sm">
        <div className="h-2.5 rounded-full bg-mist overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky via-coral to-sunshine"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-navy/40">
          <span>{statusText}</span>
          <span className="font-semibold">{Math.round(progress)}%</span>
        </div>
      </div>

      <p className="mt-8 text-sm text-navy/40 max-w-xs">
        Claude AI is reading the drawing and crafting a unique 3D character.
        This takes about 60–90 seconds. ✨
      </p>
    </section>
  );
}
