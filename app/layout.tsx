import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
/** These defaults give every page a useful title and description unless it provides its own. */
export const metadata: Metadata = {
  title: {
    default: "Branda — Good brands start here",
    template: "%s | Branda",
  },
  description:
    "Discover thoughtful branding services, creative expertise, and beautifully made products for your brand.",
};
/** Wrap every page in the shared cart provider so items stay available as the customer moves around the site. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-lime-200 selection:text-green-950">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
