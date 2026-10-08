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
- A component used by only one page sits beside that page (`src/app/HeroBackdrop.tsx`, `src/app/about/Timeline.tsx`, `src/app/contact/ContactForm.tsx`). Shared components live in `src/components/` and are re-exported from `@/components`.

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
- `react-hooks/set-state-in-effect` is a lint error. That's why the theme is resolved before paint, and why every animation is CSS or a direct DOM write through a ref (see Motion) rather than state set in an effect. Handle new mount-time effects the same way.
- Colors are CSS variables on `:root` and `.dark` in `src/app/globals.css`. They're exposed to Tailwind through `@theme inline` as `background`, `foreground`, `primary`, `primary-hover`, `secondary`, `accent`, `muted`, `muted-foreground`, `border`, `card` and `card-foreground`. There's no `tailwind.config`, because Tailwind 4 is configured in CSS.
- `@custom-variant dark` in `globals.css` ties Tailwind's `dark:` variant to the `.dark` class, so `dark:` follows the site toggle. Without that line, Tailwind 4's `dark:` would follow the OS setting instead.
- The `--grid-line` token and the `bg-grid` utility (an `@utility` in `globals.css`) draw the blueprint grid behind the hero and page headers.
- Lay pages out in `container-site`, another `@utility` in `globals.css`. It spans the screen up to 100rem, with side padding that grows with the viewport. Keep long-form text, such as blog posts and the bio, at a readable measure inside it.

### Motion

Every section has its own reveal effect and every page its own route transition. All motion travels down or right, and staggers follow reading order. The pace is deliberately cinematic: a section's main move runs 1.2–1.6 s (the `--dur-*` tokens), with `--stagger` (150 ms) between items. The full contract is the header comment of `src/styles/motion/core.css`. In short:

- Mark a section `data-reveal="<effect>"` and its staggered children `data-reveal-item`. `RevealObserver`, mounted once in the layout, reveals each container as it scrolls in. It numbers the items in reading order (`--i`, plus `--d` for diagonals), sets `data-revealed`, and fires a `reveal` event on the container. It writes to the DOM directly and never sets state.
- Above-the-fold sections use `data-reveal-on="load"` instead. They're pure CSS that runs on mount with `--i` set inline, so they never wait for hydration.
- Effects run only under `html.motion`. The head script sets it when JS runs and reduced motion isn't requested, and drops it if the observer hasn't mounted after 3 s. Without it, everything renders in its final state. Animate with `@keyframes` and `animation-fill-mode: backwards`, so an element's own hover styles apply again once its effect ends.
- Each effect name belongs to exactly one section. The effects live in one CSS file per area under `src/styles/motion/`: `home.css`, `site.css` (navbar, footer, About, Contact, 404) and `work.css` (Skills, Projects, Blog).
- Page changes run through `RouteCurtain`, mounted once in the layout.
  - It catches clicks on internal links in the capture phase, before `next/link`. `preventDefault()` alone is enough to stop Link, which skips clicks that are already default-prevented, and other click handlers still run.
  - Layered panels then sweep in, a shell prompt types the destination (`cd ~/projects`, or `cat ~/blog/<slug>.mdx` for a post), `router.push` renders the new page underneath, and the panels sweep out the far side.
  - Each page has its own panel pattern in `PATTERNS`.
  - While it covers, `html[data-curtain]` pauses every animation in `<main>`, so the new page's entrance plays as the curtain lifts. Drive entrances with CSS, not timers, or they'll run unseen underneath.
  - Back and forward navigation and modified clicks skip the curtain, and it never engages without `.motion`.
- `<html data-scroll-behavior="smooth">` makes Next 16 pause smooth scrolling during navigation. Without it, each new page would smooth-scroll to the top while the curtain lifts.
- `SplitText`, `CodeWindow`, `SectionLabel` and `WindowDots` are the shared building blocks. `ScrollProgress` is a pure-CSS reading bar along the top of the page.

### Images

Use `next/image` everywhere, and give `fill` images a `sizes` prop. No `images.remotePatterns` is configured, on purpose (see the comment in `MDXComponents.tsx`), so only local images under `public/` load.

The OG cards are generated by `src/app/opengraph-image.tsx` and `src/app/blog/[slug]/opengraph-image.tsx`. They share `src/lib/og.tsx` and draw real text over `src/assets/og-background.jpg`. `metadataBase` in the layout makes their URLs absolute.

### Media

The hero loop, the portrait clip, the project covers and the OG artwork were generated with Higgsfield AI (the `higgsfield` CLI) and then optimized with ffmpeg and cwebp. Check a regenerated asset's frames before shipping it, and keep it within the current sizes.

- `public/media/hero-loop.{webm,mp4}`, plus `hero-loop-720.mp4` for phones and `hero-poster.webp`: Seedance 2.5, animated from a GPT Image 2.5 keyframe used as both its first and last frame. It was then crossfaded into itself at its calmest frame step, so the loop has no visible seam. `HeroBackdrop` plays it.
- `public/media/portrait.{webm,mp4}`: Seedance 2.5, with `profile_picture.jpg` as both its first and last frame, so it ends on the real photo. `HeroPortrait` plays it.
- `public/images/projects/*.webp` (1600×900, set through each project's `image` field) and `src/assets/og-background.jpg` (1200×630): GPT Image 2.5. The four covers share one isometric style.
- With reduced motion, visitors get the poster and the still photo, never video.

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
