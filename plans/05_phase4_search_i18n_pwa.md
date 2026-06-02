# Phase 4 — Search, i18n, PWA & Offline

> **Hat:** Senior Frontend Engineer
> **Goal:** Make the app bilingual, searchable by situation, fully offline-capable, and fast on a cheap Android over 3G.
> **Duration:** Weeks 5–7

---

## 1. Internationalization (i18n)

Two distinct layers — don't conflate them:

| Layer                                 | Source                                            | Tool                                                           |
| ------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| **UI strings** (buttons, nav, labels) | `src/messages/{fil,en}.json`                      | **next-intl**                                                  |
| **Content** (the legal cards)         | bilingual fields in the JSON schema (`{fil, en}`) | custom resolver (no translation lib — both langs are authored) |

- Default locale **`fil`**; `en` available. Path-based (`/fil`, `/en`) for SEO (Phase 3).
- A `useLocale()` hook resolves the right field from any `Bilingual` object.
- First-launch language prompt; choice persisted; toggle everywhere.
- **`lang` attributes** on every content block so screen readers pronounce Filipino vs English correctly (accessibility + correctness).

> **Filipino search caveat:** Filipino is agglutinative and code-switches heavily ("Taglish"). Plan keyword/`situationTags` to include common spellings, Taglish variants, and root forms (e.g. "hinuli", "huli", "nahuli"). This is a _content_ responsibility, supported by the `keywords[]` field.

---

## 2. Search (Fuse.js — client-side, offline)

- **Prebuilt index at build time** from verified cards: searchable fields = `situationTags`, `keywords`, `right`, `whatThisMeans` (both languages).
- Ship the index as a static JSON asset; load lazily on the search route.
- Fuse config: fuzzy threshold tuned for typos and Taglish; **weight** `situationTags` and `keywords` highest (situation-first intent), `right` next, body lowest.
- Search works **fully offline** (index is cached by the SW).
- Empty/zero-result UX: suggest the 4 common situation tiles (Phase 2).
- No analytics on raw queries that could be sensitive (privacy — Phase 5); if measured at all, only aggregate counts.

---

## 3. PWA & Offline (Serwist)

### Manifest (`src/app/manifest.ts`)

- Name, short_name, theme/background color, maskable icons (192/512), `display: standalone`, `start_url`, FIL default.

### Service worker strategy (Serwist)

| Asset                              | Strategy                                                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| App shell (HTML/CSS/JS)            | **Precache** on install                                                                                               |
| Verified card pages + content JSON | **Precache** (core promise: all basic content offline)                                                                |
| Search index                       | Precache                                                                                                              |
| Law source URLs (external)         | **Network-only** (never cache third-party gov sites); offline → show cached `quotedText` + "connect to view full law" |
| OG images / icons                  | Cache-first                                                                                                           |

### Update flow

- On new deploy, SW updates in background; show a non-intrusive "Bagong nilalaman — i-refresh" (new content available) prompt. Never silently serve stale legal content without offering refresh — but also never block usage.
- Show `lastVerified` prominently so users always know content recency even offline.

### Install prompt

- Subtle "Add to Home Screen" hint (especially valuable for Persona 1 — app-like, offline, no data cost on revisit).

---

## 4. Performance Budget (the Persona-1 constraint)

> Target: **< 2s load on simulated 3G**, smooth on a low-end Android.

| Budget               | Target                                                                 |
| -------------------- | ---------------------------------------------------------------------- |
| Initial JS (gzipped) | ≤ ~100KB; prefer Server Components, ship JS only for toggles/search/SW |
| Fonts                | **System fonts only** (zero web-font download)                         |
| Images               | Minimal; SVG icons; any raster via `next/image` + AVIF/WebP, lazy      |
| LCP                  | < 2.5s on 3G (aim < 2s)                                                |
| CLS                  | < 0.1 (reserve space; no layout shift from toggles)                    |
| TBT                  | Low — minimal main-thread JS                                           |
| Lighthouse           | Perf ≥ 90, A11y ≥ 95, PWA pass — enforced in CI (Phase 5)              |

Techniques: Server Components by default, route-level code-splitting, defer the Fuse index until the search route, no render-blocking third-party scripts (privacy analytics loads async/deferred).

---

## 5. Read-Aloud (TTS) — design-ready, ship v2

- Use the browser **Web Speech API** (`speechSynthesis`) — free, on-device, offline-capable where the OS supports the voice.
- Card DOM is already clean/ordered (Phase 2), so a "🔊 Pakinggan" button can read `right → whatThisMeans → theyCannot → youCan` in the selected language.
- Caveat: Filipino voice availability varies by device; detect and gracefully hide if unsupported.

---

## Deliverables

- [ ] next-intl wired; UI strings in both languages; content resolver hook
- [ ] Path-based locales + hreflang verified
- [ ] Build-time Fuse search index; offline client search with situation weighting
- [ ] Serwist SW: precache content + shell + index; network-only external links
- [ ] Update-available prompt
- [ ] Performance budget met on simulated 3G (Lighthouse + WebPageTest)

## Definition of Done

With the network turned off after first visit, a user can open the app, browse all verified cards, switch languages, and search — all under the performance budget on a low-end device.

## Risks & Mitigations

| Risk                                 | Mitigation                                                                |
| ------------------------------------ | ------------------------------------------------------------------------- |
| Caching stale legal content silently | Visible `lastVerified` + update prompt; never cache external gov sources  |
| Filipino/Taglish search misses       | Rich `keywords[]` + situationTags with variants; tune Fuse threshold      |
| SW bugs brick the app                | Versioned SW, skipWaiting+clientsClaim carefully, e2e offline tests in CI |
| Bundle creep over time               | CI bundle-size budget fails the build on regression                       |
