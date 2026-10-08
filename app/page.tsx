import { redirect } from "next/navigation";
/** Send visitors to the Nigerian storefront when they open the site without choosing a market. */
export default function Home() {
  redirect("/ng");
}
