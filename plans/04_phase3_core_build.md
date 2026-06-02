# Phase 3 — Core Application Build

> **Hat:** Senior Frontend Engineer
> **Goal:** Turn the content schema (Phase 1) and design system (Phase 2) into a fast, statically-generated Next.js app.
> **Duration:** Weeks 3–6 (parallel with content authoring)

---

## Objectives

1. Build-time content pipeline: read JSON → validate (Zod) → generate static pages.
2. Render every core screen as **SSG** (no server needed → free, fast, offline-able).
3. SEO so people find rights via Google (a primary acquisition channel).

---

## 1. Rendering Strategy

| Page               | Strategy                                                                      | Why                                                       |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------- |
| Home, Module, Card | **SSG** (`generateStaticParams`)                                              | Content is static at build; instant + cacheable + offline |
| Search             | **Client component** over a prebuilt index                                    | Works offline, no backend                                 |
| Legal pages        | **SSG**                                                                       | Static                                                    |
| Content updates    | **Rebuild on merge** (Vercel) or **ISR** if you later want timed revalidation | v1: rebuild-on-merge is simplest                          |

> No SSR, no API routes in v1. Everything is static HTML + a small JS bundle. This is what makes the $0 / offline / fast promise real.

---

## 2. Build-Time Content Loader (`src/lib/content/`)

```ts
// loadContent.ts (runs at build)
// 1. Glob content/modules/**/cards/*.json
// 2. Parse + RightsCard.safeParse each (Zod, from Phase 1)
// 3. FAIL THE BUILD on any invalid card  ← same gate as CI validator
// 4. In production build, EXCLUDE any card whose verification !== "verified"
//    (drafts render only in preview deploys, with a visible watermark)
// 5. Return typed, indexed collections: byId, byModule, bySituationTag
```

- Single source of truth: the same Zod schema validates in CI **and** at build. A card can never render unless it parses and is `verified`.
- Build output logs a content report: # cards per module, # verified vs in-review, oldest `lastVerified`.

---

## 3. Routing (App Router)

```
src/app/
└── [locale]/                         # "fil" | "en" (default fil)
    ├── page.tsx                      # Home: situation tiles
    ├── module/[moduleSlug]/page.tsx  # Module → card list
    ├── card/[cardId]/page.tsx        # Rights Card detail (core)
    ├── situation/[tagSlug]/page.tsx  # situation → filtered cards
    ├── search/page.tsx               # client search
    ├── emergency/page.tsx            # emergency mode
    └── (legal)/about|privacy|terms|content-policy|complaints/page.tsx
```

- **Locale strategy:** path-based `[locale]` for SEO (Google indexes both `/fil/...` and `/en/...`) + `hreflang` tags. Language toggle swaps the path and persists choice.
- `generateStaticParams` enumerates all verified card ids × locales → fully static.
- `generateMetadata` per card for SEO (title = the right, description = whatThisMeans).

---

## 4. Component Build Order (schema-driven)

1. **`<RightsCard>`** — the keystone. Maps 1:1 to schema fields: `right`, `whatThisMeans`/`eli5`, `theyCannot[]` (red), `youCan[]` (green), `citations[]`, `lastVerified`. Wrap each content block in the correct `lang` attribute.
2. **`<CitationLink>`** — renders `label`, links `sourceUrl`, offline fallback to `quotedText`.
3. **`<LanguageToggle>`** + **`<Eli5Toggle>`** — context-backed, persisted.
4. **`<SituationTile>`**, **`<ModuleList>`**, **`<CardList>`**.
5. **`<DisclaimerBar>`** — persistent (Phase 5 copy).
6. **`<BottomNav>`** — Home / Search / Emergency.

State management: **deliberately minimal** — locale + ELI5 in React Context + persisted to localStorage/cookie. No Redux, no server state. URL is the source of truth for navigation.

---

## 5. SEO & Discoverability

- Per-page `generateMetadata`: title, description, canonical, `hreflang` (fil/en), Open Graph.
- **Structured data** (JSON-LD): `FAQPage` / `Article` per card — strong fit since each card is essentially "What are my rights when X?" (rich-result eligible).
- `sitemap.ts` (all verified cards × locales) + `robots.ts`.
- Human-readable slugs (situation-based) for shareability and search.
- Static OG image per card (or a templated default) — generated at build, not runtime.

---

## 6. Testing

| Layer            | Tool                | Covers                                                                                    |
| ---------------- | ------------------- | ----------------------------------------------------------------------------------------- |
| Unit             | Vitest              | content loader, Zod gate, index builders                                                  |
| Component        | Testing Library     | RightsCard renders all schema sections; ELI5 toggle swaps copy; citation offline fallback |
| Content contract | Vitest              | "every verified card has reachable structure"; snapshot of render                         |
| a11y (component) | jest-axe / axe-core | RightsCard has no AA violations                                                           |
| e2e              | Playwright          | navigate situation→card, toggle language, search (Phase 4)                                |

> Component test that matters most: **a verified card always renders a citation and a disclaimer.** This is the UI-level guarantee of the legal rule.

---

## Deliverables

- [ ] Build-time content loader + validator integrated (shared schema with CI)
- [ ] All core routes statically generated for both locales
- [ ] `<RightsCard>` + supporting components, schema-driven
- [ ] SEO metadata, JSON-LD, sitemap, robots
- [ ] Test suite green; axe clean on RightsCard

## Definition of Done

`pnpm build` produces a fully static site of all **verified** cards in both languages, every card shows its citation + last-verified + disclaimer, and navigation works with zero backend calls.

## Risks & Mitigations

| Risk                                    | Mitigation                                                    |
| --------------------------------------- | ------------------------------------------------------------- |
| Draft content leaking to prod           | Build excludes non-`verified`; CI gate double-checks          |
| Bundle bloat hurts 3G load              | Server Components by default; ship JS only for toggles/search |
| Bilingual SEO duplicate-content penalty | Proper `hreflang` + canonical per locale                      |
