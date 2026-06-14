"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";
import { colorOptions, baseOptions, transformationStyles } from "@/lib/mock-data";

export default function PreviewPage() {
  const router = useRouter();
  const { order, update } = useOrder();
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const style = transformationStyles.find((s) => s.id === order.styleId);

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={7} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Say hello to {order.childName || "your character"}
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          Rotate, zoom, and personalize before this becomes something real.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-10">
        {/* Viewer */}
        <div className="rounded-5xl bg-gradient-to-br from-sky-light via-cloud to-sunshine/30 border border-navy/5 shadow-lift p-8 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
          <div className="absolute top-6 left-6 bg-white/70 backdrop-blur rounded-full px-4 py-1.5 text-xs font-bold text-navy/60">
            {style?.emoji} {style?.name} edition
          </div>

          <motion.div
            style={{ scale: zoom, rotate: rotation }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
            className="relative"
          >
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-navy/10 blur-md" />
            <FigureSVG color={order.color} base={order.base} />
          </motion.div>

          {order.engravedName && (
            <p className="mt-4 font-display italic text-navy/70">
              &ldquo;{order.engravedName}&rdquo;
              {order.engravedDate && <span className="text-navy/40"> · {order.engravedDate}</span>}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => setRotation((r) => r - 45)}
              className="p-3 rounded-full bg-white shadow-soft hover:bg-sky-light transition-colors"
              aria-label="Rotate left"
            >
              <RotateCw className="-scale-x-100" size={18} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
              className="p-3 rounded-full bg-white shadow-soft hover:bg-sky-light transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
              className="p-3 rounded-full bg-white shadow-soft hover:bg-sky-light transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={() => setRotation((r) => r + 45)}
              className="p-3 rounded-full bg-white shadow-soft hover:bg-sky-light transition-colors"
              aria-label="Rotate right"
            >
              <RotateCw size={18} />
            </button>
          </div>
        </div>

        {/* Customization panel */}
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-navy mb-3">Color</h3>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => update({ color: c.value })}
                  aria-label={c.name}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                    order.color === c.value ? "border-navy scale-110" : "border-white"
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-navy mb-3">Base</h3>
            <div className="flex flex-col gap-2">
              {baseOptions.map((b) => (
                <button
                  key={b.id}
                  onClick={() => update({ base: b.id })}
                  className={`text-left rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    order.base === b.id
                      ? "border-coral bg-coral/5 text-navy"
                      : "border-navy/10 bg-white text-navy/70 hover:border-sky"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-navy mb-3">Engraving</h3>
            <input
              type="text"
              value={order.engravedName}
              onChange={(e) => update({ engravedName: e.target.value })}
              placeholder="Name to engrave"
              className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-sm mb-3 focus:border-sky outline-none"
            />
            <input
              type="date"
              value={order.engravedDate}
              onChange={(e) => update({ engravedDate: e.target.value })}
              className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-sm focus:border-sky outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <Button variant="ghost" onClick={() => router.push("/packaging")}>
          Back
        </Button>
        <Button size="lg" onClick={() => router.push("/checkout")}>
          Approve &amp; Continue
        </Button>
      </div>
    </section>
  );
}

function FigureSVG({ color, base }: { color: string; base: string }) {
  return (
    <svg viewBox="0 0 240 260" className="w-64 h-64 drop-shadow-2xl">
      {base === "round" && <ellipse cx="120" cy="235" rx="70" ry="14" fill="#0A1F44" opacity="0.08" />}
      {base === "cloud" && (
        <g opacity="0.9">
          <ellipse cx="100" cy="232" rx="38" ry="16" fill="#FFFFFF" />
          <ellipse cx="140" cy="228" rx="46" ry="18" fill="#FFFFFF" />
        </g>
      )}
      {base === "name-plaque" && (
        <rect x="65" y="222" width="110" height="22" rx="6" fill="#0A1F44" opacity="0.85" />
      )}
      <ellipse cx="120" cy="140" rx="58" ry="62" fill={color} stroke="#0A1F44" strokeWidth="4" />
      <circle cx="100" cy="125" r="6" fill="#0A1F44" />
      <circle cx="140" cy="125" r="6" fill="#0A1F44" />
      <path d="M100 158 Q120 175 140 158" stroke="#0A1F44" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M62 105 C45 85, 52 60, 78 60" stroke="#FF6F61" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M178 105 C195 85, 188 60, 162 60" stroke="#5BC8F2" strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="78" cy="60" r="8" fill="#FF6F61" />
      <circle cx="162" cy="60" r="8" fill="#5BC8F2" />
      <circle cx="120" cy="55" r="14" fill="#FFD166" stroke="#0A1F44" strokeWidth="3" />
    </svg>
  );
}
