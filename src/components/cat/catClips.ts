export type CatClip = "walk" | "up" | "down" | "pet";

export interface ClipSpec {
  /** Sprite sheet path, relative to /public */
  src: string;
  /** Number of frames in the sheet */
  frames: number;
  /** Cells per row */
  cols: number;
  /** Cell width in px */
  cellW: number;
  /** Cell height in px */
  cellH: number;
  /** Whether the clip repeats or holds its last frame */
  loop: boolean;
  /** Uniform scale applied when drawing, for cross-clip size match */
  scale: number;
  /** Vertical nudge in px so every clip's ground line lands on the same row */
  groundNudge: number;
  /**
   * [start, end] frame range that repeats while a clip is "held" (see
   * CatSpriteHandle.playHeld/release). Only meaningful for clips driven via
   * playHeld — ignored otherwise.
   */
  loopRange?: [number, number];
}

/**
 * All four clips were exported from the same 420x450 canvas at matching
 * zoom/crop, so a single uniform resize keeps them in proportion — no
 * per-clip scale or groundNudge correction needed here.
 */
export const CAT_CLIPS: Record<CatClip, ClipSpec> = {
  walk: { src: "/cat/walk.png", frames: 50, cols: 10, cellW: 408, cellH: 437, loop: true,  scale: 1, groundNudge: 0 },
  up:   { src: "/cat/up.png",   frames: 6,  cols: 3,  cellW: 408, cellH: 437, loop: false, scale: 1, groundNudge: 0 },
  down: { src: "/cat/down.png", frames: 18, cols: 6,  cellW: 408, cellH: 437, loop: false, scale: 1, groundNudge: 0 },
  // Hover reaction: plays in, loops the middle "content" segment while the
  // pointer stays over the cat, and only plays out to the last frame once
  // released (see CatSpriteHandle.playHeld/release).
  pet:  { src: "/cat/pet.png",  frames: 24, cols: 6,  cellW: 408, cellH: 437, loop: false, scale: 1, groundNudge: 0, loopRange: [3, 20] },
};

/** Stage box the clips are composed into. Tallest cell height. */
export const STAGE_W = 408;
export const STAGE_H = 437;

/** Default playback rate, shared by all clips. */
export const DEFAULT_FPS = 16;

/** Source rect of frame n within its sheet. */
export function frameRect(spec: ClipSpec, n: number) {
  return {
    sx: (n % spec.cols) * spec.cellW,
    sy: Math.floor(n / spec.cols) * spec.cellH,
    sw: spec.cellW,
    sh: spec.cellH,
  };
}

/** Destination rect within the stage, applying scale and ground alignment. */
export function destRect(spec: ClipSpec) {
  const dw = spec.cellW * spec.scale;
  const dh = spec.cellH * spec.scale;
  return {
    dx: (STAGE_W - dw) / 2,
    dy: STAGE_H - dh + spec.groundNudge,
    dw,
    dh,
  };
}
