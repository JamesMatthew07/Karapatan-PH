# Content Acquisition & Hybrid Drafting (companion to Phase 1)

> **Hat:** Philippine Lawyer (lead) + Senior Software Engineer
> **Goal:** Define exactly _how_ card content is acquired and drafted under the **hybrid** model — fetch trusted source text, AI-assist the first draft, then human + legal review — without ever shipping unverified legal claims.
> Read alongside [`02_phase1_content_legal.md`](02_phase1_content_legal.md), which defines the schema and review gate this pipeline feeds.

---

## The one principle that governs everything here

> **An accurate source quote is NOT a verified card.**

The source fetcher guarantees the **citation is real** (verbatim, public-domain statute text + official permalink). It does **not** guarantee the **interpretation is correct**. The plain-language "they cannot / you can" lines are an _interpretation_ layered on top of the quote — and interpretation can be wrong even when the quote is perfect (missed exception, later amendment, dropped scope condition, controlling jurisprudence the statute text doesn't show).

That interpretation gap is closed by **one role only: the Layer-3 legal reviewer.** Not the source. Not the AI. Not the (non-lawyer) founder.

---

## Role split (given: founder has no legal background)

| Role                                                       | Owns                                                                                                                         | Does NOT own                              |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Source fetcher** (tooling)                               | Verbatim statute text, official permalink                                                                                    | Any interpretation                        |
| **AI (internal drafting tool)**                            | First-draft plain-language + bilingual text                                                                                  | Verification; never serves users          |
| **Founder (you)**                                          | Sourcing accuracy (quote matches source), plain-language quality, Taglish naturalness, no-specific-advice phrasing, UX/build | **Legal correctness** — cannot certify it |
| **Layer-3 reviewer (licensed lawyer / supervised clinic)** | Legal accuracy, scope, currency → moves card to `verified`                                                                   | —                                         |

**Consequence:** content volume must not outrun review capacity. Secure the reviewer before scaling generation.

---

## The acquisition pipeline

```
[1] LAW MANIFEST          [2] SOURCE FETCHER         [3] AI DRAFT            [4] HUMAN PASS          [5] LEGAL REVIEW
known provisions per   →  fetch verbatim text     →  grounded plain-      →  founder edits:      →  reviewer verifies
module (RA + section)     + official permalink,       language bilingual     accuracy of quote,     scope/currency/intent
                          cache locally               draft (state=draft)    language, no-advice    → state=verified
                                                       NEVER served live                              (publish unlocked)
```

### [1] Law manifest

A curated list (not a crawler target) of the exact provisions the 5 modules need — roughly 20–30 statutes/sections. Fields: `lawId`, `title`, `section`, official `sourceUrl`, target module(s). This doubles as the **law-change tracker** seed (re-fetch + diff later).

### [2] Source fetcher (`scripts/fetch-sources.ts`)

- Input: the manifest. Output: `sources/<lawId>.json` with verbatim `quotedText` + permalink + fetch date.
- **Sources:** Official Gazette + SC E-Library (government = **public domain** under IP Code §176 — free to fetch/store/quote). Chan Robles only as a _cross-check_, never the primary `sourceUrl` (private compilation).
- **Etiquette:** respect `robots.txt`, rate-limit, identify the bot, cache once (≈30 fetches, not a crawl).

### [3] AI-assisted draft (internal tool — NOT a product feature)

- Same grounded-RAG pattern the v2 app will use, but run **internally** at authoring time: feed the verbatim `quotedText` → Claude drafts `right`, `whatThisMeans`, `theyCannot[]`, `youCan[]`, `eli5`, FIL + EN.
- Output lands as `verification: "draft"`. **It can never reach a user** — the production build excludes non-`verified` cards (guardrail below).
- This is the only place AI touches v1, and it touches _drafts_, never _live answers_. Consistent with "no AI in the live app."

### [4] Human editorial pass (founder)

Verify only what a non-lawyer safely can: quote matches source, language is Grade-6 + natural Taglish, no specific-advice phrasing, citation URL resolves. Card stays `legal_review` (ready for sign-off), still unpublished.

### [5] Legal review (reviewer)

Reviewer checks scope, currency, and that the simplification doesn't distort meaning. On pass → `verified` (+ `reviewedBy`, `reviewerCredential`). **Only now can it publish.**

---

## Safety guardrails (built into the code, not left to discipline)

1. **`verified`-only production gate** — the public build _physically excludes_ any card whose `verification !== "verified"`. Drafts cannot leak live even on an accidental deploy. (Implemented in [`04_phase3_core_build.md`](04_phase3_core_build.md) content loader.)
2. **Draft watermark** — any non-verified card rendered anywhere (preview, or a sample you choose to show) carries a baked-in visible stamp: _"DRAFT — pending legal verification · not legal advice."_
3. **Curated showcase set** — for public promotion you hand-pick 2–3 watermarked sample cards, kept separate from the full internal draft database.

---

## Launch & promotion posture (showcase ≠ ship)

You will **build everything** (all 5 modules, high-stakes included) and **post publicly to recruit a lawyer** — but **not make the rights database live**. Hold the line:

| Safe ✅ (showcase + recruit)                                                                  | Trap ❌ (live in disguise)                                            |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Teaser/landing page: vision, 2–3 **watermarked** sample cards, "help us find legal reviewers" | The full app browsable behind a disclaimer banner, called a "preview" |
| Shows quality + mission; nobody acts on unverified high-stakes content                        | Real people in real police stops find it via search and act on it     |

A disclaimer does **not** cure wrong content; it only lowers liability, not harm. Watermark any publicly shown draft (screenshots travel without your banner). Verified content is what eventually goes live, module by module, as review completes — **Police stays gated until reviewed, no exceptions.**

---

## Risks & Mitigations

| Risk                                            | Mitigation                                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| "Trusted source" mistaken for "verified card"   | This doc's governing principle; review gate; role split                            |
| AI error a non-lawyer can't catch reaches users | `verified`-only gate + lawyer as backstop; don't scale drafts past review capacity |
| Draft screenshot circulates as if real          | Baked-in draft watermark on every non-verified render                              |
| Promo "preview" becomes de-facto live           | Showcase set only; full database stays internal until `verified`                   |
| Scraping ToS/copyright                          | Public-domain gov sources only; Chan Robles cross-check only; robots/rate-limit    |

---

## Deliverables

- [ ] Law manifest (~20–30 provisions across 5 modules)
- [ ] `fetch-sources.ts` + cached `sources/` for the manifest
- [ ] Internal AI-draft workflow (prompt + script) producing schema-valid `draft` cards
- [ ] Draft watermark component + `verified`-only production gate verified working
- [ ] Curated showcase set (2–3 watermarked cards) for the recruitment post

## Definition of Done

Content can be acquired and drafted fast (hybrid), every draft is provably blocked from going live, drafts shown publicly are unmistakably watermarked, and nothing becomes `verified` without a licensed reviewer — so you can build openly and recruit, with zero path for unverified legal claims to reach a user.
