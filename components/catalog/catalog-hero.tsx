import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Market, markets } from "@/lib/data";

/** Introduce the storefront and show the message for the selected country. */
export default function CatalogHero({ market }: { market: Market }) {
  return (
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
          <br className="desktop-break" /> Discover everything you need to make
          your brand, <strong>your brand.</strong>
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
  );
}
