"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CAT_CLIPS,
  DEFAULT_FPS,
  STAGE_H,
  STAGE_W,
  destRect,
  frameRect,
  type CatClip,
} from "./catClips";

export interface CatSpriteHandle {
  play: (clip: CatClip) => void;
  sequence: (clips: CatClip[]) => void;
  stop: () => void;
  goto: (frame: number) => void;
  setFps: (fps: number) => void;
}

export interface CatSpriteProps {
  /** Clip to play on mount. Default "walk". */
  initialClip?: CatClip;
  /** Frames per second, 4–30. Default 16. */
  fps?: number;
  /** Rendered width in CSS px; height follows the 204×355 stage ratio. */
  width?: number;
  /** Called once all three sheets have decoded. */
  onReady?: () => void;
  /** Called when a non-looping clip reaches its last frame. */
  onClipEnd?: (clip: CatClip) => void;
  /** Receives the imperative controls. */
  onHandle?: (handle: CatSpriteHandle) => void;
  className?: string;
}

/**
 * Frame-by-frame sprite player.
 *
 * Each clip is ONE sheet image, fetched and decoded once, after which every
 * frame is a canvas blit. Do not reimplement this by swapping an <img src> per
 * frame — that costs a network request per frame and cannot hold frame rate.
 * Do not use the source GIFs directly either: the browser gives no control over
 * GIF playback, so "up" and "down" would loop forever with no way to seek.
 */
export default function CatSprite({
  initialClip = "walk",
  fps = DEFAULT_FPS,
  width = STAGE_W,
  onReady,
  onClipEnd,
  onHandle,
  className,
}: CatSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sheetsRef = useRef<Partial<Record<CatClip, HTMLImageElement>>>({});
  const clipRef = useRef<CatClip>(initialClip);
  const frameRef = useRef(0);
  const playingRef = useRef(true);
  const fpsRef = useRef(fps);
  const queueRef = useRef<CatClip[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fpsRef.current = fps;
  }, [fps]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const clip = clipRef.current;
    const sheet = sheetsRef.current[clip];
    if (!canvas || !sheet) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const spec = CAT_CLIPS[clip];
    const n = Math.min(frameRef.current, spec.frames - 1);
    const { sx, sy, sw, sh } = frameRect(spec, n);
    const { dx, dy, dw, dh } = destRect(spec);
    ctx.clearRect(0, 0, STAGE_W, STAGE_H);
    ctx.drawImage(sheet, sx, sy, sw, sh, dx, dy, dw, dh);
  }, []);

  // Load all three sheets before starting, so no clip stutters on first play.
  useEffect(() => {
    let cancelled = false;
    let left = Object.keys(CAT_CLIPS).length;
    (Object.keys(CAT_CLIPS) as CatClip[]).forEach((clip) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        sheetsRef.current[clip] = img;
        if (--left === 0) {
          setReady(true);
          onReady?.();
          draw();
        }
      };
      img.src = CAT_CLIPS[clip].src;
    });
    return () => {
      cancelled = true;
    };
  }, [draw, onReady]);

  // One rAF loop, advancing frames on an fps-derived accumulator.
  useEffect(() => {
    if (!ready) return;
    const tick = (t: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const interval = 1000 / Math.max(1, fpsRef.current);
      if (t - lastRef.current < interval) return;
      lastRef.current = t;
      if (!playingRef.current) return;

      const spec = CAT_CLIPS[clipRef.current];
      if (frameRef.current < spec.frames - 1) {
        frameRef.current += 1;
      } else if (queueRef.current.length > 0) {
        onClipEnd?.(clipRef.current);
        clipRef.current = queueRef.current.shift() as CatClip;
        frameRef.current = 0;
      } else if (spec.loop) {
        frameRef.current = 0;
      } else {
        onClipEnd?.(clipRef.current);
        playingRef.current = false;
      }
      draw();
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, draw, onClipEnd]);

  useEffect(() => {
    if (!onHandle) return;
    onHandle({
      play: (clip) => {
        clipRef.current = clip;
        frameRef.current = 0;
        queueRef.current = [];
        playingRef.current = true;
        draw();
      },
      sequence: (clips) => {
        if (clips.length === 0) return;
        const [first, ...rest] = clips;
        clipRef.current = first;
        frameRef.current = 0;
        queueRef.current = rest;
        playingRef.current = true;
        draw();
      },
      stop: () => {
        playingRef.current = false;
      },
      goto: (frame) => {
        const spec = CAT_CLIPS[clipRef.current];
        playingRef.current = false;
        frameRef.current = Math.max(0, Math.min(spec.frames - 1, Math.trunc(frame)));
        draw();
      },
      setFps: (next) => {
        fpsRef.current = Math.max(1, Math.trunc(next));
      },
    });
  }, [draw, onHandle]);

  return (
    <canvas
      ref={canvasRef}
      width={STAGE_W}
      height={STAGE_H}
      className={className}
      style={{ width, height: (width / STAGE_W) * STAGE_H, display: "block" }}
    />
  );
}
