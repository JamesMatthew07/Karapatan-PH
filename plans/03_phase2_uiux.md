# Phase 2 — UI/UX Design System & Wireframes

> **Hat:** UI/UX Specialist
> **Goal:** A mobile-first, low-literacy-friendly, accessible design system and the wireframes for every core screen — built around **situation-first** navigation.
> **Duration:** Weeks 2–4 (parallel with content + build)

---

## Objectives

1. Design for **Persona 1 (Kuya Driver)** as the constraint: cheap Android, small screen, limited data, possibly stressed/in-a-hurry.
2. Make people find rights by **situation**, not by law.
3. Hit **WCAG 2.2 AA** and support low-literacy users (ELI5, large text, future TTS).

---

## 1. Design Principles

| Principle              | What it means in practice                                             |
| ---------------------- | --------------------------------------------------------------------- |
| **Situation-first**    | Home asks "Ano ang nangyari sa'yo?" not "Browse laws"                 |
| **Mobile-first**       | Design at 360px width first; thumb-reachable actions                  |
| **Plain & calm**       | Grade-6 language, generous spacing, no walls of text                  |
| **Trust signals**      | Visible citations + "Last verified" date on every card                |
| **Speed under stress** | Emergency path is 3 taps; no animation that delays content            |
| **Honest**             | Never imply certainty the law doesn't give; disclaimer always present |

---

## 2. Information Architecture / Sitemap

```
Home (situation-first)
├── Situation → filtered list of Rights Cards
├── Browse by Module (5 modules)
│     └── Module page → list of Rights Cards
├── Rights Card (detail)            ← the core screen
├── Search (Fuse.js)
├── Emergency Mode (3-tap quick access)   [design now, ship v1.5]
└── Legal / Info
      ├── About (not gov-affiliated)
      ├── How content is verified
      ├── Complaint Channels Directory
      ├── Privacy Policy
      ├── Terms of Use
      └── Content Policy
```

---

## 3. Core Wireframes (mobile, 360px)

### 3.1 Home — situation-first

```
┌──────────────────────────────┐
│ KarapatanPH        [FIL|EN] ⚙ │
│ Alamin ang iyong karapatan.  │
├──────────────────────────────┤
│ 🔎 Ano ang nangyari sa'yo?   │  ← big search/prompt
├──────────────────────────────┤
│ Mga karaniwang sitwasyon:    │
│ ┌──────────┐ ┌─────────────┐ │
│ │🚔 Hinarang│ │🚗 Hinuli ng │ │  ← situation tiles
│ │  ng pulis │ │   LTO       │ │     (big tap targets)
│ └──────────┘ └─────────────┘ │
│ ┌──────────┐ ┌─────────────┐ │
│ │👷 Tinanggal│ │🧾 Depektibo │ │
│ │ sa trabaho│ │  ang binili │ │
│ └──────────┘ └─────────────┘ │
├──────────────────────────────┤
│ Mag-browse ayon sa paksa →   │
├──────────────────────────────┤
│ ⚠️ Impormasyon lamang ito.   │  ← persistent disclaimer
│    Hindi legal na payo.       │
└──────────────────────────────┘
   [🏠 Home] [🔎 Hanap] [🆘 Emergency]
```

### 3.2 Rights Card (the core screen)

```
┌──────────────────────────────┐
│ ← Police Encounters  [FIL|EN]│
├──────────────────────────────┤
│ 📌 Hindi basta-basta puwedeng│  ← THE RIGHT (bold, 1 sentence)
│    kunin ng pulis ang phone  │
│    mo nang walang warrant.   │
├──────────────────────────────┤
│ [ Simpleng paliwanag (ELI5) ]│  ← toggle pill
├──────────────────────────────┤
│ 📖 Ibig sabihin nito         │
│ Protektado ka ng Saligang... │
├──────────────────────────────┤
│ ⚠️ Hindi nila puwedeng gawin │  ← RED zone
│  • Kunin nang walang warrant │
│  • Pilitin kang i-unlock     │
├──────────────────────────────┤
│ ✅ Puwede mong gawin         │  ← GREEN zone
│  • Itanong kung may warrant  │
│  • Sabihing 'di ka pumapayag │
├──────────────────────────────┤
│ 📚 Batayan sa batas          │
│  1987 Constitution, Art III  │  ← tappable → source
│  §2  [Tingnan ang batas ↗]   │
├──────────────────────────────┤
│ 🕓 Last verified: 2026-05-30 │  ← trust signal
│ 🚩 I-flag kung mali (v2)     │
├──────────────────────────────┤
│ ⚠️ Para sa iyong sitwasyon,  │
│    kumonsulta sa abogado.    │
└──────────────────────────────┘
```

