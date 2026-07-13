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

      {/* the hanging text curtain — wider than the roof so swinging
          characters have room and don't get clipped at the canvas edge;
          columns without roof above them are still culled by the contour */}
      <div
        className="pointer-events-auto absolute bottom-[4%] left-1/2 top-[6%] -translate-x-1/2 scene-in"
        style={{
          width: `min(${destination.curtainWidth * 560 + 360}px, 98vw)`,
        }}
      >
        <TextCurtain
          charPool={destination.charPool}
          color="#4a3a28"
          contourSelector={`#roof-${destination.id}`}
          avoidSelector="[data-curtain-avoid]"
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

      {/* copy blocks (headline + caption) hidden for now per design direction;
          h1 kept visually hidden for accessibility/SEO */}
      <h1 className="sr-only">
        {destination.name} —— {destination.headingRest}
      </h1>
    </div>
  )
}
