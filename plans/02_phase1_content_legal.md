# Phase 1 — Content Data Model & Legal Content Pipeline

> **Hat:** Philippine Lawyer (lead) + Senior Software Engineer
> **Goal:** Define the single source of truth for a "rights card," and a disciplined, auditable pipeline that gets legal content from raw statute → plain bilingual language → **reviewed and published** — with no uncited content ever shipping.
> **Duration:** Schema in Week 1; content sourcing is **continuous** through launch.

> ⚠️ **This is the heart of the project.** Search, offline, AI (v2) all consume this schema. The legal credibility of KarapatanPH lives or dies here.

---

## Part A — The Rights Card Data Model

### A.1 Design goals

- Every card is **traceable** to a specific provision (RA + section) and a public source URL.
- Every card is **bilingual** (Filipino + English) in every user-facing field.
- Every card has a **verification state** and `last_verified` date — visible to users.
- The schema is **machine-validated** in CI (Phase 0 validator) so the legal rule is enforced by code, not goodwill.
- The shape supports v2 needs (AI retrieval, flagging) without migration.

### A.2 Zod schema (source of truth — `content/schema/card.schema.ts`)

```ts
import { z } from "zod";

// Bilingual string — both required for publish
const Bilingual = z.object({
  fil: z.string().min(1),
  en: z.string().min(1),
});

const Citation = z.object({
  label: Bilingual, // e.g. "RA 7438, Section 2"
  lawId: z.string(), // canonical id, e.g. "ra-7438"
  section: z.string().optional(), // "Section 2(b)"
  sourceUrl: z.string().url(), // Official Gazette / SC E-Library
  sourceName: z.enum([
    "official_gazette",
    "sc_elibrary",
    "chan_robles",
    "dole",
    "lto",
    "pnp",
    "chr",
    "dti",
    "philhealth",
    "ched",
    "other",
  ]),
  quotedText: z.string().optional(), // verbatim provision text (for audit)
});

const VerificationState = z.enum([
  "draft", // sourced, not yet plain-language reviewed
  "plain_review", // plain-language rewrite reviewed (Layer 2)
  "legal_review", // awaiting lawyer review (Layer 3)
  "verified", // PASSED legal review — ONLY this state may publish
  "flagged", // user-flagged, under re-review
  "deprecated", // law amended/repealed; hidden from users
]);

export const RightsCard = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/), // stable slug, never reused
    module: z.enum(["police", "lto", "labor", "barangay", "consumer"]),

    // Discovery
    situationTags: z.array(Bilingual).min(1), // "Hinarang ako ng pulis"
    keywords: z.array(z.string()).default([]), // search aids (both langs)

    // The card body (the 6-part format from the master doc)
    right: Bilingual, // 📌 1 sentence, bold
    whatThisMeans: Bilingual, // 📖 2–3 plain sentences
    theyCannot: z.array(Bilingual).default([]), // ⚠️ what authority CANNOT do
    youCan: z.array(Bilingual).default([]), // ✅ what YOU can do
    eli5: Bilingual.optional(), // simpler mode (Phase 2 UI)

    // Legal backbone — at least one citation REQUIRED
    citations: z.array(Citation).min(1),

    // Safety / scope
    scopeNotes: Bilingual.optional(), // "Applies to PNP, not NBI", etc.
    relatedCardIds: z.array(z.string()).default([]),

    // Provenance & trust (all REQUIRED to publish)
    verification: VerificationState,
    lastVerified: z.string().date(), // ISO date, shown to users
    sourcedBy: z.string(), // author handle
    reviewedBy: z.string().optional(), // reviewer handle (required if verified)
    reviewerCredential: z.string().optional(), // e.g. "IBP member, Roll #..."
    version: z.number().int().positive(),
    changelog: z
      .array(
        z.object({
          date: z.string().date(),
          note: z.string(),
        }),
      )
      .default([]),
  })
  .superRefine((card, ctx) => {
    // A card may only be "verified" if it has a reviewer recorded.
    if (card.verification === "verified" && !card.reviewedBy) {
      ctx.addIssue({ code: "custom", message: "verified card requires reviewedBy" });
    }
  });

export type RightsCard = z.infer<typeof RightsCard>;
```