### 3.3 Emergency Mode (design now, ship v1.5)

```
┌──────────────────────────────┐
│ 🆘 EMERGENCY — quick rights   │
├──────────────────────────────┤
│  Hinaharang ka ngayon?       │
│  ┌────────────────────────┐  │
│  │ 🚔 Pulis               │  │  ← 1 tap →
│  ├────────────────────────┤  │     top 3 rights only,
│  │ 🚗 LTO / MMDA          │  │     no scrolling needed
│  ├────────────────────────┤  │
│  │ 🏘️ Barangay            │  │
│  └────────────────────────┘  │
│  Malaking text • Walang clutter│
└──────────────────────────────┘
```

> Emergency Mode shows only the 2–3 most critical "youCan/theyCannot" lines, huge type, works offline, zero navigation depth.

---

## 4. Design Tokens

### Color (semantic + accessible)

| Token                  | Use                      | Contrast rule                                                             |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------- |
| `--c-allowed` (green)  | ✅ "You can"             | AA on white (≥4.5:1)                                                      |
| `--c-restricted` (red) | ⚠️ "They cannot"         | **Never color-only** — always paired with icon + label (color-blind safe) |
| `--c-ink`              | Body text                | ≥7:1 (AAA target for body)                                                |
| `--c-primary`          | Brand/links              | AA                                                                        |
| `--c-trust`            | Verified date / citation | Subtle but legible                                                        |

> Red/green carry meaning, so they are **always** reinforced with the ⚠️/✅ icon and a text label — meeting WCAG 1.4.1 (use of color).

### Typography

- Base **16px minimum**; body target 17–18px for readability.
- System font stack (no heavy web font → faster on 3G; Persona 1).
- Line length capped ~66 chars; generous line-height (1.6).
- User font-scaling respected (rem units; no max-height clipping).

### Spacing & touch

- Minimum **44×44px** tap targets (WCAG 2.5.5).
- Thumb zone: primary actions in bottom third.
- Bottom tab bar: Home / Search / Emergency.

### Iconography

- `lucide-react`; one icon per module + the 4 card-section icons (📌📖⚠️✅).
- Icons always accompanied by text (never icon-only controls).

---

## 5. Key Interaction Patterns

### Language toggle (FIL | EN)

- Persistent in header; choice remembered (cookie/localStorage).
- Asked once on first launch; changeable anywhere. Content swaps `fil`/`en` fields instantly (no reload).

### ELI5 toggle

- Per-card pill. When on, replaces `whatThisMeans` with `eli5` and trims to essentials. State remembered per session.

### Citations

- Tappable → opens source in new tab with a "leaving to official source" affordance; offline → shows cached citation text + "connect to view full law."

### States to design

- **Offline** (content cached → works; uncached → friendly "available when online" message)
- **Empty search** (suggest situations)
- **Flagged content** (v2 — "under review" badge)
- **Loading** (skeletons, but content is mostly static/instant)

---

## 6. Accessibility Spec (WCAG 2.2 AA — non-negotiable)

- Semantic HTML landmarks; logical heading order (one `h1` per page).
- All interactive elements keyboard-operable + visible focus ring.
- Color never the sole signal (see red/green rule).
- Alt text on all icons that carry meaning; decorative icons `aria-hidden`.
- Forms/toggles labeled; language toggle announces state.
- Respects `prefers-reduced-motion`.
- Designed to be **screen-reader narratable** in both languages (`lang` attributes per content block — critical when FIL and EN mix).
- Sets up **TTS read-aloud** (v2) by keeping card content in clean, ordered DOM.

---

## Deliverables

- [ ] Wireframes for: Home, Situation list, Module, Rights Card, Search, Emergency, Legal pages
- [ ] Design token set (colors, type scale, spacing) as CSS variables / Tailwind theme
- [ ] Component inventory mapped to the rights-card schema fields
- [ ] Accessibility spec sheet (the checklist above)
- [ ] Empty / offline / error state designs

## Definition of Done

A frontend engineer can build every core screen from the wireframes + tokens without guessing, and the design provably meets AA (color, contrast, tap target, keyboard) before a line of production CSS is finalized.

## Risks & Mitigations

| Risk                                                | Mitigation                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Pretty but slow (web fonts, heavy images)           | System fonts, minimal images, perf budget (Phase 4)               |
| Color-only red/green fails color-blind users        | Icon + label always paired                                        |
| Bilingual layout breaks (Filipino runs ~20% longer) | Test layouts with longest FIL strings; no fixed-height text boxes |
