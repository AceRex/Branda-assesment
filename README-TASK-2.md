# Task 2: My Approach to Frontend Performance

## How I would investigate

I would start by measuring where Branda is slow rather than changing several things at once. I would use Lighthouse, browser DevTools, React Profiler and server logs, then compare the catalog, service pages and checkout on desktop and a slower mobile connection.

My first checks would be server response time, image sizes, JavaScript execution and repeated API calls. I would record a baseline so I can show whether each fix actually helped.

## Likely causes and my fixes

### Slow initial load

- **What I would look for:** Slow backend calls, request waterfalls and uncached pages.
- **What I would do:** Parallelize independent reads, cache suitable public data and reduce blocking work.

### Slow images

- **What I would look for:** Large originals, wrong dimensions and slow remote hosting.
- **What I would do:** Use reliable CDN image URLs with `next/image`, responsive sizing and caching, plus placeholders while images load.

### Poor mobile performance

- **What I would look for:** Heavy scripts, animations and large downloads.
- **What I would do:** Reduce initial JavaScript, serve smaller images and test with CPU/network throttling.

### Excessive requests

- **What I would look for:** Duplicate reads, requests on every keystroke and unnecessary polling.
- **What I would do:** Deduplicate, batch suitable reads and debounce live search.

### Unnecessary renders

- **What I would look for:** Broad context updates, unstable props and expensive calculations.
- **What I would do:** Profile the affected component, narrow its state and memoize only where useful.

### Large bundles

- **What I would look for:** Heavy dependencies and too much client-side code.
- **What I would do:** Analyze the production bundle, remove unused code and load optional features later.

## Images

I would host Branda’s photographs on a reliable image CDN and reference them by URL, keeping large image files out of the project. A remote URL alone does not reduce the image size downloaded by the customer, so I would combine it with `next/image`, accurate `sizes`, compression, modern formats such as WebP or AVIF, and caching. I would allow only approved image hosts through `remotePatterns`.

I would reserve image dimensions to prevent layout movement, prioritize the likely LCP image, and lazy load images farther down the page. Since this assessment uses Next.js 15, I would use `priority` where appropriate.

I would show skeletons while page content loads and image-level placeholders until individual images finish loading. This gives customers useful visual feedback and keeps the layout stable; it improves the waiting experience rather than making the downloads faster. A route-level loading skeleton does not automatically cover images that are still loading after the page appears.

Two remote service images failed during this assessment, so I replaced them with small local SVG illustrations. For production photographs, I would use reliable CDN URLs with a fallback image and a clear recovery state if loading fails.

## Lazy loading and code splitting

I would keep the main service content available immediately and dynamically import heavier optional features, such as a full-screen gallery or customization tool. Next.js already splits code by route, so I would avoid putting page-specific dependencies in the shared layout. I would organize the interface into small, focused, reusable components so page files stay easy to read and maintain. I would use dynamic imports specifically for heavier features that customers do not need immediately; organizing components into separate files does not require lazy loading each one.

## Caching and API requests

I would cache public service content with an explicit freshness policy, using fetch caching, timed revalidation or on-demand invalidation when content changes. I would use CDN and browser caching for versioned assets, while keeping personal cart and checkout data out of shared caches.

My cache keys would include the market and any filters that change the response. I would verify fresh prices before accepting a real order.

To reduce requests, I would reuse matching server reads, fetch independent data in parallel, batch related reads and request only the required fields and page. For live search, I would debounce input and cancel outdated requests. The assessment currently uses form submission, which already avoids a request on every keystroke.

## Components and bundles

I kept the catalog and service information in Server Components, with Client Components for the cart, gallery and ordering controls. I would keep that separation as the product grows.

If rendering becomes expensive, I would use React Profiler before adding `React.memo`, `useMemo` or `useCallback`. I would also narrow shared context updates and keep temporary state close to the control using it.

I would inspect the production bundle with a bundle analyzer, remove unused dependencies, use tree-shakeable imports and defer nonessential third-party scripts. Smaller downloads help, but I would also measure how long the browser spends executing the code.

## Rendering choices

I would use SSG for stable public pages, ISR for content that changes occasionally, and SSR for request-specific or fresh information. I would keep browser-dependent interactions on the client. With streaming and Suspense, I would let slower sections such as recommendations arrive after the important content instead of holding up the whole page.

## Mobile and Core Web Vitals

I would test readable layouts, touch targets, image loading and interactions on mobile devices. I would avoid expensive effects, respect reduced-motion settings and reserve space for images and loading states.

My Core Web Vitals targets would be LCP at or below 2.5 seconds, INP at or below 200 milliseconds and CLS at or below 0.1, measured at the 75th percentile. I would improve LCP through faster responses and image loading, INP through less main-thread work, and CLS by preventing unexpected layout movement.

I would repeat the same tests after each change and monitor real-user results after deployment. I would also check that prices, market selection and checkout still work correctly.
