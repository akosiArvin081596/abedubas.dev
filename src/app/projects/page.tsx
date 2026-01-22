import type { Metadata } from "next";
import { ProjectCard, ScrollReveal } from "@/components";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of web development and software engineering projects by Arvin Baghari Edubas.",
};

const projects: Project[] = [
  {
    title: "Enterprise Dashboard",
    description:
      "A comprehensive analytics dashboard for enterprise clients featuring real-time data visualization, user management, and customizable reporting. Built with performance and scalability in mind.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    githubUrl: "https://github.com/arvinedubas/enterprise-dashboard",
    liveUrl: "https://dashboard.example.com",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce solution with product management, shopping cart, secure checkout, and order tracking. Integrated with multiple payment gateways.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/arvinedubas/ecommerce-platform",
    liveUrl: "https://shop.example.com",
  },
  {
    title: "Task Management System",
    description:
      "Collaborative task management application with real-time updates, team workspaces, and project tracking. Features drag-and-drop interface and automated workflows.",
    techStack: ["Next.js", "TypeScript", "Socket.io", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com/arvinedubas/task-manager",
  },
  {
    title: "Content Management System",
    description:
      "Headless CMS built for developers with a focus on flexibility and performance. Features a powerful API, media management, and role-based access control.",
    techStack: ["NestJS", "TypeScript", "GraphQL", "PostgreSQL", "AWS S3"],
    githubUrl: "https://github.com/arvinedubas/headless-cms",
  },
  {
    title: "Real-Time Chat Application",
    description:
      "Scalable chat application supporting private messaging, group chats, and file sharing. Implements end-to-end encryption for secure communications.",
    techStack: ["React", "Node.js", "WebSocket", "MongoDB", "Redis"],
    githubUrl: "https://github.com/arvinedubas/chat-app",
    liveUrl: "https://chat.example.com",
  },
  {
    title: "API Gateway Service",
    description:
      "Microservices API gateway handling authentication, rate limiting, request routing, and logging. Designed for high availability and horizontal scaling.",
    techStack: ["Node.js", "Express", "Redis", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/arvinedubas/api-gateway",
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
