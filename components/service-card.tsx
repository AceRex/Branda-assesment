import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Service, Market, money } from "@/lib/data";
/** Show a compact service preview with its image, local starting price, offer, and link to the details. */
export default function ServiceCard({
  service: s,
  market,
}: {
  service: Service;
  market: Market;
}) {
  return (
    <article className="service-card">
      <Link
        href={`/${market}/services/${s.slug}`}
        className="service-image"
        style={{ background: s.color }}
      >
        <img src={s.image} alt={s.name} loading="lazy" />
        <span className="image-shade" />
        {s.badge && (
          <span
            className={`badge ${s.badge.startsWith("Save") ? "discount" : ""}`}
          >
            {s.badge}
          </span>
        )}
        <span className="image-arrow">
          <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="card-body">
        <span className="eyebrow">{s.category}</span>
        <h3>
          <Link href={`/${market}/services/${s.slug}`}>{s.name}</Link>
        </h3>
        <div className="card-bottom">
          <div>
            <span className="from">From </span>
            <strong>{money(s.price, market)}</strong>
            {s.oldPrice && <del>{money(s.oldPrice, market)}</del>}
          </div>
          <Link
            className="card-cta"
            href={`/${market}/services/${s.slug}`}
            aria-label={`Explore ${s.name}`}
          >
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="delivery">
          Ready in {s.days} {s.days === 1 ? "day" : "days"}{" "}
          <span>↗ Made for you</span>
        </div>
      </div>
    </article>
  );
}
