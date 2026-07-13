'use client'

import { useState } from 'react'
import { destinations } from '@/lib/destinations'
import { SiteHeader } from '@/components/site-header'
import { DestinationScene } from '@/components/destination-scene'
import { DestinationCard } from '@/components/destination-card'
import { GalleryView } from '@/components/gallery-view'

type View = 'scene' | 'gallery'

export default function Home() {
  const [index, setIndex] = useState(0)
  const [view, setView] = useState<View>('scene')

  const prev = (index - 1 + destinations.length) % destinations.length
  const next = (index + 1) % destinations.length
  // every remaining destination is a dark crown scene
  const dark = true

  return (
    <main
      className={`paper-grain relative h-dvh overflow-hidden bg-background transition-colors duration-700 ${
        dark ? 'dark' : ''
      }`}
    >
      <SiteHeader />

      {/* view tabs */}
      <div
        role="tablist"
        aria-label="View"
        className="absolute left-1/2 top-5 z-40 flex -translate-x-1/2 border border-border bg-card/70 backdrop-blur-[1px]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={view === 'scene'}
          onClick={() => setView('scene')}
          className={`px-4 py-1.5 font-mono text-xs transition-colors ${
            view === 'scene'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Scene
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'gallery'}
          onClick={() => setView('gallery')}
          className={`px-4 py-1.5 font-mono text-xs transition-colors ${
            view === 'gallery'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Gallery
        </button>
      </div>

      {view === 'scene' ? (
        <>
          <DestinationScene destination={destinations[index]} />

          <DestinationCard
            destination={destinations[prev]}
            side="left"
            onSelect={() => setIndex(prev)}
            dark={dark}
          />
          <DestinationCard
            destination={destinations[next]}
            side="right"
            onSelect={() => setIndex(next)}
            dark={dark}
          />
        </>
      ) : (
        <GalleryView
          destinations={destinations}
          initialIndex={index}
          onSelect={(i) => {
            setIndex(i)
            setView('scene')
          }}
        />
      )}
    </main>
  )
}
