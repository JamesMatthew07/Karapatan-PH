# Phase 6 — Launch, Metrics & v2 Roadmap

> **Hat:** All four (SW Eng · UI/UX · Frontend · PH Lawyer)
> **Goal:** Launch the reviewed static site, measure real impact (not vanity), earn endorsements, and stage the v2 AI assistant **safely**.
> **Duration:** Weeks 9–10 (launch) → ongoing

---

## 1. Soft Launch

1. **Ship only reviewed modules** (per the Phase 5 gate). Withhold unreviewed ones behind "coming soon."
2. Share with friends, target communities (driver groups, fresh-grad networks, student orgs) for real-world feedback.
3. Collect feedback via a simple anonymous form (no PII) or a community channel — not in-app accounts.
4. Watch error logs (Vercel), Lighthouse field data (if available), and real device reports from Persona-1-type users.
5. Iterate copy/UX, then widen promotion.

---

## 2. Discoverability & SEO

- Each card targets a real query ("pwede bang kunin ng pulis ang cellphone ko") → situation-based slugs + FAQ JSON-LD (Phase 3) make these rich-result eligible.
- Submit sitemap to Google Search Console; verify both locales index with correct `hreflang`.
- Lightweight content marketing: shareable card images (v2), explainer posts. Student Activist persona (Carlo) is your organic distribution.

---

## 3. Partnerships & Endorsements (and the legal nuance)

Targets: **CHR, IBP, UP Law Center, Ateneo HRC, FLAG**, law-school legal-aid clinics.

- An endorsement from CHR/IBP is the single biggest **trust multiplier** for a legal-info app.
- **Lawyer-hat caution:** until an endorsement is real and in writing, the About page must say **not affiliated/not endorsed**. Never imply a partnership that doesn't exist. When one is secured, update About + add the credential to reviewed cards (`reviewerCredential`).
- The reviewer-recruitment work from Phase 1 doubles as endorsement groundwork.

---

## 4. Success Metrics — measure impact, not just traffic

| Metric                                                                                | Target (3 mo post-launch) | Type                  |
| ------------------------------------------------------------------------------------- | ------------------------- | --------------------- |
| **Felt-more-confident / learned a new right** (1-tap anonymous micro-survey on cards) | ≥ 60% positive            | **Impact** ⭐         |
| Returning visitors / installs                                                         | growing                   | Engagement            |
| Monthly active users                                                                  | 10,000+                   | Reach                 |
| Rights cards viewed                                                                   | 50,000+/mo                | Reach                 |
| Offline usage share                                                                   | meaningful %              | Validates the PWA bet |
| Incorrect flags resolved (v2)                                                         | 100% within 48h           | Trust                 |
| Page load on 3G                                                                       | < 2s                      | Quality               |
| Core content offline                                                                  | 100%                      | Quality               |

> The ⭐ impact metric is the one that tells you whether KarapatanPH actually empowered anyone — a one-tap, anonymous "Did this help you understand your rights?" beats raw MAU for a civic mission. Keep it privacy-safe (no identifiers).

---

## 5. Maintenance Cadence (from Phase 1 §E)

- **Weekly:** review flags (v2), error logs.
- **Monthly:** automated + spot-check of all external law links.
- **Quarterly:** law-amendment sweep (Official Gazette); refresh regional wage figures.
- **Annually:** full content re-trace audit; bump `lastVerified`.

---

## 6. v2 Roadmap (in priority order)

### v2.1 — Community trust loop

- **Flag-as-incorrect** → Supabase (first backend use): anonymous, writes to a review queue, 48h SLA. Sets card to `flagged`.
- Shareable rights-card images (social) — fuels organic reach.
- ELI5 everywhere + **TTS read-aloud** (Web Speech API; Phase 4 groundwork).
- Emergency Mode shipped (designed in Phase 2).

### v2.2 — AI Q&A Assistant (the riskiest feature — gated)

Grounded, retrieval-based assistant over the **verified** card database only.

**Architecture (from master doc, hardened):**

```
User question → intent/keyword retrieval over verified cards
  → Claude API (claude-sonnet-4-6, or claude-opus-4-8 for hardest translation)
     · System prompt: strict rights-guide, ONLY use provided cards, ALWAYS cite,
       NEVER give specific advice, ALWAYS append the consult-a-lawyer line
     · Context: retrieved verified cards (with citations)
  → answer in chosen language + citations + disclaimer
  → prompt caching on the system prompt + card context (cost/latency)
```

**Lawyer-hat guardrails (UPL & accuracy):**

- AI may **explain** rights; it must **never apply** law to the user's specific facts ("in your case, do X"). This line is the difference between information and the unauthorized practice of law.
- Strictly grounded: answers only from injected **verified** cards — refuses/redirects if the answer isn't in the database (no model general-knowledge fallback for legal claims).
- Always cites the specific RA/section; always appends the standard disclaimer.
- Out-of-scope → polite redirect; low confidence → link CHR/IBP hotline.
- Response cap (~300 words); "This seems wrong" feedback on every answer.
- **Privacy:** do **not** store identifiable chat logs (Phase 5 threat model still applies — arguably more so). If logging at all, store anonymized, content-only, with consent.
- **AI QA before launch:** test 50 common questions; verify no hallucinated laws/sections; verify out-of-scope decline; verify disclaimer always appended; regression-test after any system-prompt change.
- **Gate:** AI ships only after static content is battle-tested and (ideally) after a legal reviewer has signed off on the guardrails + sample outputs.

### v2.3 — Expansion

- Remaining 5 modules from the master doc (Healthcare, Student, Digital/Privacy, Women & Children, Due Process) — same pipeline + review gate.
- Edge-case sections: Minors (CICL/RA 9344), PWD (RA 7277), Seniors (RA 9994), IPs (IPRA/RA 8371), OFW scope labeling.
- Regional/LGU ordinance content; complaint-letter generator (AI-templated, clearly non-advice).
- PWA-to-app packaging if warranted.

---

## Deliverables

- [ ] Reviewed modules live on production; unreviewed withheld
- [ ] Search Console + privacy analytics configured
- [ ] Anonymous impact micro-survey shipped
- [ ] Endorsement outreach underway; About page accurate to current status
- [ ] Maintenance calendar set (weekly/monthly/quarterly/annual)
- [ ] v2 backlog written with AI guardrails + UPL mitigations recorded

## Definition of Done

KarapatanPH is live with verified content, measuring whether it actually helped users understand their rights, maintaining accuracy on a schedule, and holding a clear, safe, lawyer-reviewed plan for adding AI — without ever overstating the law or compromising user privacy.

---

_End of plan. See [`00_PLAN_INDEX.md`](00_PLAN_INDEX.md) for the phase map and locked decisions._
