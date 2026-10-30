// The site's one page, as the nav lists it. Each `key` matches the
// data-nav of the home page sections it covers (About covers #about,
// #philosophy and #experience, say), which is how scroll-spy picks the
// link to underline. Navbar, Footer, HeroShell, Bintoy and RouteCurtain all
// read this list.
export const SECTIONS = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/#about" },
  { key: "skills", label: "Skills", href: "/#skills" },
  { key: "projects", label: "Projects", href: "/#projects" },
  { key: "blog", label: "Blog", href: "/#blog" },
  { key: "contact", label: "Contact", href: "/#contact" },
] as const;

export type SectionKey = (typeof SECTIONS)[number]["key"];

// The sections a visitor can jump to by name (everything but Home).
export type PageKey = Exclude<SectionKey, "home">;

export const PAGE_KEYS = SECTIONS.flatMap((section) =>
  section.key === "home" ? [] : [section.key],
);

export const hrefFor = (key: SectionKey) =>
  SECTIONS.find((section) => section.key === key)?.href ?? "/";
