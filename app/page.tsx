'use client'

import { useState } from 'react'
import { destinations } from '@/lib/destinations'
import { SiteHeader } from '@/components/site-header'
import { DestinationScene } from '@/components/destination-scene'
import { DestinationCard } from '@/components/destination-card'

export default function Home() {
  const [index, setIndex] = useState(0)

  const prev = (index - 1 + destinations.length) % destinations.length
  const next = (index + 1) % destinations.length

  return (
    <main className="paper-grain relative h-dvh overflow-hidden bg-background">
      <SiteHeader />

      <DestinationScene destination={destinations[index]} />

      <DestinationCard
        destination={destinations[prev]}
        side="left"
        onSelect={() => setIndex(prev)}
      />
      <DestinationCard
        destination={destinations[next]}
        side="right"
        onSelect={() => setIndex(next)}
      />
    </main>
  )
}
