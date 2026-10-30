import { CodeWindow } from "@/components";
import { GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "@/components/icons";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION } from "@/data/contact";
import { ContactForm } from "./ContactForm";

const socialClass =
  "cascade-icon rounded-lg bg-muted p-3 text-muted-foreground transition-all hover:scale-110 hover:bg-primary hover:text-white [@media(min-height:820px)]:xl:p-4";

const detailIconClass =
  "cascade-icon rounded-lg bg-muted p-3 text-primary transition-transform hover:scale-110 [@media(min-height:820px)]:xl:p-4";

// #contact: the Get in Touch header (`marker`) heads the left column, over
// the contact details (`cascade`, row by row); the form fills the right
// (`fields`, field by field). From lg the section is one screen (home.css)
// and both columns take its height: under the header, the contact details
// center in the left column's free height and the social links sit at its
// foot, level with the form's, whose message box grows to take the form's
// free height. On tall wide screens everything sets a step larger.
export function ContactSection() {
  return (
    <section id="contact" data-nav="contact" className="relative py-16 lg:py-8 short:py-6">
      <div className="container-site grid gap-12 lg:flex-1 lg:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="lg:col-span-5 lg:flex lg:flex-col">
          <div data-reveal="marker" className="mb-10">
            <h2 className="mb-5 text-5xl font-bold text-foreground xl:text-6xl [@media(min-height:820px)]:xl:text-7xl">
              <span className="marker-block">
                <span className="marker-text">Get in Touch</span>
              </span>
            </h2>
            <p className="marker-sub max-w-[48ch] text-lg text-muted-foreground [@media(min-height:820px)]:xl:text-xl">
              Have a project in mind or want to collaborate? I&apos;d love to
              hear from you.
            </p>
          </div>

          <div data-reveal="cascade" className="lg:flex lg:flex-1 lg:flex-col">
            <div className="lg:my-auto">
              <h3
                className="cascade-text mb-6 text-xl font-semibold text-foreground xl:text-2xl [@media(min-height:820px)]:xl:mb-8"
                data-reveal-item
              >
                Contact Information
              </h3>
              <div className="space-y-6 [@media(min-height:820px)]:xl:space-y-8 [@media(min-height:820px)]:xl:text-lg">
                <div className="cascade-row relative flex items-start gap-5" data-reveal-item>
                  <div className={detailIconClass}>
                    <MailIcon />
                  </div>
                  <div className="cascade-text">
                    <h4 className="font-medium text-foreground">Email</h4>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="cascade-row relative flex items-start gap-5" data-reveal-item>
                  <div className={detailIconClass}>
                    <PinIcon />
                  </div>
                  <div className="cascade-text">
                    <h4 className="font-medium text-foreground">Location</h4>
                    <p className="text-muted-foreground">{LOCATION}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="cascade-text mb-4 font-medium text-foreground [@media(min-height:820px)]:xl:text-lg" data-reveal-item>
                Connect with me
              </h4>
              <div className="flex gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialClass}
                  aria-label="GitHub (opens in a new tab)"
                  data-reveal-item
                >
                  <GitHubIcon />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialClass}
                  aria-label="LinkedIn (opens in a new tab)"
                  data-reveal-item
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:flex lg:flex-col" data-reveal="fields">
          <CodeWindow
            title="message.ts"
            className="transition-colors hover:border-primary/50 lg:flex lg:flex-1 lg:flex-col"
            bodyClassName="p-6 md:p-8 lg:flex lg:flex-1 lg:flex-col [@media(min-height:820px)]:xl:p-10"
          >
            <h3
              className="fields-heading mb-5 text-2xl font-semibold text-card-foreground [@media(min-height:820px)]:xl:mb-8 [@media(min-height:820px)]:xl:text-3xl"
              data-reveal-item
            >
              Send a Message
            </h3>
            <ContactForm />
          </CodeWindow>
        </div>
      </div>
    </section>
  );
}
