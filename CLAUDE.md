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

### One page

The site is one page that snaps, plus its blog posts. `src/app/page.tsx` renders, in order, each a direct `<section>` child of `ParallaxHero`'s `.home-snap`:

| Section | id | Nav item (`data-nav`) | File | Effects |
|---|---|---|---|---|
| Hero | | Home | `page.tsx` | boot (on load) |
| Stats band | | Home | `page.tsx` | count |
| What I Do | | Home | `page.tsx` | count (shared) |
| About Me and bio | `#about` | About | `AboutSection.tsx` | letters, highlight |
| Engineering Philosophy | `#philosophy` | About | `PhilosophySection.tsx` | hinge |
| Experience Timeline | `#experience` | About | `ExperienceSection.tsx` | gitlog |
| Skills & Expertise, Core Strengths | `#skills` | Skills | `SkillsSection.tsx` | decode, scan |
| Technical Skills | `#stack` | Skills | `StackSection.tsx` | wipe |
| Projects explorer | `#projects` | Projects | `ProjectsSection.tsx`, `ProjectExplorer.tsx` | type, window |
| Blog | `#blog` | Blog | `BlogSection.tsx` | focus, stack |
| Contact | `#contact` | Contact | `ContactSection.tsx` | marker, cascade, fields |

Then the full-screen footer (`src/components/Footer.tsx`, after `<main>` in the layout).

- The nav list is `src/data/sections.ts`: Home `/`, then `/#about`, `/#skills`, `/#projects`, `/#blog`, `/#contact`. Navbar, Footer, HeroShell, Bintoy and RouteCurtain all read it.
- `/about`, `/skills`, `/projects`, `/blog` and `/contact` redirect permanently (308) to their anchors, from `redirects()` in `next.config.ts`. `/blog/[slug]` is the only other page.
- Every section must fit `calc(100svh - 4.5rem)`: 648px at 1280x720, 828px at 1440x900. HomeSnap glides from one section's top to the next, so anything taller gets skipped. Long content goes in a pane that scrolls itself (a `.snap-fit` section with `.snap-body` and `.snap-pane`, in `home.css`), as the timeline and the posts do. The `short:` variant in `globals.css` (lg and up, at most 820px tall) tightens a section on laptop-height screens, and `tight:` goes one step further at 1024x700, the smallest size HomeSnap pages at (628px under the header). Check new content at 1024x700, 1280x720 and 1440x900.
- Every section and the footer have `scroll-margin-top: 4.5rem` at every width, so `/#projects` lands right under the header. Don't add `scroll-padding-top` to `html` as well: the two add up.
- **Projects explorer.** It's a vertical tablist with a roving tabindex beside the selected project's `ProjectCard`, its tabpanel. ArrowUp, ArrowDown, Home and End call `preventDefault`, so HomeSnap doesn't page. The server renders the first project selected, and the selection changes only in event handlers. Below lg the card stacks under the list, so a click on a project also brings the card into view, gliding with motion and jumping without.
- **Glide.** `src/lib/glide.ts` is the one scripted scroll: easeInOutCubic, with its duration set by the distance (0.54 to 1.6 s). A pointer press, a touch, or a wheel or key that nothing else handled cancels it. While it runs, `html[data-gliding]` is set and RevealObserver holds its reveals. When the glide ends, only the containers on screen reveal, so a glide from the hero to `#contact` doesn't play every entrance it passes.
- **HomeSnap's stops** are each `.home-snap > section`'s top, the footer's (`data-snap-stop`) and the page's end. It leaves Arrow, Page, Space, Home and End alone while focus is in something that can still scroll that way, or when a key was already handled.
- **Same-page links.** HomeSnap also mounts a capture-phase click listener on the home page, active at any width with `.motion`. A link to `/` or to `/#<id>` of an element on the page calls `preventDefault` (which stops next/link), glides there, then calls `history.pushState`. Without motion, next/link and the browser jump there instead. The mobile menu (`#mobile-menu` in `Navbar.tsx`) floats over the page under the header, so opening it never moves the content: the handler measures a target while the menu is still open, and a menu that pushed the page down would make the glide overshoot.
- **Scroll-spy.** `src/lib/scroll-spy.ts` is an external store for `useSyncExternalStore`: an IntersectionObserver over every `[data-nav]`, read at a line 40% down the screen. Its server snapshot is `undefined`, so the server and the first client render both underline Home on `/`, and on a post Blog comes from the pathname. Nothing sets state in an effect. During a link glide, `holdSpy` pins the target until the glide ends. The `.nav-link` underline follows `aria-current`: `"location"` for the section in view, and `"true"` for Blog on a post.

