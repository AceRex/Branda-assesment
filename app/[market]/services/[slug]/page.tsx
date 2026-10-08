import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Clock, ShieldCheck } from "lucide-react";
import { services, markets, Market, money, getServices } from "@/lib/data";
import OrderControls from "@/components/order-controls";
import Gallery from "@/components/gallery";
import ServiceCard from "@/components/service-card";
import type { Metadata } from "next";
type Props = { params: Promise<{ market: Market; slug: string }> };

/** Pre-render a page for every service in every country to make them indexable and prevent “not found” errors. */
export function generateStaticParams() {
  return Object.keys(markets).flatMap((market) =>
    services.map((s) => ({ market, slug: s.slug })),
  );
}
/** Provide unique SEO titles and descriptions for each service and country combination. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market, slug } = await params;
  if (!(market in markets)) notFound();
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Service not found" };
  return {
    title: `${s.name} in ${markets[market].name}`,
    description: s.description,
    openGraph: {
      title: `${s.name} | Branda`,
      description: s.description,
      images: [{ url: s.image, alt: s.name }],
    },
  };
}
/** Fetch and display a specific service, then suggest related services from other categories. */
export default async function Detail({ params }: Props) {
  const { market, slug } = await params;
  if (!(market in markets)) notFound();
  const all = await getServices();
  const s = all.find((x) => x.slug === slug);
  if (!s) notFound();

  // other categories to help customers put together a broader branding bundle.
  const related = all
    .filter((x) => x.slug !== slug && x.category !== s.category)
    .slice(0, 4);
  return (
    <main className="detail-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={`/${market}`}>All services</Link>
        <span>/</span>
        <Link href={`/${market}?category=${s.category}`}>{s.category}</Link>
        <span>/</span>
        <span>{s.name}</span>
      </nav>
      <div className="detail-grid">
        <Gallery image={s.image} name={s.name} color={s.color} />
        <section className="detail-info">
          <span className="eyebrow green">
            {s.category} · MADE FOR YOUR BRAND
          </span>
          <h1>{s.name}</h1>
          <p>{s.description}</p>
          <div className="detail-price">
            <span>Starting at</span>
            <strong>{money(s.price, market)}</strong>
            {s.oldPrice && <del>{money(s.oldPrice, market)}</del>}
          </div>
          <div className="detail-benefits">
            <span>
              <Clock size={16} /> {s.days}-day turnaround
            </span>
            <span>
              <ShieldCheck size={16} /> Expert quality
            </span>
          </div>
          <OrderControls service={s} market={market} />
        </section>
      </div>
      <section className="included">
        <div>
          <span className="eyebrow green">THE DETAILS MAKE THE DIFFERENCE</span>
          <h2>What’s included</h2>
          <p>Everything you need to make your next move.</p>
        </div>
        <ul>
          {s.includes.map((item) => (
            <li key={item}>
              <Check size={18} />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="related">
        <span className="eyebrow green">BETTER TOGETHER</span>
        <h2>Complete your brand story.</h2>
        <p>Thoughtful additions from across the Branda ecosystem.</p>
        <div className="service-grid">
          {related.map((service) => (
            <ServiceCard key={service.slug} service={service} market={market} />
          ))}
        </div>
      </section>
    </main>
  );
}
