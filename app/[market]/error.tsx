"use client";
/** Retry when this part of the storefront fails to load; reset asks Next.js to render it again. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="empty">
      <h1>A little hiccup.</h1>
      <p>We couldn’t load this page. Please try again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
