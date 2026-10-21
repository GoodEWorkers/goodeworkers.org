// Seeded drawing toolkit: pure functions, no DOM, no dependencies. The same seed always draws the same picture.

export type Rand = () => number; // uniform in [0, 1)
export type Pt = [number, number];

const TAU = Math.PI * 2;
const round = (n: number) => Math.round(n * 100) / 100; // 2 decimals, trailing zeros dropped

/**
 * FNV-1a hash of the text (h = (h ^ char) * 16777619), spread by the murmur3 finalizer (without it, texts that differ by
 * one character draw near-identical first values), then an xorshift32 stream (s ^= s << 13; s ^= s >>> 17; s ^= s << 5).
 */
export function seedFrom(text: string): Rand {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
  let s = h || 1; // xorshift32 is stuck at 0
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

/** Triangular distribution: inverse CDF of one uniform draw u, with d = max - min and c = (typical - min) / d. */
export function rndtri(rand: Rand, min: number, typical: number, max: number): number {
  const d = max - min, u = rand(), c = (typical - min) / d;
  return u < c ? min + Math.sqrt(u * d * (typical - min)) : max - Math.sqrt((1 - u) * d * (max - typical));
}

/** One element of the list, uniformly. */
export function pick<T>(rand: Rand, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length)];
}

/**
 * 1D value noise in [-1, 1]. Each octave is a lattice of 256 seeded values in [-1, 1] (wrapping), read with cosine
 * interpolation t = (1 - cos(pi f)) / 2; octave k runs at 2^k times the frequency and 2^-k the amplitude, and the sum is
 * divided by the total amplitude, so it can never leave [-1, 1]. x is in lattice cells (any real number); octaves >= 1.
 */
export function noise1(rand: Rand, octaves = 3): (x: number) => number {
  const lattice = Array.from({ length: octaves }, () => Array.from({ length: 256 }, () => rand() * 2 - 1));
  return (x) => {
    let sum = 0, norm = 0;
    for (let o = 0; o < octaves; o++) {
      const amp = 2 ** -o, p = x * 2 ** o, i = Math.floor(p);
      const a = lattice[o][i & 255], b = lattice[o][(i + 1) & 255];
      sum += amp * (a + ((b - a) * (1 - Math.cos((p - i) * Math.PI))) / 2);
      norm += amp;
    }
    return sum / norm;
  };
}

/** Moves every point by up to +-amp on each axis (amp in the points' unit). */
export function jitter(points: Pt[], rand: Rand, amp: number): Pt[] {
  return points.map(([x, y]) => [x + (rand() * 2 - 1) * amp, y + (rand() * 2 - 1) * amp]);
}

/**
 * A hand-drawn ellipse, counter-clockwise on screen: random start angle (`start`, in radians, fixes it), `turns` of sweep
 * (the extra 0.12 retraces the start, a little off), radius scaled by 1 + rough * noise (about 3 lobes per turn), and in the
 * last 8% of the path a quadratic ease-out of up to 2-3% so the pen lifts. `steps` is the number of segments. `power` is
 * the superellipse exponent, |x/rx|^power + |y/ry|^power = 1: 2 is the ellipse, more squares the corners the way a pen
 * rounds a wide word (an ellipse as wide as a word cuts through its first and last letters).
 */
export function loop(
  cx: number, cy: number, rx: number, ry: number, rand: Rand,
  opts: { turns?: number; rough?: number; steps?: number; start?: number; power?: number } = {},
): Pt[] {
  const { turns = 1.12, rough = 0.035, steps = 48, power = 2 } = opts;
  const start = opts.start ?? rand() * TAU;
  const wobble = noise1(rand);
  const lift = 0.02 + rand() * 0.01;
  const square = (c: number) => Math.sign(c) * Math.abs(c) ** (2 / power); // c itself at power 2
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const a = start - t * turns * TAU;
    const out = Math.max(0, (t - 0.92) / 0.08); // 0 until the last 8%, then up to 1
    const k = 1 + rough * wobble(t * turns * 3) + lift * out * out;
    return [cx + rx * k * square(Math.cos(a)), cy + ry * k * square(Math.sin(a))];
  });
}

/** "M x y L x y ..." with 2-decimal numbers, plus Z when closed. */
export function polylineD(points: Pt[], close = false): string {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${round(x)} ${round(y)}`).join(' ') + (close ? ' Z' : '');
}

/**
 * Shan-shui brush: each point moves along the path's normal by w(t) = width * sin(pi t)^taper * (1 + rough * noise),
 * t = index / last, to both sides; the outline (one side out, the other back) is a closed shape to fill. Both ends
 * have w = 0, so the stroke pinches to a point there. shortcut: a corner sharper than the width folds the inner edge
 * over itself (fine under the default nonzero fill); feed it gentle curves, or add miter joins when that shows.
 */
export function penD(points: Pt[], rand: Rand, opts: { width?: number; taper?: number; rough?: number } = {}): string {
  const { width = 3, taper = 1, rough = 0.3 } = opts;
  const n = points.length;
  if (n < 2) return '';
  const wobble = noise1(rand, 2);
  const side: Pt[] = [], back: Pt[] = [];
  points.forEach(([x, y], i) => {
    const t = i / (n - 1);
    const [ax, ay] = points[Math.max(i - 1, 0)], [bx, by] = points[Math.min(i + 1, n - 1)]; // tangent from the neighbours
    const w = width * Math.sin(Math.PI * t) ** taper * (1 + rough * wobble(t * 5));
    const len = Math.hypot(bx - ax, by - ay) || 1;
    const nx = (-(by - ay) / len) * w, ny = ((bx - ax) / len) * w; // unit normal times w
    side.push([x + nx, y + ny]);
    back.push([x - nx, y - ny]);
  });
  return polylineD([...side, ...back.reverse()], true);
}

/** Catmull-Rom spline through the points as cubic beziers: control points p1 + (p2 - p0) / 6 and p2 - (p3 - p1) / 6. */
export function smoothD(points: Pt[]): string {
  const at = (i: number) => points[Math.min(Math.max(i, 0), points.length - 1)];
  let d = polylineD(points.slice(0, 1)); // "M x y" (empty for no points)
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${[...c1, ...c2, ...p2].map(round).join(' ')}`;
  }
  return d;
}
