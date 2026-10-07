import type { Metadata } from "next";
import { ProjectCard, ScrollReveal } from "@/components";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of web development and software engineering projects by Arvin Baghari Edubas.",
};

// Mirrors the "Selected Projects" section of resume.html.
const projects: Project[] = [
  {
    title: "DROMIC Reporting Web Application",
    description:
      "Centralized disaster response platform enabling LGUs to submit real-time assistance requests with automated notifications to regional offices. Features dashboard analytics, beneficiary tracking, and multi-level approval workflows.",
    techStack: ["Laravel", "Vue", "MySQL"],
    liveUrl: "https://dromic.dswd-caraga-drmd.online/",
  },
  {
    title: "ECT Post Monitoring App",
    description:
      "Mobile-first monitoring system for tracking emergency cash transfer disbursements to disaster-affected beneficiaries. Includes GPS-enabled field verification, photo documentation, and offline data sync capabilities.",
    techStack: ["React", "Laravel", "MySQL"],
    liveUrl: "https://ect-beneficiary-validation.abedubas.dev/",
  },
  {
    title: "Vendora POS & Local E-Commerce",
    description:
      "Integrated retail solution combining point-of-sale operations with local e-commerce storefront. Features real-time inventory management, sales analytics, customer ordering, and multi-branch support.",
    techStack: ["React Native", "Laravel", "MySQL"],
    liveUrl: "https://app.vendoraph.com/",
  },
  {
    title: "LogisX - Logistics Web Application",
    description:
      "Comprehensive logistics management platform for tracking shipments, managing fleet operations, and optimizing delivery routes. Features real-time tracking, automated dispatch, warehouse inventory management, and analytics dashboards.",
    techStack: ["Vue", "Laravel", "MySQL", "React Native"],
    // The legacy subdomain 301-redirects to the app's new home, app.logisx.com.
    liveUrl: "https://logistics-app.abedubas.dev",
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header */}
      <ScrollReveal animation="fade-down" duration={800}>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Projects</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A selection of projects I&apos;ve worked on, showcasing my expertise
            in full-stack development and system design
          </p>
        </div>
      </ScrollReveal>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.title}
            animation="zoom-in"
            delay={index * 100}
            duration={700}
            easing="elastic"
          >
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>

      {/* CTA Section */}
      <section className="mt-16 text-center">
        <ScrollReveal animation="fade-up" duration={800} easing="bounce">
          <div className="rounded-lg border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/50">
            <h2 className="mb-4 text-2xl font-semibold text-card-foreground">
              Interested in working together?
            </h2>
            <p className="mb-6 text-muted-foreground">
              I&apos;m always open to discussing new projects and opportunities.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
