import {
	cos,
	dist,
	fadeInOut,
	rand,
	randRange,
	round,
	sin,
	TAU,
	TO_RAD
} from '@/common/util'

const deflectorCount = 50
const particleCount = 100

let canvas
let ctx
let branchNum
let baseHue
let deflectors
let particles

function setup () {
	canvas = {
		a: document.createElement('canvas'),
		b: document.querySelector('.background-canvas')
	}
	ctx = {
		a: canvas.a.getContext('2d'),
		b: canvas.b.getContext('2d')
	}
	init()
	draw()
}

function init () {
	resize()
	branchNum = round(rand(5)) + 3
	baseHue = rand(360)

	deflectors = []
	for (let i = 0; i < deflectorCount; i++) {
		deflectors.push(getDeflector())
	}

	particles = []
	for (let i = 0; i < particleCount; i++) {
		particles.push(getParticle(i).create())
	}
}

function resize () {
	canvas.a.width = canvas.b.width = window.innerWidth
	canvas.a.height = canvas.b.height = window.innerHeight
}

function getDeflector () {
	return {
		position: {
			x: rand(window.innerWidth),
			y: rand(window.innerHeight)
		},
		threshold: rand(100) + 50
	}
}

function getParticle (i) {
	return {
		create () {
			this.position.x = 0.5 * canvas.a.width + randRange(1)
			this.position.y = 0.5 * canvas.a.height + randRange(1)
			this.speed = rand(1) + 0.5
			this.life = 0
			this.ttl = rand(500) + 200
			this.size = rand(2) + 2
			this.hue = randRange(40) + baseHue
			this.saturation = i / particleCount * 50 + 20
			this.lightness = i / particleCount * 30 + 20
			this.direction = round(randRange(branchNum)) * (360 / branchNum) * TO_RAD
			this.turnRate = round(rand(20)) + 10
			this.changeDirection = false
			return this
		},
		position: {
			x: 0,
			y: 0
		},
		velocity: {
			x: 0,
			y: 0
		},
		update () {
			this.life++
			if (this.changeDirection && this.life % this.turnRate === 0) {
				this.direction += round(randRange(1)) * (360 / branchNum) * TO_RAD
				this.changeDirection = false
			}
			this.position.x += cos(this.direction) * this.speed
			this.position.y += sin(this.direction) * this.speed
			this.destroy = this.life > this.ttl
		},
		draw () {
			this.update()
			ctx.a.beginPath()
			ctx.a.strokeStyle = `hsla(${this.hue},${this.saturation}%,${this.lightness}%,${fadeInOut(this.life, this.ttl) * 0.125})`
			ctx.a.arc(this.position.x, this.position.y, this.size, 0, TAU)
			ctx.a.stroke()
			ctx.a.closePath()
		}
	}
}

let deflector, particle

function draw () {
	let i, j
	for (i = 0; i < particles.length; i++) {
		particle = particles[i]
		for (j = 0; j < deflectors.length; j++) {
			deflector = deflectors[j]
			if (dist(
				particle.position.x,
				particle.position.y,
				deflector.position.x,
				deflector.position.y
			) < deflector.threshold) {
				particle.changeDirection = true
			}
		}

		particle.draw()
		if (particle.destroy) {
			particles.splice(i, 1)
			continue
		}
	}
	if (particles.length) {
		ctx.b.save()
		ctx.b.fillStyle = 'rgb(0,0,0)'
		ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height)
		ctx.b.restore()

		ctx.b.save()
		ctx.b.filter = 'blur(20px)'
		ctx.b.drawImage(canvas.a, 0, 0)
		ctx.b.restore()

		ctx.b.save()
		ctx.b.drawImage(canvas.a, 0, 0)
		ctx.b.restore()
	}
	window.requestAnimationFrame(draw)
}

let resizeTimeout

window.addEventListener('load', setup)
window.addEventListener('resize', () => {
	if (resizeTimeout) {
		clearTimeout(resizeTimeout)
	}
	resizeTimeout = setTimeout(() => {
		resize()
		init()
	}, 50)
})
window.addEventListener('click', init)
