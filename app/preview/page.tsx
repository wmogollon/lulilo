"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";
import { colorOptions, baseOptions, transformationStyles } from "@/lib/mock-data";
import clsx from "clsx";

export default function PreviewPage() {
  const router = useRouter();
  const { order, update } = useOrder();
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const style = transformationStyles.find((s) => s.id === order.styleId);
  const hasRealModel = !!order.glbUrl;

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={7} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Say hello to{" "}
          <span className="italic text-coral">
            {order.childName || "your character"}
          </span>
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          {hasRealModel
            ? "Your character has been generated! Rotate, zoom, and personalize before this becomes something real."
            : "Customize your character below before approving."}
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[1.3fr_1fr] gap-10">
        {/* 3D Viewer */}
        <div className="rounded-5xl bg-gradient-to-br from-sky-light via-cloud to-sunshine/30 border border-navy/5 shadow-lift overflow-hidden min-h-[480px] flex flex-col">
          
          {/* Badge */}
          <div className="p-4 flex items-center justify-between">
            <span className="bg-white/70 backdrop-blur rounded-full px-4 py-1.5 text-xs font-bold text-navy/60">
              {style?.emoji} {style?.name} edition
            </span>
            {hasRealModel && (
              <span className="bg-coral/10 border border-coral/20 rounded-full px-3 py-1 text-xs font-bold text-coral">
                ✨ AI Generated
              </span>
            )}
          </div>

          {/* Model viewer or fallback */}
          <div className="flex-1 flex items-center justify-center relative p-4">
            {hasRealModel ? (
              <RealModelViewer
                glbUrl={order.glbUrl!}
                renderedImage={order.renderedImage}
                rotation={rotation}
                zoom={zoom}
              />
            ) : (
              <FallbackViewer
                color={order.color}
                base={order.base}
                rotation={rotation}
                zoom={zoom}
                engravedName={order.engravedName}
                engravedDate={order.engravedDate}
              />
            )}
          </div>

          {/* Controls */}
          <div className="p-4 flex items-center justify-center gap-3">
            <ControlBtn onClick={() => setRotation((r) => r - 45)} label="Rotate left">
              <RotateCw className="-scale-x-100" size={18} />
            </ControlBtn>
            <ControlBtn onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))} label="Zoom out">
              <ZoomOut size={18} />
            </ControlBtn>
            <ControlBtn onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))} label="Zoom in">
              <ZoomIn size={18} />
            </ControlBtn>
            <ControlBtn onClick={() => setRotation((r) => r + 45)} label="Rotate right">
              <RotateCw size={18} />
            </ControlBtn>
            {order.glbUrl && (
              <a
                href={order.glbUrl}
                download="lulilo-character.glb"
                className="p-3 rounded-full bg-white shadow-soft hover:bg-sunshine/30 transition-colors"
                aria-label="Download 3D model"
                title="Download GLB"
              >
                <Download size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Customization panel */}
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-navy mb-3">Color accent</h3>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => update({ color: c.value })}
                  aria-label={c.name}
                  title={c.name}
                  className={clsx(
                    "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                    order.color === c.value ? "border-navy scale-110" : "border-white shadow-soft"
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-navy mb-3">Base style</h3>
            <div className="flex flex-col gap-2">
              {baseOptions.map((b) => (
                <button
                  key={b.id}
                  onClick={() => update({ base: b.id })}
                  className={clsx(
                    "text-left rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                    order.base === b.id
                      ? "border-coral bg-coral/5 text-navy"
                      : "border-navy/10 bg-white text-navy/70 hover:border-sky"
                  )}
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

          {/* Drawing reference */}
          {order.drawingPreview && (
            <div>
              <h3 className="font-display text-lg font-semibold text-navy mb-3">
                Original drawing
              </h3>
              <div className="rounded-3xl overflow-hidden border border-navy/5 shadow-soft">
                <img
                  src={order.drawingPreview}
                  alt="Original drawing"
                  className="w-full object-contain max-h-40"
                />
              </div>
            </div>
          )}
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

// Real 3D viewer using model-viewer web component (loaded via CDN)
function RealModelViewer({
  glbUrl,
  renderedImage,
  rotation,
  zoom,
}: {
  glbUrl: string;
  renderedImage: string | null;
  rotation: number;
  zoom: number;
}) {
  return (
    <div
      className="w-full h-80 rounded-3xl overflow-hidden relative"
      style={{ transform: `scale(${zoom})`, transition: "transform 0.3s ease" }}
    >
      {/* model-viewer web component — loaded via script in layout or inline */}
      <model-viewer
        src={glbUrl}
        poster={renderedImage ?? undefined}
        auto-rotate
        camera-controls
        shadow-intensity="1"
        exposure="0.8"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          "--poster-color": "transparent",
        } as React.CSSProperties}
        camera-orbit={`${rotation}deg 75deg 2m`}
      />
    </div>
  );
}

// Fallback SVG viewer when no real model yet
function FallbackViewer({
  color,
  base,
  rotation,
  zoom,
  engravedName,
  engravedDate,
}: {
  color: string;
  base: string;
  rotation: number;
  zoom: number;
  engravedName: string;
  engravedDate: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          transform: `scale(${zoom}) rotate(${rotation}deg)`,
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <svg viewBox="0 0 240 260" className="w-56 h-56 drop-shadow-2xl">
          {base === "round" && (
            <ellipse cx="120" cy="235" rx="70" ry="14" fill="#0A1F44" opacity="0.08" />
          )}
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
          <path d="M62 105 C45 85,52 60,78 60" stroke="#FF6F61" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M178 105 C195 85,188 60,162 60" stroke="#5BC8F2" strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="78" cy="60" r="8" fill="#FF6F61" />
          <circle cx="162" cy="60" r="8" fill="#5BC8F2" />
          <circle cx="120" cy="55" r="14" fill="#FFD166" stroke="#0A1F44" strokeWidth="3" />
        </svg>
      </div>
      {engravedName && (
        <p className="mt-3 font-display italic text-navy/70 text-sm">
          &ldquo;{engravedName}&rdquo;
          {engravedDate && <span className="text-navy/40"> · {engravedDate}</span>}
        </p>
      )}
    </div>
  );
}

function ControlBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="p-3 rounded-full bg-white shadow-soft hover:bg-sky-light transition-colors"
    >
      {children}
    </button>
  );
}
