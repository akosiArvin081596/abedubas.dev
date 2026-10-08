# Arvin Baghari Edubas Portfolio

A modern, professional Web Developer / Software Engineer portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and MDX.

## Features

- **Next.js 16 App Router** - Latest features with Server Components
- **TypeScript** - Type-safe codebase
- **Tailwind CSS** - Utility-first styling with custom theme
- **MDX Blog** - Write blog posts in Markdown with React components
- **Dark/Light Theme** - System-aware theme with toggle
- **Motion System** - A unique, cinematic scroll reveal for every section, and a "terminal curtain" between pages that types the destination (`cd ~/projects`). Motion only travels top to bottom and left to right, and it switches off under reduced motion
- **Generated Media** - Hero loop, portrait clip, project covers and social-card art made with Higgsfield AI
- **SEO Optimized** - Meta tags, semantic HTML, and generated Open Graph cards for the site and each post
- **Responsive Design** - Mobile-first, works on all devices
- **Contact Form** - API route for form submissions

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/contact/       # Contact form API
│   ├── blog/              # Blog index and dynamic posts
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── skills/            # Skills page
│   ├── globals.css        # Global styles with theme variables
│   ├── layout.tsx         # Root layout with providers
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── assets/                # Build-time assets (OG card artwork)
├── components/            # Reusable components
│   ├── motion/            # Reveal observer, page transitions, split text
│   ├── BlogCard.tsx       # Blog post card
│   ├── CodeWindow.tsx     # Editor-window frame
│   ├── Footer.tsx         # Site footer
│   ├── MDXComponents.tsx  # MDX rendering components
│   ├── Navbar.tsx         # Navigation bar
│   ├── ProjectCard.tsx    # Project card, framed as a browser window
│   ├── SkillBadge.tsx     # Skill badge
│   └── ThemeProvider.tsx  # Theme context provider
├── content/blog/          # MDX blog posts
├── lib/                   # Utility functions
│   ├── blog.ts            # Blog helper functions
│   └── og.tsx             # Shared pieces of the OG cards
├── styles/motion/         # Motion contract (core.css) and per-page effects
└── types/                 # TypeScript types
    └── index.ts
public/
├── images/                # Profile photo and project covers
└── media/                 # Hero loop and portrait clip
```

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akosiArvin081596/abedubas.dev.git
   cd abedubas.dev
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information

Update your personal information in these files:
- `src/app/layout.tsx` - Site metadata and SEO
- `src/app/page.tsx` - Home page content
- `src/app/about/page.tsx` - Bio and experience
- `src/app/projects/page.tsx` - Your projects
- `src/app/skills/page.tsx` - Your skills
- `src/app/contact/page.tsx` - Contact information
- `src/components/Footer.tsx` - Social links

### Adding Blog Posts

Create new `.mdx` files in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Theme Customization

Edit theme colors in `src/app/globals.css`:

```css
:root {
  --primary: #4f46e5;
  /* ... other variables */
}

.dark {
  --primary: #818cf8;
  /* ... other variables */
}
```

## Deployment

The site runs under pm2 on a VPS and deploys itself through GitHub Actions (`.github/workflows/ci-cd.yml`):

- **Every push and pull request** runs `npm ci`, `npm run lint` and `npm run build` on Node 20.
- **Every push to `main`** then deploys, once those pass. The job SSHes into the VPS with a key that can run only `deploy/deploy-abedubas-dev.sh`. That script clones the commit beside the live copy, builds it, and smoke-tests it with `next start` on a spare port. Then it swaps the new copy in and restarts only the `abedubas.dev` pm2 app. If the restarted app doesn't answer, it swaps the old release back.

Pushes to `main` queue instead of cancelling each other, so deploys run one at a time and in push order. A deploy that has started finishes even if its CI job is cancelled or loses its connection. The output is in the Actions log, and the VPS keeps the last 30 deploy logs in `/var/log/deploy-abedubas-dev/`.

### Rolling back

- Revert the bad commit and push, or re-run the deploy job of an older run in the Actions tab, which redeploys that run's commit.
- On the VPS, as root, `deploy-abedubas-dev.sh <sha>` deploys any commit on `main`. The release before the current one stays in `/var/www/abedubas.dev.rollback` until the next deploy.

### One-time setup

1. Install the script on the VPS as `/usr/local/bin/deploy-abedubas-dev.sh` (mode 755). Repeat this whenever `deploy/deploy-abedubas-dev.sh` changes, because the server runs its own copy.
2. Generate an SSH key pair for CI. Add the public key to `/root/.ssh/authorized_keys`, locked to the script:
   ```
   restrict,command="/usr/local/bin/deploy-abedubas-dev.sh" ssh-ed25519 AAAA... github-actions-deploy@abedubas.dev
   ```
3. Create a `production` environment in the repo settings and allow it to deploy only from `main`. Give it these secrets:
   - `DEPLOY_HOST`
   - `DEPLOY_USER`
   - `DEPLOY_SSH_KEY`: the private key
   - `DEPLOY_KNOWN_HOSTS`: the VPS's host key line, checked against a fingerprint you already trust

### Build for Production

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Markdown + JSX for blog
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX rendering

## License

MIT License - feel free to use this template for your own portfolio.
