import { Sparkles } from "lucide-react";

/** Explain the ordering journey in three short steps. */
export default function HowItWorks() {
  return (
    <section className="closing" id="how-it-works">
      <div>
        <span className="eyebrow green">
          FROM A LITTLE IDEA TO SOMETHING GREAT
        </span>
        <h2>Your vision. A few simple steps.</h2>
        <p>
          Find your service, make it yours, and let our experts handle the rest.
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
  );
}
