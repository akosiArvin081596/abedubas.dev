"use client";

import { useEffect, useRef } from "react";

type NetworkInformation = { saveData?: boolean };

// sessionStorage key for the visitor's pause choice.
const PAUSED_KEY = "hero-video-paused";

// Behind the hero: a looping circuit-board video at low opacity, under a
// theme-aware scrim and the blueprint grid (styles in motion/home.css).
// Render it as the hero section's last child. Its layers sit at -z-10, so
// they paint behind the hero, and the pause button comes last in tab order.
//
// The video never autoplays. Playback starts once the browser is idle, and
// only with `.motion` on and Save-Data off. It pauses while the hero is off
// screen or the tab is hidden. The button pauses it for good, and its icon
// swaps in CSS off data-state, which is set through a ref. If no source can
// play, the video hides and the plain backdrop stays.
export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const button = buttonRef.current;
    if (!root || !video || !button) return;

    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    if (
      !document.documentElement.classList.contains("motion") ||
      connection?.saveData
    ) {
      return;
    }

    let started = false;
    let failed = false;
    let userPaused = false;
    let onScreen = false;

    const showState = (paused: boolean) => {
      button.dataset.state = paused ? "paused" : "playing";
      button.setAttribute("aria-pressed", String(paused));
    };

    const fail = () => {
      failed = true;
      video.pause();
      root.dataset.video = "failed";
      delete button.dataset.state;
    };

    const sync = () => {
      if (!started || failed) return;
      const shouldPlay = !userPaused && onScreen && !document.hidden;
      if (shouldPlay && video.paused) {
        video.play().catch((error: DOMException) => {
          // A pause() before playback began. Nothing to do.
          if (error.name === "AbortError") return;
          // Autoplay was refused, so offer the button to start it instead.
          if (error.name === "NotAllowedError") {
            userPaused = true;
            showState(true);
            return;
          }
          fail();
        });
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    };

    // <source> errors don't bubble, so listen in the capture phase. Give up
    // once every source has failed, or the media itself errors.
    const onError = () => {
      if (
        video.error ||
        video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE
      ) {
        fail();
      }
    };

    const onToggle = () => {
      userPaused = !userPaused;
      // Remember the choice for the rest of the visit, so coming back to
      // the home page doesn't restart a video the visitor stopped.
      try {
        sessionStorage.setItem(PAUSED_KEY, userPaused ? "1" : "0");
      } catch {
        // Storage is off; the choice just won't outlive this page.
      }
      showState(userPaused);
      sync();
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });

    const start = () => {
      started = true;
      video.muted = true;
      try {
        userPaused = sessionStorage.getItem(PAUSED_KEY) === "1";
      } catch {
        userPaused = false;
      }
      showState(userPaused);
      sync();
    };

    video.addEventListener("error", onError, true);
    button.addEventListener("click", onToggle);
    document.addEventListener("visibilitychange", sync);
    io.observe(root);

    // Safari has no requestIdleCallback.
    let idle = 0;
    let timer = 0;
    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(start, { timeout: 2500 });
    } else {
      timer = window.setTimeout(start, 1500);
    }

    return () => {
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      button.removeEventListener("click", onToggle);
      video.removeEventListener("error", onError, true);
      video.pause();
    };
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        aria-hidden="true"
        className="hero-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background"
      >
        <video
          ref={videoRef}
          aria-hidden="true"
          className="hero-video absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster="/media/hero-poster.webp"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source
            media="(max-width: 767px)"
            src="/media/hero-loop-720.mp4"
            type="video/mp4"
          />
          <source src="/media/hero-loop.webm" type="video/webm" />
          <source src="/media/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim absolute inset-0" />
        <div className="hero-grid bg-grid absolute inset-0" />
      </div>

      <button
        ref={buttonRef}
        type="button"
        aria-label="Pause background video"
        aria-pressed="false"
        className="group absolute bottom-4 right-4 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary data-[state]:inline-flex"
      >
        {/* Pause while playing, play while paused */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 group-data-[state=paused]:hidden"
        >
          <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="hidden h-4 w-4 group-data-[state=paused]:block"
        >
          <path d="M7.5 5.14v13.72a1 1 0 0 0 1.5.86l10-6.86a1 1 0 0 0 0-1.72l-10-6.86a1 1 0 0 0-1.5.86Z" />
        </svg>
      </button>
    </>
  );
}
