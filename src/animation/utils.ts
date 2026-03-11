export const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b

export const fadeInOut = (time: number, value: number) => {
  const half: number = 0.5 * value
  return Math.abs(((time + half) % value) - half) / half
}

export const dist = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

export const angle = (x1: number, y1: number, x2: number, y2: number) =>
  Math.atan2(y2 - y1, x2 - x1)

export const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max)

export const rand = (max: number) => Math.random() * max
