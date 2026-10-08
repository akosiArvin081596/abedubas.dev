"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PHOTO = "/images/profile_picture.jpg";

type NetworkInformation = { saveData?: boolean };

interface HeroPortraitProps {
  /** A clip that starts and ends on the photo's pose. Plays once after the
   *  hero's entrance, holds its last frame, and replays on hover. */
  video?: { webm: string; mp4: string };
}

// The hero's profile photo inside its gradient ring. With `video`, a clip
// plays in the same circle once the hero's entrance animations finish (a
// promise on the animations, so it waits out the route curtain too). It shows
// only once it's playing, and without `.motion` it stays hidden.
export function HeroPortrait({ video }: HeroPortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const clip = clipRef.current;
    if (!frame || !clip) return;

    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    if (
      !document.documentElement.classList.contains("motion") ||
      connection?.saveData
    ) {
      return;
    }

    let active = true;

    const play = () => {
      if (!active) return;
      clip.muted = true;
      clip.currentTime = 0;
      clip
        .play()
        .then(() => {
          if (active) frame.dataset.clip = "on";
        })
        .catch(() => {
          // Refused or interrupted. The photo stays, which is fine.
        });
    };

    // Replay on hover once it has finished.
    const replay = () => {
      if (frame.dataset.clip === "on" && clip.ended) play();
    };

    // <source> errors don't bubble, so listen in the capture phase.
    const onError = () => {
      if (clip.error || clip.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        active = false;
        delete frame.dataset.clip;
      }
    };

    // Wait for the hero's entrance (every finite animation in its reveal
    // container), then play. Infinite decoration like the ring is skipped.
    const hero = frame.closest<HTMLElement>("[data-reveal]") ?? frame;
    const entrance = hero
      .getAnimations({ subtree: true })
      .filter(
        (animation) =>
          animation.effect?.getComputedTiming().endTime !== Infinity,
      )
      .map((animation) => animation.finished);
    Promise.all(entrance).then(play, play);

    frame.addEventListener("pointerenter", replay);
    clip.addEventListener("error", onError, true);

    return () => {
      active = false;
      frame.removeEventListener("pointerenter", replay);
      clip.removeEventListener("error", onError, true);
      clip.pause();
    };
  }, []);

  return (
    <div className="relative flex-shrink-0">
      {/* Decorative ring */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-20 blur-xl motion-safe:animate-pulse"
      />
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] motion-safe:animate-[gradient_8s_linear_infinite]"
      />
      {/* Image container */}
      <div
        ref={frameRef}
        className="boot-portrait group/photo relative h-56 w-56 overflow-hidden rounded-full border-4 border-background shadow-2xl sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-64 xl:w-64 2xl:h-72 2xl:w-72"
      >
        <Image
          src={PHOTO}
          alt="Arvin Baghari Edubas"
          fill
          sizes="(min-width: 1536px) 280px, (min-width: 1280px) 248px, (min-width: 1024px) 280px, (min-width: 640px) 248px, 216px"
          className="object-cover transition-transform duration-500 hover:scale-110"
          preload
        />
        {video && (
          <video
            ref={clipRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,scale] duration-500 group-hover/photo:scale-110 group-data-[clip=on]/photo:opacity-100"
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={video.webm} type="video/webm" />
            <source src={video.mp4} type="video/mp4" />
          </video>
        )}
        {/* The boot effect's colored pass. Parked out of view otherwise. */}
        <span
          aria-hidden="true"
          className="boot-panel pointer-events-none absolute inset-0 bg-gradient-to-br from-primary to-accent"
        />
      </div>
    </div>
  );
}
