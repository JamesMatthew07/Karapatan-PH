# Phase 0 — Foundations & Project Setup

> **Hat:** Senior Software Engineer
> **Goal:** A clean, reproducible, well-tooled Next.js project that the whole team can build on without yak-shaving later.
> **Duration:** ~Week 1 (1–3 days of focused setup)

---

## Objectives

1. Pin the exact stack and versions (no "latest" drift).
2. Stand up the repo, tooling, CI/CD, and conventions.
3. Deploy a "hello world" to Vercel so the pipeline is proven on day one.
4. Establish the directory layout that Phases 1–4 will fill in.

---

## 1. Pinned Stack

| Layer               | Choice                                       | Version (pin in `package.json`) | Notes                                                |
| ------------------- | -------------------------------------------- | ------------------------------- | ---------------------------------------------------- |
| Framework           | **Next.js (App Router)**                     | `15.x`                          | SSG + ISR, PWA-friendly, great SEO                   |
| Runtime             | **React**                                    | `19.x`                          | Ships with Next 15                                   |
| Language            | **TypeScript**                               | `5.x` (strict)                  | Non-negotiable for the content schema                |
| Styling             | **Tailwind CSS**                             | `v4.x`                          | Mobile-first utility classes                         |
| Schema validation   | **Zod**                                      | `3.x`                           | Validates every rights card at build time            |
| Content format      | **JSON** (per-card files) + **MDX** optional | —                               | See Phase 1 data model                               |
| Search              | **Fuse.js**                                  | `7.x`                           | Client-side, offline-capable                         |
| i18n                | **next-intl**                                | latest stable                   | UI strings; content carries its own bilingual fields |
| PWA / SW            | **Serwist** (`@serwist/next`)                | latest                          | Modern successor to next-pwa                         |
| Icons               | **lucide-react**                             | latest                          | Tree-shakeable, consistent                           |
| Testing (unit)      | **Vitest**                                   | latest                          | Fast, Vite-native                                    |
| Testing (component) | **@testing-library/react**                   | latest                          |                                                      |
| Testing (e2e)       | **Playwright**                               | latest                          | Offline + mobile emulation                           |
| Lint/format         | **ESLint** + **Prettier**                    | latest                          | Or Biome if you prefer one tool                      |
| Git hooks           | **Husky** + **lint-staged**                  | latest                          | Pre-commit lint/format/typecheck                     |
| Hosting             | **Vercel** (free)                            | —                               | Preview deploys per PR                               |
| Analytics           | **Plausible** or **Umami**                   | —                               | Privacy-respecting; configured in Phase 6            |
| Backend (v2 only)   | **Supabase**                                 | —                               | NOT used in v1                                       |

> **Engineer's note:** Do not introduce Supabase, a database, or any server-side mutation in v1. The entire content set ships as static files. Zero backend = zero server cost + 100% offline-capable + nothing to breach.

---

## 2. Repository & Directory Layout

Single Next.js app (no monorepo needed for v1).

```
KarapatanPH/
├── plans/                      # these planning docs
├── content/                    # ← the legal content lives here (Phase 1)
│   ├── modules/
│   │   ├── police/
│   │   │   ├── _module.json    # module metadata
│   │   │   └── cards/
│   │   │       └── warrantless-search-phone.json
│   │   ├── lto/
│   │   ├── labor/
│   │   ├── barangay/
│   │   └── consumer/
│   ├── situations/             # situation-first entry points
│   └── schema/
│       ├── card.schema.ts      # Zod schema (source of truth)
│       └── card.types.ts       # generated/derived TS types
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/
│   │   │   ├── page.tsx        # home (situation-first)
│   │   │   ├── module/[slug]/
│   │   │   ├── card/[slug]/
│   │   │   ├── search/
│   │   │   ├── emergency/
│   │   │   └── (legal)/        # about, privacy, terms, content-policy
│   │   ├── layout.tsx
│   │   └── manifest.ts         # PWA manifest
│   ├── components/
│   ├── lib/
│   │   ├── content/            # build-time content loader + validator
│   │   ├── search/             # Fuse.js index builder
│   │   └── i18n/
│   ├── styles/
│   └── messages/               # UI string dictionaries (en.json, fil.json)
├── public/
│   ├── icons/                  # PWA icons
│   └── sw.js                   # generated service worker
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
├── scripts/
│   ├── validate-content.ts     # CI gate: every card valid + cited
│   └── check-links.ts          # external law-source link checker
├── .github/workflows/ci.yml
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json               # strict: true
└── package.json
```

---

## 3. Tooling & Quality Gates

### TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`. The content schema is the backbone — type safety here prevents whole classes of "card missing a citation" bugs.

### Lint / Format

- ESLint (next/core-web-vitals + a11y plugin `eslint-plugin-jsx-a11y`) + Prettier.
- **Accessibility linting is mandatory** — `jsx-a11y` rules set to `error`, not `warn`.

### Pre-commit (Husky + lint-staged)

Runs on staged files: `prettier --write`, `eslint --fix`, `tsc --noEmit`.

### Commit convention

- Conventional Commits (`feat:`, `fix:`, `content:`, `legal:`, `chore:`). A `content:` / `legal:` prefix makes content changes auditable in history (matters for "last verified" provenance).

---

## 4. CI/CD (GitHub Actions → Vercel)

`ci.yml` runs on every PR:

1. `pnpm install --frozen-lockfile`
2. `pnpm typecheck`
3. `pnpm lint`
4. **`pnpm validate-content`** ← fails the build if any card lacks a citation, source URL, both languages, or `last_verified`
5. `pnpm test` (unit + component)
6. `pnpm build`
7. Lighthouse CI budget check (perf/a11y thresholds — wired up fully in Phase 5)

Vercel auto-deploys a **preview URL per PR** (great for reviewers to see content rendered) and production on merge to `main`.

> **The content validator is the most important CI step.** It mechanically enforces the legal rule: no uncited content ships. See Phase 1 for the schema it validates against.

---

## 5. Git & Branching

- `main` = production (protected; PR + green CI required).
- `content/*` branches for content work, `feat/*` for code.
- Branch protection: no direct pushes to `main`; CI must pass.

---

## 6. Environment & Config

- `.env.example` committed; real `.env.local` gitignored.
- v1 needs almost no secrets (no API keys — AI is v2). Only analytics domain/site-id later.
- `next.config.ts`: enable `output: 'standalone'` consideration, image optimization config, Serwist plugin (Phase 4).

---

## Deliverables

- [ ] Repo initialized with the directory layout above
- [ ] All stack deps installed and **versions pinned**
- [ ] `tsconfig` strict; ESLint + Prettier + jsx-a11y configured
- [ ] Husky pre-commit hooks working
- [ ] GitHub Actions CI green on an empty "hello world"
- [ ] Vercel project connected; preview + prod deploys working
- [ ] `scripts/validate-content.ts` stub in place (filled in Phase 1)

## Definition of Done

A new contributor can `git clone`, `pnpm install`, `pnpm dev`, and open a working (empty) app; any PR they open gets linted, type-checked, content-validated, tested, and preview-deployed automatically.

## Risks & Mitigations

| Risk                               | Mitigation                                                           |
| ---------------------------------- | -------------------------------------------------------------------- |
| Version drift breaks builds later  | Pin versions + commit lockfile; Renovate/Dependabot weekly, reviewed |
| Over-engineering v1 with a backend | **Hard rule:** no DB/server in v1. Supabase is Phase 6/v2 only       |
| Tooling bikeshedding eats week 1   | Time-box setup to 3 days; this file IS the decision record           |
