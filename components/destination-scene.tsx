'use client'

import Image from 'next/image'
import type { Destination } from '@/lib/destinations'
import { TextCurtain } from '@/components/text-curtain'

export function DestinationScene({ destination }: { destination: Destination }) {
  return (
    <div key={destination.id} className="pointer-events-none absolute inset-0">
      {/* soft cast shadow angled to the right, like afternoon light */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[18%] h-[60%] w-[240px] scene-in md:w-[300px]"
        style={{
          transform: 'translateX(28%) skewX(-12deg)',
          background:
            'linear-gradient(100deg, transparent 38%, rgba(74,58,40,0.08) 58%, transparent 86%)',
          filter: 'blur(26px)',
        }}
      />

      {/* the hanging text curtain — spans the roof area so its pins can
          trace the roof's silhouette path */}
      <div
        className="pointer-events-auto absolute bottom-[4%] left-1/2 top-[6%] -translate-x-1/2 scene-in"
        style={{
          width: `min(${destination.curtainWidth * 560}px, 84vw)`,
        }}
      >
        <TextCurtain
          charPool={destination.charPool}
          color="#4a3a28"
          contourSelector={`#roof-${destination.id}`}
        />
      </div>

      {/* the roof, layered above the curtain so strands hang from under it */}
      <div className="roof-in absolute left-1/2 top-[6%] w-[300px] -translate-x-1/2 md:w-[420px]">
        <Image
          id={`roof-${destination.id}`}
          src={destination.roofSrc || '/placeholder.svg'}
          alt={destination.roofAlt}
          width={840}
          height={480}
          priority
          crossOrigin="anonymous"
          className="h-auto w-full drop-shadow-[0_14px_18px_rgba(74,58,40,0.22)]"
        />
      </div>

      {/* left copy block */}
      <div className="absolute bottom-[8%] left-6 z-20 max-w-[300px] scene-in md:left-10 md:max-w-[360px]">
        <p className="mb-4 font-mono text-[11px] text-muted-foreground">
          <span className="text-accent">{destination.phrase}</span> {destination.phraseNote}
        </p>
        <h1 className="font-serif text-4xl leading-[1.05] text-foreground text-balance md:text-[52px]">
          {destination.name}
          <span className="text-muted-foreground"> —— </span>
          {destination.headingRest}
        </h1>
      </div>

      {/* bottom-right caption */}
      <p className="absolute bottom-[8%] right-6 z-20 max-w-[220px] scene-in font-mono text-[11px] leading-relaxed text-muted-foreground md:right-10">
        {destination.caption}
      </p>
    </div>
  )
}
