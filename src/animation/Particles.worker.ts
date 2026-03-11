/// <reference lib="webworker" />

import { createNoise4D, type NoiseFunction4D } from 'simplex-noise'
import { Attributes } from './Attributes'
import { fadeInOut, angle, lerp, dist, rand } from './utils'

type ParticlesColorMessage = {
  type: 'color'
  primary: [number, number, number]
  secondary: [number, number, number]
}
type ParticlesStartMessage = {
  type: 'start'
  canvas: OffscreenCanvas
  count: number
  size: [number, number]
  colors: ParticlesColorMessage
  delay?: number
}
type ParticlesResizeMessage = {
  type: 'resize'
  width: number
  height: number
}
type ParticlesShiftMessage = {
  type: 'shift'
  direction: 'up' | 'down' | 'left' | 'right'
}
type ParticlesStopMessage = {
  type: 'stop'
}

type MouseEnterMessage = {
  type: 'mouseenter'
  x: number
  y: number
}
type MouseMoveMessage = {
  type: 'mousemove'
  x: number
  y: number
}
type MouseLeaveMessage = {
  type: 'mouseleave'
}

type ParticlesMessage =
  | ParticlesColorMessage
  | ParticlesStartMessage
  | ParticlesResizeMessage
  | ParticlesShiftMessage
  | ParticlesStopMessage
  | MouseEnterMessage
  | MouseMoveMessage
  | MouseLeaveMessage

export class Particles {
  mouseEntered = false

  readonly count: number

  private ctx: OffscreenCanvasRenderingContext2D
  private buffer: OffscreenCanvasRenderingContext2D
  private values: Attributes
  private noise4D: NoiseFunction4D
  private tick: number = 0
  private frameId: number = -1
  private globalMovement: [number, number] = [0, 0]
  private mouse: [number, number] = [0, 0]
  private repelTarget: [number, number] = [0, 0]
  private renderPadding = 100
  private repelThreshold = 200
  private $animate: () => void
  private primaryColor: [number, number, number] = [0, 0, 0]
  private secondaryColor: [number, number, number] = [0, 0, 0]

  constructor(canvas: OffscreenCanvas, count: number) {
    this.ctx = canvas.getContext('2d')!
    this.buffer = new OffscreenCanvas(
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    ).getContext('2d')!
    this.noise4D = createNoise4D()
    this.count = count
    this.values = new Attributes(count, [
      'x',
      'y',
      'r',
      'vx',
      'vy',
      'mv',
      'h',
      's',
      'l',
      't',
      'd',
    ])

    this.$animate = this.animate.bind(this)
  }

  get canvasSize(): [number, number] {
    return [this.ctx.canvas.width, this.ctx.canvas.height]
  }

  get isRunning() {
    return this.frameId !== -1
  }

  setPrimaryColor(color: [number, number, number]) {
    this.primaryColor = color
  }

  setSecondaryColor(color: [number, number, number]) {
    this.secondaryColor = color
  }

  shiftUp() {
    this.globalMovement = [0, -20]
  }

  shiftDown() {
    this.globalMovement = [0, 20]
  }

  shiftLeft() {
    this.globalMovement = [-20, 0]
  }

  shiftRight() {
    this.globalMovement = [20, 0]
  }

  reset() {
    this.values.map(() => this.getParticle())
  }

  getParticle() {
    const isPrimary = !!Math.round(rand(2))

    const [h, s, l] = (isPrimary ? this.primaryColor : this.secondaryColor) as [
      number,
      number,
      number,
    ]

    const [width, height] = this.canvasSize

    const r = 2 + rand(6)

    return [
      -this.renderPadding + rand(width + this.renderPadding * 2), // x
      height * 0.5 + (150 - rand(300)), // y
      r,
      0, // vx
      0, // vy
      r * 2, // mv
      h,
      s,
      l,
      0, // t
      300 + rand(1200), // d
    ]
  }

  private composite(filters: string[]) {
    this.ctx.save()
    for (const filter of filters) {
      this.ctx.filter = filter
      this.ctx.drawImage(this.buffer.canvas, 0, 0, ...this.canvasSize)
    }
    this.ctx.restore()
  }

