import Link from "next/link";
import { Market } from "@/lib/data";
import { CatalogQuery, catalogUrl } from "@/lib/catalog";
/** Show the result count and let customers change sorting without losing their filters. */
export default function ResultsToolbar({
  market,
  query,
  page,
  count,
}: {
  market: Market;
  query: CatalogQuery;
  page: number;
  count: number;
}) {
  return (
    <div className="results-bar">
      <span>
        Showing{" "}
        <strong>
          {count ? (page - 1) * 8 + 1 : 0}–{Math.min(page * 8, count)}
        </strong>{" "}
        of <strong>{count}</strong> services
        {Object.keys(query).some((k) => query[k] && k !== "page") && (
          <Link className="reset" href={`/${market}`}>
            Clear filters
          </Link>
        )}
      </span>
      <form action={`/${market}`} className="sort-form">
        {Object.entries(query)
          .filter(([k]) => k !== "sort" && k !== "page")
          .map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
        <label>
          Sort by:{" "}
          <select
            name="sort"
            defaultValue={query.sort || "popular"}
            aria-label="Sort services"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <button aria-label="Apply sorting">↗</button>
      </form>
    </div>
  );
}
