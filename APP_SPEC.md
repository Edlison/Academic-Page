# Academic Page App Spec

## Product

A static academic homepage for Bolin Shen. The site presents a biography, contact information, news, publications, personal interests, and an embedded CV across `/`, `/pubs`, `/misc`, and `/cv`, with a branded 404 page. Next.js App Router renders all content as Server Components except the header brand animation, and `output: "export"` produces GitHub Pages-ready files.

## Layout

The site uses a centered `max-w-screen-lg` column with `px-4 sm:px-6` and `py-8`. A sticky six-rem frosted header and twelve-rem footer frame every route. The home route becomes a three-column grid at `md`: one column for the portrait/contact block and two for the biography, followed by full-width News, Publications, and Misc sections.

## Type scale

Inter 100–900 is self-hosted through `next/font`. MDX h1 uses `text-4xl`; section and page headings use `text-2xl`; publication titles use `text-xl`; body copy uses the base size; metadata uses `text-sm`; footer text uses `text-xs`.

## Color system

The neutral system is zinc on white with `text-zinc-800` body text. The single accent pair is deep blue `#333366` for links and warm orange `#c67d4a` for hover and selection. Headings and bold text are near-black.

## Spacing and radii

Spacing follows Tailwind's four-pixel scale, with `gap-8` in the main grid and `mt-12` between home sections. Cards, the portrait, the CV frame, and link badges use a restrained `rounded-lg` radius and shallow shadow treatment.

## Motion

The brand uses a 200ms transform/text-shadow hover treatment and one 500ms requestAnimationFrame character scramble on hover or focus. The portrait gains a four-pixel offset shadow on hover. Both CSS and JavaScript respect `prefers-reduced-motion`.

## Responsiveness

The mobile-first layout is a single column. The home grid and portrait alignment expand at `md`, horizontal page padding increases at `sm`, navigation stays compact, and the CV iframe uses `calc(100vh - 14rem)` to track viewport height.

## Accessibility and behavior

The header brand keeps a stable accessible name in an `sr-only` span while its visible text is `aria-hidden` during animation. Navigation is labeled, the portrait and CV iframe have text alternatives, external links retain safe `rel` values, and all source MDX links and destinations are preserved. The previous Astro cross-page fade is intentionally omitted; App Router links retain built-in prefetch behavior.
