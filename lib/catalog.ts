import { Market, Service } from "./data";
export type CatalogQuery = Record<string, string | undefined>;

/** Apply the shared search, sorting and pagination rules without changing the source services. */
export function getCatalogResults(services: Service[], query: CatalogQuery) {
  let all = services;
  const q = query.q?.trim().toLowerCase() || "";
  // Match every search word across the service text, then apply all selected filters together.
  all = all.filter(
    (s) =>
      (!q ||
        q
          .split(/\s+/)
          .every((term) =>
            `${s.name} ${s.category} ${s.description} ${s.useCase} ${s.industry}`
              .toLowerCase()
              .includes(term),
          )) &&
      (!query.category || s.category === query.category) &&
      (!query.useCase || s.useCase === query.useCase) &&
      (!query.industry || s.industry === query.industry) &&
      (!query.urgency || s.days <= Number(query.urgency)),
  );
  // Popularity is the default; price sorting uses base prices because each market applies the same factor.
  all.sort((a, b) =>
    query.sort === "price-asc"
      ? a.price - b.price
      : query.sort === "price-desc"
        ? b.price - a.price
        : b.popularity - a.popularity,
  );
  // Show eight services at a time and keep the requested page within the available results.
  const pages = Math.max(1, Math.ceil(all.length / 8));
  const page = Math.max(1, Math.min(pages, Number(query.page) || 1));
  const shown = all.slice((page - 1) * 8, page * 8);
  return { all, pages, page, shown };
}

/** Preserve current filters while replacing the category or page selected by the customer. */
export function catalogUrl(
  market: Market,
  query: CatalogQuery,
  updates: Record<string, string>,
) {
  const params = new URLSearchParams(
    Object.entries({ ...query, ...updates }).filter(([, value]) =>
      Boolean(value),
    ) as [string, string][],
  );
  return `/${market}?${params}`;
}
