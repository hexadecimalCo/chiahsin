"use client";

import { useEffect, useRef, useState } from "react";
import CatSprite, { type CatSpriteHandle } from "@/components/cat/CatSprite";
import { DEFAULT_FPS, type CatClip } from "@/components/cat/catClips";

const ARTIST_URL = "https://www.instagram.com/ojisanhara/";
const SCROLL_STOP_DELAY_MS = 50;
const WALK_SPEED_PX_PER_SEC = 40;
const SPRITE_WIDTH = 90;
const JUMP_FALL_FPS = DEFAULT_FPS * 3;
// Chance of picking the newer up2/down2 pair over the original up/down pair.
const VARIANT_2_PROBABILITY = 0.66;

type CatState = "idle" | "jumping-up" | "suspended";

export function ScrollCat() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<CatSpriteHandle | null>(null);
  const stateRef = useRef<CatState>("idle");
  const [, bumpRender] = useState(0);

  const xRef = useRef(0);
  const dirRef = useRef(1);
  const lastTsRef = useRef<number | null>(null);

  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Which jump/land pair (1 = up/down, 2 = up2/down2) this hop is using —
  // picked once when the hop starts, kept for the matching fall/land clip.
  const variantRef = useRef<1 | 2>(1);

  function transition(next: CatState) {
    stateRef.current = next;
    bumpRender((n) => n + 1);
  }

  // Walking patrol: bounces the cat back and forth across the viewport width,
  // flipping to face the direction it's walking. Only advances while idle.
  useEffect(() => {
    let raf = requestAnimationFrame(step);

    function step(ts: number) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (stateRef.current === "idle" && wrapRef.current) {
        const maxX = window.innerWidth - SPRITE_WIDTH;
        xRef.current += dirRef.current * WALK_SPEED_PX_PER_SEC * dt;
        if (xRef.current >= maxX) {
          xRef.current = maxX;
          dirRef.current = -1;
        } else if (xRef.current <= 0) {
          xRef.current = 0;
          dirRef.current = 1;
        }
        // The artwork's native pose faces left, so moving right (dir=1) needs a flip.
        wrapRef.current.style.transform = `translateX(${xRef.current}px) scaleX(${-dirRef.current})`;
      }

      raf = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll reactions: jump on scroll-up, hang suspended on scroll-down, and
  // only play the falling/landing clip once scrolling actually stops. "down"
  // already contains its own recovery + walk-off, so it hands back to "walk"
  // on its own once queued. Jump/fall play at double speed; walk stays at the
  // sheet's normal pace.
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    function settle() {
      const handle = handleRef.current;
      if (!handle) return;
      const downClip: CatClip = variantRef.current === 2 ? "down2" : "down";
      handle.setFps(JUMP_FALL_FPS);
      handle.sequence([downClip, "walk"]);
    }

    function onScroll() {
      const y = window.scrollY;
      const direction = y > lastScrollYRef.current ? "down" : y < lastScrollYRef.current ? "up" : null;
      lastScrollYRef.current = y;
      const handle = handleRef.current;

      if (handle && stateRef.current === "idle") {
        variantRef.current = Math.random() < VARIANT_2_PROBABILITY ? 2 : 1;
        const upClip: CatClip = variantRef.current === 2 ? "up2" : "up";
        const downClip: CatClip = variantRef.current === 2 ? "down2" : "down";

        if (direction === "up") {
          transition("jumping-up");
          handle.setFps(JUMP_FALL_FPS);
          handle.play(upClip);
        } else if (direction === "down") {
          transition("suspended");
          handle.setFps(JUMP_FALL_FPS);
          handle.play(downClip);
          handle.goto(0);
        }
      }

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      scrollStopTimerRef.current = setTimeout(() => {
        if (stateRef.current === "jumping-up" || stateRef.current === "suspended") {
          settle();
        }
      }, SCROLL_STOP_DELAY_MS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, []);

  function handleClipEnd(clip: CatClip) {
    // Fires when "down"/"down2" hands off to the queued "walk" — restore
    // normal speed and resume patrolling.
    if (clip === "down" || clip === "down2") {
      handleRef.current?.setFps(DEFAULT_FPS);
      transition("idle");
    }
  }

  return (
    <div ref={wrapRef} className="fixed bottom-0 left-0 z-30 will-change-transform">
      <a
        href={ARTIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="貓咪插畫原作者 Instagram"
        className="block"
      >
        <CatSprite
          width={SPRITE_WIDTH}
          onHandle={(h) => (handleRef.current = h)}
          onClipEnd={handleClipEnd}
          className="block"
        />
      </a>
    </div>
  );
}
