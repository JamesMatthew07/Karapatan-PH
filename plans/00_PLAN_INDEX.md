# KarapatanPH — Implementation Plan (Index)

> Phased build plan for the static-content v1 of KarapatanPH.
> Authored from four perspectives: **Senior Software Engineer**, **UI/UX Specialist**, **Senior Frontend Engineer**, and **Philippine Lawyer**.

---

## Locked Decisions (from planning Q&A)

| Decision             | Choice                                                                                                 | Consequence                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| **v1 scope**         | Static content site first — **no AI**                                                                  | Lowest legal risk; AI deferred to v2 after trust is earned                                                                          |
| **Module scope**     | **5 modules**: Police, LTO/Traffic, Labor, Barangay, Consumer                                          | ~50–70 cards to source, translate, and gate on review                                                                               |
| **Legal review**     | **No reviewer yet**                                                                                    | Content built _review-ready_; publishing **gated** on review; reviewer recruitment is a workstream                                  |
| **Tech stack**       | **Next.js + Tailwind + Vercel + Supabase** (Supabase v2 only)                                          | PWA, SEO, offline, $0 hosting on free tiers                                                                                         |
| **Content approach** | **Hybrid** — source fetcher (trusted public-domain text) → AI-assisted _draft_ → human + lawyer review | AI is an internal _drafting_ tool only; it never runs in the live app. See [`08_content_acquisition.md`](08_content_acquisition.md) |
| **Founder's role**   | Editorial + engineering, **not** legal validator (no legal background)                                 | Layer-3 lawyer is non-negotiable; volume must not outrun review capacity                                                            |
| **Launch posture**   | Build everything (incl. high-stakes) → **showcase + recruit**, not live                                | Only `verified` content goes public, module by module; **Police stays gated until reviewed**                                        |

> **Governing principle (read this):** _An accurate source quote is NOT a verified card._ The fetcher guarantees the **citation** is real; only the legal reviewer guarantees the **interpretation** is right. Drafts are watermarked and physically excluded from the production build.

---

## The Core Risk (read this first)

> **The bottleneck is content + legal review, NOT code.**

The app itself is a few weeks of frontend work. Sourcing 5 modules of legally accurate, bilingual, plain-language, fully-cited rights cards — and getting them reviewed — is the real project. This plan front-loads the **content data model** and the **legal content pipeline** (Phase 1) precisely because everything else (search, offline, AI later) depends on that schema and that trust.

**Golden rule:** _No card goes live without a traceable citation and passing the review gate._ Code can ship before content; content cannot ship before review.

---

## Phase Map

| Phase                              | File                                                           | Owner hat          | Outcome                                                                                 |
| ---------------------------------- | -------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| **0 — Foundations**                | [`01_phase0_foundations.md`](01_phase0_foundations.md)         | SW Eng             | Repo, pinned stack, tooling, CI/CD, conventions                                         |
| **1 — Content & Legal**            | [`02_phase1_content_legal.md`](02_phase1_content_legal.md)     | PH Lawyer + SW Eng | Rights-card schema, content pipeline, review gate, reviewer recruitment                 |
| **2 — UI/UX & Design System**      | [`03_phase2_uiux.md`](03_phase2_uiux.md)                       | UI/UX              | Wireframes, design tokens, component spec, accessibility spec                           |
| **3 — Core App Build**             | [`04_phase3_core_build.md`](04_phase3_core_build.md)           | Frontend Eng       | App Router, content rendering, SEO, routing                                             |
| **4 — Search, i18n, PWA, Offline** | [`05_phase4_search_i18n_pwa.md`](05_phase4_search_i18n_pwa.md) | Frontend Eng       | Bilingual, Fuse.js search, offline PWA, perf budget                                     |
| **5 — Compliance, QA, A11y**       | [`06_phase5_compliance_qa.md`](06_phase5_compliance_qa.md)     | PH Lawyer + SW Eng | Legal pages, privacy-by-design, QA matrix, a11y audit, go-live gate                     |
| **6 — Launch & v2 Roadmap**        | [`07_phase6_launch_roadmap.md`](07_phase6_launch_roadmap.md)   | All                | Soft launch, metrics, endorsements, v2 AI plan + UPL mitigation                         |
| **★ Content Acquisition**          | [`08_content_acquisition.md`](08_content_acquisition.md)       | PH Lawyer + SW Eng | Companion to Phase 1 — hybrid fetcher + AI-draft pipeline, guardrails, showcase posture |

---

## Dependency Flow

```
Phase 0 (setup)
   │
   ├──────────────┬───────────────┐
   ▼              ▼               ▼
Phase 1        Phase 2        (runs in parallel)
(content)      (design)
   │              │
   └──────┬───────┘
          ▼
       Phase 3 (build consumes schema + design)
          ▼
       Phase 4 (search/i18n/offline)
          ▼
       Phase 5 (compliance + QA gate) ◄── BLOCKS launch
          ▼
       Phase 6 (launch + v2)
```

**Critical path:** Phase 1 content work runs _continuously_ alongside Phases 2–4. The app can be feature-complete while content is still in review. Launch is gated by Phase 5 (review complete + QA pass).

---

## Indicative Timeline

> Calendar assumes a small team / solo builder with part-time legal-reviewer help. Adjust to capacity.

| Weeks    | Focus                                                                      |
| -------- | -------------------------------------------------------------------------- |
| **1**    | Phase 0 setup + Phase 1 schema finalized + start sourcing Module 1         |
| **2–6**  | Content sourcing/translation (continuous) ∥ Phase 2 design ∥ Phase 3 build |
| **5–7**  | Phase 4 (search, i18n, PWA, offline)                                       |
| **6–8**  | Reviewer onboarding + review passes on completed modules                   |
| **8–9**  | Phase 5 compliance + QA + a11y audit                                       |
| **9–10** | Phase 6 soft launch (only reviewed modules go live)                        |

If reviewers are slow, **launch with fewer modules** rather than unreviewed content.

---

## Definition of Done (project-level)

- [ ] All published cards have a traceable citation (RA/section + source URL) and a `last_verified` date
- [ ] Every published card passed the review gate (Phase 1 standard)
- [ ] Bilingual (Filipino + English) for every published card
- [ ] WCAG 2.2 AA pass on core flows
- [ ] Page load < 2s on simulated 3G; core content works fully offline
- [ ] Legal pages live: Disclaimer (every page), About, Privacy, Terms, Content Policy
- [ ] No identifiable user data collected (privacy-by-design)
- [ ] All external law-source links verified working

---

## How to use these files

Each phase file is self-contained with: **Objectives → Detailed tasks → Deliverables → Definition of Done → Risks.** Work them roughly in order, but treat Phase 1 (content) as an always-on parallel track. Check the box list at the bottom of each file before moving the launch gate.
