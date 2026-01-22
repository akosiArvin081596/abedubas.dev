import Link from "next/link";
import Image from "next/image";
import { HeroAnimation } from "./HeroAnimation";
import { ParallaxHero } from "./ParallaxHero";
import { TypeWriter, ScrollReveal } from "@/components";

const techStack = [
  "Vue",
  "Nuxt",
  "Laravel",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
];

const services = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Frontend Development",
    description:
      "Building responsive, performant user interfaces with React, Next.js, and modern CSS frameworks.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    title: "Backend Development",
    description:
      "Designing scalable APIs and server architectures with Node.js, databases, and cloud services.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    title: "UI/UX Design",
    description:
      "Creating intuitive, accessible interfaces that delight users and drive engagement.",
  },
];

export default function HomePage() {
  return (
    <ParallaxHero>

      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-[calc(100vh-200px)] max-w-6xl flex-col items-center justify-center px-4 py-20">
        <HeroAnimation>
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-20 blur-xl animate-pulse" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-accent to-primary animate-[spin_8s_linear_infinite]" />
              {/* Image container */}
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-background shadow-2xl sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                <Image
                  src="/images/profile_picture.jpg"
                  alt="Arvin Baghari Edubas"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Status Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Available for new projects
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Hi, I&apos;m{" "}
                <span className="relative">
                  <TypeWriter
                    text="Arvin Baghari Edubas"
                    delay={100}
                    deleteDelay={40}
                    pauseDelay={2000}
                    loop={true}
                    className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient_3s_linear_infinite]"
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mb-4 text-xl font-medium text-foreground/80 sm:text-2xl">
                Web Developer & Software Engineer
              </p>

              {/* Description */}
              <p className="mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Clean code, intuitive user experiences, and scalable,
                enterprise-ready architecture—brought together to build modern web
                applications. Open to collaborating on something meaningful.
              </p>

              {/* CTA Buttons */}
              <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
                >
                  View My Work
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-lg border border-border bg-background/50 px-8 py-4 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary hover:bg-muted"
                >
                  Get in Touch
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </Link>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </HeroAnimation>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-border bg-muted/30 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "20+", label: "Technologies" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="bounce-in" delay={index * 150} easing="elastic" duration={800}>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="relative mx-auto max-w-6xl px-4 py-24">
        <ScrollReveal animation="blur-in" duration={800} easing="ease-out">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              What I Do
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              I specialize in building end-to-end web solutions that are fast,
              accessible, and built to scale.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => {
            const animations = ["slide-right", "slide-up", "slide-left"] as const;
            return (
              <ScrollReveal
                key={index}
                animation={animations[index]}
                delay={index * 300}
                easing="bounce"
                duration={800}
              >
                <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-2 h-full">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border py-24">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />

          {/* Sparkle dots */}
          <div className="absolute top-16 left-[10%] h-2 w-2 rounded-full bg-primary/40 animate-[sparkle_3s_ease-in-out_infinite]" />
          <div className="absolute top-32 right-[15%] h-1.5 w-1.5 rounded-full bg-accent/50 animate-[sparkle_4s_ease-in-out_infinite_0.5s]" />
          <div className="absolute bottom-24 left-[20%] h-2 w-2 rounded-full bg-primary/30 animate-[sparkle_3.5s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-16 right-[25%] h-1.5 w-1.5 rounded-full bg-accent/40 animate-[sparkle_2.5s_ease-in-out_infinite_0.3s]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <ScrollReveal animation="fade-up" duration={800} delay={900}>
            {/* Icon */}
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent p-4 text-white shadow-lg shadow-primary/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={800} delay={1000}>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Ready to Start a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Project
              </span>
              ?
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={800} delay={1100}>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              I&apos;m always excited to work on new challenges. Let&apos;s
              discuss how I can help bring your ideas to life.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" duration={800} delay={1200} easing="elastic">
            {/* Enhanced button */}
            <Link
              href="/contact"
              className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-10 py-5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
            >
              {/* Button shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Let&apos;s Talk
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5 transition-transform group-hover/btn:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Link>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={800} delay={1300}>
            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Quick Response
              </span>
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Free Consultation
              </span>
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                No Commitment
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </ParallaxHero>
  );
}
