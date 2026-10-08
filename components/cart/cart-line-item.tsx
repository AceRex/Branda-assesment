"use client";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem } from "../cart-provider";
import { Service, Market, money } from "@/lib/data";
/** Render one selected variation with its quantity controls and removal action. */
export default function CartLineItem({
  item,
  service: s,
  index,
  market,
  update,
}: {
  item: CartItem;
  service: Service;
  index: number;
  market: Market;
  update: (index: number, quantity: number) => void;
}) {
  return (
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
        <span className="unit-price">{money(s!.price, market)} each</span>
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
  );
}
