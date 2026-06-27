import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/lib/providers";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Extend JSX to recognise the model-viewer web component
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          poster?: string;
          "auto-rotate"?: boolean;
          "camera-controls"?: boolean;
          "shadow-intensity"?: string;
          exposure?: string;
          "camera-orbit"?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const metadata: Metadata = {
  title: "LULILO — From Little Imaginations to Lifelong Memories",
  description:
    "Upload your child's drawing and LULILO turns it into a real, collectible 3D keepsake. Powered by OPSLY.",
  metadataBase: new URL("https://lulilo.com"),
  openGraph: {
    title: "LULILO — Your child imagines it. We bring it to life.",
    description:
      "Turn your child's drawing into a real collectible toy. A new kind of childhood memory.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <head>
        {/* Google Model Viewer — enables <model-viewer> web component for GLB/GLTF display */}
        <script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        />
      </head>
      <body className="font-body bg-cloud text-navy antialiased">
        <Providers>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
