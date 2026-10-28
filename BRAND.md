# GoodEWorkers — Visual Corporate Identity

## 1. Logo

The logotype combines three distinct elements:

- **"GoodE"** — rendered in **orange** (`#FD5E09`), with the standalone "e" acting as the brand's differentiator
- **"Workers"** — rendered in **light grey** (`#ECECEC`), contrasting on dark backgrounds
- **Star burst** — a 12-point radiating mark in **yellow** (`#FDC959`), placed between the two words; symbolises network, energy, and international reach
- **"k" ligature ornament** — the descender of the "k" is filled in **lavender** (`#B3A0CF`)

**Usage rules:**
- Minimum size: 110px wide (digital), maintain aspect ratio 160:63
- Preferred background: `#111111` (near-black)
- Never place on a mid-value background; use only on black or white

---

## 2. Color Palette

| Token | Hex | Role |
|---|---|---|
| `orange` | `#FD5E09` | Primary accent — CTAs, highlights, logo |
| `yellow` | `#FDC959` | Secondary accent — cards, star mark, "nonprofit" button |
| `purple` | `#B3A0CF` | Tertiary accent — "help" button, logo, section labels |
| `black` | `#111111` | Page background |
| `black-light` | `#1D1D1D` | Card/section surface on dark |
| `white` | `#F8F8F8` | Light section background (Hero, Footer) |
| `grey` | `#ECECEC` | Surface cards (light mode) |
| `ashgray` | `#E0E0E0` | Body text on dark backgrounds |
| `primary` | `#DEB36F` | Reserve — warm gold, available for premium contexts |
| `background` | `#2B0E45` | Reserve — deep purple, available for hero overlays |

**Light/dark contrast** is a core brand pattern: the page alternates between `#111111` sections and `#F8F8F8` sections.

---

## 3. Typography

| Role | Family | Weight | Size range |
|---|---|---|---|
| Display / Headings | **ClashDisplay** (variable) | 500–700 | 30px → 54px |
| Body / UI labels | **Inter** (Regular 400–700, Bold 800–900 for card titles only) | 400–800 | 12px → 16px |

- `font-clash font-medium` → section headings
- `font-clash font-bold` → large CTA buttons, stat numbers
- `font-inter font-bold` → nav, labels, body emphasis
- `font-inter font-medium` → body paragraphs, card descriptions

The brand word "Goode**W**orkers" always renders the "e" in `font-semibold` (ClashDisplay) to differentiate "Good**e**" from "Workers".

---

## 4. Core UI Components

### Large pill button
- Shape: `rounded-full`, full-width up to 336px
- Padding: `px-7 py-5`
- Layout: small label on top, large ClashDisplay bold text below
- Hover: `scale-105`, no shadow
- Variants: `bg-yellow` (nonprofit), `bg-purple` (help/volunteer), `bg-orange` (join CTA)
- On `bg-orange` the label and the icon are `text-white-pure` (`#FFF`) at every size, not the brand off-white:
  `#F8F8F8` on `#FD5E09` is 2.92:1, under the 3:1 large-text floor; `#FFF` is 3.10:1.
  That ratio clears the large-text floor and not the 4.5:1 for small text. White on every orange
  surface is the designer's decision (review of 28 Oct 2026), recorded here with its 3.1:1.

### Service / Feature cards
- Shape: `rounded-lg`, square aspect ratio
- Normal state: `bg-grey` with icon + bold label
- Highlighted: `bg-orange text-white-pure` for the "and more…" card (see the contrast note under the pill button)
- Why cards: `bg-yellow text-black-light`, `bg-orange text-white-pure`, `bg-purple text-black-light`

### Section rhythm
- Dark sections: `bg-black` or `bg-black-light`, text in `text-grey` / `text-ashgray`
- Light section (Hero + Footer): `bg-white rounded-xl lg:rounded-3xl`, negative top margin overlap with pill buttons above
- Overlap/float effect on team photos: intentional `translate-x` + `translate-y` offsets for layered depth

---

## 5. Motion & Interaction

- Transitions: `duration-200 ease-in` on color changes (nav hover)
- Scale: `hover:scale-105` on CTAs (no shadow — see issue #46)
- Mobile menu: slide + fade `100ms ease-in`
- Scroll: `scroll-behavior: smooth`

The motion verb is "settle like paper": sheets slide in and settle on `expo.out` (`expo.inOut` for the page curtain, `power3.out` for hovers), and big things move slower than small things. Two signatures carry it: the hero sheet opens like a window as you scroll into it, and a warm lamp glow follows the pointer across the dark ground. The full system, with the ease names, timings and data attributes, is under "Motion" in DESIGN.md.

---

## 6. Brand Values → Visual Choices

| Value | Visual expression |
|---|---|
| Nonprofit / Social impact | Warm palette (orange, yellow) — approachable, not corporate blue |
| Remote / Global | Star burst mark, no geographical imagery |
| Expert community | ClashDisplay geometric type — modern and confident |
| Volunteer-driven | Handcrafted feel: overlapping photos, irregular card grid |
