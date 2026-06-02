# KarapatanPH — Master Planning Document

> _"Ang hindi marunong magmahal sa sariling karapatan ay higit pang alipin."_
> A web app empowering every Filipino to know, understand, and defend their basic rights.

---

## 1. APP OVERVIEW

### Concept

KarapatanPH is a free, mobile-first web app that gives ordinary Filipinos quick, plain-language access to their legal rights in everyday situations — police encounters, traffic stops, workplace disputes, and more. No legal jargon. No law school required.

### App Name Options

| Name            | Meaning         | Vibe                    |
| --------------- | --------------- | ----------------------- |
| **KarapatanPH** | "Rights PH"     | Clear, direct, official |
| **Alam Mo Ba?** | "Did You Know?" | Conversational, curious |
| **Batas Mo**    | "Your Law"      | Empowering, ownership   |
| **SagotPH**     | "Answer PH"     | Q&A focused             |

> Recommendation: **KarapatanPH** — easy to remember, searchable, and sounds credible.

### Mission

To make Philippine law accessible, understandable, and actionable for every Filipino — regardless of education level, income, or location.

### Problem Being Solved

- Most Filipinos don't know they can refuse an illegal search
- People are afraid to speak up against LTO/police apprehensions because they don't know the rules
- Legal knowledge is gatekept behind expensive lawyers and dense legal text
- Rights violations often go unchallenged due to ignorance, not acceptance

---

## 2. TARGET AUDIENCE

### Primary Users

- Everyday Filipinos aged 18–45
- Commuters, drivers, workers, students
- People who have been (or fear being) bullied by authority figures

### User Personas

**Persona 1 — "Kuya Driver" (Rodrigo, 34)**
Jeepney/Grab driver. Stops frequently by MMDA and LTO. Doesn't know what they can legally confiscate or what makes an apprehension valid. Uses a cheap Android phone with limited data.

**Persona 2 — "Fresh Graduate" (Maria, 22)**
Just started her first job. Unsure about her rights if fired, sexually harassed, or underpaid. Speaks both Filipino and English.

**Persona 3 — "Nanay" (Lorna, 45)**
Market vendor. Encounters barangay officials often. Doesn't always know if a barangay order is legal. Prefers Filipino language.

**Persona 4 — "Student Activist" (Carlo, 19)**
Joins rallies. Wants to know rights during police dispersal. Tech-savvy, shares content on social media.

---

## 3. CONTENT ARCHITECTURE

### Rights Categories (Modules)

#### 🚔 Module 1: Police Encounters

- Right to remain silent (Miranda Rights — PH version)
- Warrantless arrests: when are they legal? (Rule 113, Rules of Court)
- Custodial investigation rights (RA 7438)
- Right to counsel
- What police CANNOT do
- What to do if arrested illegally
- Stop and frisk rules

#### 🚗 Module 2: LTO / MMDA / Traffic Enforcers

- What they can and cannot confiscate (license vs. OR/CR)
- What constitutes a valid traffic violation ticket
- Boundary/fixed route violations
- How to contest a ticket properly
- Kotong (bribery) — what it is and how to report it
- LTFRB vs LTO jurisdiction

#### 👷 Module 3: Labor & Employment Rights

- Minimum wage (by region)
- 13th month pay (PD 851)
- Illegal dismissal (Labor Code)
- Right to security of tenure
- Separation pay rules
- Sexual harassment at work (RA 7877, RA 11313)
- Right to form a union
- Where to file complaints (DOLE, NLRC)

#### 🏘️ Module 4: Barangay & Local Government

- What a barangay official's actual powers are
- Barangay clearance — when is it required vs optional
- Katarungang Pambarangay (barangay justice system)
- When a case can skip barangay and go straight to court
- Lupon Tagapamayapa process

#### 🏥 Module 5: Healthcare Rights

- PhilHealth coverage rights
- No balance billing policy (in selected hospitals)
- Right to informed consent
- Right to refuse treatment
- RA 8344 — hospitals cannot refuse emergency patients
- Magna Carta of Patients' Rights

#### 🏫 Module 6: Student Rights

- Rights inside school premises
- Disciplinary proceedings due process
- Anti-hazing law (RA 11053)
- Right to free basic education
- Search of bags/lockers — when is it legal?

