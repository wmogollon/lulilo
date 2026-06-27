"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { useOrder } from "@/lib/order-context";

export default function ConfirmationPage() {
  const { order } = useOrder();
  const orderNumber = `LU-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <section className="mx-auto max-w-2xl px-6 lg:px-10 py-24 lg:py-32 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
        className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-sky-light via-cloud to-sunshine/40 shadow-glow flex items-center justify-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-5xl"
        >
          🎉
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 font-display text-4xl sm:text-5xl font-semibold text-navy"
      >
        Congratulations!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-lg text-navy/70 leading-relaxed"
      >
        A new childhood memory has begun.
        <br />
        {order.childName ? `${order.childName} just` : "Your little artist just"} created
        something that will last forever.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 inline-flex flex-col items-center gap-1 rounded-3xl bg-white border border-navy/5 shadow-soft px-8 py-6"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-navy/40 font-semibold">
          Order number
        </p>
        <p className="font-display text-2xl font-bold text-navy">{orderNumber}</p>
        <p className="text-sm text-navy/50 mt-1">
          We&apos;ll email tracking details and a preview of the production
          timeline.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <LinkButton href="/track-order" size="lg">
          Track This Order
        </LinkButton>
        <LinkButton href="/" size="lg" variant="ghost">
          Back to Home
        </LinkButton>
      </motion.div>
    </section>
  );
}
