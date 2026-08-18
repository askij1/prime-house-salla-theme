# PRIME HOUSE — Salla Twilight Theme

Premium Fitness & Sports Nutrition. A real Salla Twilight theme project —
not a static HTML mockup — built on Salla's official Twilight architecture,
grounded against Salla's documentation (docs.salla.dev) and the official
[Theme Raed](https://github.com/SallaApp/theme-raed) reference theme (MIT).

See [`DESIGN-BRIEF.md`](./DESIGN-BRIEF.md) for the full design system
(colors, type, the Glow Line signature element) and
[`prime-house-preview.html`](./preview.html) for a static, Salla-independent
visual reference of the direction.

---

## Current status

This repository is now a complete buildable Twilight project. It includes the
official Salla-compatible Webpack watcher integration, PostCSS, production
entries, source templates, styles, scripts, locales, and generated `public/`
assets. It no longer needs to be merged into a second scaffold.

---

## Requirements

- Node.js 22 or newer and npm
- [Salla CLI](https://www.npmjs.com/package/@salla.sa/cli)
- Git + a GitHub account
- A [Salla Partners](https://salla.partners/) account with a demo store to preview against
- Basic familiarity with [Twig](https://twig.symfony.com/)

## 1 — Install the Salla CLI

```bash
npm install @salla.sa/cli -g
salla --version
```

## 2 — Install and build

```bash
npm install
npm run production
```

The production build must create `public/app.css`, `public/app.js`,
`public/home.js`, `public/product.js`, `public/checkout.js`, and
`public/brands.js`.

## 3 — Local development / live preview

Run from the theme's root folder:

```bash
salla login
salla theme preview
# alias: salla theme p
```

This links the theme to a demo store from your Partners account and opens
it live in the browser — edits to `.twig`/`.scss`/`.js` reflect on refresh.

## 4 — Build

```bash
npm run production   # one-off production build
npm run watch        # development build, rebuilds on change
```

## 5 — Git / GitHub

```bash
git init
git add .
git commit -m "PRIME HOUSE — initial Twilight theme"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_ORG/prime-house-theme.git
git push -u origin main
```

Before pushing, replace the placeholder `repository` URL in `twilight.json`
with the real GitHub repository URL.

## 6 — Publish / connect to your store

From the Salla Partners Portal, import/select the theme against your demo
store to test, then use the Portal's publish flow to make it available to
connect on **PRIME HOUSE**'s live Salla store. (Salla Pro is **not**
required to develop or preview a Twilight theme — it is a separate,
store-level plan; nothing in this theme depends on it.)

## Updating the theme later

Design tokens live in **one file**: `src/assets/styles/_variables.scss`.
Editable content (hero copy, CTA links, brand story text, trust-section
items, social links, footer links, colors, fonts) is exposed through
`twilight.json` `settings`/`components`/`features` — the merchant edits
these from the Partners Portal / store's theme customizer, **not** by
touching code. See §9 below for the full list.

---

## What you (the merchant) still do manually — via the Salla dashboard

This theme intentionally contains **zero** invented products, prices, or
category names. You add, via Salla's normal dashboard:

- Categories (Protein, Creatine, Pre-Workout, Vitamins, Snacks, Accessories, Offers…)
- Products, images, prices, stock, variants/options
- Brands + brand logos
- Shipping / return / privacy / terms page content (`page-single.twig` renders whatever you write)
- Store contact info, social links, WhatsApp
- Store logo (`store.logo` — set in Salla's store settings, not a theme setting)

Then, from **Theme Settings** in the Partners Portal / Store Customizer, you can edit:

| Setting | What it controls |
|---|---|
| Hero eyebrow / title / subtitle / image / CTA labels+URLs | `home/hero.twig` |
| "تفعيل خط التوهج" (Glow Line toggle) | Turns the signature gold glow accent on/off site-wide |
| Category Rail component | Pick which categories appear (per-instance, via the home page builder) |
| Brand Story component | Rewrite the "من محل تحت الأضواء…" heading/body |
| Featured Products / Store Features (trust section) / Testimonials | Standard Salla Theme Features — configured entirely from the Portal, no code |

---

## Directory structure

```
prime-house-theme/
├── twilight.json                         # theme manifest: features, custom components, settings
├── package.json
├── DESIGN-BRIEF.md                       # color system, type, Glow Line rationale
├── preview.html                          # static, non-Salla visual reference only
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── _variables.scss           # PRIME HOUSE design tokens + official --color-* mapping
│   │   │   └── main.scss                 # all component styling
│   │   ├── js/
│   │   │   ├── app.js                    # global (header scroll shadow)
│   │   │   ├── home.js                   # featured-products tab switcher
│   │   │   ├── product.js                # (reserved — official web components handle behaviour)
│   │   │   ├── cart.js                   # (reserved — compiles to checkout.js)
│   │   │   └── brands.js                 # A–Z nav smooth scroll
│   │   └── images/                       # drop store.logo fallback / hero placeholder here
│   ├── locales/
│   │   ├── ar.json
│   │   └── en.json
│   └── views/
│       ├── layouts/
│       │   └── master.twig
│       ├── components/
│       │   ├── header/header.twig
│       │   ├── footer/footer.twig
│       │   └── home/
│       │       ├── hero.twig              # fixed brand moment
│       │       ├── category-rail.twig     # custom component, merchant picks categories
│       │       ├── featured-products.twig # Theme Feature: component-featured-products
│       │       ├── store-features.twig    # Theme Feature: component-store-features (trust section)
│       │       ├── testimonials.twig      # Theme Feature: component-testimonials (used from product listing too)
│       │       └── brand-glow.twig        # custom component, editable brand story
│       └── pages/
│           ├── index.twig                 # home
│           ├── page-single.twig           # about / shipping / returns / privacy / terms / contact
│           ├── cart.twig
│           ├── product/
│           │   ├── index.twig             # category / offers / tags / search results (all four)
│           │   └── single.twig
│           ├── brands/
│           │   ├── index.twig
│           │   └── single.twig
│           └── partials/product/options.twig
```

---

## Architecture decisions worth knowing

- **Product cards** use the official, documented `<salla-product-card>` and
  `<salla-products-list>` web components (docs.salla.dev/422718, /422719)
  rather than a hand-rolled card partial. Theme Raed itself additionally
  ships internal `partials/product/card*.twig` files used by its own
  proprietary JS implementation — PRIME HOUSE deliberately does not copy
  that proprietary code, and instead styles the public component via a
  wrapper (`.ph-product-card-slot`) plus the documented `--color-primary`
  CSS variable. This is a maintainability trade-off: less pixel-level
  control over the card's internal markup, in exchange for automatically
  staying correct as Salla updates cart/wishlist/stock behaviour.
- **All dynamic data** (products, categories, brands, cart, filters) flows
  through Salla's own web components and documented Twig variables — see
  the variable-contract comment block at the top of every `.twig` file.
- **The Glow Line** (`.glow-line` / `--glow-gradient` in `_variables.scss`)
  is the one deliberately recurring signature element, used sparingly
  (section headings, active nav, card hover, brand story) — never as a
  full-page neon wash.

## Known limitations / runtime checks

- Customer account pages (login/register/orders/addresses/wishlist) are
  **not** included — Salla renders these from its own official templates
  by default; only add `views/pages/customer/*.twig` if you need to
  override Salla's defaults, following the same variable-contract pattern
  used throughout this repo.
- No dedicated `search.twig` / `offers.twig` — confirmed by Salla's docs,
  both cases are served by `pages/product/index.twig` (the same "Products
  Listing" template handles category, offers, tag, and search-result pages).
- 404 / thank-you pages are not included; Salla provides default templates
  for both, and were out of scope for this pass.
- A live `salla theme preview` still requires the owner's Salla login and a
  demo store. That authenticated browser/runtime test cannot be replaced by a
  static build.

## Validation performed on this repo

- ✅ `twilight.json` / `package.json` / `src/locales/*.json` — valid JSON (`python -m json.tool`)
- ✅ `src/assets/styles/*.scss` — compiles cleanly with Dart Sass (`npx sass`), zero errors
- ✅ Every `{% component %}`, `{% include %}`, `{% extends %}` reference across all 17 `.twig`
  files resolves to a real file on disk (scripted check, zero broken references)
- ✅ All `{% %}` / `{{ }}` tag pairs balanced across all templates
- ✅ Webpack production build completed and emitted all referenced assets
- ⚠️ Not performed: authenticated live rendering against real Salla store data
