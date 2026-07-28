# Academic Page

This static academic page was created by Bolin and AI. It uses Next.js App Router, TypeScript, MDX, and Tailwind CSS, and exports to `out/` for GitHub Pages.

## Quick Start

```sh
pnpm install
pnpm dev
```

## Verify and Build

```sh
pnpm typecheck
pnpm lint
pnpm build
```

The production build is a static export in `out/`.

## Deployment

Pushing to `main` runs the GitHub Pages workflow, which installs with pnpm, builds the static export, uploads `out/`, and deploys it with GitHub Pages.

## Acknowledgment

This project is inspired by [Mia](https://github.com/infinity-ooo/astro-theme-mia) and powered by [Next.js](https://nextjs.org).

Special thanks for their valuable contributions and open-source efforts.
