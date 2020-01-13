import * as THREE from 'three'

const easeOutSine = (t, b, c, d) => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b
}

const easeOutQuad = (t, b, c, d) => {
  t /= d
  return -c * t * (t - 2) + b
}

// creates a canvas element when a new instance is created
export class TouchTexture {
  constructor(options) {
    this.size = 64
    this.points = []
    this.radius = this.size * 0.1
    this.width = this.height = this.size
    this.maxAge = 64
    this.last = null

    if (options.debug) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.radius = this.width * 0.1
    }

    this.initTexture()
    if (options.debug) options.mount.append(this.canvas)
  }

  // Initialize our canvas
  initTexture() {
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'WaterTexture'
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.texture = new THREE.Texture(this.canvas)
    this.clear()
  }

  clear() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  addPoint(point) {
    let force = 0
    let vx = 0
    let vy = 0
    const last = this.last

    if (last) {
      const relativeX = point.x - last.x
      const relativeY = point.y - last.y
      // Distance formula
      const distanceSquared = relativeX * relativeX + relativeY * relativeY
      const distance = Math.sqrt(distanceSquared)
      // Calculate Unit Vector
      vx = relativeX / distance
      vy = relativeY / distance

      force = Math.min(distanceSquared * 10000, 1)
    }

    this.last = {
      x: point.x,
      y: point.y
    }
    this.points.push({ x: point.x, y: point.y, age: 0, force, vx, vy })
  }

  update() {
    this.clear()
    let agePart = 1 / this.maxAge

    // maybe convert to for loops
    this.points.forEach((point, i) => {
      let slowAsOlder = 1 - point.age / this.maxAge
      let force = point.force * agePart * slowAsOlder
      point.x += point.vx * force
      point.y += point.vy * force
      point.age += 1
      if (point.age > this.maxAge) {
        this.points.splice(i, 1)
      }
    })

    this.points.forEach(point => {
      this.drawPoint(point)
    })

    this.texture.needsUpdate = true
  }

  drawPoint(point) {
    // Convert normalized position into canvas coordinates
    let pos = {
      x: point.x * this.width,
      y: point.y * this.height
    }
    const radius = this.radius
    const ctx = this.ctx

    let intensity = 1
    if (point.age < this.maxAge * 0.3) {
      intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1)
    } else {
      intensity = easeOutQuad(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1)
    }
    intensity *= point.force

    // Insert data to color channels
    // RG = Unit vector
    let red = ((point.vx + 1) / 2) * 255
    let green = ((point.vy + 1) / 2) * 255
    // B = Unit vector
    let blue = intensity * 255
    let color = `${red}, ${green}, ${blue}`

    let offset = this.width * 5
    // 1. Give the shadow a high offset.
    ctx.shadowOffsetX = offset
    ctx.shadowOffsetY = offset
    ctx.shadowBlur = radius * 1
    ctx.shadowColor = `rgba(${color},${0.2 * intensity})`

    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255,0,0,1)'
    // 2. Move the circle to the other direction of the offset
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }
}
