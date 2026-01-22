# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture Overview

This is a Next.js 16 portfolio website using the App Router with TypeScript, Tailwind CSS 4, and MDX for blog content.

### Key Patterns

- **Path alias**: `@/*` maps to `./src/*` (configured in tsconfig.json)
- **Theme system**: Custom ThemeProvider in `src/components/ThemeProvider.tsx` manages light/dark mode via React Context and localStorage. Theme is applied by toggling the `dark` class on `<html>`.
- **MDX blog**: Blog posts are `.mdx` files in `src/content/blog/`. The `src/lib/blog.ts` module reads these files at build time using gray-matter for frontmatter parsing and reading-time for read time calculation.

### Blog Post Frontmatter Format

```yaml
---
title: "Post Title"
description: "Brief description"
date: "2024-01-15"
tags: ["tag1", "tag2"]
---
```

### Type Definitions

All shared TypeScript interfaces are in `src/types/index.ts`: `Project`, `Skill`, `SkillCategory`, `BlogPost`, `BlogPostMeta`, `SocialLink`, `NavItem`.

### Layout Structure

The root layout (`src/app/layout.tsx`) wraps all pages with:
- ThemeProvider for theme context
- Navbar and Footer components
- Geist font (sans and mono variants)
