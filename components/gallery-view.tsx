'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Destination } from '@/lib/destinations'
import { TextCurtain } from '@/components/text-curtain'
import { withViewTransition } from '@/lib/view-transition'

/**
 * Gallery tab: three crowns on the same dark wall like the reference
 * video — the focused one large in the center, its neighbors smaller
 * at the sides. Clicking a side crown brings it to center; clicking
 * the center crown opens its full scene.
 */
export function GalleryView({
  destinations,
  initialIndex = 0,
  onSelect,
}: {
  destinations: Destination[]
  initialIndex?: number
  onSelect: (index: number) => void
}) {
  const [focus, setFocus] = useState(initialIndex)
  const prev = (focus - 1 + destinations.length) % destinations.length
  const next = (focus + 1) % destinations.length

  return (
    <div className="absolute inset-x-0 bottom-0 top-[64px]">
      <div className="flex h-full items-stretch justify-center gap-2 px-4 md:gap-6">
        <GalleryItem
          destination={destinations[prev]}
          size="side"
          onSelect={() => withViewTransition(() => setFocus(prev))}
        />
        <GalleryItem
          destination={destinations[focus]}
          size="center"
          onSelect={() => onSelect(focus)}
        />
        <GalleryItem
          destination={destinations[next]}
          size="side"
          onSelect={() => withViewTransition(() => setFocus(next))}
        />
      </div>
    </div>
  )
}

function GalleryItem({
  destination,
  size,
  onSelect,
}: {
  destination: Destination
  size: 'center' | 'side'
  onSelect: () => void
}) {
  const isCenter = size === 'center'

  return (
    <div
      className={`relative h-full flex-shrink-0 scene-in ${
        isCenter
          ? 'w-[46vw] max-w-[560px]'
          : 'w-[24vw] max-w-[300px] self-center'
      }`}
      style={isCenter ? undefined : { height: '62%' }}
    >
      {/* the hanging ink curtain, clipped to this item's own contour */}
      <div className="absolute inset-x-0 bottom-[3%] top-[4%]">
        <TextCurtain
          key={`${destination.id}-${size}`}
          charPool={destination.charPool}
          colors={destination.curtainColors}
          inkAlpha={isCenter ? 1 : 0.55}
          luminous={isCenter}
          contourSelector={`#gallery-roof-${destination.id}-${size}`}
        />
      </div>

      {/* the crown, clickable */}
      <button
        type="button"
        onClick={onSelect}
        aria-label={
          isCenter
            ? `Open ${destination.name} scene`
            : `Focus ${destination.name}`
        }
        className={`group absolute left-1/2 top-[4%] -translate-x-1/2 cursor-pointer border-0 bg-transparent p-0 ${
          isCenter ? 'w-[240px] md:w-[300px]' : 'w-[140px] md:w-[170px] opacity-70 hover:opacity-100'
        }`}
        style={{ viewTransitionName: `crown-${destination.id}` }}
      >
        <Image
          id={`gallery-roof-${destination.id}-${size}`}
          src={destination.roofSrc || '/placeholder.svg'}
          alt={destination.roofAlt}
          width={840}
          height={480}
          crossOrigin="anonymous"
          className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {/* name plate */}
      <p
        className={`absolute bottom-[1%] left-1/2 -translate-x-1/2 font-mono tracking-wide text-muted-foreground ${
          isCenter ? 'text-xs text-foreground' : 'text-[10px]'
        }`}
      >
        {destination.name}
      </p>
    </div>
  )
}
