import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import StyleShowcase from "@/components/sections/StyleShowcase";
import PricingPreview from "@/components/sections/PricingPreview";
import TestimonialsAndCta from "@/components/sections/TestimonialsAndCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <StyleShowcase />
      <PricingPreview />
      <TestimonialsAndCta />
    </>
  );
}
