"use client";

import { OrderProvider } from "@/lib/order-context";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>;
}