### Content lives in the section files

There is no CMS or database. Section copy and data (skills, work history, services) are hardcoded in the section files under `src/app/`, mostly as arrays at the top of each file.

- The email address, location and GitHub/LinkedIn links live in `src/data/contact.ts`, with their icons in `src/components/icons.tsx`. The Contact section, the footer and Bintoy all read them. The GitHub *profile* link stays; only project GitHub links are gone.
- Years of experience are counted from `WEB_DEV_SINCE` (2013) in `src/lib/career.ts`, which both the home stats and the About section read. Don't hardcode the number anywhere.
- The projects live in `src/data/projects.ts` (type `Project` in `src/types/index.ts`), strongest production work first. The Projects explorer renders all of them.
  - Each project has exactly one live link (`liveUrl`) and never a GitHub URL. The link is the production site, a staging host or a subdomain of abedubas.dev. A project with no working live URL stays out.
  - Staging is allowed: `stage: "staging"` gets a "staging" badge in the list and on the card. `access: "login"` marks a login-only system, and the card says "sign-in only".
  - Covers are screenshots of `liveUrl` at 1600x900 (`public/images/projects/<slug>.webp`), kept only when they show no error, blank page or personal or client data. No AI-generated covers for new projects; the first four (logisx, vendora, dromic, ect) are the older AI artwork. A project without a cover shows a placeholder frame.
  - `featured` marks the subset that resume.html mirrors, and that Bintoy names.
- The home stats band's "Live Projects" card and the footer's live sites come from `publicLiveSites()` in `src/lib/live-sites.ts`: projects with `stage: "production"` and `access: "public"`, plus `src/data/live-sites.ts`. Keep both to public production sites: no staging hosts, login-only systems, client data or APIs.
- The home stats band's GitHub numbers come from `src/data/github-stats.json`, a snapshot of totals across the personal (`akosiArvin081596`) and Alchemy (`abedubas-alchemydev`) accounts. It holds aggregates only, with no repo names.
  - To refresh it, run `npm run stats:github` and commit the JSON.
  - The script reads each account through the local `gh` login, calling the `gh` binary directly. In an interactive shell, the per-directory `gh` wrapper function ignores `GH_TOKEN`.
  - No tokens go to CI or the VPS.
- Site-wide SEO (title template `%s | Arvin Baghari Edubas`, OpenGraph, Twitter) is the `metadata` export in `src/app/layout.tsx`. Each page exports only `title` and `description`.
- The home hero is a full-screen, tmux-style terminal: a slideshow of photos in the left pane (`HeroPortrait`, whose `SLIDES` list them) and the intro as a shell session in the right. The session's last prompt is live (`src/app/HeroShell.tsx`), and its commands, their output and `help`'s list all live in that file, so keep `HELP` in step with what it handles. A section's name, or `cd` to it, prints its link and follows it, and HomeSnap glides the page there. `cat engineer.ts` prints the `engineerTs` tokens from `page.tsx`, rendered on the server. The tmux status bar's clock is `LocalClock` (`src/components/LocalClock.tsx`), which the footer shares.
- `POST /api/contact` only validates the submission and logs it with `console.log`. No email delivery or storage is wired up.
- Bintoy (`src/components/Bintoy.tsx`, mounted in the layout) is the site's chat assistant. For now it's a placeholder: its answers are prewritten, picked by keyword in `answer()`, the one function to replace with a real assistant. Its links go to the sections (`/#projects`), and its projects answer names only the `featured` projects. Its avatar, `public/images/bintoy/bintoy.webp`, is a robot mascot made in Higgsfield (GPT Image 2.5) from Arvin's photo.
- `resume.html` at the repo root is a standalone, print-ready (US Letter) resume. It is not part of the Next app and is not served, because it sits outside `public/`. It repeats the Experience section's work history, so update both when either changes. Its Selected Projects mirror only the `featured` projects in `src/data/projects.ts`, a subset that fits its printed second page (six, as a 3x2 grid). Change `featured` and the resume together, and print-preview it to check it still fits two pages.
- A component used by only the home page sits beside `page.tsx` (`src/app/HeroBackdrop.tsx`, `Timeline.tsx`, `ContactForm.tsx`, each `*Section.tsx`). Shared components live in `src/components/` and are re-exported from `@/components`.

