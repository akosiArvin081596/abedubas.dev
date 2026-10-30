import type { CSSProperties } from "react";
import Link from "next/link";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION } from "@/data/contact";
import { SECTIONS } from "@/data/sections";
import { publicLiveSites } from "@/lib/live-sites";
import { BackToTop } from "./BackToTop";
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { LocalClock } from "./LocalClock";
import { SplitText } from "./motion";

const check = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden="true"
    className="h-4 w-4 text-primary"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

// A few of the live sites: the public front doors first, then public
// production projects.
const LIVE_SITES = 6;

const heading =
  "mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground";
const link = "text-sm text-foreground/80 transition-colors hover:text-primary";

// The site's last screen, on the home page and on every post: a full screen
// tall (100svh minus the header) at every width, and HomeSnap's last stop
// (data-snap-stop). The closing call to action (`words`) leads; under it
// the ledger (`ledger`): section links, contact with Arvin's local time,
// availability, socials and a few live sites; then the copyright and Back
// to top. Both effects are in styles/motion/site.css. They're siblings, so
// the call to action, above, plays first. The bottom row keeps its right
// end clear for the Bintoy launcher.
export function Footer() {
  const currentYear = new Date().getFullYear();
  const sites = publicLiveSites({ frontDoorsFirst: true }).slice(0, LIVE_SITES);

  return (
    <footer
      data-snap-stop=""
      className="site-footer relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden border-t border-border bg-background"
    >
      {/* Backdrop: two orbs that breathe, and a few sparkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="footer-orb absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl xl:h-96 xl:w-96" />
        <div
          className="footer-orb absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl xl:h-[28rem] xl:w-[28rem]"
          style={{ "--orb-time": "10s" } as CSSProperties}
        />
        <div className="absolute left-[10%] top-16 h-2 w-2 rounded-full bg-primary/40 motion-safe:animate-[sparkle_3s_ease-in-out_infinite]" />
        <div className="absolute right-[15%] top-32 h-1.5 w-1.5 rounded-full bg-accent/50 motion-safe:animate-[sparkle_4s_ease-in-out_infinite_0.5s]" />
        <div className="absolute bottom-40 left-[20%] h-2 w-2 rounded-full bg-primary/30 motion-safe:animate-[sparkle_3.5s_ease-in-out_infinite_1s]" />
      </div>

      <div className="container-site relative flex flex-1 flex-col justify-between gap-12 py-12 lg:gap-8 lg:py-8 tight:gap-6">
        {/* The closing call to action */}
        <div data-reveal="words" className="flex flex-1 flex-col items-center justify-center text-center">
          <h2
            data-reveal-item
            className="words-head mx-auto mb-5 max-w-5xl text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl md:text-6xl xl:text-7xl short:mb-3 short:text-5xl"
          >
            <SplitText text="Ready to Start a" />{" "}
            <span className="whitespace-nowrap">
              <SplitText
                text="Project"
                start={4}
                className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              />
              <SplitText text="?" start={5} />
            </span>
          </h2>
          <p
            data-reveal-item
            className="words-follow words-after mx-auto mb-7 max-w-2xl text-lg text-muted-foreground xl:text-xl short:mb-5 short:text-lg"
          >
            I&apos;m always excited to work on new challenges. Let&apos;s
            discuss how I can help bring your ideas to life.
          </p>
          <Link
            href="/#contact"
            data-reveal-item
            className="words-follow words-after group relative inline-flex items-center text-lg font-medium text-foreground transition-colors hover:text-primary xl:text-xl"
          >
            <span className="relative">
              Let&apos;s Talk
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary/30 transition-all duration-300 group-hover:bg-primary" />
            </span>
            <ArrowIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <ul className="words-after mt-7 short:mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground xl:text-base">
            {["Quick Response", "Free Consultation", "No Commitment"].map((label) => (
              <li key={label} data-reveal-item className="words-follow flex items-center gap-2">
                {check}
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* The ledger */}
        <div data-reveal="ledger" className="relative border-t border-border pt-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
            <div data-reveal-item className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link href="/" className="text-lg font-bold text-foreground hover:text-primary">
                Arvin Baghari Edubas
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                Information Technologist &amp; Software Engineer
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-foreground/80">
                <span className="relative flex h-2 w-2">
                  <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for new projects
              </p>
            </div>

            <nav aria-label="Sections" data-reveal-item>
              <h3 className={heading}>Sections</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {SECTIONS.map((section) => (
                  <li key={section.key}>
                    <Link href={section.href} className={link}>
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div data-reveal-item className="col-span-2 md:col-span-1">
              <h3 className={heading}>Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`mailto:${EMAIL}`} className={`${link} break-words`}>
                    {EMAIL}
                  </a>
                </li>
                <li className="text-foreground/80">{LOCATION}</li>
                <li className="font-mono text-xs text-muted-foreground">
                  <span className="sr-only">Arvin&apos;s local time: </span>
                  <LocalClock part="time" className="empty:invisible" />{" "}
                  <LocalClock part="date" className="empty:invisible" />
                </li>
              </ul>
            </div>

            <div data-reveal-item>
              <h3 className={heading}>Elsewhere</h3>
              <ul className="space-y-2">
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                    <GitHubIcon className="h-4 w-4" />
                    GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className={`${link} inline-flex items-center gap-2`}>
                    <MailIcon className="h-4 w-4" />
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div data-reveal-item>
              <h3 className={heading}>Live sites</h3>
              <ul className="space-y-2">
                {sites.map((site) => (
                  <li key={site.host}>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link} inline-flex items-center gap-2 font-mono text-xs`}
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      {site.host}
                      <span className="sr-only">, {site.name} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright and Back to top. The padding on the right keeps the
              Bintoy launcher's corner empty. */}
          <div className="ledger-divider relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pr-20 pt-6 lg:mt-6">
            <p className="text-sm text-muted-foreground" data-reveal-item>
              &copy; {currentYear} Arvin Baghari Edubas. All rights reserved.
            </p>
            <span data-reveal-item>
              <BackToTop className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Back to top
                <ArrowIcon className="h-4 w-4 -rotate-90" />
              </BackToTop>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
