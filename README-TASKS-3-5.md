# Tasks 3–5: Architecture, Website Review and Short Answers

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

## Task 5: Short Answer Questions

These are concise draft answers. Questions about personal work history or strongest skills need the candidate’s own details before submission.

1. **Significant project and role:** I worked with Gopaddi as a frontend engineer, I contributed to a large code base and implemented a couple of features assigned to me. Basically I contributed mostly on the travel OS features . Here is a live link to the careers page I worked on [Gopaddi.com](https://www.gopaddi.com/en/careers)

2. **Strongest technologies:** React, React native, Next JS, Tailwind, Typescript etc. the above link provided is a NextJS project. I prefer Next JS because of the file routing and SEO advantage

3. **Rendering choices:** SSR for request-specific or fresh content; SSG for stable pages; ISR for public pages that change occasionally; client rendering for interactive or browser-dependent features.

4. **Server or Client Components:** Default to Server Components for data and content. Use Client Components for state, event handlers and browser APIs, keeping their boundaries small.

5. **Slow performance:** Measure with Lighthouse, DevTools and real-user data. Identify the bottleneck, fix it, and compare the same journey before and after.

6. **Reusable components:** I would build small, accessible components with clear props, compose them into features, and keep business logic separate from presentation. I would separate code organization from the decision to load a feature dynamically.

7. **API states:** Use loading skeletons, route error boundaries and clear empty states. Check response status and provide a retry when recovery is possible.

8. **Multi-market SEO:** Use country subfolders, localized titles/content, canonical URLs, reciprocal `hreflang` links and a sitemap covering indexable market pages.

9. **Screen sizes and browsers:** Use responsive layouts, test key breakpoints and real devices, and automate critical journeys across Chromium, Firefox and WebKit.

10. **Debugging tools:** Browser DevTools, React DevTools/Profiler, server logs, TypeScript.

11. **Core Web Vitals:** Improve LCP with fast responses and correctly loaded images; INP with less main-thread work; CLS by reserving space for images and dynamic content.

12. **Difficult bug:** I start by reproducing the issue and narrowing down when it happens. I check browser errors, network requests and server logs, then isolate the component or logic responsible. After fixing the root cause, I test the original scenario and related flows, and add a regression test where useful to prevent it from returning.

13. **Maintainable team code:** Agree on conventions, use typed interfaces, keep modules focused, review small pull requests, run CI checks and document important decisions.
