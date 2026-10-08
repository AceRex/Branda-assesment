"use client";
import { createContext, useContext, useEffect, useState } from "react";

/** A cart line remembers the service, the selected variation, and how many the customer wants. */
export type CartItem = { slug: string; option: string; quantity: number };
/** Share the cart and its actions with client components without passing them through every page. */
const Context = createContext<{
  items: CartItem[];
  ready: boolean;
  add: (item: CartItem) => void;
  update: (index: number, quantity: number) => void;
  clear: () => void;
}>({
  items: [],
  ready: false,
  add: () => {},
  update: () => {},
  clear: () => {},
});

/** Own the cart state and keep a browser copy so the customer’s selections survive a refresh. */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  // Read browser storage after mounting; the server cannot access localStorage.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("branda-cart") || "[]");
      if (Array.isArray(saved))
        setItems(
          saved.filter(
            (x) =>
              typeof x.slug === "string" &&
              typeof x.option === "string" &&
              Number.isInteger(x.quantity) &&
              x.quantity > 0,
          ),
        );
    } catch {
      // If the saved cart cannot be read, start with an empty cart so the page remains usable.
    }
    setReady(true);
  }, []);
  // Wait for the saved cart to load before writing, otherwise an empty initial cart would overwrite it.
  useEffect(() => {
    if (ready) localStorage.setItem("branda-cart", JSON.stringify(items));
  }, [items, ready]);
  return (
    <Context.Provider
      value={{
        items,
        ready,
        // Merge matching services and variations; a different variation gets its own cart line.
        add: (item) =>
          setItems((prev) => {
            const index = prev.findIndex(
              (x) => x.slug === item.slug && x.option === item.option,
            );
            return index < 0
              ? [...prev, item]
              : prev.map((x, i) =>
                  i === index
                    ? {
                        ...x,
                        quantity: Math.min(999, x.quantity + item.quantity),
                      }
                    : x,
                );
          }),
        // A quantity of zero removes the line. Positive quantities are capped at 999.
        update: (index, quantity) =>
          setItems((prev) =>
            quantity <= 0
              ? prev.filter((_, i) => i !== index)
              : prev.map((x, i) =>
                  i === index ? { ...x, quantity: Math.min(999, quantity) } : x,
                ),
          ),
        // Empty the cart after a successful demo confirmation.
        clear: () => setItems([]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
/** Give components a small, consistent way to read the cart and use its actions. */
export const useCart = () => useContext(Context);