### Blog

Posts are `src/content/blog/*.mdx`, and the filename is the slug. `src/lib/blog.ts` reads them from disk, using `@11ty/gray-matter` (Eleventy's maintained fork of gray-matter) for frontmatter and reading-time for the read time. `src/app/blog/[slug]/page.tsx` prerenders each post via `generateStaticParams` and renders it with `MDXRemote` from `next-mdx-remote/rsc`. The home page's Blog section lists every post, newest first, and a post's back link goes to `/#blog`. The element overrides in `src/components/MDXComponents.tsx` provide the styling.

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
- The `--grid-line` token and the `bg-grid` utility (an `@utility` in `globals.css`) draw the blueprint grid behind the home page's stats band.
- `short:` (a `@custom-variant` in `globals.css`) applies on screens lg and up that are at most 820px tall. Use it to tighten a home section so it still fits one screen there.
- `tight:`, defined after it, overrides it on the shortest screens: lg and up under 720px tall, and lg to xl (up to 1279px wide) up to 760px tall, where the narrower cards wrap to more lines. It never applies at 1280x720 and up. The hero's matching step is a plain `max-height: 719px` media query in `home.css`.
- Lay pages out in `container-site`, another `@utility` in `globals.css`. It spans the screen up to 100rem, with side padding that grows with the viewport. Keep long-form text, such as blog posts and the bio, at a readable measure inside it.

### Motion

Every section has its own reveal effect, and every destination of the route curtain its own panel pattern. All motion travels down or right, and staggers follow reading order. The pace is deliberately cinematic: a section's main move runs 1.2–1.6 s (the `--dur-*` tokens), with `--stagger` (150 ms) between items. The full contract is the header comment of `src/styles/motion/core.css`. In short:

- Mark a section `data-reveal="<effect>"` and its staggered children `data-reveal-item`. `RevealObserver`, mounted once in the layout, reveals each container as it scrolls in. It numbers the items in reading order (`--i`, plus `--d` for diagonals), sets `data-revealed`, and fires a `reveal` event on the container. It writes to the DOM directly and never sets state.
- Only the hero, the navbar, a post's header and the 404 use `data-reveal-on="load"`. They're pure CSS that runs on mount with `--i` set inline, so they never wait for hydration. The former page headers (About Me, Skills & Expertise, Projects, Blog, Get in Touch) are scroll reveals now: gate their CSS on `[data-revealed]`, since a link can land on any section. `Decode` starts on its container's `reveal` event and then waits until no curtain, loading screen, scroll or glide is under way.
- Effects run only under `html.motion`. The head script sets it when JS runs and reduced motion isn't requested, and drops it if the observer hasn't mounted after 3 s. Without it, everything renders in its final state. Animate with `@keyframes` and `animation-fill-mode: backwards`, so an element's own hover styles apply again once its effect ends.
- Each effect name belongs to exactly one section. The one exception: the home page's services section shares the stats band's `count`, so the two sets of cards look and enter the same. The effects live in one CSS file per area under `src/styles/motion/`: `home.css`, `site.css` (navbar, footer, About, Contact, 404) and `work.css` (Skills, Projects, Blog).
- Page changes run through `RouteCurtain`, mounted once in the layout. With one page, that means between the home page and a blog post, and from the 404 page. Links within the home page are HomeSnap's.
  - It catches clicks on internal links in the capture phase, before `next/link`. `preventDefault()` alone is enough to stop Link, which skips clicks that are already default-prevented, and other click handlers still run.
  - Layered panels then sweep in, a shell prompt types the destination (`cd ~/about` for `/#about`, `cd ~` for `/`, or `cat ~/blog/<slug>.mdx` for a post), `router.push` renders the new page underneath, and the panels sweep out the far side. For `/#about`, Next scrolls to the section under the curtain, and `scroll-margin-top` keeps it under the header.
  - `PATTERNS` go by destination: the top of the home page gets the iris, each nav section its own pattern (About slats, Skills columns, Projects skew, Blog drop, Contact slats), and a post the sweep.
  - While it covers, `html[data-curtain]` pauses every animation in `<main>` and the footer (`.site-footer`, which sits outside it), so the new page's entrance plays as the curtain lifts. Drive entrances with CSS, not timers, or they'll run unseen underneath.
  - Back and forward navigation and modified clicks skip the curtain, and it never engages without `.motion`.
- On the home page, from lg on screens at least 700px tall, each section fills the screen below the header, and the footer is the last stop.
  - `HomeSnap` pages through them: each wheel or trackpad gesture glides the page one stop (`src/lib/glide.ts`), eased, and swallows the rest of that gesture (momentum included), so a flick never skips two. PageUp/PageDown, the arrow keys and Space page too, and Home/End go to the ends.
  - It leaves alone a wheel over something that scrolls itself (the terminal's output, the timeline, the project list, the posts), keys while focus can still scroll its pane, keys already handled (the explorer's arrows), keys typed into a field, touch scrolling and pinch zoom.
  - While the page moves, `html[data-scrolling]` (set by RevealObserver, cleared 150 ms after the last scroll event) holds every effect in `<main>` and the footer, so a section's entrance plays once the page is at rest. During a glide, `html[data-gliding]` also holds the reveals themselves (see Glide, above).
  - The home wrapper (`ParallaxHero`) clips its overflow instead of hiding it, because a hidden overflow would make it a scroll container.
- `SiteLoader`, mounted once in the layout, is a loading screen on every full page load. Moving between pages is a client navigation, so the curtain plays instead.
  - The head script shows it before paint by setting `html[data-loader]`, but only with motion on.
  - While it's up, the header's and main's effects are paused, as under the curtain. It lifts once its bar has filled and the page and fonts have loaded, or after 3.5 s. It then wipes down as the page's entrance plays.
  - The head script removes the attribute after 5 s regardless.
- `<html data-scroll-behavior="smooth">` makes Next 16 pause smooth scrolling during navigation. Without it, each new page would smooth-scroll to the top while the curtain lifts.
- `SplitText`, `CodeWindow`, `SectionLabel` and `WindowDots` are the shared building blocks. `ScrollProgress` is a pure-CSS reading bar along the top of the page.

### Footer

`src/components/Footer.tsx` is the site's last screen, on the home page and on every post: `min-height: calc(100svh - 4.5rem)` at every width (it may grow on phones), and HomeSnap's last stop (`data-snap-stop`). It holds the closing call to action (`words`, moved from the old home CTA), then the ledger (`ledger`): section links, contact with Arvin's local time (`LocalClock`), availability, socials, a few live sites, the copyright and Back to top (`BackToTop`, which glides). The two effects are sibling containers, so the call to action, above, plays first. The bottom row's right end stays empty for the Bintoy launcher. It must fit 648px at 1280x720.

### Images

Use `next/image` everywhere, and give `fill` images a `sizes` prop. No `images.remotePatterns` is configured, on purpose (see the comment in `MDXComponents.tsx`), so only local images under `public/` load.

The OG cards are generated by `src/app/opengraph-image.tsx` and `src/app/blog/[slug]/opengraph-image.tsx`. They share `src/lib/og.tsx` and draw real text over `src/assets/og-background.jpg`. `metadataBase` in the layout makes their URLs absolute.

### Media

The hero loop, the four oldest project covers and the OG artwork were generated with Higgsfield AI (the `higgsfield` CLI) and then optimized with ffmpeg and cwebp. Check a regenerated asset's frames before shipping it, and keep it within the current sizes.

- `public/media/hero-loop.{webm,mp4}`, plus `hero-loop-720.mp4` for phones and `hero-poster.webp`: Seedance 2.5, animated from a GPT Image 2.5 keyframe used as both its first and last frame. It was then crossfaded into itself at its calmest frame step, so the loop has no visible seam. `HeroBackdrop` plays it.
- `public/images/hero/*.jpg` are the hero's photos, 4:5 crops served at quality 90 (allowed by `images.qualities` in `next.config.ts`).
  - Each carries a baked-in watermark: a faint diagonal "abedubas.dev" pattern plus a "© abedubas.dev" credit.
  - To add one, crop it to 4:5 with the face in the upper third, then run `npm run watermark -- clean.jpg public/images/hero/name.jpg`. Keep the clean original out of the repo.
  - List the new photo in `SLIDES` in `HeroPortrait.tsx`.
  - The slideshow frame also blocks right-click and dragging, which only stops casual saving.
- `public/images/hero/mosaic-{12,24,48}.png`: the first photo shrunk with ffmpeg to 12×15, 24×30 and 48×60 (`-vf "scale=W:H:flags=area"`), for its pixelated render-in. Regenerate them whenever the first photo changes.
- `public/images/projects/*.webp` (set through each project's `image` field): the four oldest (logisx, vendora, dromic, ect) are GPT Image 2.5 artwork in one isometric style. The rest are headless-Chrome screenshots of each live site, converted with `cwebp -q 80`. New covers are screenshots, never AI images.
- `src/assets/og-background.jpg` (1200×630): GPT Image 2.5.
- With reduced motion, visitors get the poster and the still photo, never video.

### Dependencies

- The `overrides` in `package.json` swap `fast-glob` for `tinyglobby` inside `@next/eslint-plugin-next`. fast-glob pulls in `braces`, whose advisory (GHSA-vfj7-8cjw-p6xm) had no patched release as of October 2026, and the plugin's only call is `globSync(rootDir, { onlyDirectories: true })`.
- The two differ only when `settings.next.rootDir` is set, which this repo doesn't do. For a plain directory, tinyglobby also returns all its subdirectories, and for an absolute pattern it returns relative paths. Remove the override before setting `rootDir`.
- Drop the override once `braces` ships a fix (`npm view braces version` newer than 3.0.3), then check that `npm audit` stays clean.

### Deployment

Pushes to `main` deploy automatically. `.github/workflows/ci-cd.yml` lints and builds every push and pull request. On `main` it then SSHes into the VPS. There, `deploy/deploy-abedubas-dev.sh` builds the commit beside the live copy, smoke-tests it, swaps it in and restarts the `abedubas.dev` pm2 app. It swaps back on its own if the app doesn't come up. The README's Deployment section covers rollback and setup.

- The VPS runs its own copy of the script at `/usr/local/bin/deploy-abedubas-dev.sh`. Editing `deploy/deploy-abedubas-dev.sh` changes nothing there until it's reinstalled.
- The CI key in the VPS's `authorized_keys` can run only that script. The `DEPLOY_*` secrets live in the `production` environment, and only `main` may deploy to it.
- The repo is public, so the Actions logs are too. The script keeps pm2's table of every app on the VPS out of them. Keep the VPS's other apps out of anything else it prints.
- CI pins Node 20 because the site builds and runs on the VPS's system Node 20.

## Next.js agent rules

When `next dev` runs under a coding agent, Next.js (16.4 and later) writes its instructions for agents into `AGENTS.md`, and rewrites them whenever an upgrade changes them. It no longer touches this file. Commit `AGENTS.md` with your work, and don't copy its block back here. It's imported:

@AGENTS.md
