# LULILO — Architecture, Roadmap & Scaling Plan
### Powered by OPSLY

---

## 1. Project Structure (delivered)

```
lulilo/
├── app/
│   ├── layout.tsx, globals.css, page.tsx (home)
│   ├── upload/        step 1 — drawing upload
│   ├── customize/      step 2 — child details
│   ├── style/          step 3 — transformation style
│   ├── product/        step 4 — size selection
│   ├── packaging/      step 5 — packaging tier
│   ├── generating/      step 6 — AI reveal animation
│   ├── preview/         step 7 — interactive 3D preview
│   ├── checkout/        step 8 — order summary + mock payment
│   ├── confirmation/    step 9 — celebration screen
│   ├── about, faq, gallery, testimonials, gift-cards,
│   │   track-order, contact
├── components/
│   ├── layout/ (Header, Footer)
│   ├── sections/ (Hero, HowItWorks, StyleShowcase, PricingPreview, TestimonialsAndCta)
│   └── ui/ (Button, FlowProgress)
├── lib/ (types, mock-data, order-context, providers)
└── package.json, tailwind.config.ts, next.config.js, tsconfig.json
```

Run with `npm install && npm run dev`. No backend, database, or external API
keys are required — all data is mocked and order state lives in a React
Context for the session.

---

## 2. Recommended Database Architecture

A relational core (Postgres) with object storage for media is sufficient
through at least the 10,000 orders/month stage.

**Core tables**
- `users` — parents/guardians (id, email, auth provider, marketing consent)
- `children` — name, age, linked to a user (for repeat orders/certificates)
- `drawings` — original upload (S3 key), uploaded_at, child_id
- `ai_generations` — drawing_id, model_version, status, result_asset_keys (preview render, 3D mesh), prompt/analysis metadata
- `orders` — user_id, status (draft → approved → paid → in_production → shipped → delivered), pricing snapshot
- `order_items` — order_id, drawing_id, generation_id, style, product_size, packaging, customization JSON (color, base, engraving)
- `payments` — order_id, processor (Stripe), payment_intent_id, status
- `production_jobs` — order_item_id, OPSLY job id, queue status, printer/station assignment, QC status
- `shipments` — order_id, carrier, tracking_number, status events
- `gift_cards` — code, balance, issuer, recipient_email
- `reviews` / `gallery_submissions` — opt-in showcase content

**Storage**
- Object storage (S3/GCS) for uploaded drawings, AI-rendered previews, and 3D mesh/print files (STL/OBJ), organized by `order_item_id`.
- CDN in front of object storage for gallery and preview images.

**Why this shape:** order_items (not orders) is the unit of production —
one order can contain multiple figures, and OPSLY's production queue
operates on individual items.

---

## 3. AI Pipeline Architecture

```
Upload → Preprocess → Image Analysis → Style Transfer / 3D Generation → Preview Render → Approval Gate → Mesh Finalization → Production Handoff
```

1. **Preprocess**: orientation correction, background removal, contrast
   normalization on the uploaded drawing.
2. **Image analysis (vision model)**: segment the drawn subject, identify
   distinct shapes/colors/character elements; output a structured
   description (e.g., "bipedal figure, 2 arms, cape, blue body, yellow star").
3. **Style transfer / 3D generation**: a generative 3D model (e.g.,
   image-to-3D diffusion or a fine-tuned mesh generator) combines the
   structured description with the selected transformation style
   (superhero, fantasy, etc.) to produce a base mesh + texture.
4. **Preview render**: a fast rasterized render (or interactive WebGL/glTF)
   is generated for the customer-facing preview step — this is what the
   `/preview` page would load instead of the current placeholder SVG.
5. **Approval gate**: customer customization (color, base, engraving) is
   applied as a parametric layer on top of the generated mesh — no
   regeneration needed for simple changes.
6. **Mesh finalization**: once approved, the mesh is validated for
   printability (wall thickness, supports, scale to chosen product size)
   and exported to OPSLY's print-ready format.
7. **Production handoff**: a `production_job` is created in OPSLY's queue
   with the finalized mesh, product size, and packaging spec.

**Model ops**: version every model used per generation (`ai_generations.model_version`)
so quality regressions can be traced and re-runs are reproducible.

---

## 4. Scaling Plan: 100 → 10,000 orders/month

| Stage | Orders/mo | Focus | Key changes |
|---|---|---|---|
| **Seed** | 100 | Validate the magic moment | Manual/semi-automated AI generation reviewed by a human "creative ops" team before customer preview; single print partner; Shopify or Stripe Checkout for payments |
| **Early growth** | 500–1,000 | Remove manual bottlenecks | Automate AI pipeline end-to-end with human QC sampling (10–20%); introduce production_jobs queue; add order tracking page (real data) |
| **Scale-up** | 2,000–5,000 | Throughput & reliability | Multiple print partners/regions for faster shipping; async job queue (e.g., SQS/Cloud Tasks) for AI generation and production handoff; CDN for previews; basic customer accounts for repeat orders and gift redemptions |
| **Volume** | 10,000+ | Cost & margin optimization | Auto-scaling GPU inference for AI generation; tiered SLAs (priority production for Collector Edition); regional fulfillment to cut shipping cost/time; dedicated support team and self-serve order management portal; A/B testing infrastructure on the funnel (upload → checkout conversion is the key lever) |

**Bottleneck order to address**: AI generation latency/cost → production
capacity & QC → shipping logistics → support volume. Each stage's "Focus"
column is the next constraint to remove before scaling further.

---

## 5. Future Roadmap

- **Phase 1 (MVP, this build)**: web flow, mock data, brand foundation
- **Phase 2**: real AI pipeline (image analysis + 3D generation), Stripe
  payments, Shopify or custom order management, transactional email
  (order status, shipping)
- **Phase 3**: customer accounts (saved drawings, reorders, family
  profiles), real-time production status synced from OPSLY, AR preview
  (view the figure in your room via WebXR/ARKit)
- **Phase 4**: mobile app (iOS/Android) with camera-first capture flow,
  push notifications for production milestones
- **Phase 5**: marketplace expansion — schools/pediatric office partner
  program, B2B gifting (corporate baby-shower bundles), subscription
  ("a new keepsake every birthday")

---

## 6. Notes Toward a Billion-Dollar Consumer Brand

- **Own the unboxing moment**: the Luxury Collector Box and confirmation
  animation are not decoration — they're the shareable, social-proof
  moment that drives organic acquisition (parents post unboxings).
- **Build a "certificate of creation" data asset**: every figure is tied
  to a child's name, age, and date — creating a natural reason for
  repeat purchases (next birthday, next drawing) and a defensible data
  moat for personalization.
- **Productize OPSLY separately**: the manufacturing/AI pipeline is a
  B2B2C asset other toy, education, and gifting brands would license —
  a second revenue line beyond direct-to-consumer LULILO sales.
- **Seasonal + occasion-based marketing**: birthdays, holidays, baby
  showers, and "first day of school" are recurring, emotionally-charged
  triggers — build campaigns and gift-card flows around each.
- **Community gallery as growth loop**: an opt-in public gallery (already
  scaffolded) turns customer creations into top-of-funnel content and
  social proof without paid acquisition cost.
