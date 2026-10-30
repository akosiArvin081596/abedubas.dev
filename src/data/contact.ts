// How to reach Arvin. The Contact section, the footer and Bintoy all read
// these, so a change here reaches every place they show.
export const EMAIL = "arvin.edubas15@gmail.com";
export const LOCATION = "Philippines";

export const GITHUB_URL = "https://github.com/akosiArvin081596/";
export const LINKEDIN_URL = "https://www.linkedin.com/in/arvin-edubas-a2b986144/";

export const SOCIALS = [
  { key: "github", label: "GitHub", href: GITHUB_URL },
  { key: "linkedin", label: "LinkedIn", href: LINKEDIN_URL },
  { key: "email", label: "Email", href: `mailto:${EMAIL}` },
] as const;
