# Migration Plan: Astro 5 → Next.js App Router + TypeScript + Tailwind

Rebuild `blshen.org` (static academic page) on Next.js App Router with TypeScript and Tailwind CSS v4, preserving every route, all MDX content, all assets, and the current visual design. Output stays a static export deployed to GitHub Pages.

## 1. Target tree

```
app/
  layout.tsx              # <html>/<body>, fonts, GA, Header, Footer  (server)
  page.tsx                # /            home, imports the 5 MDX files
  not-found.tsx           # 404 → 404.html on export                 (server)
  sitemap.ts              # /sitemap.xml
  globals.css             # @import "tailwindcss" + tokens + text-scramble.css
  text-scramble.css
  pubs/page.tsx           # /pubs
  misc/page.tsx           # /misc
  cv/page.tsx             # /cv
components/
  header.tsx              # server shell; renders <Scramble/>
  scramble-link.tsx       # "use client"  (rAF hover animation)
  menus.tsx               # server
  footer.tsx              # server
  section.tsx             # server
  pub.tsx                 # server
  mdx-components/         # a, blockquote, h1–h6, img, input, li, ol, ul, ref
content/home/             # bio.mdx, contact.mdx, news.mdx, pubs.mdx, misc.mdx (moved verbatim)
lib/config.ts            # SITE_TITLE, SITE_DESCRIPTION, MENUS, FOOTER_CONTENT, GOOGLE_GTAG
mdx-components.tsx        # useMDXComponents() — maps tags + Pub/Ref globally
next.config.mjs           # output: "export", trailingSlash: false, images.unoptimized
tsconfig.json  postcss.config.mjs  next-env.d.ts
public/                   # avatar.png, favicon.png, blshen.jpg, robots.txt (unchanged)
```

Delete after parity is verified: `astro.config.mjs`, `src/`. Keep `public/`, `LICENSE`, `README.md`, `.github/`.

## 2. Route and content parity

| Astro | Next.js | Content |
|---|---|---|
| `src/pages/index.astro` | `app/page.tsx` | avatar + contact, Bio, News, Publications, Misc — all 5 MDX |
| `src/pages/pubs/index.astro` | `app/pubs/page.tsx` | `pubs.mdx`, `<Section title="Publications" heading="h1">` |
| `src/pages/misc/index.astro` | `app/misc/page.tsx` | `misc.mdx`, same `h1` section |
| `src/pages/cv/index.astro` | `app/cv/page.tsx` | h1 + "Open PDF" link + iframe `edlison.github.io/CV/cv.pdf`, `height: calc(100vh - 14rem)` |
| `src/pages/404.astro` | `app/not-found.tsx` | "Page not found. Honesty setting at 90%." + `cd ..` → `/` |

All five `.mdx` files move byte-for-byte. `bio.mdx` contains raw `<div class="...">` and `<br/>`; JSX in MDX tolerates `class`, but if React warns, switch those two to `className` — no other content edits. `pubs.mdx` uses `<Pub …/>` and `bio.mdx`/`news.mdx` use `<Ref …/>`; both are supplied by `mdx-components.tsx`, so pages need no per-import `components={…}` prop (this replaces `src/components/mdx.ts`).

## 3. Server vs client components

Server (default) for everything: layout, all 4 pages, header shell, menus, footer, section, pub, every MDX element override. MDX compiles at build time and renders on the server.

`"use client"` only in `components/scramble-link.tsx` — the header brand hover animation needs `requestAnimationFrame`, `mouseenter`/`focus` handlers, and DOM text mutation. Port the current inline IIFE into a `useRef` + `useEffect` component; keep the `sr-only` span for a stable accessible name, keep the `aria-hidden` animated span, and keep the `prefers-reduced-motion` guard in CSS.

`components/pub.tsx` keeps the author-bolding behavior. Astro used `set:html`; in React render it as `authors.split("Bolin Shen")` joined with `<strong>Bolin Shen</strong>` rather than `dangerouslySetInnerHTML`, avoiding the injection surface with identical output.

## 4. Metadata, SEO, GA, sitemap, robots, 404

