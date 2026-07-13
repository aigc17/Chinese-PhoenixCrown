'use client'

import Image from 'next/image'
import type { Destination } from '@/lib/destinations'
import { TextCurtain } from '@/components/text-curtain'

export function DestinationScene({
  destination,
  entrance = true,
}: {
  destination: Destination
  entrance?: boolean
}) {
  const dark = destination.theme === 'dark'
  const sceneIn = entrance ? 'scene-in' : ''

  return (
    <div key={destination.id} className="pointer-events-none absolute inset-0">
      {dark ? (
        /* moonlit halo behind the crown instead of a cast shadow */
        <div
          aria-hidden="true"
          className={`absolute left-1/2 top-[8%] h-[50%] -translate-x-1/2 ${sceneIn}`}
          style={{
            width: 'clamp(440px, 56vw, 900px)',
            background:
              'radial-gradient(ellipse at center, rgba(96,126,204,0.16) 0%, rgba(58,88,160,0.07) 45%, transparent 72%)',
            filter: 'blur(10px)',
          }}
        />
      ) : (
        /* soft cast shadow angled to the right, like afternoon light */
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
      )}

      {/* the hanging text curtain — wider than the roof so swinging
          characters have room and don't get clipped at the canvas edge;
          columns without roof above them are still culled by the contour */}
      <div
        className={`pointer-events-auto absolute bottom-[24%] left-1/2 top-[5%] -translate-x-1/2 ${sceneIn}`}
        style={{
          // track the crown's viewport-relative size, plus swing room
          width: `min(calc(clamp(240px, 30vw, 500px) * ${destination.curtainWidth} + 40vw), 98vw)`,
        }}
      >
        <TextCurtain
          charPool={destination.charPool}
          color="#4a3a28"
          colors={destination.curtainColors}
          inkAlpha={dark ? 1 : 0.62}
          luminous={dark}
          contourSelector={`#roof-${destination.id}`}
          avoidSelector="[data-curtain-avoid]"
        />
      </div>

      {/* the roof (or crown), layered above the curtain so strands hang from under it;
          the crown is a portrait image so it gets a narrower footprint */}
      <div
        className={`absolute left-1/2 top-[5%] -translate-x-1/2 ${entrance ? 'roof-in' : ''}`}
        style={{
          // scale with the viewport so large screens get a large crown
          width: dark ? 'clamp(240px, 30vw, 500px)' : 'clamp(300px, 34vw, 560px)',
          viewTransitionName: `crown-${destination.id}`,
        }}
      >
        <Image
          id={`roof-${destination.id}`}
          src={destination.roofSrc || '/placeholder.svg'}
          alt={destination.roofAlt}
          width={840}
          height={480}
          priority
          crossOrigin="anonymous"
          className={
            dark
              ? 'h-auto w-full drop-shadow-[0_0_28px_rgba(96,126,204,0.35)]'
              : 'h-auto w-full drop-shadow-[0_14px_18px_rgba(74,58,40,0.22)]'
          }
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
