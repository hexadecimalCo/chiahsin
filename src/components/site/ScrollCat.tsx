"use client";

import { useEffect, useRef, useState } from "react";

// public/cat/down.gif's total animation length (41 frames, see file for per-frame
// delays) — used to know when the landing animation has finished playing so we
// can switch back to walk.gif. Keep in sync if the gif is ever re-exported.
const DOWN_GIF_DURATION_MS = 1640;
const SCROLL_STOP_DELAY_MS = 150;
const WALK_SPEED_PX_PER_SEC = 40;

type CatState = "idle" | "jumping-up" | "suspended" | "landing";

export function ScrollCat() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const stateRef = useRef<CatState>("idle");
  const playTokenRef = useRef(0);
  const [state, setState] = useState<CatState>("idle");
  const [playToken, setPlayToken] = useState(0);

  const xRef = useRef(0);
  const dirRef = useRef(1);
  const lastTsRef = useRef<number | null>(null);

  const lastScrollYRef = useRef(0);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const landingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function transition(next: CatState) {
    stateRef.current = next;
    setState(next);
  }

  function bumpPlayToken() {
    playTokenRef.current += 1;
    setPlayToken(playTokenRef.current);
  }

  // Walking patrol: bounces the cat back and forth across the viewport width,
  // flipping to face the direction it's walking. Only advances while idle.
  useEffect(() => {
    let raf = requestAnimationFrame(step);

    function step(ts: number) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (stateRef.current === "idle" && wrapRef.current && imgRef.current) {
        const maxX = window.innerWidth - imgRef.current.offsetWidth;
        xRef.current += dirRef.current * WALK_SPEED_PX_PER_SEC * dt;
        if (xRef.current >= maxX) {
          xRef.current = maxX;
          dirRef.current = -1;
        } else if (xRef.current <= 0) {
          xRef.current = 0;
          dirRef.current = 1;
        }
        // walk.gif's native art faces left, so moving right (dir=1) needs a flip.
        wrapRef.current.style.transform = `translateX(${xRef.current}px) scaleX(${-dirRef.current})`;
      }

      raf = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll reactions: jump on scroll-up, hang suspended on scroll-down, and
  // only play the falling/landing animation once scrolling actually stops.
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    function enterLanding() {
      bumpPlayToken();
      transition("landing");
      if (landingTimerRef.current) clearTimeout(landingTimerRef.current);
      landingTimerRef.current = setTimeout(() => {
        transition("idle");
      }, DOWN_GIF_DURATION_MS + 80);
    }

    function onScroll() {
      const y = window.scrollY;
      const direction = y > lastScrollYRef.current ? "down" : y < lastScrollYRef.current ? "up" : null;
      lastScrollYRef.current = y;

      if (stateRef.current === "landing") {
        // Let the fall/land animation finish undisturbed once it's started.
        return;
      }

      if (stateRef.current === "idle") {
        if (direction === "up") {
          bumpPlayToken();
          transition("jumping-up");
        } else if (direction === "down") {
          transition("suspended");
        }
      }

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      scrollStopTimerRef.current = setTimeout(() => {
        if (stateRef.current === "jumping-up" || stateRef.current === "suspended") {
          enterLanding();
        }
      }, SCROLL_STOP_DELAY_MS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      if (landingTimerRef.current) clearTimeout(landingTimerRef.current);
    };
  }, []);

  const src =
    state === "idle"
      ? "/cat/walk.gif"
      : state === "jumping-up"
        ? `/cat/up.gif?t=${playToken}`
        : state === "suspended"
          ? "/cat/down-frame0.png"
          : `/cat/down.gif?t=${playToken}`;

  // Jump/fall poses read better bigger than the idle walk cycle.
  const heightClass = state === "idle" ? "h-[90px]" : "h-[135px]";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 z-30 will-change-transform"
    >
      {/* Animated GIF sprite — next/image would strip the animation. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt="" className={`block w-auto ${heightClass}`} draggable={false} />
    </div>
  );
}
