import { Market } from "@/lib/data";
import { CatalogQuery } from "@/lib/catalog";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";
/** Submit search and filters as URL parameters so results can be refreshed and shared. */
export default function CatalogFilters({
  market,
  query,
}: {
  market: Market;
  query: CatalogQuery;
}) {
  return (
    <form className="filter-bar" action={`/${market}`}>
      <input type="hidden" name="category" value={query.category || ""} />
      <label className="search">
        <Search size={18} />
        <input
          name="q"
          defaultValue={query.q}
          placeholder="What are you looking for?"
          aria-label="Search services"
        />
        <button aria-label="Search" type="submit">
          <ArrowRight size={17} />
        </button>
      </label>
      <label>
        <select
          name="useCase"
          defaultValue={query.useCase || ""}
          aria-label="Filter by use case"
        >
          <option value="">Use case</option>
          {[
            "Launch a brand",
            "Grow online",
            "Gift & delight",
            "Make an event",
          ].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      <label>
        <select
          name="industry"
          defaultValue={query.industry || ""}
          aria-label="Filter by industry"
        >
          <option value="">Industry</option>
          {[
            "Retail & ecommerce",
            "Professional services",
            "Hospitality",
            "All industries",
          ].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      <label>
        <select
          name="urgency"
          defaultValue={query.urgency || ""}
          aria-label="Filter by turnaround"
        >
          <option value="">Turnaround</option>
          <option value="3">Within 3 days</option>
          <option value="7">Within 7 days</option>
        </select>
      </label>
      <input type="hidden" name="sort" value={query.sort || ""} />
      <button className="filter-button" type="submit">
        <SlidersHorizontal size={16} />
        Apply filters
      </button>
    </form>
  );
}
