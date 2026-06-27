# LULILO — Powered by OPSLY

> From little imaginations to lifelong memories.

This is the MVP frontend for LULILO: an AI platform that turns children's
drawings into real, collectible 3D figures.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom design tokens: navy / sky / coral / sunshine)
- Framer Motion
- lucide-react icons
- All data is mocked locally — no backend or external APIs required

## Getting started
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Creation flow (8 steps)
1. `/upload` — upload, drag & drop, or photograph the drawing
2. `/customize` — child's name, age, optional message
3. `/style` — choose a transformation style (superhero, fantasy, etc.)
4. `/product` — choose size (Mini / Standard / Premium / Collector)
5. `/packaging` — choose packaging tier
6. `/generating` — cinematic AI "reveal" loading sequence
7. `/preview` — interactive 3D-style preview (rotate, zoom, color, base, engraving)
8. `/checkout` — order summary + mock payment
9. `/confirmation` — celebratory confirmation screen

State persists across the flow via `lib/order-context.tsx` (React Context,
in-memory only — resets on refresh, by design for this MVP).

## Project structure
```
app/                  routes (one folder per page, App Router)
components/layout/    Header, Footer
components/sections/  homepage sections (Hero, HowItWorks, etc.)
components/ui/        Button, FlowProgress
lib/                   types, mock data, order context
```
