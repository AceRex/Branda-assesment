import Link from "next/link";
import { Market } from "@/lib/data";
import { CatalogQuery, catalogUrl } from "@/lib/catalog";
import { categories } from "@/lib/data";
import { Monitor, Gift, PenTool, Camera, Printer } from "lucide-react";
const icons = [Monitor, Gift, PenTool, Camera, Printer];
/** Show category links while keeping the service section in view. */
export default function CategoryTabs({
  market,
  query,
}: {
  market: Market;
  query: CatalogQuery;
}) {
  const url = (updates: Record<string, string>) =>
    catalogUrl(market, query, updates);
  return (
    <nav className="category-tabs" aria-label="Service categories">
      <Link
        className={!query.category ? "selected" : ""}
        href={`${url({ category: "", page: "1" })}#services`}
        scroll={false}
      >
        <span>✳</span>All services
      </Link>
      {categories.map((c, i) => {
        const Icon = icons[i];
        return (
          <Link
            key={c}
            className={query.category === c ? "selected" : ""}
            href={`${url({ category: c, page: "1" })}#services`}
            scroll={false}
          >
            <Icon size={17} />
            {c}
          </Link>
        );
      })}
    </nav>
  );
}
