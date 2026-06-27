"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { OrderState, defaultOrderState } from "./types";

type OrderContextType = {
  order: OrderState;
  update: (patch: Partial<OrderState>) => void;
  reset: () => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderState>(defaultOrderState);

  const update = (patch: Partial<OrderState>) =>
    setOrder((prev) => ({ ...prev, ...patch }));

  const reset = () => setOrder(defaultOrderState);

  return (
    <OrderContext.Provider value={{ order, update, reset }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
