// The site's one scripted scroll: an eased glide of the page to a point,
// shared by HomeSnap (wheel and key paging, same-page links) and the
// footer's Back to top. While it runs, html[data-gliding] is set, which
// RevealObserver holds its reveals on, so a long glide doesn't play the
// entrance of every section it passes. When it ends (or is cancelled) the
// attribute goes and a `glideend` event fires on window.
//
// The visitor always wins: a pointer press, a touch, a wheel or a key that
// nothing else has handled cancels it on the spot.

// The sticky header's height (4.5rem), which each section starts under.
export const HEADER = 72;

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

// One screen takes about 0.9 s, a short hop no less than 0.54 s, and a run
// across the whole page no more than 1.6 s.
const durationFor = (distance: number) => {
  const screens = Math.abs(distance) / window.innerHeight;
  return Math.min(1600, Math.max(540, 740 + 160 * screens));
};

let frame = 0;
let finish: (() => void) | null = null;

export const isGliding = () => finish !== null;

export function cancelGlide() {
  finish?.();
}

// The top of an element's stop: where the page rests with it right under
// the header.
export function stopFor(element: Element) {
  return Math.round(element.getBoundingClientRect().top + window.scrollY - HEADER);
}

// Glide to `to` (clamped to the page). Returns false if there was nowhere to
// go. `onEnd` runs once, when the glide finishes or is cancelled.
export function glideTo(to: number, onEnd?: () => void) {
  cancelGlide();
  const html = document.documentElement;
  const end = html.scrollHeight - window.innerHeight;
  const from = window.scrollY;
  const distance = Math.min(Math.max(to, 0), end) - from;
  if (Math.abs(distance) < 2) {
    onEnd?.();
    return false;
  }

  const duration = durationFor(distance);
  const start = performance.now();
  html.dataset.gliding = "";

  // Listeners added now don't see the event that started this glide (a
  // wheel or key HomeSnap is handling), only the ones after it. Wheels and
  // keys someone else already handled (HomeSnap swallowing the rest of a
  // gesture) don't count.
  const onInput = (event: Event) => {
    if (!event.defaultPrevented) cancelGlide();
  };
  const onPress = () => cancelGlide();

  finish = () => {
    cancelAnimationFrame(frame);
    finish = null;
    delete html.dataset.gliding;
    window.removeEventListener("pointerdown", onPress);
    window.removeEventListener("touchstart", onPress);
    window.removeEventListener("wheel", onInput);
    window.removeEventListener("keydown", onInput);
    window.dispatchEvent(new Event("glideend"));
    onEnd?.();
  };

  window.addEventListener("pointerdown", onPress, { passive: true });
  window.addEventListener("touchstart", onPress, { passive: true });
  window.addEventListener("wheel", onInput, { passive: true });
  window.addEventListener("keydown", onInput);

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: from + distance * easeInOutCubic(t), behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else finish?.();
  };
  frame = requestAnimationFrame(step);
  return true;
}