### A.3 The publish gate (enforced in CI)

`scripts/validate-content.ts` fails the build unless **every card that the app will render** satisfies:

1. `verification === "verified"` (drafts are excluded from the production build, included only in preview with a watermark).
2. ≥1 citation with a reachable `sourceUrl`.
3. Both `fil` and `en` present in every user-facing field.
4. `lastVerified` present and not older than the audit threshold (warn at 12 months).
5. `reviewedBy` recorded.

> This is how the legal principle "_no content goes live without a traceable, reviewed source_" becomes a hard, automated gate rather than a hope.

---

## Part B — Module & Card Scope (the 5 v1 modules)

> Card counts are targets; quality gates quantity. Better to launch a module with 8 flawless cards than 15 thin ones.

### Module 1 — 🚔 Police Encounters

Priority cards: right to remain silent (PH Miranda); custodial investigation rights (RA 7438); warrantless arrest validity (Rule 113, Sec. 5); stop-and-frisk limits; right to counsel; warrantless search of person/phone (Art. III §2); what to do if arrested illegally; anti-torture protections (RA 9745).

### Module 2 — 🚗 LTO / MMDA / Traffic

License vs OR/CR confiscation rules; what makes a valid apprehension/TVR; how to contest a ticket; "kotong"/bribery — what it is, how to report; LTO vs LTFRB vs MMDA jurisdiction; flag-down rights.

### Module 3 — 👷 Labor & Employment

Minimum wage (by region — note regional wage orders change); 13th-month pay (PD 851); illegal dismissal & security of tenure (Labor Code); separation pay; sexual harassment at work (RA 7877, RA 11313); right to self-organization; where to file (DOLE SEnA / NLRC).

### Module 4 — 🏘️ Barangay & Local Government

Actual powers/limits of barangay officials (RA 7160); barangay clearance — required vs optional; Katarungang Pambarangay (Lupon process); when a case may bypass barangay conciliation; ordinance vs national law (supremacy).

### Module 5 — 🧾 Consumer Rights

Consumer Act (RA 7394); refund/replacement rights; Price Tag Law; product safety; DTI complaint process (and the DTI "no-return-no-exchange sign is illegal" point); online seller accountability (E-Commerce Act / DTI–DICT rules).

> **Lawyer's flag — high-nuance cards that MUST get Layer-3 review before publish:** warrantless search/arrest scope, "no balance billing" (narrower than people think — applies to specific cases/facilities), minimum wage (regionally variable, dated), and ordinance-vs-national supremacy. These are where oversimplification becomes _wrong_.

---

## Part C — The Content Pipeline (3-Layer Verification)

> **How content is acquired** (the source fetcher + AI-assisted _draft_ step that feeds Layer 1) is specified in the companion doc [`08_content_acquisition.md`](08_content_acquisition.md). Governing rule it shares with this phase: _an accurate source quote is not a verified card._

```
RAW STATUTE  ──►  [L1: Source Tracing]  ──►  [L2: Plain-Language + Bilingual]  ──►  [L3: Legal Review]  ──►  VERIFIED  ──►  PUBLISH
   draft              draft                       plain_review                       legal_review            verified       (CI gate)
```

### Layer 1 — Source Tracing (author)

- Locate the **exact provision** (RA number + section) governing the right.
- Capture `quotedText` verbatim and the canonical `sourceUrl` (prefer Official Gazette or SC E-Library; Chan Robles as cross-check, not sole source).
- Confirm the law is **in force** (not repealed/amended). Check for later amending RAs.
- Card state: `draft`.

### Layer 2 — Plain-Language + Bilingual Rewrite (author + 2nd person)

- Rewrite at **Grade 6 reading level**, one idea per sentence, "ikaw/you" voice.
- Produce **both** `fil` and `en`. Filipino reviewed by a native speaker for naturalness (not just literal translation).
- A **second person** checks: nothing lost in translation, no meaning distorted, plain version matches statutory intent.
- Card state: `plain_review`.

### Layer 3 — Legal Review (licensed lawyer / law-school program)