  private animate() {
    this.frameId = requestAnimationFrame(this.$animate)

    this.tick++

    try {
      const [width, height] = this.canvasSize

      let [gx, gy] = this.globalMovement

      this.ctx.clearRect(0, 0, width, height)
      this.buffer.clearRect(0, 0, width, height)

      if (this.mouseEntered) {
        this.repelTarget[0] = lerp(this.repelTarget[0], this.mouse[0], 0.05)
        this.repelTarget[1] = lerp(this.repelTarget[1], this.mouse[1], 0.05)
      }

      this.values.map(([x, y, r, vx, vy, mv, h, s, l, t, d]) => {
        // reset if out of render bounds
        if (
          x! > width + this.renderPadding ||
          x! < -this.renderPadding ||
          y! < -this.renderPadding ||
          y! > height + this.renderPadding ||
          t!++ > d!
        ) {
          return this.getParticle()
        }

        // draw the circle
        this.buffer.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${fadeInOut(t!, d!) * 0.75})`
        this.buffer.beginPath()
        this.buffer.arc(x!, y!, r!, 0, 2 * Math.PI)
        this.buffer.closePath()
        this.buffer.stroke()

        // noise value for particle position converted to radians
        // x, y, and tick are scaled down arbitrarily for wider movement paths
        const n =
          this.noise4D(
            x! * 0.0005,
            y! * 0.0005,
            r! * 0.05,
            this.tick * 0.00025,
          ) *
          Math.PI *
          2

        // interpolate the current velocity to the computed velocity
        vx = lerp(vx!, Math.cos(n) * mv! + r! * gx, 0.025)
        vy = lerp(vy!, Math.sin(n) * mv! + r! * gy, 0.025)

        const dp = dist(x!, y!, ...this.repelTarget)

        if (this.mouseEntered && dp < this.repelThreshold) {
          const mvn = (1 - dp / this.repelThreshold) * mv!
          const theta = angle(x!, y!, ...this.repelTarget)
          // interpolate velocity away from user position
          vx = lerp(vx!, vx! - Math.cos(theta) * mvn, 0.5)
          vy = lerp(vy!, vy! - Math.sin(theta) * mvn, 0.5)
        }

        // interpolate the the current position to the updated position + velocity
        x = lerp(x!, x! + vx, 0.015)
        y = lerp(y!, y! + vy, 0.015)

        return [x!, y!, r!, vx!, vy!, mv!, h!, s!, l!, t!, d!]
      })

      gx = lerp(gx, 0, 0.02)
      gy = lerp(gy, 0, 0.02)

      this.globalMovement = [gx, gy]

      this.composite(['blur(3px)', 'blur(6px) brightness(150%)', 'lighter'])
    } catch (e) {
      console.error(e)

      this.stop()
    }
  }

  mouseenter(x: number, y: number) {
    this.mouseEntered = true
    this.repelTarget = [x, y]
    this.mouse = [x, y]
  }

  mousemove(x: number, y: number) {
    this.mouse = [x, y]
  }

  resize(width: number, height: number) {
    this.buffer.canvas.height = height
    this.buffer.canvas.width = width

    this.ctx.canvas.height = height
    this.ctx.canvas.width = width
  }

  start() {
    if (!this.isRunning) {
      this.reset()
      this.$animate()
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)

    this.frameId = -1
  }

  destroy() {
    this.stop()
  }
}

let particles: Particles

const start = ({
  canvas,
  count,
  colors,
  size,
  delay = 0,
}: ParticlesStartMessage) => {
  particles = new Particles(canvas, count)
  particles.resize(...size)
  particles.setPrimaryColor(colors.primary)
  particles.setSecondaryColor(colors.secondary)

  setTimeout(() => {
    particles.start()
  }, delay)
}

const setColors = ({ primary, secondary }: ParticlesColorMessage) => {
  particles.setPrimaryColor(primary)
  particles.setSecondaryColor(secondary)
}

const resize = ({ width, height }: ParticlesResizeMessage) => {
  particles.resize(width, height)
}

const shift = ({ direction }: ParticlesShiftMessage) => {
  switch (direction) {
    case 'up':
      particles.shiftUp()
      break
    case 'down':
      particles.shiftDown()
      break
    case 'left':
      particles.shiftLeft()
      break
    case 'right':
      particles.shiftRight()
      break
    default:
      break
  }
}

addEventListener('message', (e: MessageEvent<ParticlesMessage>) => {
  if (e.data.type === 'start') {
    start(e.data)
  }
  if (e.data.type === 'color') {
    setColors(e.data)
  }
  if (e.data.type === 'resize') {
    resize(e.data)
  }
  if (e.data.type === 'shift') {
    shift(e.data)
  }
  if (e.data.type === 'stop') {
    particles.stop()
  }
  if (e.data.type === 'mouseenter') {
    particles.mouseenter(e.data.x, e.data.y)
  }
  if (e.data.type === 'mousemove') {
    particles.mousemove(e.data.x, e.data.y)
  }
  if (e.data.type === 'mouseleave') {
    particles.mouseEntered = false
  }
})
