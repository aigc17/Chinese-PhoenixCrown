/**
 * Synthesized brush/rustle sound for the text curtain, built entirely
 * with the Web Audio API — no audio files needed. Each "brush" is a
 * short burst of band-passed noise (fabric swish) topped with a faint
 * high sine partial (beads/chimes), with volume and brightness scaled
 * by how fast the hand moves through the strands.
 */

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noiseBuffer: AudioBuffer | null = null
let lastPlay = 0
let unlocked = false

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext ?? (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.5
    master.connect(ctx.destination)

    // 1s of white noise, reused by every brush
    const len = ctx.sampleRate
    noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  }
  return ctx
}

/**
 * Browsers keep AudioContext suspended until a user gesture.
 * Call this from any pointerdown/click handler.
 */
export function unlockCurtainAudio() {
  const c = ensureContext()
  if (!c) return
  if (c.state === 'suspended') {
    c.resume().then(() => {
      unlocked = true
    })
  } else {
    unlocked = true
  }
}

/**
 * Play one brush stroke. `intensity` 0..1 maps hand speed to volume
 * and brightness. Throttled internally so rapid pointermove events
 * blend into a continuous rustle instead of machine-gunning bursts.
 */
export function playCurtainBrush(intensity: number) {
  const c = ensureContext()
  if (!c || !master || !noiseBuffer) return
  if (c.state === 'suspended') {
    // try to resume — succeeds once the page has had any user activation
    c.resume()
    if (!unlocked) return
  }

  const now = performance.now()
  if (now - lastPlay < 70) return
  lastPlay = now

  const t = c.currentTime
  const amp = 0.04 + Math.min(1, intensity) * 0.14

  // fabric swish: band-passed noise with a quick attack and soft tail
  const src = c.createBufferSource()
  src.buffer = noiseBuffer
  src.playbackRate.value = 0.85 + Math.random() * 0.3

  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 900 + intensity * 1400 + Math.random() * 400
  bp.Q.value = 1.1

  const g = c.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(amp, t + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28)

  src.connect(bp)
  bp.connect(g)
  g.connect(master)
  src.start(t, Math.random() * 0.5, 0.35)
  src.stop(t + 0.4)

  // faint bead chime on stronger sweeps
  if (intensity > 0.35 && Math.random() < 0.5) {
    const osc = c.createOscillator()
    osc.type = 'sine'
    // pentatonic-ish set so overlapping chimes stay consonant
    const notes = [1318.5, 1568, 1760, 2093, 2349]
    osc.frequency.value = notes[Math.floor(Math.random() * notes.length)]

    const og = c.createGain()
    const oAmp = 0.012 + intensity * 0.02
    og.gain.setValueAtTime(0, t)
    og.gain.linearRampToValueAtTime(oAmp, t + 0.008)
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.6)

    osc.connect(og)
    og.connect(master)
    osc.start(t)
    osc.stop(t + 0.65)
  }
}
