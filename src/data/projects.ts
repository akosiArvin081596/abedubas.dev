import type { Project } from "@/types";

// The projects, strongest production work first. The home page's Projects
// section renders them all. `featured` marks the subset that the "Selected
// Projects" section of resume.html mirrors.
//
// Rules:
// - One live link per project, and never a GitHub URL. The link is the
//   production site, a staging host, or a subdomain of abedubas.dev.
// - Staging is allowed, marked `stage: "staging"`, and labeled in the UI.
//   Staging hosts stay off the home stats band's Live Projects card, as do
//   login-only systems (`access: "login"`).
// - A project with no working live URL stays out: no APIs, raw IPs, admin
//   paths, local-only tools or systems that hold client data.
// - `image` is a screenshot of `liveUrl` (public/images/projects/<slug>.webp),
//   kept only when it shows no error, blank page or personal or client data.
//   The covers for logisx, vendora, dromic and ect are AI-generated artwork.
//
// Every liveUrl was verified on 2026-10-30: 2xx after redirects, serving the
// app named here.
export const projects: Project[] = [
  {
    slug: "logisx",
    title: "LogisX",
    description:
      "Dispatch and back-office platform for a trucking carrier. Loads come in from broker rate confirmations, then flow through driver dispatch with live GPS tracking, expenses, invoicing and an investor payout ledger.",
    techStack: ["Vue", "Node.js", "Express", "Socket.IO", "SQLite"],
    liveUrl: "https://app.logisx.com/",
    stage: "production",
    access: "login",
    image: "/images/projects/logisx.webp",
    featured: true,
  },
  {
    slug: "lendyph",
    title: "Lendy.PH",
    description:
      "Cloud lending management system for Philippine cooperatives and lending businesses: borrowers, loan applications and approvals, payment schedules, collections and share capital in one platform.",
    techStack: ["Next.js", "Laravel", "MySQL", "TypeScript"],
    liveUrl: "https://app.lendyph.com/",
    stage: "production",
    access: "login",
    image: "/images/projects/lendyph.webp",
    featured: true,
  },
  {
    slug: "vendora",
    title: "Vendora POS & E-Commerce",
    description:
      "Point-of-sale and inventory system for retailers with an e-commerce storefront built in, on the web and on mobile.",
    techStack: ["Next.js", "React Native", "Laravel", "MySQL"],
    liveUrl: "https://app.vendoraph.com/",
    stage: "production",
    access: "login",
    image: "/images/projects/vendora.webp",
    featured: true,
  },
  {
    slug: "dromic",
    title: "DROMIC Reporting System",
    description:
      "Multi-level government reporting system for DSWD Caraga that tracks disaster incidents and consolidates impact reports from local government units.",
    techStack: ["Laravel", "Vue", "Inertia.js", "TypeScript"],
    liveUrl: "https://dromic.dswd-caraga-drmd.online/",
    stage: "production",
    access: "login",
    image: "/images/projects/dromic.webp",
    featured: true,
  },
  {
    slug: "dox",
    title: "DOX",
    description:
      "Broker-dealer intelligence platform for clearing-services teams, turning a live feed of regulatory filings into prospects worth calling.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Better Auth"],
    liveUrl: "https://dox.alchemydev.io/",
    stage: "production",
    access: "public",
    image: "/images/projects/dox.webp",
    featured: true,
  },
  {
    slug: "ect",
    title: "ECT Post Monitoring",
    description:
      "Offline-first app for DSWD Caraga field surveyors who interview Emergency Cash Transfer beneficiaries after a disaster. It records GPS coordinates and attachments and syncs once the device is back online.",
    techStack: ["React", "Vite PWA", "Dexie", "Laravel"],
    liveUrl: "https://ect-post-monitoring.abedubas.dev/",
    stage: "production",
    access: "login",
    image: "/images/projects/ect.webp",
    featured: true,
  },
  {
    slug: "obsidian-quant",
    title: "Obsidian Quant Group",
    description:
      "Marketing site for an institutional quantitative asset manager, with a server-rendered blog run from its own CMS.",
    techStack: ["Next.js", "React", "PostgreSQL", "Prisma", "Tailwind CSS"],
    liveUrl: "https://obsidianquantgroup.com/",
    stage: "production",
    access: "public",
    image: "/images/projects/obsidian-quant.webp",
  },
  {
    slug: "oqg-onboarding",
    title: "OQG Investor Onboarding",
    description:
      "Regulated investor onboarding that takes a qualified investor from first inquiry through accreditation, AML screening, compliance review and e-signature to funding.",
    techStack: ["Next.js", "Better Auth", "Prisma", "PostgreSQL"],
    liveUrl: "https://onboarding.obsidianquantgroup.com/",
    stage: "production",
    access: "public",
    image: "/images/projects/oqg-onboarding.webp",
  },
  {
    slug: "acg-assessment",
    title: "ACG Readiness Assessment",
    description:
      "Voice-enabled, AI-analyzed diagnostic that maps a firm's readiness for the U.S. Treasury mandatory-clearing deadline. Prospects speak or type their answers.",
    techStack: ["Next.js", "TypeScript", "Gemini", "MySQL"],
    liveUrl: "https://assessment.ableacg.com/",
    stage: "production",
    access: "public",
    image: "/images/projects/acg-assessment.webp",
  },
  {
    slug: "alchemydev-crm",
    title: "Alchemydev CRM",
    description:
      "Client delivery portal for a software studio. Clients follow their projects, comment, and send feature requests through an approval workflow.",
    techStack: ["Next.js", "Better Auth", "Prisma", "PostgreSQL", "LiveKit"],
    liveUrl: "https://ups.alchemydev.io/",
    stage: "production",
    access: "login",
    image: "/images/projects/alchemydev-crm.webp",
  },
  {
    slug: "oqg-recorder",
    title: "The OQG Recorder",
    description:
      "Loom-style screen recorder that runs in the browser: screen, camera bubble and mixed audio, with optional transcription and share links.",
    techStack: ["Next.js", "React", "TypeScript", "Gemini"],
    liveUrl: "https://screen-recorder.obsidianquantgroup.com/",
    stage: "production",
    access: "login",
    image: "/images/projects/oqg-recorder.webp",
  },
  {
    slug: "sec-compliance-matrix",
    title: "SEC Compliance Matrix",
    description:
      "Pipeline that turns SEC enforcement actions into a searchable compliance matrix. Gemini extracts the penalties, violated rules and remediation steps behind a dashboard.",
    techStack: ["React", "FastAPI", "Gemini", "ECharts"],
    liveUrl: "https://sec-compliance-matrix.alchemydev.io/",
    stage: "production",
    access: "login",
    image: "/images/projects/sec-compliance-matrix.webp",
  },
  {
    slug: "serum72",
    title: "Serum 72",
    description:
      "Direct-to-consumer skincare storefront with one-time and subscription orders, Stripe checkout, an admin console and automated fulfillment.",
    techStack: ["Astro", "PHP", "MySQL", "Stripe"],
    liveUrl: "https://serum72.com/",
    stage: "production",
    access: "public",
  },
  {
    slug: "calm-canine",
    title: "Calm Canine",
    description:
      "Marketing site and on-site shop for a calming dog-treat brand, with a cart, Stripe checkout and subscribe-and-save renewals.",
    techStack: ["HTML", "JavaScript", "PHP", "Stripe"],
    liveUrl: "https://calmcanine.shop/",
    stage: "production",
    access: "public",
    image: "/images/projects/calm-canine.webp",
  },
  {
    slug: "lyall-property-care",
    title: "Lyall Property Care",
    description:
      "Website for a Hudson Valley tree-care company, with a quote request form that takes photos of the job.",
    techStack: ["vinext", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://lyallpropertycare.com/",
    stage: "production",
    access: "public",
  },
  {
    slug: "zoey-binxx",
    title: "Zoey Binxx Expense Scanner",
    description:
      "Expense tracker where a business's staff upload receipts and statements, then review the transactions and reports drawn from them.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
    liveUrl: "https://zoeybrinxx.alchemydev.io/",
    stage: "production",
    access: "login",
    image: "/images/projects/zoey-binxx.webp",
  },
  {
    slug: "ect-validation",
    title: "ECT Beneficiaries Validation",
    description:
      "DSWD Caraga system for collecting and validating Emergency Cash Transfer beneficiary data, with offline-first entry that syncs automatically.",
    techStack: ["Laravel", "Vue", "Inertia.js", "Tailwind CSS"],
    liveUrl: "https://ect-beneficiary-validation.abedubas.dev/",
    stage: "production",
    access: "login",
  },
  {
    slug: "masterlist-deduplication",
    title: "Masterlist Deduplication System",
    description:
      "Finds duplicate records within and across uploaded masterlists, scores each match for staff to review, and exports the cleaned list.",
    techStack: ["Laravel", "Vue", "Inertia.js", "TypeScript"],
    liveUrl: "https://masterlist-deduplication.abedubas.dev/",
    stage: "production",
    access: "login",
    image: "/images/projects/masterlist-deduplication.webp",
  },
  {
    slug: "akiip",
    title: "AKIIP Caraga",
    description:
      "Phone-first directory and case-tracking system for DSWD Caraga's 4Ps Indigenous Peoples offices, from province down to barangay, in English and Filipino.",
    techStack: ["Vue", "Ionic", "Laravel", "Laravel Reverb"],
    liveUrl: "https://akiip.abedubas.dev/",
    stage: "staging",
    access: "public",
    image: "/images/projects/akiip.webp",
  },
  {
    slug: "leenas-list",
    title: "Leena's List",
    description:
      "Parents keep one always-current care profile for their child and share a scoped, revocable link with caregivers, who open it without an account.",
    techStack: ["React", "Express", "PostgreSQL", "Drizzle"],
    liveUrl: "https://leenaslist.abedubas.dev/",
    stage: "staging",
    access: "public",
    image: "/images/projects/leenas-list.webp",
  },
  {
    slug: "javalava",
    title: "Javalava",
    description:
      "Coded homepage concept for a volcanic coffee-liqueur brand, built as the reference for its Wix Studio rebuild.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://javalava.abedubas.dev/",
    stage: "staging",
    access: "public",
    image: "/images/projects/javalava.webp",
  },
  {
    slug: "alchemydev-site",
    title: "Alchemy Dev Website Redesign",
    description:
      "Redesign of an AI growth agency's site in three switchable variants: classic, light and an animated fancy version.",
    techStack: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://alchemydev-landing.abedubas.dev/",
    stage: "staging",
    access: "public",
    image: "/images/projects/alchemydev-site.webp",
  },
];