- `app/layout.tsx` exports `metadata`: `metadataBase: new URL("https://blshen.org")`, `title: { default: SITE_TITLE, template: "%s · " + SITE_TITLE }`, `description: SITE_DESCRIPTION`, `icons: "/favicon.png"`, `alternates.canonical: "/"`, plus `openGraph` (type `website`, image `/avatar.png`) and `twitter` (`summary_large_image`). Child pages export `metadata` with just `title` ("Publications", "Misc", "CV") so the template yields the same `"CV · Bolin Shen"` strings Astro produced. `not-found.tsx` gets `title: SITE_TITLE` equivalent (Next uses the default). Each page sets `alternates.canonical` to its own path to match Astro's per-page canonical.
- Viewport/charset are emitted by Next automatically; add `export const viewport = { width: "device-width", initialScale: 1 }`.
- Fonts: replace the two `<link rel="preconnect">` + Google Fonts stylesheet with `next/font/google` `Inter` (`variable: "--font-inter"`, `display: "swap"`), wired into `@theme { --font-sans: … }`. Self-hosting removes a render-blocking third-party request; visual result is the same family.
- GA: `<Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_GTAG}`} strategy="afterInteractive" />` plus an inline `<Script id="gtag-init">` doing `dataLayer`/`gtag("js")`/`gtag("config", …)`. Same `G-ET18GF988R` id from `lib/config.ts`. Static export runs client-side GA fine.
- Sitemap: `@astrojs/sitemap` is replaced by `app/sitemap.ts` returning the 4 real URLs (`/`, `/pubs`, `/misc`, `/cv`) with `lastModified`. Confirm the exported `sitemap.xml` lists all four and excludes 404.
- `public/robots.txt` stays as-is (`User-agent: * / Allow: /`). Add a `Sitemap: https://blshen.org/sitemap.xml` line — optional but worth it.
- 404: `app/not-found.tsx` is emitted as `404.html` by `output: "export"`, which GitHub Pages serves for unknown paths. Verify `out/404.html` exists post-build.

## 5. Dependencies and lockfile

Remove: `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@tailwindcss/vite`.
Add (pinned exact, no ranges): `next@15.5.4`, `react@19.1.1`, `react-dom@19.1.1`, `@next/mdx@15.5.4`, `@mdx-js/loader@3.1.1`, `@mdx-js/react@3.1.1`, `@types/mdx@2.0.13`.
Dev: `typescript@5.9.2`, `@types/node@22.18.0`, `@types/react@19.1.9`, `@types/react-dom@19.1.7`, `tailwindcss@4.1.13`, `@tailwindcss/postcss@4.1.13`, `eslint@9.35.0`, `eslint-config-next@15.5.4`.
Pin the resolved versions actually installed; the numbers above are targets, not guesses to keep if the registry differs.

Scripts → `dev: next dev`, `build: next build`, `start: next start`, `lint: next lint`, `typecheck: tsc --noEmit`. Keep `packageManager: pnpm@10.26.2…`. Regenerate `pnpm-lock.yaml` with `pnpm install` (not `--frozen-lockfile`) and commit it. Add `.next/`, `out/`, `next-env.d.ts` to `.gitignore`.

Tailwind v4 moves from the Vite plugin to `@tailwindcss/postcss` in `postcss.config.mjs`. `.github/workflows/deploy.yml` currently uses `withastro/action@v3`; it must be swapped for checkout + pnpm + `pnpm build` + `actions/upload-pages-artifact` on `./out`. That file is out of scope for this task — flagging it so the deploy is not silently broken.

## 6. Styling and responsive parity

`global.css` and `text-scramble.css` move verbatim (only the `@import "./text-scramble.css"` path changes). Everything they hold is portable Tailwind v4: `@theme` font token, the `--link-color` `#333366` / `--link-hover-color` `#c67d4a` / `--heading-color` / `--bold-color` / `--selection-bg` `#c67d4a` custom properties, `::selection`, the `*:focus-visible { outline: none }` rule, `.link-invert`, `.nav-links`, heading/strong colors, and `.shadow-black`. Drop `pre.astro-code` (Astro-specific; no code blocks in content) — or keep it harmlessly.

Class strings are copied unchanged so breakpoints match exactly: `max-w-screen-lg mx-auto px-4 sm:px-6 py-8` page shell; home grid `grid-cols-1 md:grid-cols-3 gap-8` with bio at `col-span-2` and the avatar column `items-center md:items-start`; sticky header `sticky z-50 top-0 bg-white/80 backdrop-blur-xl` at `h-24`; footer `h-48`; avatar `w-32 h-40 rounded-lg` with `.shadow-black`. Mobile-first single column expanding at `md`, per the app skill.

`*:focus-visible { outline: none }` removes visible focus rings, which is an accessibility regression already present in the source. Preserving it for pixel parity as instructed; recommend replacing it with a styled ring in a follow-up.

