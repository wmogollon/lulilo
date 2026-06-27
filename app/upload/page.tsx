"use client";

import { useRef, useState, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Camera, Upload as UploadIcon, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FlowProgress from "@/components/ui/FlowProgress";
import { useOrder } from "@/lib/order-context";

export default function UploadPage() {
  const router = useRouter();
  const { order, update } = useOrder();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      update({ drawingPreview: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <section className="mx-auto max-w-4xl px-6 lg:px-10 py-16 lg:py-20">
      <FlowProgress current={1} />

      <div className="mt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy">
          Show us the masterpiece
        </h1>
        <p className="mt-4 text-navy/60 max-w-xl mx-auto">
          Upload a photo of your child&apos;s drawing, drag and drop a file,
          or snap one right now. Any crayon, marker, or pencil drawing works
          beautifully.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`mt-12 rounded-5xl border-2 border-dashed transition-colors ${
          isDragging ? "border-coral bg-coral/5" : "border-navy/15 bg-white"
        } p-10 lg:p-16 flex flex-col items-center text-center`}
      >
        {order.drawingPreview ? (
          <div className="relative">
            <img
              src={order.drawingPreview}
              alt="Uploaded drawing preview"
              className="max-h-80 rounded-3xl shadow-lift object-contain"
            />
            <button
              onClick={() => update({ drawingPreview: null })}
              aria-label="Remove image"
              className="absolute -top-3 -right-3 bg-navy text-cloud rounded-full p-2 shadow-soft hover:bg-coral transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-sky-light flex items-center justify-center mb-6">
              <ImageIcon className="text-navy" size={32} />
            </div>
            <p className="font-display text-xl font-semibold text-navy">
              Drag &amp; drop the drawing here
            </p>
            <p className="text-navy/50 text-sm mt-2">or choose an option below</p>
          </>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button onClick={() => fileInputRef.current?.click()} variant="secondary">
            <UploadIcon size={18} />
            Upload from device
          </Button>
          <Button onClick={() => cameraInputRef.current?.click()} variant="secondary">
            <Camera size={18} />
            Take a photo
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          size="lg"
          disabled={!order.drawingPreview}
          onClick={() => router.push("/customize")}
        >
          Continue
        </Button>
      </div>

      <p className="mt-6 text-center text-xs text-navy/40">
        Tip: good lighting and a flat surface help our AI capture every
        detail — but don&apos;t worry, even blurry photos work!
      </p>
    </section>
  );
}
