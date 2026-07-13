'use client'

import Image from 'next/image'
import type { Destination } from '@/lib/destinations'
import { TextCurtain } from '@/components/text-curtain'

/**
 * Gallery tab: every destination side by side on the same paper wall,
 * like the original reference video — each roof/crown hangs its own
 * ink curtain. All curtains use uniform dark ink so they read on the
 * light paper regardless of the destination's own scene theme.
 */
export function GalleryView({
  destinations,
  onSelect,
}: {
  destinations: Destination[]
  onSelect: (index: number) => void
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[64px] overflow-x-auto overflow-y-hidden">
      <div className="flex h-full items-stretch gap-2 px-8 md:gap-4">
        {destinations.map((destination, i) => (
          <GalleryItem
            key={destination.id}
            destination={destination}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  )
}

function GalleryItem({
  destination,
  onSelect,
}: {
  destination: Destination
  onSelect: () => void
}) {
  return (
    <div className="relative h-full w-[340px] flex-shrink-0 scene-in md:w-[380px]">
      {/* soft cast shadow angled right, matching the reference */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[16%] h-[55%] w-[150px]"
        style={{
          transform: 'translateX(30%) skewX(-12deg)',
          background:
            'linear-gradient(100deg, transparent 38%, rgba(74,58,40,0.07) 58%, transparent 86%)',
          filter: 'blur(22px)',
        }}
      />

      {/* the hanging ink curtain, clipped to this item's own roof contour */}
      <div className="absolute inset-x-0 bottom-[3%] top-[4%]">
        <TextCurtain
          charPool={destination.charPool}
          color="#4a3a28"
          inkAlpha={0.62}
          contourSelector={`#gallery-roof-${destination.id}`}
        />
      </div>

      {/* the roof or crown, clickable to open its full scene */}
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Open ${destination.name} scene`}
        className="group absolute left-1/2 top-[4%] w-[210px] -translate-x-1/2 cursor-pointer border-0 bg-transparent p-0 md:w-[250px]"
      >
        <Image
          id={`gallery-roof-${destination.id}`}
          src={destination.roofSrc || '/placeholder.svg'}
          alt={destination.roofAlt}
          width={840}
          height={480}
          crossOrigin="anonymous"
          className="h-auto w-full drop-shadow-[0_12px_16px_rgba(74,58,40,0.2)] transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {/* name plate */}
      <p className="absolute bottom-[1%] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-wide text-muted-foreground">
        {destination.name}
      </p>
    </div>
  )
}