Astro's `<ClientRouter />` view transitions and `prefetch.prefetchAll` have no direct App Router equivalent. `next/link` prefetches on viewport/hover by default, so perceived navigation speed is retained; the cross-page fade is dropped. Called out as an accepted deviation.

## 7. Migration steps

1. Branch off `nextjs-rebuild`. Scaffold `package.json`, `tsconfig.json`, `next.config.mjs` (`output: "export"`, `trailingSlash: false`, `images: { unoptimized: true }`, wrapped in `withMDX`), `postcss.config.mjs`, `mdx-components.tsx`.
2. `pnpm install`; commit the regenerated lockfile.
3. Move `src/config.ts` → `lib/config.ts`; move `src/content/home/*.mdx` → `content/home/` unchanged; move both CSS files into `app/`.
4. Port leaf components (`section`, `menus`, `footer`, `pub`, all 14 MDX overrides) to `.tsx` with explicit prop types, classes copied verbatim.
5. Port `header` + extract `scramble-link.tsx` as the only client component.
6. Build `app/layout.tsx` (fonts, GA, metadata, header/footer shell).
7. Build the 4 pages + `not-found.tsx`; add `app/sitemap.ts`.
8. `pnpm typecheck && pnpm lint && pnpm build`; diff `out/` against an `astro build` `dist/` for text/link/asset parity.
9. Remove `src/` and `astro.config.mjs` only after step 8 passes.

## 8. Validation

```bash
pnpm install
pnpm typecheck                 # tsc --noEmit, zero errors
pnpm lint
pnpm build                     # must emit out/
ls out/index.html out/pubs/index.html out/misc/index.html out/cv/index.html \
   out/404.html out/sitemap.xml out/robots.txt
grep -o "Bolin Shen" out/pubs/index.html | wc -l   # 8 publication entries present
pnpm dlx serve out             # manual pass: nav, hover scramble, CV iframe, 375/768/1280px
```

Checks: every heading (Bio, News, Publications, Misc) renders on `/`; all 9 news items and 8 publications present; the 4 social links in `bio.mdx` resolve; `<title>` is `Publications · Bolin Shen` on `/pubs`; canonical/OG/Twitter tags present; GA script id is `G-ET18GF988R`; `blshen.jpg` and `favicon.png` load.

## 9. Risks

- **MDX component scope** — `mdx-components.tsx` is the single source for `Pub`/`Ref`; if a component is missing from the map, MDX fails at build (loud, not silent). Verify all 16 keys.
- **`class` vs `className` in MDX** — `bio.mdx` uses raw HTML attrs. React may warn; the narrow fix is those two attributes only.
- **Tailwind v4 content detection** — v4 auto-scans; confirm classes used only inside `.mdx` (e.g. `text-center link-invert`) survive the production build, else add an explicit `@source`.
- **Trailing slashes / GitHub Pages** — `trailingSlash: false` with `out/pubs/index.html` is served correctly by Pages, but verify `/pubs` resolves without a redirect loop.
- **Deploy workflow** — `withastro/action@v3` will fail on a Next repo. Must be updated in a separate change before merge to `main`.
- **Scramble regression** — the animation is hand-ported; check hover, focus, blur, and reduced-motion.

## 10. App spec note (required by the app skill)

**Layout** — centered `max-w-screen-lg` column, `px-4 sm:px-6`, `py-8`; sticky 6rem frosted header, 12rem footer; home is a 3-col `md` grid (1 avatar/contact + 2 bio) with stacked full-width sections below. **Type scale** — Inter 100–900; `text-4xl` h1 in MDX, `text-2xl` section/page headings, `text-xl` pub titles, `text-base` body, `text-sm` meta, `text-xs` footer. **Color** — zinc neutrals on `#fff` (`text-zinc-800` base), one accent pair: link `#333366` → hover `#c67d4a`, which also drives selection; near-black headings and bold. **Spacing/radii** — 4px-based Tailwind scale, `gap-8` grid / `mt-12` between sections; single radius step `rounded-lg`, `rounded-xs` on badges. **Motion** — restrained: 200ms transform/text-shadow on the brand, one 500ms rAF character-scramble on hover/focus, `shadow-black` hover offset on the avatar; all motion respects `prefers-reduced-motion`. **Responsiveness** — mobile-first single column, grid and avatar alignment expand at `md`, horizontal padding at `sm`; CV iframe is viewport-relative (`calc(100vh - 14rem)`).
