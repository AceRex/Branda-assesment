import Link from "next/link";
import { Market } from "@/lib/data";
import { CatalogQuery, catalogUrl } from "@/lib/catalog";
import { ArrowRight } from "lucide-react";
/** Link to result pages while preserving the customer’s search and filters. */
export default function CatalogPagination({
  market,
  query,
  page,
  pages,
}: {
  market: Market;
  query: CatalogQuery;
  page: number;
  pages: number;
}) {
  const url = (updates: Record<string, string>) =>
    catalogUrl(market, query, updates);
  return (
    <div className="pagination">
      {Array.from({ length: pages }, (_, i) => (
        <Link
          key={i}
          aria-current={page === i + 1 ? "page" : undefined}
          className={page === i + 1 ? "selected" : ""}
          href={url({ page: String(i + 1) })}
        >
          {i + 1}
        </Link>
      ))}
      {page < pages && (
        <Link href={url({ page: String(page + 1) })}>
          Next <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
