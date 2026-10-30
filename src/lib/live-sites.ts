import { otherLiveSites } from "@/data/live-sites";
import { projects } from "@/data/projects";

export interface LiveSite {
  name: string;
  url: string;
  host: string;
}

const withHost = (site: { name: string; url: string }): LiveSite => ({
  ...site,
  host: new URL(site.url).host,
});

// The public production projects (no staging hosts, no login-only
// systems), in the projects' order.
const publicProjects = projects
  .filter((project) => project.stage === "production" && project.access === "public")
  .map((project) => withHost({ name: project.title, url: project.liveUrl }));

const frontDoors = otherLiveSites.map(withHost);

// Everything public and live on its own domain, for the home stats band's
// Live Projects card and the footer: the public production projects plus
// src/data/live-sites.ts. `frontDoorsFirst` leads with the products' public
// front doors instead.
export function publicLiveSites({ frontDoorsFirst = false } = {}): LiveSite[] {
  return frontDoorsFirst
    ? [...frontDoors, ...publicProjects]
    : [...publicProjects, ...frontDoors];
}
