import Link from "next/link";
import { Search } from "lucide-react";
import { Market, Service } from "@/lib/data";
import ServiceCard from "./service-card";
/** Display any service collection, or a helpful empty state when there are no matches. */
export default function ServiceGrid({
  services,
  market,
}: {
  services: Service[];
  market: Market;
}) {
  return services.length ? (
    <div className="service-grid">
      {services.map((s) => (
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
  );
}
