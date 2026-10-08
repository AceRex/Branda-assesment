import CartView from "@/components/cart-view";
import { Market } from "@/lib/data";
export const metadata = {
  title: "Your cart",
  robots: { index: false, follow: false },
};
/** Read the country from the route and show the shared cart with that country’s prices. */
export default async function Cart({
  params,
}: {
  params: Promise<{ market: Market }>;
}) {
  const { market } = await params;
  return <CartView market={market} />;
}