- Reviewer verifies citation accuracy, scope correctness, and that the plain version does not overstate or distort the right.
- Reviewer records `reviewedBy` + `reviewerCredential`.
- Only on pass does state become `verified`. **This is the only state that publishes.**

### The "What the app will NEVER do" rules (encoded as review checklist)

- ❌ Present opinion as law.
- ❌ Simplify to the point of changing meaning.
- ❌ Give **specific** legal advice ("you should do X in _your_ case").
- ❌ Claim to replace a lawyer.
- ✅ Always cite. Always show `last_verified`. Always carry the disclaimer (Phase 5).

---

## Part D — No Reviewer Yet: Interim Protocol

You don't have a lawyer onboarded. Here's how to keep building **without** shipping unreviewed legal claims:

### D.1 Build review-ready now

- Author all cards through **Layers 1–2** so they sit in `legal_review` state — fully sourced, cited, bilingual, plain-language. They are **not** published (CI gate blocks non-`verified` cards from prod).
- This means the moment a reviewer is onboarded, they can sign off in batches and content goes live immediately.

### D.2 Structured self-review checklist (bridge, not a substitute)

Until a licensed reviewer exists, apply this checklist to every card. **It does not grant `verified` state** — it only improves quality of `legal_review`-state drafts. Be honest that this is a bridge.

- [ ] Provision quoted verbatim and located in the _current_ consolidated text
- [ ] No amending/repealing law missed (searched RA index + Official Gazette)
- [ ] Plain version makes **no** claim the statute doesn't support
- [ ] Scope correctly bounded (which agency, persons vs citizens, with/without warrant)
- [ ] No specific-advice phrasing
- [ ] Citation URL resolves and points to the cited provision

### D.3 Reviewer recruitment (parallel workstream — start Week 1)

Target partners (all do pro bono / community service):

- **IBP (Integrated Bar of the Philippines)** chapters — legal aid committees
- **UP Law Center** / **UP College of Law** student orgs
- **Ateneo Human Rights Center**, **FLAG (Free Legal Assistance Group)**
- **Commission on Human Rights (CHR)** for the rights-violation modules
- Law student orgs needing community-service / clinical-legal-education hours

Outreach package to prepare: 1-page project brief, sample verified card, the reviewer checklist, and a clear, **bounded ask** ("spot-check ~10 cards; ~2 hours; credit + endorsement option"). Make it low-effort to say yes.

> **Launch posture given no reviewer:** if reviewers aren't secured by the QA gate (Phase 5), **launch only the modules that did get reviewed**, or run an explicit "Beta — community-sourced, pending legal review" banner _only if_ you accept the elevated risk. The lawyer hat's recommendation: **do not launch unreviewed legal claims.** Ship fewer modules.

---

## Part E — Ongoing Accuracy (post-launch)

- **Law Change Tracker:** monitor Official Gazette for amendments to listed RAs; quarterly sweep. Regional wage orders (Module 3) checked each time a new wage order issues.
- **Community Flagging (v2):** "Flag as incorrect" sets `flagged` state → review queue → resolve within 48h SLA.
- **Version History:** `version` + `changelog` + visible `last_verified` on every card.
- **Annual Full Audit:** every card re-traced once a year.
- **Deprecation path:** repealed/amended provisions move to `deprecated` (hidden), never silently edited — provenance preserved.

---

## Part F — Reference: a fully-authored card (`content/modules/police/cards/warrantless-search-phone.json`)

