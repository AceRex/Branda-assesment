import CartView from "@/components/cart-view";
import { Market } from "@/lib/data";
export const metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};
/** Open the cart in review mode, where the customer can check each item before confirming the demo order. */
export default async function Checkout({
  params,
}: {
  params: Promise<{ market: Market }>;
}) {
  const { market } = await params;
  return <CartView market={market} checkout />;
}
