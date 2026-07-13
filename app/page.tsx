'use client'

import { useState } from 'react'
import { destinations } from '@/lib/destinations'
import { SiteHeader } from '@/components/site-header'
import { DestinationScene } from '@/components/destination-scene'
import { DestinationCard } from '@/components/destination-card'
import { GalleryView } from '@/components/gallery-view'
import { withViewTransition } from '@/lib/view-transition'

type View = 'scene' | 'gallery'

export default function Home() {
  const [index, setIndex] = useState(0)
  const [view, setView] = useState<View>('scene')
  // entry animations only play on first load; once magic-move view
  // transitions take over, they'd fight the morph and look doubled
  const [entrance, setEntrance] = useState(true)

  const prev = (index - 1 + destinations.length) % destinations.length
  const next = (index + 1) % destinations.length
  // every remaining destination is a dark crown scene
  const dark = true

  /** run a layout change as a magic-move transition */
  function go(update: () => void) {
    const supported = withViewTransition(update)
    if (supported && entrance) setEntrance(false)
  }

  return (
    <main
      className={`paper-grain relative h-dvh overflow-hidden bg-background transition-colors duration-700 ${
        dark ? 'dark' : ''
      }`}
    >
      <SiteHeader view={view} onViewChange={(v) => go(() => setView(v))} />

      {view === 'scene' ? (
        <>
          <DestinationScene destination={destinations[index]} entrance={entrance} />

          <DestinationCard
            destination={destinations[prev]}
            side="left"
            onSelect={() => go(() => setIndex(prev))}
            dark={dark}
          />
          <DestinationCard
            destination={destinations[next]}
            side="right"
            onSelect={() => go(() => setIndex(next))}
            dark={dark}
          />
        </>
      ) : (
        <GalleryView
          destinations={destinations}
          initialIndex={index}
          transition={go}
          onSelect={(i) => {
            go(() => {
              setIndex(i)
              setView('scene')
            })
          }}
        />
      )}
    </main>
  )
}
