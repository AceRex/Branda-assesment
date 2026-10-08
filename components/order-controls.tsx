"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import { Service, Market, money } from "@/lib/data";
import { useCart } from "./cart-provider";
/** Let the customer choose a variation and quantity, then add it to their cart or go straight to checkout. */
export default function OrderControls({
  service,
  market,
}: {
  service: Service;
  market: Market;
}) {
  const [option, setOption] = useState(service.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const router = useRouter();
  /** Save the current selection to the shared cart and show a short confirmation beside the controls. */
  function addItem() {
    add({ slug: service.slug, option, quantity });
    setAdded(true);
  }
  return (
    <div className="order-controls">
      <label className="field">
        Choose your option
        <select
          value={option}
          onChange={(e) => {
            // A new variation has not been added yet, so remove the previous success message.
            setOption(e.target.value);
            setAdded(false);
          }}
        >
          {service.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <div className="quantity-line">
        <div>
          <span>Quantity</span>
          <div className="quantity">
            <button
              aria-label="Decrease quantity"
              disabled={quantity === 1}
              onClick={() => setQuantity((q) => q - 1)}
            >
              −
            </button>
            <input
              aria-label="Quantity"
              type="number"
              min="1"
              max="999"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.min(999, Math.max(1, Number(e.target.value) || 1)),
                )
              }
            />
            <button
              aria-label="Increase quantity"
              disabled={quantity === 999}
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>
        <strong>{money(service.price * quantity, market)}</strong>
      </div>
      <button
        className="button full"
        onClick={() => {
          // Save the item first so checkout includes the selection the customer just made.
          addItem();
          router.push(`/${market}/checkout`);
        }}
      >
        Order now <ArrowRight size={18} />
      </button>
      <button className="button secondary full" onClick={addItem}>
        {added ? <Check size={18} /> : <ShoppingBag size={18} />}{" "}
        {added ? "Added to your cart" : "Add to cart"}
      </button>
      <p role="status" className="order-status">
        {added ? "Your next big thing is in the bag." : ""}
      </p>
    </div>
  );
}
