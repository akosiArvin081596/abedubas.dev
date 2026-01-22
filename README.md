# Arvin Baghari Edubas Portfolio

A modern, professional Web Developer / Software Engineer portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and MDX.

## Features

- **Next.js 16 App Router** - Latest features with Server Components
- **TypeScript** - Type-safe codebase
- **Tailwind CSS** - Utility-first styling with custom theme
- **MDX Blog** - Write blog posts in Markdown with React components
- **Dark/Light Theme** - System-aware theme with toggle
- **SEO Optimized** - Meta tags, Open Graph, and semantic HTML
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
├── components/            # Reusable components
│   ├── BlogCard.tsx       # Blog post card
│   ├── Footer.tsx         # Site footer
│   ├── MDXComponents.tsx  # MDX rendering components
│   ├── Navbar.tsx         # Navigation bar
│   ├── ProjectCard.tsx    # Project card
│   ├── SkillBadge.tsx     # Skill badge
│   └── ThemeProvider.tsx  # Theme context provider
├── content/blog/          # MDX blog posts
├── lib/                   # Utility functions
│   └── blog.ts            # Blog helper functions
└── types/                 # TypeScript types
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arvinedubas/portfolio.git
   cd portfolio
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

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Deploy

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
