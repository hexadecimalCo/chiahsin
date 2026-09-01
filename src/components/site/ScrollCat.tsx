"use client";

import { useEffect, useRef, useState } from "react";
import CatSprite, { type CatSpriteHandle } from "@/components/cat/CatSprite";
import { DEFAULT_FPS, type CatClip } from "@/components/cat/catClips";

const ARTIST_URL = "https://www.instagram.com/ojisanhara/";
const SCROLL_STOP_DELAY_MS = 50;
const WALK_SPEED_PX_PER_SEC = 40;
const SPRITE_WIDTH = 180;
const JUMP_FALL_FPS = DEFAULT_FPS * 3;
const DRAG_THRESHOLD_PX = 4;

type CatState = "idle" | "jumping-up" | "suspended" | "petting";

type DragSession = {
  pointerId: number;
  startClientX: number;
  startX: number;
  moved: boolean;
};

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

  const dragRef = useRef<DragSession | null>(null);
  const suppressClickRef = useRef(false);

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
  // on its own once queued. Jump/fall play at triple speed; walk stays at the
  // sheet's normal pace. Only fires from "idle" — ignored mid-hop or while
  // being petted.
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    function settle() {
      const handle = handleRef.current;
      if (!handle) return;
      handle.setFps(JUMP_FALL_FPS);
      handle.sequence(["down", "walk"]);
    }

    function onScroll() {
      const y = window.scrollY;
      const direction = y > lastScrollYRef.current ? "down" : y < lastScrollYRef.current ? "up" : null;
      lastScrollYRef.current = y;
      const handle = handleRef.current;

      if (handle && stateRef.current === "idle") {
        if (direction === "up") {
          transition("jumping-up");
          handle.setFps(JUMP_FALL_FPS);
          handle.play("up");
        } else if (direction === "down") {
          transition("suspended");
          handle.setFps(JUMP_FALL_FPS);
          handle.play("down");
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
    // Fires when "down" or "pet" hands off to the queued "walk" — restore
    // normal speed and resume patrolling.
    if (clip === "down" || clip === "pet") {
      handleRef.current?.setFps(DEFAULT_FPS);
      transition("idle");
    }
  }

  // Hover reaction: loop the "content" segment of "pet" while the pointer
  // stays over the cat, then let it play out once the pointer leaves. Only
  // triggers from "idle" so it doesn't interrupt a hop in progress.
  function handlePointerEnter() {
    // Pointer capture keeps a drag's move/up events routed here even once
    // the cursor visually leaves the sprite, but this mouseenter/mouseleave
    // pair fires from real cursor position and would otherwise fight the
    // drag's own state changes.
    if (dragRef.current) return;
    const handle = handleRef.current;
    if (!handle || stateRef.current !== "idle") return;
    transition("petting");
    handle.setFps(DEFAULT_FPS);
    handle.playHeld("pet");
  }

  function handlePointerLeave() {
    if (dragRef.current) return;
    if (stateRef.current !== "petting") return;
    handleRef.current?.release(["walk"]);
  }

  // Drag-to-reposition: click-and-drag (or touch-and-drag) the cat left/right.
  // Reuses the "petting" state/clip rather than adding a new one, since being
  // held is a reasonable stand-in and there's no dedicated drag artwork.
  function handleDragStart(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (stateRef.current !== "idle" && stateRef.current !== "petting") return;
    dragRef.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startX: xRef.current,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleDragMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startClientX;

    if (!drag.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      drag.moved = true;
      // Rebase onto the current position so the drag picks up smoothly even
      // if the idle patrol moved the cat during the pre-threshold window,
      // instead of snapping back to the spot captured at pointerdown.
      drag.startX = xRef.current - dx;
      if (stateRef.current === "idle") {
        transition("petting");
        handleRef.current?.setFps(DEFAULT_FPS);
        handleRef.current?.playHeld("pet");
      }
    }

    const maxX = window.innerWidth - SPRITE_WIDTH;
    const nextX = Math.min(maxX, Math.max(0, drag.startX + dx));
    if (nextX !== xRef.current) {
      dirRef.current = nextX > xRef.current ? 1 : -1;
    }
    xRef.current = nextX;
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translateX(${xRef.current}px) scaleX(${-dirRef.current})`;
    }
  }

  function handleDragEnd(e: React.PointerEvent<HTMLAnchorElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    if (drag.moved) {
      // A drag ended on an <a> still fires a click afterward; swallow the
      // next one so dragging doesn't also navigate to the artist's profile.
      suppressClickRef.current = true;
      if (stateRef.current === "petting") {
        handleRef.current?.release(["walk"]);
      }
    }
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      e.preventDefault();
    }
  }

  return (
    <div ref={wrapRef} className="fixed bottom-0 left-0 z-30 will-change-transform">
      <a
        href={ARTIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="貓咪插畫原作者 Instagram（可拖曳左右移動）"
        className="block cursor-grab touch-none active:cursor-grabbing"
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        onDragStart={(e) => e.preventDefault()}
        onClick={handleClick}
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
