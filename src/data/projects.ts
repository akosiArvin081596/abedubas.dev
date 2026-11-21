import type { Project } from "@/types";

// The projects, strongest production work first. The home page's Projects
// section renders them all. `featured` marks the subset that the "Selected
// Projects" section of resume.html shows as cards; its "More Projects" lists
// the rest, so a new or renamed project goes into resume.html too.
//
// Rules:
// - One live link per project, and never a GitHub URL. The link is the
//   production site, a staging host, or a subdomain of abedubas.dev.
// - Staging is allowed, marked `stage: "staging"`, and labeled in the UI.
//   Staging hosts stay off the home stats band's Live Projects card, as do
//   login-only systems (`access: "login"`).
// - Live projects come first: each has a working live URL on its own domain
//   or a subdomain. No APIs, raw IPs or admin paths as links.
// - Then the builds with no public link (`access: "repo"`): tools, apps and
//   internal systems that live only in a repository. They have no liveUrl and
//   no screenshots, the explorer lists them under "# in the repo", and the
//   resume lists them under "From the Repos". Never a GitHub URL, and never
//   any client data in the text.
// - `shots` are 1600x900 viewport screenshots of pages on `liveUrl`
//   (public/images/projects/<slug>/<nn>-<view>.webp), each with a caption and
//   the page's path. The first is the cover, and the card shows them as a
//   gallery. Keep only shots with no error, blank page, or personal or client
//   data, and never AI images. `shots: []` shows a placeholder frame.
//   A login-only system's gallery opens on screens from inside it and ends on
//   its sign-in page. Those screens come from the same app run locally with
//   invented sample data, never production records. Captions stay within 44
//   characters: the status strip shows one line, and at 1024px wide that's
//   all that fits beside six dots.
//
// Every liveUrl was verified on 2026-10-30 (LogisX Website, HydroBoost, OQG
// Desk and Liquid Legacy on 2026-11-21): 2xx after redirects, serving the
// app named here. HydroBoost's dashboard answers 401 until you sign in, by
// design, and OQG Desk sends you to Google sign-in.
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
    shots: [
      { src: "/images/projects/logisx/01-dispatch-board.webp", caption: "Dispatch board: active loads and drivers", path: "/dashboard" },
      { src: "/images/projects/logisx/02-truck-database.webp", caption: "Truck database: fleet, drivers and owners", path: "/trucks" },
      { src: "/images/projects/logisx/03-expense-analytics.webp", caption: "Fuel and road spend by vendor and state", path: "/expenses" },
      { src: "/images/projects/logisx/04-financials.webp", caption: "Fleet profit and loss for the month", path: "/admin/financials" },
      { src: "/images/projects/logisx/05-investor-payouts.webp", caption: "An investor's monthly payout ledger", path: "/investor-portals/12" },
      { src: "/images/projects/logisx/06-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
    featured: true,
  },
  {
    slug: "logisx-website",
    title: "LogisX Website",
    description:
      "Company site for the LogisX trucking carrier, rebuilt from Wix as a multi-page React site for shippers, carriers, drivers and Truck Fund investors.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://logisx.com/",
    stage: "production",
    access: "public",
    shots: [
      { src: "/images/projects/logisx-website/01-home.webp", caption: "Home page: hiring drivers at $300 a day" },
      { src: "/images/projects/logisx-website/02-platform.webp", caption: "Platform: the digital freight hub", path: "/platform" },
      { src: "/images/projects/logisx-website/03-shippers.webp", caption: "Shippers: direct quotes, dedicated lanes", path: "/shippers" },
      { src: "/images/projects/logisx-website/04-carriers.webp", caption: "Carriers: access to dedicated lanes", path: "/carriers" },
      { src: "/images/projects/logisx-website/05-truck-fund.webp", caption: "LogisX Truck Fund for truck owners", path: "/truck-fund" },
      { src: "/images/projects/logisx-website/06-invest.webp", caption: "Investor data-room request form", path: "/invest-in-logisx" },
    ],
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
    shots: [
      { src: "/images/projects/lendyph/01-dashboard.webp", caption: "Dashboard: portfolio and collections", path: "/dashboard" },
      { src: "/images/projects/lendyph/02-members.webp", caption: "Members across two branches", path: "/borrowers" },
      { src: "/images/projects/lendyph/03-loans.webp", caption: "Loan applications from review to release", path: "/loans" },
      { src: "/images/projects/lendyph/04-loan-ledger.webp", caption: "Loan ledger: principal and interest", path: "/loans/4" },
      { src: "/images/projects/lendyph/05-collection-report.webp", caption: "Collection efficiency report by branch", path: "/reports/collection_efficiency" },
      { src: "/images/projects/lendyph/06-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
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
    shots: [
      { src: "/images/projects/vendora/01-sales-dashboard.webp", caption: "Sales dashboard: the week's sales and orders", path: "/pos/dashboard" },
      { src: "/images/projects/vendora/02-pos-cart.webp", caption: "POS screen with a sample cart", path: "/pos/pos-screen" },
      { src: "/images/projects/vendora/03-products.webp", caption: "Products with price, cost and stock", path: "/pos/products" },
      { src: "/images/projects/vendora/04-orders.webp", caption: "Orders and their status", path: "/pos/orders" },
      { src: "/images/projects/vendora/05-sign-in.webp", caption: "POS sign-in page", path: "/pos/auth/login" },
    ],
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
    shots: [
      { src: "/images/projects/dromic/01-dashboard.webp", caption: "Dashboard: incidents and LGU coverage", path: "/dashboard" },
      { src: "/images/projects/dromic/02-incidents.webp", caption: "Incidents with their LGU and report counts", path: "/incidents" },
      { src: "/images/projects/dromic/03-situational-report.webp", caption: "An LGU's situational progress report", path: "/incidents/1/reports/2" },
      { src: "/images/projects/dromic/04-consolidated-report.webp", caption: "Consolidated report by cut-off period", path: "/incidents/1/consolidated" },
      { src: "/images/projects/dromic/05-executive-dashboard.webp", caption: "Regional Director's executive dashboard", path: "/rd-dashboard/1" },
      { src: "/images/projects/dromic/06-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
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
    shots: [
      { src: "/images/projects/ect/01-surveys.webp", caption: "Recent surveys and their sync status", path: "/?tab=surveys" },
      { src: "/images/projects/ect/02-incident-selection.webp", caption: "Survey wizard, step 1: pick the incident", path: "/survey/new" },
      { src: "/images/projects/ect/03-survey-form.webp", caption: "Form prefilled from a past survey", path: "/survey/new" },
      { src: "/images/projects/ect/04-beneficiary-search.webp", caption: "Beneficiary search while typing a name", path: "/survey/new" },
      { src: "/images/projects/ect/05-survey-detail.webp", caption: "Survey: cash received and how it was spent", path: "/survey/6b918f49-983d-49f1-af1d-1b1cef956811" },
      { src: "/images/projects/ect/06-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
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
    shots: [
      { src: "/images/projects/alchemydev-crm/01-dashboard.webp", caption: "Studio dashboard: tasks and approvals", path: "/admin" },
      { src: "/images/projects/alchemydev-crm/02-project.webp", caption: "A client's project: tasks and invoices", path: "/portal/projects/cmvutz3cj0003b0v4qyfvqko4" },
      { src: "/images/projects/alchemydev-crm/03-board.webp", caption: "Board of tasks across every project", path: "/admin/board" },
      { src: "/images/projects/alchemydev-crm/04-client-requests.webp", caption: "Client requests with status and priority", path: "/admin/client-requests" },
      { src: "/images/projects/alchemydev-crm/05-team.webp", caption: "Team directory: roles and availability", path: "/admin/team" },
      { src: "/images/projects/alchemydev-crm/06-sign-in.webp", caption: "Client portal sign-in page", path: "/login" },
    ],
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
    shots: [
      { src: "/images/projects/oqg-recorder/01-recorder.webp", caption: "Recorder setup: source, mic and camera" },
      { src: "/images/projects/oqg-recorder/02-recording.webp", caption: "Recording with the camera bubble on screen" },
      { src: "/images/projects/oqg-recorder/03-ai-notes.webp", caption: "A finished recording with its AI transcript" },
      { src: "/images/projects/oqg-recorder/04-library.webp", caption: "Recordings library, saved on the device" },
      { src: "/images/projects/oqg-recorder/05-sign-in.webp", caption: "Sign-in page", path: "/signin" },
    ],
  },
  {
    slug: "oqg-desk",
    title: "OQG Desk",
    description:
      "Trading platform where quants upload Python models, backtest them, run them against a broker sandbox and promote them to live, with a C++ market-data engine and an order router that owns the risk checks.",
    techStack: ["Python", "C++", "TypeScript", "Docker"],
    liveUrl: "https://trading.obsidianquantgroup.com/",
    stage: "production",
    access: "login",
    // Behind Google sign-in, and every screen shows client trading data, so
    // the card keeps the placeholder frame.
    shots: [],
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
    shots: [
      { src: "/images/projects/sec-compliance-matrix/01-dashboard.webp", caption: "CCO dashboard: exposure and risk heatmap", path: "/cco" },
      { src: "/images/projects/sec-compliance-matrix/02-matrix.webp", caption: "SEC filings with fines and violated rules", path: "/matrix" },
      { src: "/images/projects/sec-compliance-matrix/03-firm.webp", caption: "A firm's penalties and violated rules", path: "/matrix" },
      { src: "/images/projects/sec-compliance-matrix/04-heatmap.webp", caption: "Risk heatmap and the bad-actor watchlist", path: "/cco" },
      { src: "/images/projects/sec-compliance-matrix/05-individual.webp", caption: "An individual's risk breakdown and filings", path: "/cco" },
      { src: "/images/projects/sec-compliance-matrix/06-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
  },
  {
    slug: "hydroboost",
    title: "HydroBoost Order Automation",
    description:
      "n8n automation that turns each paid Wix order into a ShippingEasy shipment exactly once, with Slack alerts on failure and a dashboard to trace, retry and replay orders.",
    techStack: ["n8n", "Node.js", "SQLite", "Wix", "ShippingEasy"],
    liveUrl: "https://hydroboost.abedubas.dev/",
    stage: "production",
    access: "login",
    // The dashboard asks for Basic Auth (a 401 until you sign in), so these
    // come from it run locally against a mock n8n with invented orders.
    shots: [
      { src: "/images/projects/hydroboost/01-overview.webp", caption: "Order KPIs and live pipeline map" },
      { src: "/images/projects/hydroboost/02-executions.webp", caption: "Execution history with archived orders" },
      { src: "/images/projects/hydroboost/03-order-stages.webp", caption: "One order traced stage by stage" },
      { src: "/images/projects/hydroboost/04-push-failure-map.webp", caption: "Failed push routed to a Slack alert" },
      { src: "/images/projects/hydroboost/05-push-failure-alert.webp", caption: "Push error detail and Slack alert sent" },
      { src: "/images/projects/hydroboost/06-replay-bypass.webp", caption: "Replay of a failed order skips dedupe" },
    ],
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
    shots: [
      { src: "/images/projects/zoey-binxx/01-dashboard.webp", caption: "Dashboard: spend against what's claimable", path: "/dashboard" },
      { src: "/images/projects/zoey-binxx/02-transactions.webp", caption: "Transactions read off receipts, by category", path: "/transactions" },
      { src: "/images/projects/zoey-binxx/03-receipt.webp", caption: "A scanned receipt and the lines it produced", path: "/documents/cmvuu5iu2002nv4oe0cdlqvex" },
      { src: "/images/projects/zoey-binxx/04-categories.webp", caption: "Spend by category, business vs personal", path: "/dashboard" },
      { src: "/images/projects/zoey-binxx/05-documents.webp", caption: "Uploaded receipts and bank statements", path: "/documents" },
      { src: "/images/projects/zoey-binxx/06-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
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
    shots: [
      { src: "/images/projects/ect-validation/01-dashboard.webp", caption: "Dashboard: damage and NHTS-PR totals", path: "/dashboard" },
      { src: "/images/projects/ect-validation/02-barangay-breakdown.webp", caption: "Breakdown by LGU and barangay", path: "/dashboard" },
      { src: "/images/projects/ect-validation/03-masterlist.webp", caption: "Masterlist with filters and CSV export", path: "/masterlist" },
      { src: "/images/projects/ect-validation/04-deduplication.webp", caption: "Deduplication: fuzzy first-name matches", path: "/deduplication" },
      { src: "/images/projects/ect-validation/05-data-cleansing.webp", caption: "Data cleansing: merge exact duplicates", path: "/data-cleansing" },
      { src: "/images/projects/ect-validation/06-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
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
    shots: [
      { src: "/images/projects/masterlist-deduplication/01-dashboard.webp", caption: "Dashboard: duplicates and review progress" },
      { src: "/images/projects/masterlist-deduplication/02-masterlists.webp", caption: "Masterlists per incident, with dedup runs", path: "/masterlists" },
      { src: "/images/projects/masterlist-deduplication/03-review-pairs.webp", caption: "Review queue: two records side by side", path: "/masterlists/4/review?filter=pending" },
      { src: "/images/projects/masterlist-deduplication/04-sign-in.webp", caption: "Sign-in page", path: "/login" },
    ],
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
    slug: "liquid-legacy",
    title: "Liquid Legacy Distribution",
    description:
      "Landing page, logo suite and brand book for a new wine and spirits distributor, with an age gate, a scroll-driven story of how a bottle travels and a contact form.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zod"],
    liveUrl: "https://lld-mockup.abedubas.dev/",
    stage: "staging",
    access: "public",
    shots: [
      { src: "/images/projects/liquid-legacy/01-home.webp", caption: "Home page: the crest over a cellar video" },
      { src: "/images/projects/liquid-legacy/02-legacy.webp", caption: "About: a distributor built around the bottle", path: "/#legacy" },
      { src: "/images/projects/liquid-legacy/03-services.webp", caption: "Services, from sales to delivery", path: "/#services" },
      { src: "/images/projects/liquid-legacy/04-process.webp", caption: "Process: how a bottle travels", path: "/#process" },
      { src: "/images/projects/liquid-legacy/05-reach.webp", caption: "Reach: a national coverage map", path: "/#reach" },
      { src: "/images/projects/liquid-legacy/06-contact.webp", caption: "Contact form for producers and accounts", path: "/#contact" },
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
  // In the repo, no public link: tools, apps and internal systems, listed
  // after every live project.
  {
    slug: "mesa-sponsor-search",
    title: "Mesa Festival Sponsor Search",
    description:
      "Finds and enriches likely sponsors for a city music festival with the Claude API, live web search and page fetching, streaming its progress as it works.",
    techStack: ["Next.js", "TypeScript", "Claude API", "Prisma"],
    access: "repo",
    shots: [],
  },
  {
    slug: "obsidian-llm",
    title: "Obsidian LLM",
    description:
      "Document assistant for Obsidian Quant Group that reads the firm's Word, Excel and web documents and answers questions with cited sources.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Better Auth"],
    access: "repo",
    shots: [],
  },
  {
    slug: "oqg-research-console",
    title: "OQG Options Research Console",
    description:
      "Research console for replicating a 0DTE options strategy: data pipeline, models and backtests, plus a Claude research assistant limited to approved models.",
    techStack: ["Python", "TypeScript", "Claude API"],
    access: "repo",
    shots: [],
  },
  {
    slug: "email-extractor",
    title: "Email Extractor",
    description:
      "Finds a domain's public email addresses through several data providers, its own site crawler and OSINT, records where each came from, and can verify deliverability.",
    techStack: ["Python", "FastAPI", "SQLAlchemy", "Next.js"],
    access: "repo",
    shots: [],
  },
  {
    slug: "favfan",
    title: "FavFan",
    description:
      "Analytics and engagement overlay for YouTube creators: scores fan loyalty from comments, Super Chats and memberships, ranks superfans and flashes them on a live OBS overlay.",
    techStack: ["Next.js", "NestJS", "BullMQ", "Socket.IO", "Prisma"],
    access: "repo",
    shots: [],
  },
  {
    slug: "shared-payments-widget",
    title: "Shared Payments Widget",
    description:
      "One Stripe integration that several sites share through an embeddable checkout widget and a single webhook.",
    techStack: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    access: "repo",
    shots: [],
  },
  {
    slug: "driver-route-module",
    title: "Driver Route Module",
    description:
      "Turn-by-turn navigation from pickup to drop-off, with traffic, elevation and weather-aware routing for motorcycles and cars.",
    techStack: ["Next.js", "TypeScript", "Google Maps", "Turf.js"],
    access: "repo",
    shots: [],
  },
  {
    slug: "music-festival-app",
    title: "Music Festival App",
    description:
      "Monorepo for a music festival: a React Native mobile app, a NestJS API, BullMQ workers and Solidity contracts on Polygon.",
    techStack: ["React Native", "NestJS", "BullMQ", "Solidity"],
    access: "repo",
    shots: [],
  },
  {
    slug: "azul-resibooth",
    title: "Azul ResiBOOTH Prints",
    description:
      "Android photo-booth app that shoots a strip of photos and prints it on a 58 mm Bluetooth thermal receipt printer.",
    techStack: ["React Native", "Expo", "TypeScript"],
    access: "repo",
    shots: [],
  },
  {
    slug: "wikibotanica",
    title: "WikiBotanica",
    description:
      "Plant identification and data management platform.",
    techStack: ["Python", "Flask", "React", "Vite"],
    access: "repo",
    shots: [],
  },
  {
    slug: "team-workflow-pack",
    title: "Team Workflow Pack",
    description:
      "The starting point for every new team project: a Claude Code plugin marketplace, reusable GitHub Actions workflows and ops scripts.",
    techStack: ["Claude Code", "GitHub Actions", "Shell"],
    access: "repo",
    shots: [],
  },
];
