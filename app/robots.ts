import type { MetadataRoute } from "next";
/** Let search engines discover the storefront, while keeping personal cart and checkout pages out of search results. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/*/cart", "/*/checkout"] },
  };
}
