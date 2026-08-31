export type CatClip = "walk" | "up" | "down" | "up2" | "down2";

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
}

/**
 * The three clips were exported from separate GIFs at slightly different zooms
 * and with different amounts of empty space under the ground shadow, so each
 * carries its own scale and groundNudge. These values are approved — changing
 * them makes the cat jump or float between clips.
 */
export const CAT_CLIPS: Record<CatClip, ClipSpec> = {
  walk: { src: "/cat/walk.png", frames: 36, cols: 6, cellW: 204, cellH: 276, loop: true,  scale: 1, groundNudge: 0  },
  up:   { src: "/cat/up.png",   frames: 17, cols: 5, cellW: 204, cellH: 355, loop: false, scale: 1, groundNudge: 25 },
  down: { src: "/cat/down.png", frames: 41, cols: 7, cellW: 204, cellH: 355, loop: false, scale: 1, groundNudge: 27 },
  // Second jump/land variant (own GIF source, own crop). Randomly alternated
  // with up/down at the trigger site — scale/groundNudge tuned separately so
  // it matches the same on-stage character size.
  up2:   { src: "/cat/up2.png",   frames: 15, cols: 5, cellW: 204, cellH: 245, loop: false, scale: 1.3, groundNudge: 25 },
  down2: { src: "/cat/down2.png", frames: 18, cols: 6, cellW: 204, cellH: 249, loop: false, scale: 1.3, groundNudge: 27 },
};

/** Stage box the clips are composed into. Tallest cell height. */
export const STAGE_W = 204;
export const STAGE_H = 355;

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
