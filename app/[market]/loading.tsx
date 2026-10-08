/** Show placeholder cards while a country page is loading, so the customer knows content is on the way. */
export default function Loading() {
  return (
    <main
      className="loading-page"
      aria-busy="true"
      aria-label="Loading services"
    >
      <div className="skeleton" style={{ height: 280 }} />
      <div className="service-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div className="skeleton" key={i} style={{ height: 320 }} />
        ))}
      </div>
    </main>
  );
}
