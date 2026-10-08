import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  Monitor,
  Gift,
  PenTool,
  Camera,
  Printer,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { categories, getServices, Market, markets } from "@/lib/data";
import ServiceCard from "@/components/service-card";
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
const icons = [Monitor, Gift, PenTool, Camera, Printer];
/** Build the service catalog on the server using the filters in the URL, so a shared link shows the same results. */
export default async function Catalog({ params, searchParams }: Props) {
  const { market } = await params;
  if (!(market in markets)) notFound();
  const query = await searchParams;
  let all = await getServices();
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
  /** Keep the current filters when a category or page changes, replacing only the values passed in. */
  const url = (updates: Record<string, string>) => {
    const p = new URLSearchParams(
      Object.entries({ ...query, ...updates }).filter(([, v]) =>
        Boolean(v),
      ) as [string, string][],
    );
    return `/${market}?${p}`;
  };
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span /> YOUR VISION. OUR CRAFT.
          </span>
          <h1>
            Good brands
            <br />
            start <em>here.</em>
            <svg viewBox="0 0 210 18" aria-hidden="true">
              <path
                d="M3 12 Q90 -2 202 8 M20 17 Q120 4 185 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </h1>
          <p>
            From your first logo to your next big launch.
            <br className="desktop-break" /> Discover everything you need to
            make your brand, <strong>your brand.</strong>
          </p>
          <Link className="button" href="#services">
            Find your next big thing <ArrowUpRight size={18} />
          </Link>
          <div className="hero-proof">
            <span className="avatars">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=70&h=70&fit=crop"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=70&h=70&fit=crop"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=70&h=70&fit=crop"
                alt=""
              />
            </span>
            <div>
              <span className="stars">★★★★★</span>
              <small>Trusted by 2,000+ growing brands</small>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-label">A LITTLE IDEA. A BIG POSSIBILITY.</div>
          <div className="art-circle" />
          <img
            className="hero-photo"
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=90"
            alt="A curated collection of beautifully branded products"
          />
          <div className="floating-note">
            <Sparkles size={23} />
            <span>
              Make it yours.<small>We’ll make it happen.</small>
            </span>
          </div>
          <span className="art-sticker">
            Made with
            <br />
            <strong>✳ intention.</strong>
          </span>
          <span className="art-bottom">
            {markets[market].flag} {markets[market].copy}
          </span>
        </div>
      </section>
      <section className="trust-strip" id="why-branda">
        <span>
          <Check size={16} /> Vetted creative experts
        </span>
        <span>
          <Check size={16} /> Quality, down to the detail
        </span>
        <span>
          <Check size={16} /> Clear pricing. No surprises.
        </span>
        <span>
          <Check size={16} /> From idea to delivered
        </span>
      </section>
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
        <div className="results-bar">
          <span>
            Showing{" "}
            <strong>
              {all.length ? (page - 1) * 8 + 1 : 0}–
              {Math.min(page * 8, all.length)}
            </strong>{" "}
            of <strong>{all.length}</strong> services
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
        {shown.length ? (
          <div className="service-grid">
            {shown.map((s) => (
              <ServiceCard key={s.slug} service={s} market={market} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Search size={35} />
            <h2>No services found</h2>
            <p>Try a broader search or clear a filter to discover more.</p>
            <Link className="button" href={`/${market}`}>
              Explore all services
            </Link>
          </div>
        )}
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
      </section>
      <section className="closing" id="how-it-works">
        <div>
          <span className="eyebrow green">
            FROM A LITTLE IDEA TO SOMETHING GREAT
          </span>
          <h2>Your vision. A few simple steps.</h2>
          <p>
            Find your service, make it yours, and let our experts handle the
            rest.
          </p>
        </div>
        <div className="steps">
          <span>
            <b>01</b> Explore & choose
          </span>
          <span>
            <b>02</b> Customize & order
          </span>
          <span>
            <b>03</b> Bring it to life <Sparkles size={17} />
          </span>
        </div>
      </section>
    </main>
  );
}
