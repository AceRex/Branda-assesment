import Header from "@/components/header";
import { markets, Market } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
/** Tell Next.js which country folders to prepare when the app is built. */
export function generateStaticParams() {
  return Object.keys(markets).map((market) => ({ market }));
}
/** Check the country in the URL, then add its header and the shared footer around the page. */
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  if (!(market in markets)) notFound();
  return (
    <>
      <Header market={market as Market} />
      {children}
      <footer>
        <Link href={`/${market}`} className="logo">
          branda<span>✳</span>
        </Link>
        <p>Good brands start here.</p>
        <span>
          © {new Date().getFullYear()} Branda. Made for your next big thing.
        </span>
      </footer>
    </>
  );
}
