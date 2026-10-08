import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Market, money } from "@/lib/data";
/** Keep the confirmed count and amount visible after the active cart has been cleared. */
export default function OrderConfirmation({
  market,
  snapshot,
}: {
  market: Market;
  snapshot: { count: number; total: number };
}) {
  return (
    <main className="confirmation">
      <div className="confirmation-icon">
        <Check size={34} />
      </div>
      <span className="eyebrow green">YOUR NEXT CHAPTER STARTS HERE</span>
      <h1>You’re all set.</h1>
      <p>
        Your mock order for {snapshot.count} item
        {snapshot.count === 1 ? "" : "s"} totaling{" "}
        <strong>{money(snapshot.total, market)}</strong> has been confirmed.
      </p>
      <p>
        This is a demo confirmation. No payment was collected or order
        submitted.
      </p>
      <Link className="button" href={`/${market}`}>
        Keep exploring <ArrowRight size={18} />
      </Link>
    </main>
  );
}
