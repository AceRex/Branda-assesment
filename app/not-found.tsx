import Link from "next/link";
/** Give visitors a friendly way back to the catalog when a page or service does not exist. */
export default function NotFound() {
  return (
    <main className="empty">
      <h1>That possibility hasn’t arrived yet.</h1>
      <p>We couldn’t find this page.</p>
      <Link href="/ng" className="button">
        Explore services
      </Link>
    </main>
  );
}
