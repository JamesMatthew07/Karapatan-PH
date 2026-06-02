# Phase 5 — Legal Compliance, QA & Accessibility (Launch Gate)

> **Hat:** Philippine Lawyer (lead) + Senior Software Engineer
> **Goal:** The gate that everything must pass before going live. Legal pages, privacy-by-design, content + technical + accessibility QA.
> **Duration:** Weeks 8–9
> ⚠️ **This phase BLOCKS launch.** Nothing ships until the go-live checklist at the bottom is fully green.

---

## 1. Required Legal Pages

### 1.1 Persistent disclaimer (every page)

Carried in the footer/`<DisclaimerBar>` site-wide:

> **"Ang KarapatanPH ay para sa impormasyon lamang at hindi legal na payo. Para sa iyong specific na sitwasyon, kumonsulta sa isang lisensyadong abogado. Ang mga nilalaman ay batay sa mga batas ng Pilipinas at regular na vina-verify."**
>
> _(KarapatanPH is for informational purposes only and does not constitute legal advice. For your specific situation, consult a licensed lawyer. Content is based on Philippine laws and is regularly verified.)_

### 1.2 Pages to ship

| Page                             | Must say                                                                                                               |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **About**                        | Independent project; **not affiliated** with any government agency, the IBP, or any court; mission; who made it        |
| **How content is verified**      | The 3-layer pipeline; what "Last verified" means; honest note on review status                                         |
| **Privacy Policy**               | What is (and isn't) collected; analytics; no accounts; no identifiable logs                                            |
| **Terms of Use**                 | Informational use; no lawyer-client relationship formed; limitation of liability; no warranty of completeness/currency |
| **Content Policy**               | Sourcing standards; correction/flagging process; deprecation of repealed laws                                          |
| **Complaint Channels Directory** | The agency quick-reference table (CHR, DOLE, NLRC, LTO, PNP-IAS, Ombudsman, DTI, NPC, CHED, IBP)                       |

### 1.3 Lawyer-hat must-haves in the legal copy

- Explicit statement that **no lawyer-client relationship** is created by using the app.
- Disclaimer that laws change and content may lag; users must verify currency.
- Clear scope boundary: **PH-based rights**; not for OFW-abroad / foreign-jurisdiction situations (link DFA/OWWA where relevant).
- Non-endorsement: agency links are for the user's convenience, not partnerships (unless/until a real endorsement exists — see Phase 6).

---

## 2. Privacy by Design (a rights app is a sensitive-data target)

> **Threat model:** a tool used by people asking "how do I resist an illegal police search" must **not** become a record of who asked that. Treat user privacy as a security property.

- **No accounts, no login, no PII** in v1.
- **No server** → no request logs you control to leak.
- Analytics: **Plausible/Umami**, cookieless, no cross-site tracking, IP anonymized, **no per-query logging** of search terms (aggregate counts only, or omit search analytics entirely).
- Any future feedback/flag (v2) must be **anonymous by construction** — no identifiers.
- `Content-Security-Policy`, `Referrer-Policy: no-referrer`, HSTS, and other security headers set in `next.config.ts`/Vercel.
- Document all of this plainly in the Privacy Policy (in Filipino + English).

---

## 3. Content QA (the legal gate)

- [ ] Every **published** card is `verified` (reviewer recorded) — enforced by CI, re-confirmed manually
- [ ] Every citation's `sourceUrl` resolves and points to the cited provision (`check-links.ts`)
- [ ] Plain-language version reviewed for **meaning loss** (Layer 2 sign-off present)
- [ ] Filipino reviewed by a native speaker (naturalness + accuracy)
- [ ] High-nuance cards (warrantless search/arrest, no-balance-billing, wage figures, ordinance supremacy) have explicit Layer-3 sign-off
- [ ] Dated/regional figures (minimum wage) carry an "as of" date
- [ ] No card uses specific-advice phrasing ("you should…in your case")

> **If reviewers covered only some modules:** launch only those modules. Do **not** publish unreviewed legal claims. (Restating the Phase 1 posture, because this is the gate where the temptation to cut the corner is highest.)

---

## 4. Technical QA Matrix

| Scenario                         | Pass criteria                                          |
| -------------------------------- | ------------------------------------------------------ |
| Low-end Android (e.g. 2–3GB RAM) | Usable, no jank, content readable                      |
| Simulated 3G                     | Load < 2s; interactive quickly                         |
| Offline (after first visit)      | All verified content browsable + searchable            |
| Language toggle                  | Swaps every UI + content string; persists              |
| ELI5 toggle                      | Swaps body copy; persists per session                  |
| All citation links               | Resolve (automated link checker in CI + cron)          |
| PWA install                      | Installs; launches standalone; offline works           |
| Update flow                      | New deploy → "refresh content" prompt appears          |
| Deep links / SEO                 | Each card has a stable shareable URL, correct metadata |

---

## 5. Accessibility Audit (WCAG 2.2 AA)

- [ ] axe-core: **zero** AA violations on Home, Module, Card, Search, Legal
- [ ] Keyboard-only: full navigation, visible focus, no traps
- [ ] Screen reader (VoiceOver/TalkBack): cards read in correct order; FIL/EN pronounced via `lang` attributes
- [ ] Color contrast ≥ AA everywhere; red/green never color-only (icon+label paired)
- [ ] Text scales to 200% without loss of content/function
- [ ] Tap targets ≥ 44×44px
- [ ] `prefers-reduced-motion` respected
- [ ] Lighthouse A11y ≥ 95 (CI budget)

---

## 6. CI Quality Gates (must be green to merge to `main`)

- typecheck · lint (incl. jsx-a11y) · **content validator** · unit/component tests · axe component tests · build · Lighthouse CI budget (perf ≥ 90, a11y ≥ 95, PWA pass) · link checker.

---

## 🚦 Go-Live Gate (all must be ✅ before Phase 6 launch)

- [ ] Only `verified` content is published; unreviewed modules withheld
- [ ] All citation links verified working
- [ ] Disclaimer present on every page; About/Privacy/Terms/Content-Policy/Complaints live
- [ ] "Not affiliated with government" stated clearly
- [ ] No PII collected; privacy-respecting analytics; security headers set
- [ ] WCAG 2.2 AA pass on all core screens
- [ ] < 2s on 3G; 100% core content offline
- [ ] Both languages complete for every published card
- [ ] Lawyer-hat review of all legal pages (disclaimers, terms, scope)

## Definition of Done

A reasonable lawyer reviewing the live site would conclude it informs without advising, cites everything, discloses its limits, protects users' privacy, and never overstates the law — and a reasonable engineer would confirm it's fast, accessible, and offline-capable.

## Risks & Mitigations

| Risk                                          | Mitigation                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| Unauthorized practice of law (UPL) perception | Strict no-specific-advice rule + disclaimers + "consult a lawyer" on every card |
| Defamation/error liability                    | Cite-everything + review gate + visible last-verified + correction process      |
| Privacy breach turns app into a honeypot      | No PII, no server, no query logs by design                                      |
| Stale law after amendment                     | Quarterly tracker + deprecation path + visible dates                            |
