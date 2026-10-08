"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, ArrowRight, Trash2, Check, Lock } from "lucide-react";
import { useCart } from "./cart-provider";
import { services, Market, markets, money } from "@/lib/data";
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
    .filter((x) => x.service);
  // Calculate in the shared base currency; money() handles the selected market when values are displayed.
  const subtotal = valid.reduce(
    (sum, x) => sum + x.service!.price * x.item.quantity,
    0,
  );
  const tax = subtotal * markets[market].tax;
  const total = subtotal + tax;
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
    return (
      <main className="confirmation">
        <div className="confirmation-icon">
          <Check size={34} />
        </div>
        <span className="eyebrow green">YOUR NEXT CHAPTER STARTS HERE</span>
        <h1>You’re all set.</h1>
        <p>
          Your mock order for {snapshot.count} item
          {snapshot.count === 1 ? "" : "s"} totaling{" "}
          <strong>{money(snapshot.total, market)}</strong> has been confirmed.
        </p>
        <p>
          This is a demo confirmation. No payment was collected or order
          submitted.
        </p>
        <Link className="button" href={`/${market}`}>
          Keep exploring <ArrowRight size={18} />
        </Link>
      </main>
    );
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
            <article className="cart-item" key={`${item.slug}-${item.option}`}>
              <Link href={`/${market}/services/${s!.slug}`}>
                <img src={s!.image} alt={s!.name} />
              </Link>
              <div>
                <span className="eyebrow">{s!.category}</span>
                <h3>
                  <Link href={`/${market}/services/${s!.slug}`}>{s!.name}</Link>
                </h3>
                <p>{item.option}</p>
                <span className="unit-price">
                  {money(s!.price, market)} each
                </span>
                <div className="quantity">
                  <button
                    disabled={item.quantity === 1}
                    aria-label={`Decrease ${s!.name} quantity`}
                    onClick={() => update(index, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    disabled={item.quantity >= 999}
                    aria-label={`Increase ${s!.name} quantity`}
                    onClick={() => update(index, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="item-end">
                <strong>{money(s!.price * item.quantity, market)}</strong>
                <button
                  className="remove"
                  aria-label={`Remove ${s!.name}`}
                  onClick={() => update(index, 0)}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </article>
          ))}
        </section>
        <aside className="summary">
          <h2>Order summary</h2>
          {checkout && (
            <div className="summary-items">
              {valid.map(({ item, service: s }) => (
                <div key={`${item.slug}-${item.option}`}>
                  <span>
                    {s!.name} × {item.quantity}
                    <small>{item.option}</small>
                  </span>
                  <strong>{money(s!.price * item.quantity, market)}</strong>
                </div>
              ))}
            </div>
          )}
          <div>
            <span>Subtotal</span>
            <strong>{money(subtotal, market)}</strong>
          </div>
          <div>
            <span>Estimated tax ({markets[market].tax * 100}%)</span>
            <strong>{money(tax, market)}</strong>
          </div>
          <div>
            <span>Delivery</span>
            <span>Included</span>
          </div>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>{money(total, market)}</strong>
          </div>
          <p className="market-note">
            {markets[market].flag} Ordering in {markets[market].name} ·{" "}
            {markets[market].currency}
          </p>
          {checkout ? (
            <button
              className="button full"
              onClick={() => {
                // Keep the confirmed amount and item count before clearing the live cart.
                setSnapshot({
                  total,
                  count: valid.reduce((a, x) => a + x.item.quantity, 0),
                });
                setConfirmed(true);
                clear();
                window.scrollTo(0, 0);
              }}
            >
              Confirm demo order <Check size={18} />
            </button>
          ) : (
            <Link className="button full" href={`/${market}/checkout`}>
              Continue to checkout <ArrowRight size={18} />
            </Link>
          )}
          <p className="secure">
            <Lock size={13} />{" "}
            {checkout
              ? "Demo checkout · no payment required"
              : "Clear pricing. No surprises."}
          </p>
        </aside>
      </div>
    </main>
  );
}
