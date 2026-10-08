import type { Project } from "@/types";

// The projects, shown on the Projects page; the home page's stats band
// lists the live ones by domain. Mirrors the "Selected Projects" section of
// resume.html.
export const projects: Project[] = [
  {
    title: "DROMIC Reporting Web Application",
    description:
      "Centralized disaster response platform enabling LGUs to submit real-time assistance requests with automated notifications to regional offices. Features dashboard analytics, beneficiary tracking, and multi-level approval workflows.",
    techStack: ["Laravel", "Vue", "MySQL"],
    liveUrl: "https://dromic.dswd-caraga-drmd.online/",
    image: "/images/projects/dromic.webp",
  },
  {
    title: "ECT Post Monitoring App",
    description:
      "Mobile-first monitoring system for tracking emergency cash transfer disbursements to disaster-affected beneficiaries. Includes GPS-enabled field verification, photo documentation, and offline data sync capabilities.",
    techStack: ["React", "Laravel", "MySQL"],
    liveUrl: "https://ect-post-monitoring.abedubas.dev/",
    image: "/images/projects/ect.webp",
  },
  {
    title: "Vendora POS & Local E-Commerce",
    description:
      "Integrated retail solution combining point-of-sale operations with local e-commerce storefront. Features real-time inventory management, sales analytics, customer ordering, and multi-branch support.",
    // The web app (app.vendoraph.com) is Next.js; the mobile app is React
    // Native.
    techStack: ["Next.js", "React Native", "Laravel", "MySQL"],
    liveUrl: "https://app.vendoraph.com/",
    image: "/images/projects/vendora.webp",
  },
  {
    title: "LogisX - Logistics Web Application",
    description:
      "Comprehensive logistics management platform for tracking shipments, managing fleet operations, and optimizing delivery routes. Features real-time tracking, automated dispatch, warehouse inventory management, and analytics dashboards.",
    techStack: ["Vue", "Laravel", "MySQL", "React Native"],
    // Its home since the move. The old logistics-app.abedubas.dev
    // 301-redirects here.
    liveUrl: "https://app.logisx.com/",
    image: "/images/projects/logisx.webp",
  },
];
