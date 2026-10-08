"use client";
import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";
import { CartItem } from "../cart-provider";
import { Service, Market, markets, money } from "@/lib/data";
export type ResolvedCartLine = {
  item: CartItem;
  index: number;
  service: Service;
};
/** Show localized totals and the checkout action; the parent owns order confirmation. */
export default function OrderSummary({
  valid,
  market,
  checkout,
  subtotal,
  tax,
  total,
  onConfirm,
}: {
  valid: ResolvedCartLine[];
  market: Market;
  checkout: boolean;
  subtotal: number;
  tax: number;
  total: number;
  onConfirm: () => void;
}) {
  return (
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
        <button className="button full" onClick={onConfirm}>
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
  );
}
