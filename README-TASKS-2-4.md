# Tasks 2–4: Performance, Architecture and Website Review

## Task 2: Frontend Performance and Problem Solving

### How I would investigate

I would start by measuring where Branda is slow rather than changing several things at once. I would use Lighthouse, browser DevTools, React Profiler and server logs, then compare the catalog, service pages and checkout on desktop and a slower mobile connection.

My first checks would be server response time, image sizes, JavaScript execution and repeated API calls. I would record a baseline so I can show whether each fix actually helped.

### Likely causes and my fixes

#### Slow initial load

- **What I would look for:** Slow backend calls, request waterfalls and uncached pages.
- **What I would do:** Parallelize independent reads, cache suitable public data and reduce blocking work.

#### Slow images

- **What I would look for:** Large originals, wrong dimensions and slow remote hosting.
- **What I would do:** Use reliable CDN image URLs with `next/image`, responsive sizing and caching, plus placeholders while images load.

#### Poor mobile performance

- **What I would look for:** Heavy scripts, animations and large downloads.
- **What I would do:** Reduce initial JavaScript, serve smaller images and test with CPU/network throttling.

#### Excessive requests

- **What I would look for:** Duplicate reads, requests on every keystroke and unnecessary polling.
- **What I would do:** Deduplicate, batch suitable reads and debounce live search.

#### Unnecessary renders

- **What I would look for:** Broad context updates, unstable props and expensive calculations.
- **What I would do:** Profile the affected component, narrow its state and memoize only where useful.

#### Large bundles

- **What I would look for:** Heavy dependencies and too much client-side code.
- **What I would do:** Analyze the production bundle, remove unused code and load optional features later.

### Images

I would host Branda’s photographs on a reliable image CDN and reference them by URL, keeping large image files out of the project. A remote URL alone does not reduce the image size downloaded by the customer, so I would combine it with `next/image`, accurate `sizes`, compression, modern formats such as WebP or AVIF, and caching. I would allow only approved image hosts through `remotePatterns`.

I would reserve image dimensions to prevent layout movement, prioritize the likely LCP image, and lazy load images farther down the page. Since this assessment uses Next.js 15, I would use `priority` where appropriate.

I would show skeletons while page content loads and image-level placeholders until individual images finish loading. This gives customers useful visual feedback and keeps the layout stable; it improves the waiting experience rather than making the downloads faster. A route-level loading skeleton does not automatically cover images that are still loading after the page appears.

Two remote service images failed during this assessment, so I replaced them with small local SVG illustrations. For production photographs, I would use reliable CDN URLs with a fallback image and a clear recovery state if loading fails.

### Lazy loading and code splitting

I would keep the main service content available immediately and dynamically import heavier optional features, such as a full-screen gallery or customization tool. Next.js already splits code by route, so I would avoid putting page-specific dependencies in the shared layout. I would organize the interface into small, focused, reusable components so page files stay easy to read and maintain. I would use dynamic imports specifically for heavier features that customers do not need immediately; organizing components into separate files does not require lazy loading each one.

### Caching and API requests

I would cache public service content with an explicit freshness policy, using fetch caching, timed revalidation or on-demand invalidation when content changes. I would use CDN and browser caching for versioned assets, while keeping personal cart and checkout data out of shared caches.

My cache keys would include the market and any filters that change the response. I would verify fresh prices before accepting a real order.

To reduce requests, I would reuse matching server reads, fetch independent data in parallel, batch related reads and request only the required fields and page. For live search, I would debounce input and cancel outdated requests. The assessment currently uses form submission, which already avoids a request on every keystroke.

### Components and bundles

I kept the catalog and service information in Server Components, with Client Components for the cart, gallery and ordering controls. I would keep that separation as the product grows.

If rendering becomes expensive, I would use React Profiler before adding `React.memo`, `useMemo` or `useCallback`. I would also narrow shared context updates and keep temporary state close to the control using it.

I would inspect the production bundle with a bundle analyzer, remove unused dependencies, use tree-shakeable imports and defer nonessential third-party scripts. Smaller downloads help, but I would also measure how long the browser spends executing the code.

### Rendering choices

I would use SSG for stable public pages, ISR for content that changes occasionally, and SSR for request-specific or fresh information. I would keep browser-dependent interactions on the client. With streaming and Suspense, I would let slower sections such as recommendations arrive after the important content instead of holding up the whole page.

### Mobile and Core Web Vitals

I would test readable layouts, touch targets, image loading and interactions on mobile devices. I would avoid expensive effects, respect reduced-motion settings and reserve space for images and loading states.

My Core Web Vitals targets would be LCP at or below 2.5 seconds, INP at or below 200 milliseconds and CLS at or below 0.1, measured at the 75th percentile. I would improve LCP through faster responses and image loading, INP through less main-thread work, and CLS by preventing unexpected layout movement.

I would repeat the same tests after each change and monitor real-user results after deployment. I would also check that prices, market selection and checkout still work correctly.

## Task 3: Code Quality and Architecture

I separated the storefront pages, reusable components and typed business logic. I also outlined how the same structure can accommodate content pages and role-based dashboards as the product grows.

### Folder structure I implemented