#### 📱 Module 7: Digital & Privacy Rights

- Data Privacy Act (RA 10173)
- Right to access your own data
- Cybercrime law (RA 10175) — what's illegal and what's not
- Anti-photo and video voyeurism (RA 9995)
- Online defamation vs. free speech

#### 👩 Module 8: Women & Children's Rights

- RA 9262 — Anti-VAWC (Violence Against Women and Children)
- RA 9048 — name change rights
- RA 11313 — Safe Spaces Act (catcalling, etc.)
- Rights of solo parents (RA 8972)
- Child labor laws (RA 9231)

#### 🧾 Module 9: Consumer Rights

- Consumer Act (RA 7394)
- Right to refund/replacement
- Price tag law
- Right to product safety
- DTI complaint process
- Online seller accountability

#### ⚖️ Module 10: Due Process & General Rights

- Article III — Bill of Rights (1987 Constitution) in plain language
- Right to equal protection
- Right against unreasonable searches and seizures
- Freedom of speech, expression, assembly
- Right to petition the government

---

## 4. DATA SOURCES

### Primary Legal Sources (All Free & Public)

| Source                     | URL                       | What to Get                            |
| -------------------------- | ------------------------- | -------------------------------------- |
| Official Gazette           | officialgazette.gov.ph    | Full text of Republic Acts             |
| Supreme Court E-Library    | elibrary.judiciary.gov.ph | Laws, jurisprudence, Rules of Court    |
| Chan Robles Law Library    | chanrobles.com            | Organized, searchable PH laws          |
| DOLE Official Site         | dole.gov.ph               | Labor advisories, minimum wage orders  |
| LTO Official Site          | lto.gov.ph                | Traffic rules, apprehension guidelines |
| PNP Official Site          | pnp.gov.ph                | PNP operational procedures             |
| Commission on Human Rights | chr.gov.ph                | Human rights guidelines and complaints |
| DTI Official Site          | dti.gov.ph                | Consumer rights, DTI advisories        |
| PhilHealth                 | philhealth.gov.ph         | Coverage and benefits                  |
| CHED                       | ched.gov.ph               | Student rights, school policies        |

### Key Laws Reference List

| Law                            | Coverage                                 |
| ------------------------------ | ---------------------------------------- |
| 1987 Constitution, Article III | Bill of Rights                           |
| RA 7438                        | Custodial Investigation Rights           |
| RA 9745                        | Anti-Torture Act                         |
| RA 9262                        | Anti-Violence Against Women and Children |
| RA 10173                       | Data Privacy Act                         |
| RA 11313                       | Safe Spaces Act                          |
| RA 7877                        | Anti-Sexual Harassment Act               |
| RA 10175                       | Cybercrime Prevention Act                |
| RA 9995                        | Anti-Photo and Video Voyeurism           |
| RA 7394                        | Consumer Act of the Philippines          |
| RA 8344                        | Hospital Emergency Care                  |
| RA 11053                       | Anti-Hazing Law                          |
| RA 9231                        | Anti-Child Labor                         |
| PD 851                         | 13th Month Pay                           |
| Labor Code of the Philippines  | Worker Rights                            |
| Rule 113, Rules of Court       | Arrest Rules                             |
| RA 6975                        | PNP Act (police rules)                   |
| RA 7160                        | Local Government Code                    |

---

## 5. DATA ACCURACY & VERIFICATION PROCESS

### 3-Layer Verification System

**Layer 1 — Source Tracing**
Every single rights statement must have a direct citation to:

- The specific Republic Act number
- The specific Article/Section
- A direct URL to the Official Gazette or SC E-Library

No content goes live without a traceable source.

**Layer 2 — Plain-Language Review**
After sourcing, content is rewritten in simple Filipino/English and reviewed by a second person to ensure:

- Nothing was lost in translation from legal text
- No legal meaning was distorted
- The plain version matches the original law's intent

**Layer 3 — Legal Volunteer Review (Optional but Recommended)**
Partner with:

- IBP (Integrated Bar of the Philippines) — pro bono lawyers
- UP Law Center
- Ateneo Human Rights Center
- Law student organizations (many do community service hours)

These reviewers spot-check content for accuracy before publishing.

### Ongoing Accuracy

