// Where a project's live link points. 'staging' gets a badge in the UI and
// stays off the home stats band's Live Projects card.
export type ProjectStage = 'production' | 'staging';

// One screenshot in a project's gallery.
export interface ProjectShot {
  src: string; // "/images/projects/<slug>/<nn>-<view>.webp", 1600x900
  caption: string; // what the screen shows, e.g. "Dispatch board"
  path?: string; // the page's path on liveUrl, e.g. "/loads"; shown in the frame's address bar
}

export interface Project {
  slug: string; // kebab-case and unique; names the project's screenshot folder
  title: string; // the public product name
  description: string; // 1-2 sentences
  techStack: string[]; // 3-5 entries, taken from the manifests
  liveUrl: string; // required: the one live link, never a GitHub URL
  stage: ProjectStage; // 'staging' gets a badge in the UI
  access: 'public' | 'login'; // 'login' = a login-only system
  shots: ProjectShot[]; // the first is the cover; [] keeps the placeholder frame
  featured?: boolean; // the subset that resume.html mirrors
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}