```t
app/
  layout.tsx                  # Shared cart provider and default metadata
  [market]/
    layout.tsx                # Country validation, header and footer
    page.tsx                  # Server-rendered catalog
    services/[slug]/page.tsx  # Service details and metadata
    cart/page.tsx
    checkout/page.tsx
    loading.tsx
    error.tsx
components/
  catalog/                    # Hero, categories, filters and pagination
  cart/                       # Cart rows, summary and confirmation
  service-card.tsx
  service-grid.tsx            # Shared by catalog and recommendations
  cart-provider.tsx           # Shared browser cart state
lib/
  data.ts                     # Typed services and market configuration
  catalog.ts                  # Search, sorting and URL helpers
```

- **Components:** I split the longer catalog and cart views into focused components with typed props. I reused the service grid across the catalog and recommendations, and kept filtering rules in `lib/catalog.ts`. I kept component organization separate from dynamic loading; this project did not require heavy optional features to be dynamically imported.
- **Routing and layouts:** I created `/ng`, `/us`, `/uk` and `/ca` routes with a shared market layout and dynamic service pages. I outlined route groups such as `(storefront)`, `(content)` and `(dashboard)` for future sections; those groups are not part of the current implementation.
- **State management:** I loaded service data in Server Components and used local state for interactive controls. I shared the cart through React Context and restored it from local storage inside `useEffect`, so browser storage was not accessed during server rendering.
- **API and service layer:** I placed mock data behind the asynchronous `getServices()` function and kept market settings in one module. This gave the pages a clear data boundary for a future API. I did not add a live backend or production cache policy to the assessment.
- **Forms and validation:** I used GET forms for shareable search, filters and sorting, and constrained quantities to 1–999. I identified React Hook Form and Zod as options for future address and account forms, with server-side validation for real orders; those libraries were not needed for the implemented controls.
- **Error handling:** I added loading skeletons, a retryable route error boundary, missing-page handling and separate empty-search and empty-cart states.
- **Authentication and roles:** I documented an approach using social login, secure sessions and server-side permission checks for protected pages and sensitive endpoints. Authentication, user accounts and role-based dashboards were outside the implemented ordering assessment.
- **Markets and localization:** I centralized country names, currencies, demo conversion factors, tax rates and hero copy. I formatted prices with `Intl.NumberFormat`, added country-specific catalog metadata and language alternatives, and generated metadata for each service. Live pricing, checkout price validation, canonical URLs and a sitemap remain production extensions.
- **Responsive design:** I used Tailwind and responsive CSS to adapt the navigation, grids, service pages and checkout across screen sizes. I included labelled controls, image descriptions, keyboard focus styles and reduced-motion support, and checked the interface in the browser.
- **Maintainability and testing:** I used strict TypeScript, Prettier, clear file names and plain-language comments. I documented setup and architecture, passed TypeScript and production-build checks, and verified ordering and confirmation in the browser. I did not add an automated unit or end-to-end test suite.
- **Git workflow:** I documented the intended team workflow: focused branches, small commits, reviewed pull requests, CI checks and preview deployments. This workspace was not initialized as a Git repository, so I did not claim to have completed that workflow here.

## Task 4: Website and Product Review

Reviewed [Branda’s live homepage](https://branda.com.ng/) on 7 October 2026 at desktop and 390px mobile widths. These are visual and markup observations, not a measured performance audit or a complete checkout review.

### Three things working well

1. The homepage communicates the breadth of branding services and gives visitors a prominent quote CTA.
2. Client logos and press links provide visible trust signals.
3. The header adapts to mobile with a compact logo, menu, search and cart area; the main content stacks vertically.

### Five areas to improve

1. **Navigation:** Long desktop menu labels crowd the search/contact area. Organize discovery around Digital, Gifts, Create, Studio and Prints, with clear active states.
2. **Mobile readability:** Long centered paragraphs make the homepage difficult to scan. Use shorter copy, readable sections and a stable hero headline instead of continually changing text.
3. **Accessibility:** The inspected homepage has no H1, and several long body-text blocks are marked as H2/H3 headings. Menu/search controls also appear as generic elements in the accessibility snapshot. Use semantic headings and properly labelled, keyboard-operable controls.
4. **UI consistency:** The homepage mixes quote, shop and specialized-service journeys with different CTA wording and visual treatments. A shared component system would make the next action clearer.
5. **Market and contact experience:** The reviewed header shows Naira without a visible country selector. A footer phone link points to `/+2348026101233` rather than a `tel:` URL. Add an explicit market selector and correct contact links.

The image-heavy hero, changing headline and carousels are sensible areas to investigate for page speed and mobile CPU cost. I would measure LCP, INP, CLS and request sizes before calling them performance failures. I did not verify every breakpoint, browser or keyboard journey.

### Three practical priorities for V2

1. **Simplify discovery:** Build an accessible, mobile-first service catalog around the five categories, with search, URL filters and consistent ordering CTAs.
2. **Make markets explicit:** Add `/ng`, `/us`, `/uk` and `/ca`, country/currency selection, market-specific pricing and delivery information, plus localized metadata and `hreflang`.
3. **Improve performance and consistency:** Use Server Components for public content, optimize images, cache appropriate data, and introduce shared accessible components. Track Core Web Vitals to validate the results.
