import { TransformationStyle, ProductSize, PackagingOption } from "./types";

export const transformationStyles: TransformationStyle[] = [
  {
    id: "original",
    name: "Original",
    description: "Stay true to the drawing — every line, just in 3D.",
    emoji: "🎨",
    gradient: "from-sky-light to-cloud",
  },
  {
    id: "superhero",
    name: "Superhero",
    description: "Cape, confidence, and a little extra glow.",
    emoji: "🦸",
    gradient: "from-coral/20 to-sunshine/20",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Wings, sparkle, and a touch of magic.",
    emoji: "🐉",
    gradient: "from-sky/20 to-coral/10",
  },
  {
    id: "cartoon",
    name: "Cartoon",
    description: "Bold outlines and big, bouncy expressions.",
    emoji: "🟡",
    gradient: "from-sunshine/30 to-sky-light/40",
  },
  {
    id: "animal",
    name: "Animal Friend",
    description: "Soft, huggable, and full of personality.",
    emoji: "🐻",
    gradient: "from-sky-light to-sunshine/20",
  },
  {
    id: "space",
    name: "Space Explorer",
    description: "Helmet on, ready for the stars.",
    emoji: "🚀",
    gradient: "from-navy/10 to-sky/20",
  },
  {
    id: "princess",
    name: "Princess",
    description: "Crowns, gowns, and a regal pose.",
    emoji: "👑",
    gradient: "from-coral/15 to-sunshine/25",
  },
  {
    id: "pirate",
    name: "Pirate",
    description: "Bandana, swagger, treasure-map energy.",
    emoji: "🏴‍☠️",
    gradient: "from-navy/10 to-coral/10",
  },
];

export const productSizes: ProductSize[] = [
  {
    id: "mini",
    name: "Mini",
    heightCm: 8,
    price: 29,
    description: "A pocket-sized keepsake. Perfect for desks and shelves.",
  },
  {
    id: "standard",
    name: "Standard",
    heightCm: 13,
    price: 49,
    description: "Our most-loved size — detailed, sturdy, display-ready.",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    heightCm: 18,
    price: 79,
    description: "Extra detail, richer finish, a true centerpiece.",
  },
  {
    id: "collector",
    name: "Collector Edition",
    heightCm: 24,
    price: 129,
    description: "Hand-finished, numbered, and signed by the artist — your child.",
  },
];

export const packagingOptions: PackagingOption[] = [
  {
    id: "standard",
    name: "Standard",
    price: 0,
    description: "Protective recycled packaging, ready to unbox.",
  },
  {
    id: "gift",
    name: "Gift Box",
    price: 9,
    description: "A keepsake box with ribbon, made for gifting.",
  },
  {
    id: "luxury",
    name: "Luxury Collector Box",
    price: 24,
    description: "Magnetic-close box, velvet lining, certificate of authenticity.",
  },
];

export const colorOptions = [
  { id: "sky", value: "#5BC8F2", name: "Sky Blue" },
  { id: "coral", value: "#FF6F61", name: "Coral" },
  { id: "sunshine", value: "#FFD166", name: "Sunshine" },
  { id: "navy", value: "#0A1F44", name: "Navy" },
  { id: "blush", value: "#F7C5CC", name: "Blush" },
  { id: "mint", value: "#B6E3D4", name: "Mint" },
];

export const baseOptions = [
  { id: "round", name: "Round Pedestal" },
  { id: "cloud", name: "Cloud Base" },
  { id: "name-plaque", name: "Engraved Plaque" },
];

export const testimonials = [
  {
    quote:
      "My son drew a dragon riding a skateboard and three weeks later it was sitting on his shelf in 3D. He shows it to every single visitor.",
    name: "Priya M.",
    location: "Austin, TX",
  },
  {
    quote:
      "We made one for each grandkid as Christmas gifts. The unboxing alone made the whole family cry, in the best way.",
    name: "Robert & Diane",
    location: "Portland, OR",
  },
  {
    quote:
      "The Collector Edition box feels like something from a museum gift shop. Worth every penny for a first-birthday keepsake.",
    name: "Jamie L.",
    location: "Brooklyn, NY",
  },
];

export const faqs = [
  {
    q: "What kind of drawing works best?",
    a: "Almost anything! Crayon, marker, pencil, even finger-paint. Our AI is trained to find the character in scribbles, stick figures, and masterpieces alike.",
  },
  {
    q: "How long does production take?",
    a: "Most orders are crafted and shipped within 7–10 business days. Collector Editions take 12–14 days due to hand-finishing.",
  },
  {
    q: "Can I order more than one figure from the same drawing?",
    a: "Yes — many families order a Mini for a backpack and a Standard for the shelf, both from the same artwork.",
  },
  {
    q: "What materials are used?",
    a: "Each figure is 3D printed in durable, child-safe PLA and hand-finished with non-toxic paints and a protective coating.",
  },
  {
    q: "Is this safe for young children?",
    a: "All finishes are non-toxic and lead-free. For children under 3, we recommend display pieces rather than handheld toys.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "You'll approve a digital preview before anything goes to production, and we offer one free revision if it doesn't feel right.",
  },
];
