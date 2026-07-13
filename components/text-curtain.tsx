'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  px: number
  py: number
  homeX: number
  homeY: number
  char: string
  alpha: number
  visible: boolean
}

type Props = {
  charPool: string
  className?: string
  color?: string
}

const COL_SPACING = 13
const ROW_SPACING = 14
const FONT_SIZE = 11
const MOUSE_RADIUS = 110
const DAMPING = 0.93
const HOME_STIFFNESS = 0.02
const CONSTRAINT_ITERATIONS = 3

/**
 * A curtain of characters hanging from the top edge.
 * Each column is a verlet chain pinned at the top; the cursor
 * parts the strands like fabric and they sway back into place.
 */
export function TextCurtain({ charPool, className, color = '#4a3a28' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let columns: Node[][] = []
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let running = true
    let time = 0

    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false }

    function rand(seed: number) {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
      return x - Math.floor(x)
    }

    function build() {
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)

      const colCount = Math.max(1, Math.floor(width / COL_SPACING))
      const rowCount = Math.max(1, Math.floor(height / ROW_SPACING))
      const xOffset = (width - (colCount - 1) * COL_SPACING) / 2

      columns = []
      for (let c = 0; c < colCount; c++) {
        const chain: Node[] = []
        const colX = xOffset + c * COL_SPACING
        // organic ragged bottom edge per column
        const lengthJitter = 0.72 + rand(c * 7.3) * 0.28
        const colRows = Math.max(3, Math.floor(rowCount * lengthJitter))
        for (let r = 0; r < colRows; r++) {
          const seed = c * 131 + r * 17
          const homeX = colX + (rand(seed + 3) - 0.5) * 3
          const homeY = r * ROW_SPACING + 4
          chain.push({
            // start collapsed at the top so the curtain "drops" in
            x: homeX,
            y: 4 + r * 1.5,
            px: homeX,
            py: 4 + r * 1.5,
            homeX,
            homeY,
            char: charPool[Math.floor(rand(seed) * charPool.length)] ?? '文',
            alpha: 0.4 + rand(seed + 1) * 0.55,
            visible: rand(seed + 2) > 0.12,
          })
        }
        columns.push(chain)
      }
    }

    function step() {
      time += 1 / 60
      const r2 = MOUSE_RADIUS * MOUSE_RADIUS

      for (let c = 0; c < columns.length; c++) {
        const chain = columns[c]
        // gentle idle breeze, stronger toward the bottom of each strand
        const breeze = Math.sin(time * 0.7 + c * 0.35) * 0.012

        for (let r = 1; r < chain.length; r++) {
          const n = chain[r]
          const depth = r / chain.length

          // verlet integration
          let vx = (n.x - n.px) * DAMPING
          let vy = (n.y - n.py) * DAMPING
          n.px = n.x
          n.py = n.y

          // spring back to home (curtain wants to hang straight)
          vx += (n.homeX - n.x) * HOME_STIFFNESS
          vy += (n.homeY - n.y) * HOME_STIFFNESS

          // idle sway
          vx += breeze * depth

          // cursor parts the strands
          if (mouse.active) {
            const dx = n.x - mouse.x
            const dy = n.y - mouse.y
            const d2 = dx * dx + dy * dy
            if (d2 < r2 && d2 > 0.01) {
              const d = Math.sqrt(d2)
              const falloff = (1 - d / MOUSE_RADIUS) ** 2
              const push = falloff * 2.6
              vx += (dx / d) * push + mouse.vx * falloff * 0.22
              vy += (dy / d) * push * 0.45 + mouse.vy * falloff * 0.12
            }
          }

          n.x += vx
          n.y += vy
        }

        // chain constraints: keep strand links at rest length, pinned at top
        for (let it = 0; it < CONSTRAINT_ITERATIONS; it++) {
          for (let r = 1; r < chain.length; r++) {
            const a = chain[r - 1]
            const b = chain[r]
            let dx = b.x - a.x
            let dy = b.y - a.y
            let d = Math.sqrt(dx * dx + dy * dy)
            if (d < 0.0001) {
              d = 0.0001
              dx = 0
              dy = 0.0001
            }
            const diff = (d - ROW_SPACING) / d
            if (r === 1) {
              // top link pinned to the roof
              b.x -= dx * diff
              b.y -= dy * diff
            } else {
              const ox = dx * diff * 0.5
              const oy = dy * diff * 0.5
              a.x += ox
              a.y += oy
              b.x -= ox
              b.y -= oy
            }
          }
        }
      }

      // decay mouse velocity so pushes feel like a wake
      mouse.vx *= 0.85
      mouse.vy *= 0.85
    }

    function draw() {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, width, height)
      ctx!.font = `${FONT_SIZE}px serif`
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'

      for (let c = 0; c < columns.length; c++) {
        const chain = columns[c]
        for (let r = 0; r < chain.length; r++) {
          const n = chain[r]
          if (!n.visible) continue

          // fade the strand out toward its ragged bottom edge
          const tail = r / chain.length
          const edgeFade = tail > 0.75 ? 1 - (tail - 0.75) / 0.25 : 1

          let angle = 0
          if (r > 0) {
            const p = chain[r - 1]
            angle = Math.atan2(n.x - p.x, ROW_SPACING) * -0.8
          }

          ctx!.globalAlpha = n.alpha * edgeFade
          if (angle !== 0) {
            ctx!.save()
            ctx!.translate(n.x, n.y)
            ctx!.rotate(angle)
            ctx!.fillStyle = color
            ctx!.fillText(n.char, 0, 0)
            ctx!.restore()
          } else {
            ctx!.fillStyle = color
            ctx!.fillText(n.char, n.x, n.y)
          }
        }
      }
      ctx!.globalAlpha = 1
    }

    function loop() {
      if (!running) return
      step()
      draw()
      raf = requestAnimationFrame(loop)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (mouse.active) {
        mouse.vx = mouse.vx * 0.5 + (x - mouse.x) * 0.5
        mouse.vy = mouse.vy * 0.5 + (y - mouse.y) * 0.5
      }
      mouse.x = x
      mouse.y = y
      mouse.active = true
    }

    function onPointerLeave() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    build()
    loop()

    const ro = new ResizeObserver(() => build())
    ro.observe(canvas)
    // listen on window so strands react even when the cursor is over
    // sibling elements layered above the canvas
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('mouseleave', onPointerLeave)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [charPool, color])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