- **Law Change Tracker:** Monitor the Official Gazette RSS feed for law amendments
- **Community Flagging:** Users can tap "Flag as Incorrect" on any rights card, triggering a review queue
- **Version History:** Every content item has a "Last verified: [date]" timestamp visible to users
- **Annual Full Audit:** Entire content database reviewed once a year

### What the App Will NEVER Do

- Present an opinion as law
- Simplify a law so much that it changes the meaning
- Give specific legal advice ("you should do X in your case")
- Claim to replace a real lawyer

---

## 6. MAKING IT BEGINNER-FRIENDLY

### Language Strategy

**Bilingual by default:** All content in both Filipino and English. User picks preference on first launch. Toggle available on every page.

**Plain Language Principles:**

- Write at Grade 6 reading level
- Short sentences. One idea per sentence.
- No Latin terms without explanation
- Use "ikaw" / "you" — speak directly to the user
- Replace legal jargon with everyday words:
  - "Custodial investigation" → "Pagtatanong ng pulis sa nahuli"
  - "Warrantless arrest" → "Pag-aresto nang walang warrant"
  - "In flagrante delicto" → "Nahuli sa aktuwal na paggawa ng krimen"

### UI/UX Principles

**Situation-First Navigation:**
Users don't search for laws. They search for situations.

- "Hinarang ako ng pulis" (A cop stopped me)
- "Tinanggal ako sa trabaho" (I got fired)
- "Hinawakan ng LTO ang lisensya ko" (LTO took my license)

**Rights Card Format (each right is a card with):**

- 📌 The Right (1 sentence, bold)
- 📖 What this means (2–3 plain sentences)
- ⚠️ What they CANNOT do (bullet list)
- ✅ What YOU can do (bullet list)
- 📚 Legal basis (law name + section, tappable link)
- 🚩 Flag as incorrect button

