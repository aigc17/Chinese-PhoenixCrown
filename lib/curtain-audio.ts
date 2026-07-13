/**
 * Synthesized brush/rustle sound for the text curtain, built entirely
 * with the Web Audio API — no audio files needed. Each "brush" is a
 * short burst of band-passed noise (fabric swish) topped with a high
 * sine partial (beads/chimes), with volume and brightness scaled by
 * how fast the hand moves through the strands.
 *
 * Browsers keep audio muted until the page receives a real user
 * gesture (click / tap / key). Global unlock listeners are attached on
 * first use so ANY interaction anywhere on the page arms the audio.
 */

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noiseBuffer: AudioBuffer | null = null
let lastPlay = 0
let listenersAttached = false

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.85
    master.connect(ctx.destination)

    // 1s of white noise, reused by every brush
    const len = ctx.sampleRate
    noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  }
  attachUnlockListeners()
  return ctx
}

/** Resume the context and play a silent kick (required on iOS). */
function tryUnlock() {
  if (!ctx) return
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
  // silent one-sample buffer "kick" fully arms WebAudio on iOS Safari
  try {
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate)
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.connect(ctx.destination)
    src.start(0)
  } catch {
    // ignore
  }
}

function attachUnlockListeners() {
  if (listenersAttached || typeof window === 'undefined') return
  listenersAttached = true
  const unlock = () => {
    tryUnlock()
    if (ctx && ctx.state === 'running') {
      for (const ev of GESTURES) window.removeEventListener(ev, unlock)
    }
  }
  const GESTURES = ['pointerdown', 'touchstart', 'keydown', 'click'] as const
  for (const ev of GESTURES) window.addEventListener(ev, unlock, { passive: true })
}

/**
 * Kept for callers that want to force an unlock attempt from their own
 * gesture handlers (e.g. the curtain's pointerdown).
 */
export function unlockCurtainAudio() {
  ensureContext()
  tryUnlock()
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
    // succeeds once the page has sticky user activation (any past click)
    c.resume().catch(() => {})
    return
  }

  const now = performance.now()
  if (now - lastPlay < 70) return
  lastPlay = now

  const t = c.currentTime
  const amp = 0.09 + Math.min(1, intensity) * 0.22

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

  // bead chime — frequent enough to actually be heard
  if (intensity > 0.12 && Math.random() < 0.8) {
    const osc = c.createOscillator()
    osc.type = 'sine'
    // pentatonic-ish set so overlapping chimes stay consonant
    const notes = [1318.5, 1568, 1760, 2093, 2349]
    osc.frequency.value = notes[Math.floor(Math.random() * notes.length)]

    const og = c.createGain()
    const oAmp = 0.03 + intensity * 0.05
    og.gain.setValueAtTime(0, t)
    og.gain.linearRampToValueAtTime(oAmp, t + 0.008)
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)

    osc.connect(og)
    og.connect(master)
    osc.start(t)
    osc.stop(t + 0.75)
  }
}
