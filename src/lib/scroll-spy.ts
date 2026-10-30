// Scroll-spy for the nav: which section (by data-nav key) is in view. An
// external store for useSyncExternalStore, so the Navbar never sets state
// in an effect. The snapshot is:
// - undefined before anything has been measured (and on the server),
// - the data-nav key of the element across the probe line, a band at 40%
//   of the screen's height,
// - null when nothing with a data-nav is there (the footer, or a page
//   without sections).
// While a same-page link glides (HomeSnap), `holdSpy` pins the snapshot to
// the link's target, and `releaseSpy` lets it follow the page again.

type Snapshot = string | null | undefined;

const listeners = new Set<() => void>();
const crossing = new Set<Element>();
let current: Snapshot;
let holding = false;
let held: string | null = null;
let io: IntersectionObserver | null = null;
let mo: MutationObserver | null = null;

const ATTR = "data-nav";

function measure(): string | null {
  // The last one in document order wins, so a section nested in another
  // (none today) would beat its parent.
  let key: string | null = null;
  document.querySelectorAll<HTMLElement>(`[${ATTR}]`).forEach((element) => {
    if (crossing.has(element)) key = element.getAttribute(ATTR);
  });
  return key;
}

function emit() {
  const next = holding ? held : io ? measure() : undefined;
  if (next === current) return;
  current = next;
  listeners.forEach((listener) => listener());
}

function observe(node: Node) {
  if (!(node instanceof Element) || !io) return;
  if (node.hasAttribute(ATTR)) io.observe(node);
  node.querySelectorAll(`[${ATTR}]`).forEach((element) => io?.observe(element));
}

function start() {
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) crossing.add(entry.target);
        else crossing.delete(entry.target);
      });
      emit();
    },
    { rootMargin: "-40% 0px -59% 0px" },
  );
  observe(document.body);
  // Sections come and go with client navigation (home, then a post).
  mo = new MutationObserver((mutations) => {
    let removed = false;
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(observe);
      mutation.removedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        for (const element of crossing) {
          if (node === element || node.contains(element)) {
            crossing.delete(element);
            io?.unobserve(element);
            removed = true;
          }
        }
      });
    }
    if (removed) emit();
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

function stop() {
  io?.disconnect();
  mo?.disconnect();
  io = null;
  mo = null;
  crossing.clear();
  current = undefined;
}

export function subscribeSpy(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stop();
  };
}

export const spySnapshot = (): Snapshot => current;

export const spyServerSnapshot = (): Snapshot => undefined;

export function holdSpy(key: string | null) {
  holding = true;
  held = key;
  emit();
}

export function releaseSpy() {
  holding = false;
  held = null;
  emit();
}
