"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "./cart-provider";
import { services, Market, markets, Service } from "@/lib/data";
import CartLineItem from "./cart/cart-line-item";
import OrderSummary from "./cart/order-summary";
import OrderConfirmation from "./cart/order-confirmation";
/** Use one view for the cart and checkout, including totals, empty states, and the demo confirmation. */
export default function CartView({
  market,
  checkout = false,
}: {
  market: Market;
  checkout?: boolean;
}) {
  const { items, ready, update, clear } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [snapshot, setSnapshot] = useState({ total: 0, count: 0 });
  // Ignore saved services that no longer exist, but retain the original index for updates and removal.
  const valid = items
    .map((item, index) => ({
      item,
      index,
      service: services.find((s) => s.slug === item.slug),
    }))
    .filter(
      (
        x,
      ): x is {
        item: (typeof items)[number];
        index: number;
        service: Service;
      } => Boolean(x.service),
    );
  // Calculate in the shared base currency; money() handles the selected market when values are displayed.
  const subtotal = valid.reduce(
    (sum, x) => sum + x.service!.price * x.item.quantity,
    0,
  );
  const tax = subtotal * markets[market].tax;
  const total = subtotal + tax;
  /** Save the receipt details before clearing the shared cart and returning to the confirmation heading. */
  function confirmOrder() {
    setSnapshot({
      total,
      count: valid.reduce((sum, { item }) => sum + item.quantity, 0),
    });
    setConfirmed(true);
    clear();
    window.scrollTo(0, 0);
  }
  // Avoid flashing an empty cart before the browser has restored the saved items.
  if (!ready)
    return (
      <main className="cart-page">
        <div
          className="skeleton"
          style={{ height: 300 }}
          aria-label="Loading cart"
        />
      </main>
    );
  if (confirmed)
    return <OrderConfirmation market={market} snapshot={snapshot} />;
  if (!valid.length)
    return (
      <main className="empty cart-page">
        <ShoppingBag size={44} />
        <h1>Your next big thing is waiting.</h1>
        <p>
          Your cart is empty. Find something that brings your brand to life.
        </p>
        <Link className="button" href={`/${market}`}>
          Explore services <ArrowRight size={18} />
        </Link>
      </main>
    );
  return (
    <main className="cart-page">
      <Link className="back-link" href={`/${market}`}>
        ← Continue exploring
      </Link>
      <span className="eyebrow green">
        {checkout ? "ONE LAST LOOK" : "GOOD IDEAS, ALL IN ONE PLACE"}
      </span>
      <h1>
        {checkout ? "Let’s bring it to life." : "Your bag of possibilities."}
      </h1>
      <p>
        {checkout
          ? "Review your items and confirm your demo order."
          : "A little closer to your next big thing."}
      </p>
      <div className="cart-grid">
        <section aria-label="Cart items">
          {valid.map(({ item, index, service: s }) => (
            <CartLineItem
              key={`${item.slug}-${item.option}`}
              item={item}
              service={s}
              index={index}
              market={market}
              update={update}
            />
          ))}
        </section>
        <OrderSummary
          valid={valid}
          market={market}
          checkout={checkout}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onConfirm={confirmOrder}
        />
      </div>
    </main>
  );
}
