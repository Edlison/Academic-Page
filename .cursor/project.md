### Academic-Page Project Structure Summary

### Overview
- **Type**: Astro static site (`output: "static"`), an academic/personal homepage template
- **Rendering model**: The homepage is composed by `src/pages/index.astro` using multiple slots in `src/layouts/home.astro`; content comes from `src/content/home/*.mdx`
- **MDX**: `src/components/mdx.ts` maps common MDX tags (h1/h2/p/a/ul/...) to custom Astro components, and also provides custom components (e.g., `Pub`, `Notation`/`N`)
- **Styling**: Tailwind CSS (via the Vite plugin `@tailwindcss/vite`), global stylesheet entry at `src/styles/global.css`
- **SEO/Analytics**: `@astrojs/sitemap`; `src/components/meta.astro` injects Google gtag

### Tech Stack & Scripts (from package.json)
- **Astro**: `astro` (v5)
- **MDX**: `@astrojs/mdx`
- **Sitemap**: `@astrojs/sitemap`
- **Tailwind**: `tailwindcss` + `@tailwindcss/vite` (Vite plugin approach)
- **Scripts**
  - `pnpm dev`: local development
  - `pnpm build`: build static output
  - `pnpm preview`: preview the build locally

### Directory Responsibilities (High-level)
- `astro.config.mjs`: Astro global config (site URL, prefetch, integrations, static output, Vite plugins, etc.)
- `tailwind.config.cjs`: Tailwind content paths and theme extensions (fonts, etc.)
- `public/`: static assets (e.g., `favicon.png`, `blshen.jpg`, `robots.txt`) served from the site root
- `src/`: site source code
  - `pages/`: route entries
  - `layouts/`: page layouts
  - `components/`: reusable components (including MDX rendering components)
  - `content/`: homepage MDX documents (currently imported directly)
  - `styles/`: global styles

### Structure Tree (current repository snapshot)
- `astro.config.mjs`
- `package.json`
- `tailwind.config.cjs`
- `public/`
  - `avatar.png`
  - `favicon.png`
  - `blshen.jpg`
  - `robots.txt`
- `src/`
  - `config.ts`
  - `pages/`
    - `index.astro`
    - `404.astro`
    - `pubs/index.astro`
    - `misc/index.astro`
  - `layouts/`
    - `base.astro`
    - `home.astro`
  - `components/`
    - `header.astro`
    - `menus.astro`
    - `footer.astro`
    - `meta.astro`
    - `info.astro`
    - `pub.astro`
    - `mdx.ts`
    - `mdx/` (MDX tag components)
      - `a.astro` `p.astro` `h1.astro`... `ul.astro` `ol.astro` `li.astro` `table.astro` etc.
      - `notation.astro`
  - `content/`
    - `content.config.ts` (currently empty / unused)
    - `home/`
      - `contact.mdx` (left column contact info)
      - `bio.mdx` (bio section)
      - `news.mdx` (news list items)
      - `pubs.mdx` (publication list, uses `<Pub .../>`)
      - `misc.mdx` (misc list items)
  - `styles/`
    - `global.css`

### Key Entry Points & Data Flow
- **Route entry**
  - `src/pages/index.astro`
    - Imports 5 MDX files: `contact/bio/news/pubs/misc`
    - Renders `<Home>` (`src/layouts/home.astro`) and fills `slot="contact|bio|news|pubs|misc"`
    - Passes `components={MDXComponents}` to MDX, ensuring tags/components render via the custom mapping
  - `src/pages/404.astro`: 404 page
  - `src/pages/pubs/index.astro`, `src/pages/misc/index.astro`: placeholder pages (a “cd ..” link back to `/`)

- **Layouts**
  - `src/layouts/base.astro`
    - Includes `Meta` (global CSS, fonts, canonical, gtag, ViewTransitions, etc.)
    - Wraps `Header` + page `<slot />` + `Footer`
  - `src/layouts/home.astro`
    - Defines the homepage layout: avatar+contact on the left, bio in the middle, then News/Publications/Misc sections (all via slots)

- **Configuration**
  - `src/config.ts`
    - site title/description, favicon/logo paths
    - navigation menu items `MENUS`
    - footer text `FOOTER_CONTENT`
    - analytics id `GOOGLE_GTAG`
  - `astro.config.mjs`
    - `site: "https://blshen.org"` (affects sitemap/canonical, etc.)
    - `integrations: [mdx(), sitemap()]`
    - `vite.plugins: [tailwindcss()]`
    - `output: "static"`

### Editing Guide (most frequently changed)
- **Update homepage text**
  - `src/content/home/contact.mdx`: name / affiliation / email
  - `src/content/home/bio.mdx`: bio paragraphs and links
  - `src/content/home/news.mdx`: news list (use `- ...`)
  - `src/content/home/misc.mdx`: misc list (use `- ...`)

- **Update publications**
  - `src/content/home/pubs.mdx`: uses the custom component `<Pub .../>`
  - `<Pub>` is defined in `src/components/pub.astro` (supports `name/conference/authors/pdfUrl/codeUrl`, and bolds “Bolin Shen” in the author string)

- **Adjust MDX styling/behavior**
  - `src/components/mdx.ts`: centralized `MDXComponents` mapping (also exports `Notation`/`N` and `Pub`)
  - `src/components/mdx/`: per-tag components
    - `a.astro`: external links default to `_blank` and append `↗`
    - `notation.astro`: renders a span with data-* attributes (intended for rough-notation-like annotations; related script in the home layout is currently commented out)

- **Site-level info & navigation**
  - `src/config.ts`: update site title, menus, footer text, gtag id
  - `src/components/menus.astro`: renders the top menu from `MENUS`

### Notes
- `src/content/content.config.ts` is currently empty; this project does not use Astro Content Collections at the moment (MDX files are imported directly).

