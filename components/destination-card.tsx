'use client'

import Image from 'next/image'
import type { Destination } from '@/lib/destinations'

export function DestinationCard({
  destination,
  side,
  onSelect,
  dark = false,
}: {
  destination: Destination
  side: 'left' | 'right'
  onSelect: () => void
  dark?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group absolute top-[30%] z-30 flex w-[68px] flex-col items-center gap-1 border border-border bg-card/70 px-2 pb-1.5 pt-2 backdrop-blur-[1px] transition-colors hover:border-accent ${
        side === 'left' ? 'left-6 md:left-10' : 'right-6 md:right-10'
      }`}
      aria-label={`Go to ${destination.name}`}
    >
      <Image
        src={destination.roofSrc || '/placeholder.svg'}
        alt=""
        width={96}
        height={56}
        style={{ viewTransitionName: `crown-${destination.id}` }}
        className={`h-7 w-12 object-contain opacity-80 transition-opacity group-hover:opacity-100 ${
          dark ? '' : 'mix-blend-multiply'
        }`}
      />
      <span className="font-mono text-[9px] tracking-wide text-muted-foreground transition-colors group-hover:text-accent">
        {destination.name}
      </span>
    </button>
  )
}
