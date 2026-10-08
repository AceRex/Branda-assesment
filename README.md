# Branda V2 — Service Ordering Interface

A responsive branding ecosystem built with Next.js App Router, React, TypeScript and Tailwind CSS 4. Includes twelve mock services across Digital, Gifts, Create, Studio and Prints.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/ng`). Development uses `.next-dev` and production builds use `.next`, so running a build cannot overwrite development chunks. Restart `npm start` after creating a new production build. Production: `npm run build && npm start`. Type checking: `npm run typecheck`.

## Features

- Server-rendered catalog with shareable GET-based search, category, use case, industry, turnaround and sorting filters; eight results per page.
- Nigeria `/ng`, USA `/us`, UK `/uk`, Canada `/ca`, with visible country/currency selection and local hero copy. Market switching retains the current route. Product prices use illustrative conversion factors rather than live exchange rates.
- Static service detail routes with individual titles, descriptions and Open Graph images, gallery controls, service inclusions, variation selection, quantity and cross-category recommendations.
- Persistent cart with line items distinguished by service and option; add, remove, quantity controls and recalculated subtotal, illustrative tax and total. Shared cart adapts its display currency when market changes.
- Itemized checkout and mock confirmation. No payment or real fulfillment integration.
- Loading skeletons, error retry, missing-service handling, search-empty and cart-empty states.
- Semantic landmarks, accessible labels, keyboard focus styles, reduced-motion support and responsive layouts.

## Architecture and choices

`lib/data.ts` defines typed services and market configuration. Its asynchronous `getServices()` function is the server-side data boundary; replace it with a cached API/database query without changing the page components. It currently resolves local mock data, so no external data service is required.

Catalog and detail pages are Server Components. The catalog composes focused hero, category, filter, result-toolbar and pagination components from `components/catalog/`. `ServiceGrid` is shared by the catalog and service recommendations. Cart rows, totals and confirmation live in `components/cart/`, while `CartView` coordinates cart state. `lib/catalog.ts` owns search, sorting, pagination and URL construction. Browser interaction is isolated into header, gallery, ordering and cart Client Components. React Context is sufficient for the small cart domain and avoids an additional state dependency. Local storage persists the cart after hydration; a readiness flag prevents empty-cart flashes and accidental storage overwrites. No data-fetching library is needed because Next.js handles the server data boundary.

Tailwind 4 is configured through its PostCSS plugin and imported globally. The visual theme uses reusable custom CSS classes and responsive breakpoints. Images are illustrative remote Unsplash photos and require internet access; production should replace these with service-specific, locally optimized imagery. Gallery views currently use different crops of the same product photograph.

## Demo assumptions

Prices, discounts, delivery estimates, currency factors and tax rates are illustrative assessment data. Variations share a service's base price. Physical items do not collect addresses in this summary-only checkout. Confirmation clears the shared cart after saving the displayed total in memory. Orders are not persisted to a server.

## Manual review checklist

1. Search `logo`; combine category and use case; submit filters; refresh and share the URL.
2. Sort by ascending/descending price, and navigate between result pages.
3. Switch markets and confirm currency and hero copy change.
4. Open a service, change its variation and quantity, add to cart; reload to verify persistence.
5. Add a different variation of the same service and verify separate line items.
6. Change quantities, remove items, inspect subtotal/tax/total, then confirm a demo order.
7. Check no-result searches, empty cart, invalid routes and mobile/tablet widths.

# Branda-assesment