```json
{
  "id": "police-warrantless-phone-search",
  "module": "police",
  "situationTags": [
    { "fil": "Gusto kunin ng pulis ang cellphone ko", "en": "A cop wants to take my phone" }
  ],
  "keywords": ["cellphone", "warrant", "search", "halughog", "kumpiska", "phone"],
  "right": {
    "fil": "Hindi basta-basta puwedeng kunin o halughugin ng pulis ang iyong cellphone nang walang search warrant.",
    "en": "Police generally cannot take or search your cellphone without a search warrant."
  },
  "whatThisMeans": {
    "fil": "Protektado ka ng Saligang Batas laban sa hindi makatwirang paghahalughog at pagkumpiska. Karaniwan, kailangan ng pulis ng warrant mula sa korte bago kunin o tingnan ang laman ng iyong telepono.",
    "en": "The Constitution protects you from unreasonable searches and seizures. Usually, police need a court-issued warrant before taking or looking through your phone."
  },
  "theyCannot": [
    {
      "fil": "Kunin ang telepono mo nang walang warrant o malinaw na legal na dahilan.",
      "en": "Take your phone with no warrant or clear legal basis."
    },
    {
      "fil": "Pilitin kang i-unlock ito nang walang abogado o malinaw na batayan.",
      "en": "Force you to unlock it without counsel or a clear legal basis."
    }
  ],
  "youCan": [
    {
      "fil": "Magalang na tanungin kung may search warrant sila.",
      "en": "Politely ask whether they have a search warrant."
    },
    {
      "fil": "Sabihin na hindi mo pinapayagan ang paghahalughog (hindi consent).",
      "en": "State that you do not consent to the search."
    },
    {
      "fil": "Magreklamo sa CHR o Ombudsman kung nilabag ang iyong karapatan.",
      "en": "File a complaint with the CHR or Ombudsman if your right was violated."
    }
  ],
  "eli5": {
    "fil": "Ang cellphone mo ay parang bahay mo — kailangan ng pahintulot ng korte bago ito buksan ng pulis.",
    "en": "Your phone is like your house — police usually need the court's permission to open it."
  },
  "scopeNotes": {
    "fil": "May mga eksepsiyon: kapag nahuli ka sa mismong paggawa ng krimen (in flagrante delicto) o kusang-loob kang pumayag. Iba ang patakaran sa ibang ahensiya.",
    "en": "Exceptions exist: lawful arrest in flagrante delicto, or your voluntary consent. Rules can differ by agency."
  },
  "citations": [
    {
      "label": {
        "fil": "Saligang Batas 1987, Artikulo III, Seksiyon 2",
        "en": "1987 Constitution, Article III, Section 2"
      },
      "lawId": "const-1987-art3",
      "section": "Article III, Section 2",
      "sourceUrl": "https://www.officialgazette.gov.ph/constitutions/1987-constitution/",
      "sourceName": "official_gazette",
      "quotedText": "The right of the people to be secure in their persons, houses, papers, and effects against unreasonable searches and seizures of whatever nature and for any purpose shall be inviolable..."
    }
  ],
  "relatedCardIds": ["police-rights-during-arrest", "police-right-to-counsel"],
  "verification": "legal_review",
  "lastVerified": "2026-05-30",
  "sourcedBy": "content-team",
  "version": 1,
  "changelog": [
    {
      "date": "2026-05-30",
      "note": "Initial sourcing + bilingual draft. Awaiting Layer-3 legal review."
    }
  ]
}
```

> Note this reference card is intentionally in `legal_review` state, not `verified` — accurate to your "no reviewer yet" status. It will **not** publish until a licensed reviewer signs off.

---

## Deliverables

- [ ] `card.schema.ts` (Zod) + derived TS types committed
- [ ] `validate-content.ts` enforcing the publish gate (wired into CI from Phase 0)
- [ ] Module metadata files for all 5 modules
- [ ] Content authoring guide (the 3-layer pipeline written up for contributors)
- [ ] Self-review checklist as a PR template for `content/*` branches
- [ ] Reviewer-recruitment outreach package (brief + sample card + bounded ask)
- [ ] ≥1 fully-authored reference card per module (in `legal_review` state)

## Definition of Done

The schema is frozen, CI mechanically blocks any uncited/unreviewed/monolingual card from production, and a repeatable pipeline exists so that onboarding a reviewer instantly unblocks publishing.

## Risks & Mitigations

| Risk                                  | Mitigation                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------- |
| Pressure to launch unreviewed content | CI gate + lawyer-hat policy: only `verified` publishes                                      |
| Oversimplification distorts the law   | Layer-2 second-person check + Layer-3 review on high-nuance cards                           |
| Regional/temporal drift (wage orders) | `lastVerified` visible + quarterly tracker; date-stamp regional figures                     |
| Reviewer never materializes           | Launch fewer reviewed modules; keep recruiting; never backfill with self-review-as-verified |
| Source link rot                       | `check-links.ts` in CI/cron; prefer Official Gazette permalinks                             |
