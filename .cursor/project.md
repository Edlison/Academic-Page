### Academic Page Project Structure Summary

### Overview

- **Type**: Next.js App Router static site (`output: "export"`) for an academic/personal homepage
- **Rendering model**: Server Components by default; the header brand scramble is the only Client Component
- **Content**: Five MDX files under `content/home/`, imported directly by the App Router pages
- **Styling**: Tailwind CSS v4 through `@tailwindcss/postcss`, with global styles in `app/globals.css`
- **SEO/analytics**: Next.js Metadata API, `app/sitemap.ts`, `public/robots.txt`, and Google gtag in the root layout

### Commands

```sh
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

`pnpm build` creates the deployable static site in `out/`.

### Key paths

- `app/layout.tsx`: shared metadata, font, analytics, header, and footer
- `app/page.tsx`: homepage composition
- `app/pubs/page.tsx`, `app/misc/page.tsx`, `app/cv/page.tsx`: secondary routes
- `app/not-found.tsx`: branded 404 page
- `components/`: shared Server Components and the isolated `scramble-link.tsx` Client Component
- `content/home/`: biography, contact, news, publications, and misc MDX content
- `mdx-components.tsx`: global MDX element and `Pub`/`Ref` mapping
- `lib/config.ts`: site identity, navigation, footer text, and analytics ID
- `public/`: static images, favicon, and robots file
- `APP_SPEC.md`: visual and interaction specification
