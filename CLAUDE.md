# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio and blog for Arvin Baghari Edubas: Next.js 16 (App Router, Turbopack), React 19, strict TypeScript, Tailwind CSS 4 and MDX. Path alias `@/*` → `./src/*`.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build; type-checks, but Next 16 no longer lints during build
npm start          # serve the production build
npm run lint       # ESLint 9 flat config (next core-web-vitals + typescript)
npx tsc --noEmit   # type-check only, much faster than a build
```

There is no test suite. Verify changes with `npm run lint` plus `npx tsc --noEmit` (or `npm run build`).

## Architecture

### Content lives in the page files

There is no CMS or database. Page copy and data (projects, skills, work history, services) are hardcoded in the page files under `src/app/`, mostly as arrays at the top of each `page.tsx`.

- The email address and GitHub/LinkedIn links are duplicated in `src/components/Footer.tsx` and `src/app/contact/page.tsx`. Update both.
- Site-wide SEO (title template `%s | Arvin Baghari Edubas`, OpenGraph, Twitter) is the `metadata` export in `src/app/layout.tsx`. Each page exports only `title` and `description`.
- `POST /api/contact` only validates the submission and logs it with `console.log`. No email delivery or storage is wired up.
- `resume.html` at the repo root is a standalone, print-ready (US Letter) resume. It is not part of the Next app and is not served, because it sits outside `public/`. It repeats the about page's work history and the projects page's project list, so update both places when either changes.
- A component used by only one page sits beside that page (`src/app/HeroAnimation.tsx`, `src/app/contact/ContactForm.tsx`). Shared components live in `src/components/` and are re-exported from `@/components`.

### Blog

Posts are `src/content/blog/*.mdx`, and the filename is the slug. `src/lib/blog.ts` reads them from disk, using gray-matter for frontmatter and reading-time for the read time. `src/app/blog/[slug]/page.tsx` prerenders each post via `generateStaticParams` and renders it with `MDXRemote` from `next-mdx-remote/rsc`. The element overrides in `src/components/MDXComponents.tsx` provide the styling.

```yaml
---
title: "Post Title"
description: "Brief description"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---
```

- Keep `date` a quoted `YYYY-MM-DD` string. An unquoted YAML date parses to a `Date` object, and posts are sorted by plain string comparison.
- next-mdx-remote v6 strips `{expressions}` by default (`blockJS: true`), and MDX `import`s aren't supported. A post can contain only Markdown plus the components passed in `components`.
- `MDXRemote` runs `remark-gfm`, `rehype-slug` and `rehype-highlight`, passed through `options.mdxOptions` in the slug page. An override in `mdxComponents` must pass through what those plugins add, or it's lost. Headings forward `id` for rehype-slug, and `code` keeps `className` for rehype-highlight. Only fenced blocks with a language tag get highlighted.
- Highlight colors are the `--code-*` variables in `globals.css`. They hold GitHub's light (Primer) and dark palettes, chosen to meet WCAG AA contrast on `--muted` in both themes.
- Post typography comes only from the classes in `mdxComponents`. There is no typography plugin, and the `prose-custom` wrapper class isn't defined anywhere.
- Don't configure blog plugins in `next.config.ts`. Its `@next/mdx` setup, together with the root `mdx-components.tsx` it requires, is a separate pipeline. That pipeline only makes `.md`/`.mdx` files under `src/app` routable. There are no such files, and blog posts don't go through it.

### Theme and styling

- An inline script in the `<head>` of `src/app/layout.tsx` sets the `dark` class on `<html>` before paint. It uses `localStorage.theme` if set, and otherwise `prefers-color-scheme`. `ThemeProvider` reads its initial state back from that class and persists toggles.
- Don't branch rendered markup on `useTheme().theme`. The server always renders it as `"light"`, so a branch on it causes a hydration mismatch. Render both variants and switch between them in CSS off `.dark`, as `ThemeToggle` does with the `.icon-sun`/`.icon-moon` rules in `globals.css`.
- `react-hooks/set-state-in-effect` is a lint error. That's why the hero entrance is pure CSS (`.hero-enter`, which honors `prefers-reduced-motion`) and why the theme is resolved before paint rather than in an effect. Handle new mount-time effects the same way.
- Colors are CSS variables on `:root` and `.dark` in `src/app/globals.css`. They're exposed to Tailwind through `@theme inline` as `background`, `foreground`, `primary`, `primary-hover`, `secondary`, `accent`, `muted`, `muted-foreground`, `border`, `card` and `card-foreground`. There's no `tailwind.config`, because Tailwind 4 is configured in CSS.
- `@custom-variant dark` in `globals.css` ties Tailwind's `dark:` variant to the `.dark` class, so `dark:` follows the site toggle. Without that line, Tailwind 4's `dark:` would follow the OS setting instead.
- Most sections are wrapped in `ScrollReveal`, an IntersectionObserver reveal that takes `animation`/`delay`/`duration`/`easing` props. Custom keyframes (`gradient`, `float`, `sparkle`, `blink`, `heroEnter`) live in `globals.css`. They're used through arbitrary values such as `animate-[float_8s_ease-in-out_infinite]`.

### Images

Use `next/image` everywhere, and give `fill` images a `sizes` prop. No `images.remotePatterns` is configured, on purpose (see the comment in `MDXComponents.tsx`), so only local images under `public/` load.

### Deployment

Pushes to `main` deploy automatically. `.github/workflows/ci-cd.yml` lints and builds every push and pull request. On `main` it then SSHes into the VPS. There, `deploy/deploy-abedubas-dev.sh` builds the commit beside the live copy, smoke-tests it, swaps it in and restarts the `abedubas.dev` pm2 app. It swaps back on its own if the app doesn't come up. The README's Deployment section covers rollback and setup.

- The VPS runs its own copy of the script at `/usr/local/bin/deploy-abedubas-dev.sh`. Editing `deploy/deploy-abedubas-dev.sh` changes nothing there until it's reinstalled.
- The CI key in the VPS's `authorized_keys` can run only that script. The `DEPLOY_*` secrets live in the `production` environment, and only `main` may deploy to it.
- The repo is public, so the Actions logs are too. The script keeps pm2's table of every app on the VPS out of them. Keep the VPS's other apps out of anything else it prints.
- CI pins Node 20 because the site builds and runs on the VPS's system Node 20.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
