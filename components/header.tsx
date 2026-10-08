"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, ShoppingBag, ChevronDown } from "lucide-react";
import { markets, Market } from "@/lib/data";
import { useCart } from "./cart-provider";
/** Show the main navigation, country selector, and live cart count for the current storefront. */
export default function Header({ market }: { market: Market }) {
  const { items } = useCart();
  const router = useRouter();
  const path = usePathname();
  return (
    <>
      <div className="announcement">
        Big ideas deserve great branding. Let’s make yours happen.{" "}
        <ArrowUpRight size={13} />
      </div>
      <header className="header">
        <Link className="logo" href={`/${market}`} aria-label="Branda home">
          branda<span>✳</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className="active" href={`/${market}`}>
            Explore services <ChevronDown size={13} />
          </Link>
          <Link href={`/${market}#how-it-works`}>How it works</Link>
          <Link href={`/${market}#why-branda`}>Why Branda?</Link>
        </nav>
        <div className="header-actions">
          <label className="market-select">
            <span>{markets[market].flag}</span>
            <select
              aria-label="Country and currency"
              value={market}
              // Keep the current page when switching countries by replacing only its country folder.
              onChange={(e) =>
                router.push(
                  path.replace(/^\/(ng|us|uk|ca)/, `/${e.target.value}`),
                )
              }
            >
              {Object.entries(markets).map(([key, m]) => (
                <option key={key} value={key}>
                  {m.name} · {m.currency}
                </option>
              ))}
            </select>
          </label>
          <Link
            href={`/${market}/cart`}
            className="cart-link"
            aria-label={`Cart, ${items.reduce((a, x) => a + x.quantity, 0)} items`}
          >
            <ShoppingBag size={20} />
            <span>{items.reduce((a, x) => a + x.quantity, 0)}</span>
          </Link>
        </div>
      </header>
    </>
  );
}
