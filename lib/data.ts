/** Keep country names, currencies, hero copy, and demo pricing rules together so each storefront stays consistent. */
export const markets = {
  ng: {
    name: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    locale: "en-NG",
    factor: 1500,
    tax: 0.075,
    city: "Lagos",
    copy: "From Lagos to everywhere. Bring your brand to life.",
  },
  us: {
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    locale: "en-US",
    factor: 1,
    tax: 0.08,
    city: "New York",
    copy: "Big ideas. Made for the way America builds.",
  },
  uk: {
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    locale: "en-GB",
    factor: 0.78,
    tax: 0.2,
    city: "London",
    copy: "Distinctive ideas. Beautifully made in your world.",
  },
  ca: {
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    locale: "en-CA",
    factor: 1.37,
    tax: 0.13,
    city: "Toronto",
    copy: "Your next big idea starts right here.",
  },
};
export type Market = keyof typeof markets;
/** Use the same five categories throughout the catalog and its navigation. */
export const categories = [
  "Digital",
  "Gifts",
  "Create",
  "Studio",
  "Prints",
] as const;
/** Describe the information each service needs for its card, detail page, and ordering controls. */
export type Service = {
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  badge?: string;
  popularity: number;
  useCase: string;
  industry: string;
  days: number;
  description: string;
  includes: string[];
  options: string[];
};
/** Build a consistent Unsplash image URL from a photo ID, with a bounded size and quality. */
const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
/** These mock services let the assessment run without an API or database. */
export const services: Service[] = [
  {
    slug: "brand-identity",
    name: "Brand identity design",
    category: "Digital",
    price: 120,
    oldPrice: 150,
    image: "/brand-identity.svg",
    color: "#ead6f3",
    badge: "Bestseller",
    popularity: 99,
    useCase: "Launch a brand",
    industry: "All industries",
    days: 7,
    description:
      "A brand that feels unmistakably you. Build a thoughtful visual identity that connects your story with the people who matter.",
    includes: [
      "3 original logo concepts",
      "Primary and secondary logo files",
      "Color palette and typography system",
      "Brand guidelines PDF",
      "2 rounds of refinements",
    ],
    options: ["Essential", "Complete brand kit"],
  },
  {
    slug: "branded-mugs",
    name: "Custom branded mugs",
    category: "Gifts",
    price: 8,
    image: photo("photo-1514228742587-6b1558fcca3d"),
    color: "#eddfce",
    badge: "Popular",
    popularity: 96,
    useCase: "Gift & delight",
    industry: "Hospitality",
    days: 5,
    description:
      "Make every coffee break a little more memorable. Quality ceramic mugs, thoughtfully printed with your brand.",
    includes: [
      "Premium ceramic mug",
      "Full-color brand printing",
      "Individual protective packaging",
      "Digital proof before production",
    ],
    options: ["White ceramic", "Black ceramic"],
  },
  {
    slug: "business-cards",
    name: "Premium business cards",
    category: "Prints",
    price: 25,
    oldPrice: 30,
    image: "/business-cards.svg",
    color: "#dce7dc",
    badge: "Save 17%",
    popularity: 95,
    useCase: "Launch a brand",
    industry: "Professional services",
    days: 3,
    description:
      "Leave a lasting first impression with beautifully tactile business cards. Crisp printing and a substantial finish, down to the last detail.",
    includes: [
      "100 business cards per pack",
      "350gsm premium cardstock",
      "Double-sided full-color printing",
      "Print-ready artwork review",
    ],
    options: ["Matte finish", "Gloss finish"],
  },
  {
    slug: "social-media-kit",
    name: "Social media design kit",
    category: "Digital",
    price: 45,
    image: photo("photo-1611162617474-5b21e879e113"),
    color: "#f3dbd1",
    popularity: 90,
    useCase: "Grow online",
    industry: "Retail & ecommerce",
    days: 3,
    description:
      "Show up consistently and confidently. A cohesive set of social templates designed around your brand and your audience.",
    includes: [
      "12 editable post templates",
      "6 story templates",
      "Profile and cover graphics",
      "Canva source files",
    ],
    options: ["Instagram kit", "Multi-platform kit"],
  },
  {
    slug: "product-photography",
    name: "Product photography",
    category: "Studio",
    price: 80,
    image: photo("photo-1608571423902-eed4a5ad8108"),
    color: "#e8e5da",
    badge: "Staff pick",
    popularity: 88,
    useCase: "Grow online",
    industry: "Retail & ecommerce",
    days: 7,
    description:
      "Let your product do the talking. Clean, art-directed photography for your shop, campaigns, and everywhere in between.",
    includes: [
      "5 professionally retouched images",
      "Studio lighting and styling",
      "Web and print resolution exports",
      "One product per session",
    ],
    options: ["Clean background", "Lifestyle styling"],
  },
  {
    slug: "custom-packaging",
    name: "Custom packaging design",
    category: "Create",
    price: 65,
    image: photo("photo-1607082348824-0a96f2a4b9da"),
    color: "#e5dcd0",
    popularity: 86,
    useCase: "Launch a brand",
    industry: "Retail & ecommerce",
    days: 7,
    description:
      "Turn the unboxing into an experience. Packaging designed to make your brand feel as good as the product inside.",
    includes: [
      "One packaging design concept",
      "Production-ready dieline",
      "3D packaging mockup",
      "2 rounds of revisions",
    ],
    options: ["Product box", "Mailer box"],
  },
  {
    slug: "event-backdrop",
    name: "Event backdrops",
    category: "Prints",
    price: 100,
    image: photo("photo-1519167758481-83f550bb49b3"),
    color: "#eee0cb",
    popularity: 84,
    useCase: "Make an event",
    industry: "Hospitality",
    days: 5,
    description:
      "Set the scene for something special. A vibrant, professionally printed backdrop that puts your brand at the center.",
    includes: [
      "High-resolution fabric printing",
      "Artwork quality check",
      "Carrying bag",
      "Setup instructions",
    ],
    options: ["6 × 6 ft", "8 × 8 ft"],
  },
  {
    slug: "branded-tote",
    name: "Everyday branded totes",
    category: "Gifts",
    price: 12,
    image: photo("photo-1590874103328-eac38a683ce7"),
    color: "#e5e6d9",
    badge: "Eco-friendly",
    popularity: 82,
    useCase: "Gift & delight",
    industry: "All industries",
    days: 5,
    description:
      "Your brand, out in the world. Reusable cotton totes for thoughtful gifting and everyday adventures.",
    includes: [
      "Natural cotton tote",
      "Single-sided brand printing",
      "Reinforced handles",
      "Digital production proof",
    ],
    options: ["Natural cotton", "Black cotton"],
  },
  {
    slug: "website-design",
    name: "Business website design",
    category: "Digital",
    price: 250,
    image: photo("photo-1460925895917-afdab827c52f"),
    color: "#dfe4ed",
    popularity: 80,
    useCase: "Grow online",
    industry: "Professional services",
    days: 14,
    description:
      "A welcoming digital home for your brand. A responsive website designed to turn curious visitors into loyal customers.",
    includes: [
      "5 custom-designed pages",
      "Responsive layouts",
      "Basic search engine optimization",
      "Design source files",
    ],
    options: ["Business website", "Portfolio website"],
  },
  {
    slug: "creative-direction",
    name: "Creative direction session",
    category: "Create",
    price: 60,
    image: photo("photo-1455390582262-044cdead277a"),
    color: "#e9dcca",
    popularity: 78,
    useCase: "Launch a brand",
    industry: "All industries",
    days: 1,
    description:
      "Get a clear direction for your next chapter. A focused creative session to help turn your ideas into an actionable brand story.",
    includes: [
      "60-minute discovery call",
      "Visual direction moodboard",
      "Brand positioning notes",
      "Action plan PDF",
    ],
    options: ["Discovery session", "Campaign session"],
  },
  {
    slug: "portrait-session",
    name: "Brand portrait session",
    category: "Studio",
    price: 95,
    image: photo("photo-1506794778202-cad84cf45f1d"),
    color: "#e1ddd4",
    popularity: 75,
    useCase: "Grow online",
    industry: "Professional services",
    days: 5,
    description:
      "Put a face to your brand. Approachable, polished portraits for founders, teams, and creative professionals.",
    includes: [
      "30-minute studio session",
      "5 retouched portraits",
      "Two outfit changes",
      "High-resolution digital delivery",
    ],
    options: ["Individual portrait", "Team portraits"],
  },
  {
    slug: "branded-notebooks",
    name: "Custom brand notebooks",
    category: "Gifts",
    price: 10,
    image: photo("photo-1531346878377-a5be20888e57"),
    color: "#e4d3c5",
    popularity: 73,
    useCase: "Gift & delight",
    industry: "Professional services",
    days: 5,
    description:
      "A good idea deserves a beautiful place to start. Custom notebooks made for your team and your next big thought.",
    includes: [
      "A5 hardcover notebook",
      "80 lined pages",
      "Custom cover branding",
      "Ribbon bookmark",
    ],
    options: ["Cream cover", "Charcoal cover"],
  },
];
/** Convert a base price with the market’s demo factor, then format it using the local currency conventions. */
export function money(value: number, market: Market) {
  const m = markets[market];
  return new Intl.NumberFormat(m.locale, {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: market === "ng" ? 0 : 2,
  }).format(value * m.factor);
}
/** Provide the server pages with mock service data. This is the place to add an API or database query later. */
export async function getServices() {
  return services;
}
