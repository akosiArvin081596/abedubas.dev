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
// - `shots` are 1600x900 viewport screenshots of pages on `liveUrl`
//   (public/images/projects/<slug>/<nn>-<view>.webp), each with a caption and
//   the page's path. The first is the cover, and the card shows them as a
//   gallery. Keep only shots with no error, blank page, or personal or client
//   data, and never AI images. `shots: []` shows a placeholder frame.
//   Login-only systems show their sign-in page; a screen inside one must
//   show sample data, never production records.
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
    shots: [{ src: "/images/projects/logisx/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [{ src: "/images/projects/lendyph/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [{ src: "/images/projects/vendora/01-sign-in.webp", caption: "POS sign-in page", path: "/pos/auth/login" }],
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
    shots: [{ src: "/images/projects/dromic/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [
      { src: "/images/projects/dox/01-home.webp", caption: "Home page with live filing feed" },
      { src: "/images/projects/dox/02-live-feed.webp", caption: "Live regulatory filing feed" },
      { src: "/images/projects/dox/03-features.webp", caption: "Platform capabilities", path: "/#features" },
      { src: "/images/projects/dox/04-how-it-works.webp", caption: "How it works" },
      { src: "/images/projects/dox/05-sign-in.webp", caption: "Workspace sign-in page", path: "/login" },
    ],
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
    shots: [{ src: "/images/projects/ect/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [
      { src: "/images/projects/obsidian-quant/01-home.webp", caption: "Home page" },
      { src: "/images/projects/obsidian-quant/02-philosophy.webp", caption: "Core philosophy section" },
      { src: "/images/projects/obsidian-quant/03-quant-engine.webp", caption: "Quant engine pipeline" },
      { src: "/images/projects/obsidian-quant/04-mandates.webp", caption: "Mandate coverage", path: "/strategy/#mandate-coverage" },
      { src: "/images/projects/obsidian-quant/05-system-layers.webp", caption: "Architecture system layers", path: "/architecture/" },
    ],
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
    shots: [
      { src: "/images/projects/oqg-onboarding/01-home.webp", caption: "Investor onboarding landing page" },
      { src: "/images/projects/oqg-onboarding/02-invite-only.webp", caption: "Invite-only onboarding notice", path: "/register" },
      { src: "/images/projects/oqg-onboarding/03-sign-in.webp", caption: "Investor sign-in page", path: "/login" },
    ],
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
    shots: [
      { src: "/images/projects/acg-assessment/01-assessment.webp", caption: "Readiness assessment, step 1" },
      { src: "/images/projects/acg-assessment/02-rep-sign-in.webp", caption: "Rep sign-in page", path: "/rep/login" },
    ],
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
    shots: [{ src: "/images/projects/alchemydev-crm/01-sign-in.webp", caption: "Client portal sign-in page", path: "/login" }],
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
    shots: [{ src: "/images/projects/oqg-recorder/01-sign-in.webp", caption: "Sign-in page", path: "/signin" }],
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
    shots: [{ src: "/images/projects/sec-compliance-matrix/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [
      { src: "/images/projects/serum72/01-shop.webp", caption: "Shop page", path: "/shop/" },
      { src: "/images/projects/serum72/02-product-lineup.webp", caption: "Product lineup on the home page" },
      { src: "/images/projects/serum72/03-shop-by-ritual.webp", caption: "Shop by ritual filters", path: "/shop/" },
      { src: "/images/projects/serum72/04-product-cards.webp", caption: "Product cards with prices", path: "/shop/" },
      { src: "/images/projects/serum72/05-about.webp", caption: "About page", path: "/about/" },
    ],
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
    shots: [
      { src: "/images/projects/calm-canine/01-home.webp", caption: "Home page" },
      { src: "/images/projects/calm-canine/02-product.webp", caption: "Product and ingredients", path: "/#about" },
      { src: "/images/projects/calm-canine/03-serving-guide.webp", caption: "Serving guide by dog weight", path: "/#guide" },
      { src: "/images/projects/calm-canine/04-gallery.webp", caption: "Gallery of calm moments", path: "/#gallery" },
      { src: "/images/projects/calm-canine/05-shop.webp", caption: "Shop page", path: "/product" },
    ],
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
    shots: [
      { src: "/images/projects/lyall-property-care/01-quote-form.webp", caption: "Quote request form", path: "/#quote" },
      { src: "/images/projects/lyall-property-care/02-about.webp", caption: "About section", path: "/#about" },
      { src: "/images/projects/lyall-property-care/03-process.webp", caption: "Three-step process", path: "/#process" },
    ],
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
    shots: [{ src: "/images/projects/zoey-binxx/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [{ src: "/images/projects/ect-validation/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [{ src: "/images/projects/masterlist-deduplication/01-sign-in.webp", caption: "Sign-in page", path: "/login" }],
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
    shots: [
      { src: "/images/projects/akiip/01-home.webp", caption: "Home page" },
      { src: "/images/projects/akiip/02-who-uses.webp", caption: "Who uses AKIIP", path: "/#people" },
      { src: "/images/projects/akiip/03-data-protection.webp", caption: "How the data is protected", path: "/#privacy" },
      { src: "/images/projects/akiip/04-help.webp", caption: "Help and access requests", path: "/#contact" },
      { src: "/images/projects/akiip/05-sign-in.webp", caption: "Staff sign-in page", path: "/sign-in" },
    ],
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
    shots: [
      { src: "/images/projects/leenas-list/01-home.webp", caption: "Home page" },
      { src: "/images/projects/leenas-list/02-whats-on-the-list.webp", caption: "What's on a child's list", path: "/#features" },
      { src: "/images/projects/leenas-list/03-circle-of-care.webp", caption: "Scoped links for each caregiver", path: "/#circle" },
      { src: "/images/projects/leenas-list/04-how-it-works.webp", caption: "How it works", path: "/#how" },
      { src: "/images/projects/leenas-list/05-privacy.webp", caption: "Privacy and safety", path: "/#security" },
    ],
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
    shots: [
      { src: "/images/projects/javalava/01-home.webp", caption: "Home page" },
      { src: "/images/projects/javalava/02-origin.webp", caption: "Origin story", path: "/#story" },
      { src: "/images/projects/javalava/03-lineup.webp", caption: "Product lineup", path: "/#lineup" },
      { src: "/images/projects/javalava/04-film.webp", caption: "Brand film", path: "/#film" },
      { src: "/images/projects/javalava/05-cocktails.webp", caption: "Cocktail recipes", path: "/#cocktails" },
    ],
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
    shots: [
      { src: "/images/projects/alchemydev-site/01-home.webp", caption: "Home page, classic variant" },
      { src: "/images/projects/alchemydev-site/02-services.webp", caption: "Services", path: "/#services" },
      { src: "/images/projects/alchemydev-site/03-pricing.webp", caption: "Pricing plans", path: "/#pricing" },
      { src: "/images/projects/alchemydev-site/04-light-variant.webp", caption: "Light variant", path: "/index-light.html" },
    ],
  },
];
