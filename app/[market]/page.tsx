import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { getServices, Market, markets } from "@/lib/data";
import { getCatalogResults } from "@/lib/catalog";
import CatalogHero from "@/components/catalog/catalog-hero";
import TrustStrip from "@/components/catalog/trust-strip";
import HowItWorks from "@/components/catalog/how-it-works";
import CategoryTabs from "@/components/catalog/category-tabs";
import CatalogFilters from "@/components/catalog/catalog-filters";
import ResultsToolbar from "@/components/catalog/results-toolbar";
import CatalogPagination from "@/components/catalog/catalog-pagination";
import ServiceGrid from "@/components/service-grid";
import type { Metadata } from "next";
type Props = {
  params: Promise<{ market: Market }>;
  searchParams: Promise<Record<string, string | undefined>>;
};
/** Describe this country’s storefront for search engines and link it to the other language and country versions. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market } = await params;
  if (!(market in markets)) notFound();
  return {
    alternates: {
      languages: Object.fromEntries(
        Object.keys(markets).map((m) => [
          m === "ng"
            ? "en-NG"
            : m === "us"
              ? "en-US"
              : m === "uk"
                ? "en-GB"
                : "en-CA",
          `/${m}`,
        ]),
      ),
    },
    title: `Branding services in ${markets[market]?.name || "your market"}`,
    description: markets[market]?.copy,
  };
}
/** Build the service catalog on the server using the filters in the URL, so a shared link shows the same results. */
export default async function Catalog({ params, searchParams }: Props) {
  const { market } = await params;
  if (!(market in markets)) notFound();
  const query = await searchParams;
  const { all, pages, page, shown } = getCatalogResults(
    await getServices(),
    query,
  );
  return (
    <main>
      <CatalogHero market={market} />
      <TrustStrip />
      <section className="catalog" id="services">
        <div className="section-top">
          <div>
            <span className="eyebrow green">A WORLD OF POSSIBILITIES</span>
            <h2>What’s next for your brand?</h2>
            <p>
              Small touches. Bold moves. Find the right service for your next
              chapter.
            </p>
          </div>
          <span className="curated">
            <Sparkles size={16} /> Thoughtfully curated. Expertly made.
          </span>
        </div>
        {/* Keep category changes in the services section instead of sending the customer back to the hero. */}
        <CategoryTabs market={market} query={query} />
        <CatalogFilters market={market} query={query} />
        <ResultsToolbar
          market={market}
          query={query}
          page={page}
          count={all.length}
        />
        <ServiceGrid services={shown} market={market} />
        <CatalogPagination
          market={market}
          query={query}
          page={page}
          pages={pages}
        />
      </section>
      <HowItWorks />
    </main>
  );
}