**"ELI5" Toggle (Explain Like I'm 5):**
Every rights card has a simpler mode — even shorter, uses analogies, almost conversational. Great for low-literacy users.

**Visual Aids:**

- Red/Green color coding (allowed vs not allowed)
- Icons for each situation
- Flowcharts for processes (e.g., "What happens after arrest?")

---

## 7. AI Q&A SYSTEM

### How It Works

The AI assistant (powered by Claude API) answers users' rights-related questions in natural language — but it is **strictly grounded** on the curated law database in the app. It cannot go outside that content.

### Architecture

```
User Question
     ↓
Keyword/Intent Detection
     ↓
Relevant Law Cards Retrieved (from our database)
     ↓
Claude API called with:
  - System prompt: "You are a rights guide. Only answer using the provided PH law context below. Never give specific legal advice. Always cite the law."
  - Context: Retrieved law cards
  - User's question
     ↓
Answer returned in plain Filipino/English
     ↓
Answer displayed with law citations + "Consult a lawyer for your specific case" note
```

### AI System Prompt Design

The Claude API call will include a strict system prompt:

> "You are KarapatanPH, a Filipino rights information assistant. You only answer questions about Philippine laws and basic rights. You ONLY use the law information provided to you in this context. You NEVER make up laws. You ALWAYS cite the specific law (e.g., RA 7438, Section 2). You explain things in simple Filipino or English depending on the user's language setting. You ALWAYS end your answer with: 'Para sa iyong specific na sitwasyon, kumonsulta sa isang abogado.' You are NOT a lawyer and you do NOT give specific legal advice."

### Guardrails

- **Hallucination prevention:** AI only answers from injected law cards — not from its general knowledge
- **Out-of-scope detection:** If question is outside PH law (e.g., cooking), AI politely redirects
- **Confidence threshold:** If the AI is uncertain, it says so and links to CHR or IBP hotline
- **No advice rule:** AI explains rights, never tells user what to do in their specific situation
- **Response capping:** Max 300 words per answer — forces conciseness

### Sample AI Interaction

> **User:** "Pwede bang kumuha ng cellphone ko ang pulis nang walang warrant?"
> **AI:** "Sa pangkalahatan, hindi. Ayon sa Article III, Section 2 ng 1987 Constitution, ang bawat tao ay may karapatang protektahan ang kanyang mga bagay laban sa hindi makatwirang paghahalungkat at pagkumpiska. Kailangan ng pulis ng search warrant bago kunin ang iyong cellphone — maliban na lang kung ikaw ay nahuli habang gumagawa ng krimo, o kung boluntaryo mong ibinigay ang pahintulot. Kung kinuha nila ito nang wala kang pahintulot at walang warrant, maaari kang maghain ng reklamo sa CHR o sa Ombudsman. Para sa iyong specific na sitwasyon, kumonsulta sa isang abogado."

---

## 8. EDGE CASES

### Legal Edge Cases to Address

| Situation                          | Edge Case                               | How App Handles It                                                 |
| ---------------------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Minors (below 18)                  | Different rights apply — CICL (RA 9344) | Separate "Minor's Rights" section                                  |
| OFWs                               | Rights abroad are different             | Clearly label content as "PH-based rights only" + link to DFA/OWWA |
| Foreigners in PH                   | Some rights differ                      | Note where rights apply to "all persons" vs "citizens only"        |
| Arrest with warrant vs without     | Very different rules                    | Two separate flowcharts                                            |
| Private vs government employer     | Labor code coverage differs             | Label which situations apply to which                              |
| NBI/AFP vs PNP                     | Different jurisdictions                 | Specify agency in each card                                        |
| Barangay ordinance vs national law | Conflict of laws                        | Explain supremacy clause simply                                    |
| LGBTQ+ rights                      | Limited explicit protections currently  | Honest about gaps; cite Safe Spaces Act coverage                   |
| People with disabilities           | PWD Act (RA 7277)                       | Dedicated section                                                  |
| Senior citizens                    | RA 9994 (Expanded Senior Citizens Act)  | Dedicated section                                                  |
| Indigenous peoples                 | IPRA (RA 8371)                          | Note exists; link to NCIP                                          |

### Technical Edge Cases

| Scenario                                     | Solution                                                    |
| -------------------------------------------- | ----------------------------------------------------------- |
| User has no internet                         | PWA with offline mode — all basic content cached            |
| User uses very old Android                   | Progressive enhancement — works without JS for core content |
| User is in a hurry (being stopped right now) | "Emergency Mode" — 3-tap access to most relevant rights     |
| Low-literacy user                            | ELI5 mode + audio read-aloud feature (text-to-speech)       |
| User flags wrong content                     | Moderation queue — flagged content reviewed within 48hrs    |
| Laws get amended                             | Version control on content + "Last updated" timestamps      |
| AI gives wrong answer                        | Feedback button on every AI response — "This seems wrong"   |

---

## 9. FEATURES LIST

### MVP (Version 1.0 — Build First)

- [ ] 10 rights modules with law cards
- [ ] Situation-based navigation ("What happened to you?")
- [ ] Filipino/English toggle
- [ ] Each card has: right, explanation, law citation, what they can't do, what you can do
- [ ] Search bar
- [ ] Mobile-first responsive design
- [ ] PWA (works offline)
- [ ] "Flag as incorrect" on each card
- [ ] Links to complaint channels (CHR, DOLE, LTO portal)

### Version 2.0 — Add Intelligence

- [ ] AI Q&A assistant (Claude API, grounded on our database)
- [ ] "Emergency Mode" — fastest path to relevant rights
- [ ] Shareable rights cards (image/social share)
- [ ] ELI5 toggle
- [ ] Text-to-speech (read rights aloud)
- [ ] Related rights suggestions

### Version 3.0 — Community & Expansion

- [ ] Community-submitted rights violations (anonymous)
- [ ] "Nahuli ka ba?" — incident tracker/journal (stored locally)
- [ ] Lawyer directory (IBP volunteers)
- [ ] Notification: "New law passed that affects your rights"
- [ ] Regional content (e.g., local ordinances per city/province)
- [ ] Complaint letter generator (AI-powered template)

---

## 10. LEGAL DISCLAIMERS

Every page must carry:

> **"Ang KarapatanPH ay para sa impormasyon lamang at hindi legal na payo. Para sa iyong specific na sitwasyon, kumonsulta sa isang lisensyadong abogado. Ang mga nilalaman ay batay sa mga batas ng Pilipinas at regular na vina-verify."**
>
> _(KarapatanPH is for informational purposes only and does not constitute legal advice. For your specific situation, consult a licensed lawyer. Content is based on Philippine laws and regularly verified.)_

Also needed:

- About page explaining the project is not affiliated with any government agency
- Content policy page
- Privacy policy (especially if AI chat logs are stored)
- Terms of use

---

## 11. TECHNICAL STACK

### Recommended Stack

| Layer          | Technology                 | Why                                      |
| -------------- | -------------------------- | ---------------------------------------- |
| Frontend       | Next.js (React)            | SEO, speed, PWA support                  |
| Styling        | Tailwind CSS               | Fast, mobile-first                       |
| Content        | Markdown files or JSON     | Easy to update without code changes      |
| AI Q&A         | Claude API (claude-sonnet) | Best for Filipino language + reasoning   |
| Search         | Fuse.js (client-side)      | Works offline, no backend needed for MVP |
| Hosting        | Vercel (free tier)         | Free, fast, global CDN                   |
| Database (v2+) | Supabase (free tier)       | For flagging, user feedback              |
| Analytics      | Plausible or Umami         | Privacy-respecting, no Google            |

### Why No Heavy Backend for MVP

The entire rights database can be stored as structured JSON/Markdown files shipped with the app. This means:

- Zero server costs
- Works 100% offline
- Faster load times
- No database to maintain

---

## 12. QA PROCESS

### Content QA

- Every rights card reviewed by at least 2 people before publishing
- Legal citation checked against the actual law text
- Plain-language version reviewed for accuracy loss
- Filipino translation reviewed by native speaker

### AI QA

- Test 50 common questions before launch
- Check AI does not hallucinate law names or sections
- Verify AI properly declines out-of-scope questions
- Verify AI always appends the legal disclaimer
- Regression test after any system prompt change

### Technical QA

- Test on low-end Android devices (the Persona 1 user)
- Test on slow 3G connection
- Test offline mode
- Test all law citation links are working
- Accessibility audit (screen reader, font size, contrast)

### Ongoing QA

- Weekly review of "Flag as incorrect" submissions
- Monthly check of all external links (law sources)
- Quarterly review of laws for amendments
- Annual full content audit

---

## 13. COMPLAINT CHANNELS DIRECTORY

_(To be included in the app as a quick-reference)_

| Agency                           | For                               | Contact                    |
| -------------------------------- | --------------------------------- | -------------------------- |
| Commission on Human Rights (CHR) | Rights violations by state agents | chr.gov.ph / 09178-66-2487 |
| DOLE                             | Labor violations                  | dole.gov.ph / 1349 hotline |
| NLRC                             | Illegal dismissal                 | nlrc.dole.gov.ph           |
| LTO                              | LTO enforcer misconduct           | lto.gov.ph                 |
| PNP Internal Affairs             | Police misconduct                 | pnp.gov.ph                 |
| Ombudsman                        | Government corruption             | ombudsman.gov.ph           |
| DTI                              | Consumer complaints               | dti.gov.ph / 1-DTI (1-384) |
| NPC                              | Data privacy violations           | privacy.gov.ph             |
| CHED                             | School-related violations         | ched.gov.ph                |
| IBP Legal Aid                    | Free legal consultation           | ibp.ph                     |

---

## 14. ROADMAP

### Phase 1 — Build (Months 1–2)

- Finalize app name and branding
- Write and verify all 10 modules (rights cards)
- Build MVP frontend
- Deploy on Vercel
- Soft launch — share with friends/community for feedback

### Phase 2 — Grow (Months 3–4)

- Add AI Q&A system
- Add PWA / offline support
- Social sharing feature
- Partner with IBP, CHR, student orgs for promotion
- SEO optimization (so people find it via Google)

### Phase 3 — Scale (Months 5–6)

- Expand to regional content
- Add complaint letter generator
- Mobile app version (React Native or PWA-to-app)
- Seek formal endorsement from CHR or IBP

---

## 15. SUCCESS METRICS

| Metric                   | Target (3 months post-launch)       |
| ------------------------ | ----------------------------------- |
| Monthly active users     | 10,000+                             |
| Rights cards viewed      | 50,000+ views/month                 |
| AI questions answered    | 5,000+/month                        |
| Incorrect flags resolved | 100% within 48hrs                   |
| Page load time           | Under 2 seconds on 3G               |
| Offline functionality    | 100% core content available offline |

---

_Document version: 1.0 — Created for KarapatanPH project planning._
_All legal references are public domain Philippine government documents._
