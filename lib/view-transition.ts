'use client'

import { flushSync } from 'react-dom'

/**
 * Runs a state update inside the View Transitions API when available,
 * so shared elements (crowns tagged with the same view-transition-name)
 * morph smoothly between layouts — the "magic move" effect.
 * Falls back to an instant update on unsupported browsers.
 */
export function withViewTransition(update: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void
  }
  if (typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(() => {
      flushSync(update)
    })
  } else {
    update()
  }
}
