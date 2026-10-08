import { Check } from "lucide-react";

/** Present the shared service promises in a compact strip. */
export default function TrustStrip() {
  return (
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
  );
}
